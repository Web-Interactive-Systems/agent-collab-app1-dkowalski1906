import { useState } from "react";
import { Tldraw, toRichText } from "tldraw";
import "tldraw/tldraw.css";
import { TLCustomShapes } from "./TLDrawShapes";
import { useStore } from "@nanostores/react";
import { $tasks, updateTask } from "@/store/tasks";
import { $members } from "@/store/member";
import { $agents, $messages, addMessage, updateMessages } from "@/store/store";
import { Button } from "@radix-ui/themes";
import { onAgent } from "@/actions/agent";

function CanvasVue() {
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState(null);

  const tasks = useStore($tasks);
  const members = useStore($members);

  const cardWidth = 200;
  const cardHeight = 200;
  const cardGap = 20;

  const clusterGapX = 300;
  const clusterGapY = 400;

  const cardsPerRowInCluster = 3;

  const handleAnalyzeCommentsClick = async () => {
    const chatAgents = $agents.get();
    const agent = chatAgents.length > 0 ? chatAgents[2] : null;
    const tasksSnapshot = $tasks.get();

    const prompt = `
Voici la liste des tâches et leurs commentaires. Pour chacune, déduis le ton émotionnel ("humor") comme "positive" ou "negative", et justifie ton choix (champ "justification").

${tasksSnapshot
  .map((t) => `- [${parseInt(t.id)}] ${t.title} : "${t.commentary}"`)
  .join("\n")}
`;

    const response = {
      role: "assistant",
      content: "",
      id: Math.random().toString(),
      completed: false,
    };
    addMessage(response);

    if (agent && editor) {
      setLoading(true);
      const stream = await onAgent({ agent, prompt });

      let cloned = $messages.get();

      for await (const part of stream) {
        const token = part.choices[0]?.delta?.content ?? "";
        const last = cloned.at(-1);
        cloned[cloned.length - 1] = {
          ...last,
          content: last.content + token,
        };
        updateMessages([...cloned]);
      }

      const lastMessage = cloned.at(-1)?.content || "";
      const match = lastMessage.match(/\[\s*{[\s\S]*}\s*\]/);
      const jsonStr = match ? match[0] : "[]";

      try {
        const analysis = JSON.parse(jsonStr);

        analysis.forEach((result) => {
          const task = tasksSnapshot.find(
            (t) => parseInt(t.id) === parseInt(result.id)
          );
          if (task) {
            task.humor = result.humor;
            console.log(task);
            
            updateTask(task);

            // Mise à jour directe des notes dans le canvas, sans getShapes
            editor.updateShapes([
              {
                id: task.id, // IMPORTANT : ici il faut l'id de la forme note !
                type: "note",
                props: {
                  color: result.humor === "positive" ? "green" : "red",
                },
              },
            ]);
          }
        });
      } catch (e) {
        console.error("Erreur lors du parsing JSON :", e);
      }

      setLoading(false);
    }
  };

  const onCanvasInit = (ed) => {
    setEditor(ed);

    const labelWidth = 150;
    const labelHeight = 40;
    const cardsStartX = labelWidth + 20;

    const rowLabels = ["Tâches en cours", "Tâches complétées"];

    members.forEach((person, colIndex) => {
      const clusterX =
        cardsStartX +
        colIndex * (cardsPerRowInCluster * (cardWidth + cardGap) + clusterGapX);

      ed.createShapes([
        {
          type: "text",
          x: clusterX,
          y: 0,
          props: {
            richText: toRichText(person.name),
            size: "m",
            color: "black",
          },
        },
      ]);

      const completedTasks = tasks.filter(
        (t) => t.assignedTo === person.name && t.completed === true
      );
      const ongoingTasks = tasks.filter(
        (t) => t.assignedTo === person.name && t.completed === false
      );

      const taskGroups = [ongoingTasks, completedTasks];

      taskGroups.forEach((taskList, rowIndex) => {
        const clusterY = labelHeight + rowIndex * (cardHeight * 2 + clusterGapY);

        if (colIndex === 0) {
          ed.createShapes([
            {
              type: "text",
              x: 0,
              y: clusterY,
              props: {
                richText: toRichText(rowLabels[rowIndex]),
                size: "m",
                color: "black",
              },
            },
          ]);
        }

        taskList.forEach((task, index) => {
          const localCol = index % cardsPerRowInCluster;
          const localRow = Math.floor(index / cardsPerRowInCluster);

          const x = clusterX + localCol * (cardWidth + cardGap);
          const y = clusterY + localRow * (cardHeight + cardGap);

          const initialColor =
            task.humor === "positive"
              ? "green"
              : task.humor === "negative"
              ? "red"
              : "black";

          // IMPORTANT : utiliser task.id comme id de la note pour pouvoir la retrouver
          ed.createShapes([
            {
              type: "note",
              x,
              y,
              props: {
                color: initialColor,
                title: task.title,
                description: task.description,
                assignedTo: task.assignedTo,
                completed: task.completed,
                commentary: task.commentary,
              },
            },
          ]);
        });
      });
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <Button
        onClick={handleAnalyzeCommentsClick}
        size="2"
        variant="solid"
        style={{ width: "fit-content" }}
        disabled={loading}
      >
        {loading ? "Analyse en cours..." : "Analyser commentaires"}
      </Button>
      <Tldraw shapeUtils={TLCustomShapes} onMount={onCanvasInit} />
    </div>
  );
}

export default CanvasVue;
