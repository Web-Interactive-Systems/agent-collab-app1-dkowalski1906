import { Tldraw, toRichText } from "tldraw";
import "tldraw/tldraw.css";
import { TLCustomShapes } from "./TLDrawShapes";
import { useStore } from "@nanostores/react";
import { $tasks } from "@/store/tasks";
import { $members } from "@/store/member";
import { fill } from "lodash";

function CanvasVue() {
  const tasks = useStore($tasks);
  const members = useStore($members);

  const cardWidth = 200;
  const cardHeight = 200;
  const cardGap = 20;

  const clusterGapX = 300;
  const clusterGapY = 400;

  const cardsPerRowInCluster = 3;

  const onCanvasInit = (editor) => {
    members.forEach((person, colIndex) => {
      const clusterX =
        colIndex * (cardsPerRowInCluster * (cardWidth + cardGap) + clusterGapX);

      // Tâches terminées
      const completedTasks = tasks.filter(
        (t) => t.assignedTo === person.name && t.completed === true
      );
      // Tâches en cours
      const ongoingTasks = tasks.filter(
        (t) => t.assignedTo === person.name && t.completed === false
      );

      const taskGroups = [ongoingTasks, completedTasks];

      taskGroups.forEach((taskList, rowIndex) => {
        const clusterY = rowIndex * (cardHeight * 2 + clusterGapY);

        taskList.forEach((task, index) => {
          const localCol = index % cardsPerRowInCluster;
          const localRow = Math.floor(index / cardsPerRowInCluster);

          const x = clusterX + localCol * (cardWidth + cardGap);
          const y = clusterY + localRow * (cardHeight + cardGap);

          editor.createShapes([
            {
              type: "note",
              x,
              y,
              props: {
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

        editor.createShapes([
          {
            type: "note",
            x: 0,
            y: 0,
            props: {
            //   richText: toRichText("hello"),
              color: "red",
            },
          },
        ]);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Tldraw //
        shapeUtils={TLCustomShapes}
        onMount={onCanvasInit}
      />
    </div>
  );
}

export default CanvasVue;
