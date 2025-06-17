import { PaperPlaneIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextArea, Card } from "@radix-ui/themes";
import { useState, useRef } from "react";
import { useStore } from "@nanostores/react";
import {
  $messages,
  addMessage,
  updateMessages,
  $chatAgents,
} from "@/store/store";
import { onAgent } from "@/actions/agent";
import { isEmpty } from "lodash";
import { AgentMenu } from "./AgentMenu";
import { AgentSelect } from "./AgentSelect";

function constructCtxArray(originalArray) {
  const result = [];
  if (originalArray.length > 3)
    result.push(originalArray.at(-3), originalArray.at(-2));
  if (originalArray.length > 1) result.push(originalArray[1]);
  if (originalArray.length > 0) result.push(originalArray[0]);
  return result;
}

function ChatPrompt() {
  const promptRef = useRef(null);
  const [isPromptEmpty, setIsPromptEmpty] = useState(true);

  const chatAgents = useStore($chatAgents);

  const onTextChange = () => {
    const val = promptRef.current.value || "";
    setIsPromptEmpty(val.trim().length === 0);
  };

  const onSendPrompt = async () => {
    const prompt = promptRef.current.value;
    if (!prompt.trim()) return;

    // Ajouter le message utilisateur
    addMessage({
      role: "user",
      content: prompt,
      id: Math.random().toString(),
    });

    const messages = $messages.get();
    const contextInputs = constructCtxArray(messages);

    // Ajouter un message "assistant" vide
    const response = {
      role: "assistant",
      content: "",
      id: Math.random().toString(),
      completed: false,
    };
    addMessage(response);

    // Sélection des agents
    const steps = isEmpty(chatAgents) ? [null] : chatAgents;

    // Parcours de chaque agent sélectionné
    for (let i = 0, len = steps.length; i < len; i++) {
      const agent = steps[i];

      let cloned = $messages.get();

      const stream = await onAgent({ agent, prompt, contextInputs });

      for await (const part of stream) {
        const token = part.choices[0]?.delta?.content ?? "";
        console.log(token);
        
        const last = cloned.at(-1);

        cloned[cloned.length - 1] = {
          ...last,
          content: last.content + token,
        };

        updateMessages([...cloned]);
      }

      // Marquer comme complété
      const last = cloned.at(-1);
      cloned[cloned.length - 1] = {
        ...last,
        completed: true,
      };
      updateMessages([...cloned]);

      // Ajouter un nouvel assistant vide si ce n'est pas le dernier agent
      if (steps.length > 0 && i !== steps.length - 1) {
        cloned = [
          ...cloned,
          {
            role: "assistant",
            content: "",
            id: Math.random().toString(),
            completed: false,
          },
        ];
      }
    }

    // Nettoyage une fois tous les agents traités
    promptRef.current.value = "";
    setIsPromptEmpty(true);
  };

  return (
    <Flex position="relative" direction="column" mt="auto" width="100%" gap="2">
      <Card
        variant="classic"
        radius="large"
        width="100%"
        style={{
          border: "2px solid var(--gray-9)",
        }}
      >
        <Flex align="center" gap="2" width="100%">
          <TextArea
            placeholder="Comment puis-je aider..."
            onChange={onTextChange}
            style={{ width: "100%" }}
            ref={promptRef}
          />
          <Button disabled={isPromptEmpty} onClick={onSendPrompt}>
            <PaperPlaneIcon />
          </Button>
        </Flex>
      </Card>
      <Flex align="center" gap="2" width="100%">
        <AgentMenu></AgentMenu>
        <AgentSelect></AgentSelect>
      </Flex>
    </Flex>
  );
}

export default ChatPrompt;
