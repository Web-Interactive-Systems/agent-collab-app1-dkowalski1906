import TaskItem from "./TaskItem";
import { Flex, Text } from "@radix-ui/themes";

function ClassicVue({ setFormState, tasks }) {
  const handleAddClick = () => setFormState({ visible: true, task: null });
  const handleEditClick = (task) => setFormState({ visible: true, task });

  return (
    <>
      <Flex direction="column" style={{overflow: "auto", height: "100%"}}>
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
    </>
  );
}

export default ClassicVue;
