import { useState } from "react";
import { useStore } from "@nanostores/react";
import { Button, Code, Flex, Spinner, Text, Tabs, Box } from "@radix-ui/themes";
import { onAgent } from "@/actions/agent";
import {
  $agents,
  $members,
  $messages,
  addMessage,
  updateMessages,
} from "@/store/store";
import { $tasks, addTask, updateTask } from "@/store/tasks";
import TaskForm from "./TaskForm";
import ClassicVue from "./ClassicVue";
import CanvasVue from "./CanvasVue";

function TaskList() {
  const tasks = useStore($tasks);

  const [formState, setFormState] = useState({ visible: false, task: null });
  const [loading, setLoading] = useState(false);

  const handleClose = () => setFormState({ visible: false, task: null });

  const handleSubmit = (task) => {
    if (task.id) {
      updateTask(task);
    } else {
      addTask(task);
    }
    handleClose();
  };

  const handleAssignClick = async () => {
    const chatAgents = $agents.get();

    const agent = chatAgents.length > 0 ? chatAgents[0] : null;
    const members = $members.get();

    //création du prompt pour l'agent
    const prompt = `
    Liste des tâches :
${tasks
  .map((t) => `- [${parseInt(t.id)}] ${t.title} : ${t.description}`)
  .join("\n")}

Liste des membres :
${members.map((m) => `- [${m.id}] ${m.name} (${m.job} ${m.level})`).join("\n")}
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

      // Extraction du JSON uniquement
      const lastMessage = cloned.at(-1)?.content || "";
      const match = lastMessage.match(/{[\s\S]*}/);
      const cleanedResult = match ? match[0] : "";

      const parsedResult = JSON.parse(cleanedResult);
      for (const task of parsedResult.tasks) {
        const existingTask = tasks.find((t) => t.id === task.taskId);

        if (existingTask) {
          // Met à jour la tâche existante avec les nouvelles informations
          const member = members.find((m) => m.id === task.assignedToId);
          existingTask.assignedTo = member ? member.name : "";
          existingTask.estimatedTime = task.estimatedTime || null;
          updateTask(existingTask);
        }
      }

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
              Attribution des tâches en cours...
            </Text>
          </Flex>
        </Flex>
      )}

      <Flex
        direction="column"
        gap="4"
        style={{ width: "100%", height: "100%", margin: "10px" }}
      >
        <Flex direction="column" gap="2" style={{ height: "100%" }}>
          <Button
            onClick={handleAssignClick}
            size="2"
            variant="solid"
            style={{ width: "fit-content" }}
          >
            Attribuer les tâches
          </Button>
          <Flex
            gap="4"
            justify="between"
            style={{ width: "100%", height: "100%" }}
          >
            <Tabs.Root defaultValue="account">
              <Tabs.List>
                <Tabs.Trigger value="list">Liste</Tabs.Trigger>
                <Tabs.Trigger value="canvas">Canvas</Tabs.Trigger>
              </Tabs.List>

              <Box pt="3" style={{ overflow: "auto", height: "100%" }}>
                <Tabs.Content value="list">
                  <ClassicVue setFormState={setFormState} tasks={tasks} />
                </Tabs.Content>

                <Tabs.Content value="canvas">
                  <CanvasVue />
                </Tabs.Content>
              </Box>
            </Tabs.Root>
          </Flex>
        </Flex>
      </Flex>

      {formState.visible && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          style={{
            background: "rgba(10,10,20,0.92)",
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            display: "flex",
          }}
          onClick={handleClose}
        >
          <Flex
            position="relative"
            zIndex="101"
            style={{
              boxShadow: "0 8px 32px 0 #6366f133",
              borderRadius: 20,
              minWidth: 400,
              maxWidth: 480,
              width: "100%",
              background: "var(--color-panel-solid)",
              maxHeight: "98vh",
              height: "90vh",
              overflowY: "auto",
              transition: "background 0.2s",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <TaskForm
              onClose={handleClose}
              task={formState.task}
              isEdit={!!formState.task}
              onSubmit={handleSubmit}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default TaskList;
