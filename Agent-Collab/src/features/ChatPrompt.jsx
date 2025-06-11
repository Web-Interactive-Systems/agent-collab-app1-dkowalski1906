import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextArea, Card } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { $messages, addMessage, updateMessages } from "@/store/messages";
import { onDummyAgent } from "@/actions/agent";

function ChatPrompt() {
  const handleAddMessage = (message) => {
    addMessage(message);
  };

  const [isPromptEmpty, setIsPromptEmpty] = useState(true);
  const promptRef = useRef(null);

  const onTextChange = (e) => {
    promptRef.current = e.target.value;
    setIsPromptEmpty(promptRef.current.trim().length === 0);
  };

  const onSendPrompt = async () => {
    //add user message
    handleAddMessage({
      content: promptRef.current,
      role: "user",
      id: Math.random().toString(),
    });

    const messages = $messages.get();

    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 1000 + 500)
    );

    //add assistant message
    const response = {
      content: "",
      role: "assistant",
      id: Math.random().toString(),
    };
    handleAddMessage(response);

    //update the message for each token
    for await (const token of onDummyAgent()) {
      response.content += token;
      updateMessages([...messages, response]);
    }
  };

  return (
    <Flex direction="column" mt="auto" width="100%" gap="2">
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
          />
          <Button disabled={isPromptEmpty} onClick={onSendPrompt}>
            <PaperPlaneIcon />
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}

export default ChatPrompt;
