import React from "react";
import { Text, Button, Flex } from "@radix-ui/themes";
import {
  $agents,
  $members,
  $tasks,
  $messages,
  addMessage,
  updateMessages,
} from "@/store/store";
import { useState } from "react";
import { onAgent } from "@/actions/agent";
import { Markdown } from "@/components/Markdown";
import { Spinner } from "@radix-ui/themes";

function DailyMeeting() {
  const [loading, setLoading] = useState(false);
  const [dailyMeetingText, setDailyMeetingText] = useState("");

  const handleCreateDailyMeeting = async () => {
    const chatAgents = $agents.get();
    const agent = chatAgents.length > 0 ? chatAgents[1] : null;
    const members = $members.get();
    const tasks = $tasks.get();

    //création du prompt pour l'agent
    const prompt = `
        Liste des tâches :
    ${tasks
      .map(
        (t) =>
          `- [${parseInt(t.id)}] ${t.title} : ${
            t.description
          } - durée estimé : ${t.estimatedTime} - durée réalisée : ${
            t.realizedTime
          } - date d'échéance : ${t.dueDate} - assigné à : ${t.assignedTo}`
      )
      .join("\n")}
    
    Liste des membres :
    ${members
      .map((m) => `- [${m.id}] ${m.name} (${m.job} ${m.level})`)
      .join("\n")}
        `;

    // Ajouter un message "assistant" vide
    const response = {
      role: "assistant",
      content: "",
      id: Math.random().toString(),
      completed: false,
    };
    addMessage(response);

    if (agent) {
      //ouverture popup
      setLoading(true);

      const stream = await onAgent({ agent, prompt });

      let cloned = $messages.get();

      //Création du stream et update des messages
      for await (const part of stream) {
        let token = part.choices[0]?.delta?.content ?? "";

        const last = cloned.at(-1);
        cloned[cloned.length - 1] = {
          ...last,
          content: last.content + token,
        };

        updateMessages([...cloned]);
      }

      //Affichage du texte sur la vue
      setDailyMeetingText(cloned.at(-1).content);

      //fermeture popup
      setLoading(false);
    }
  };

  return (
    <>
    {loading && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="70%"
          height="100%"
          style={{
            background: "rgba(10,10,20,0.92)",
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <Flex align="center" gap="4">
            <Spinner size="3" />
            <Text size="3" weight="medium">
              Création du daily meeting en cours...
            </Text>
          </Flex>
        </Flex>
      )}
      <Flex
        direction="column"
        gap="4"
        style={{ widowsh: "100%", height: "100%", padding: "16px" }}
      >
        <Button
          onClick={handleCreateDailyMeeting}
          size="2"
          variant="solid"
          style={{ width: "fit-content" }}
        >
          Créer une réunion quotidienne
        </Button>
        <Flex style={{ overflow: "auto", height: "100%" }}>
          <Markdown
            content={dailyMeetingText}
          />
        </Flex>
      </Flex>
    </>
  );
}

export default DailyMeeting;
