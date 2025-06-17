import { Flex, Text } from "@radix-ui/themes";
import TaskItem from "./TaskItem";
import { useStore } from "@nanostores/react";
import { $tasks, addTask, updateTask } from "@/store/tasks";
import { useState } from "react";
import TaskForm from "./TaskForm";

function TaskList() {
  const tasks = useStore($tasks);
  const [formState, setFormState] = useState({ visible: false, task: null });

  const handleAddClick = () => setFormState({ visible: true, task: null });
  const handleEditClick = (task) => setFormState({ visible: true, task });
  const handleClose = () => setFormState({ visible: false, task: null });

  const handleSubmit = (task) => {
    if (task.id) {
      updateTask(task);
    } else {
      addTask(task);
    }
    handleClose();
  };

  return (
    <>
      <Flex
        direction="column"
        gap="4"
        style={{ width: "100%", height: "100%", margin: "10px" }}
      >
        <Text size="7" weight="bold">
          Liste des tâches
        </Text>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            height: "100%",
            padding: 0,
            margin: 0,
            overflowY: "auto",
            minHeight: 0,
            minWidth: 0,
            boxSizing: "border-box",
            alignItems: "stretch",
            gap: 12,
          }}
        >
          <TaskItem isAdd onAddClick={handleAddClick} />
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEditClick={() => handleEditClick(task)}
            />
          ))}
        </div>
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
