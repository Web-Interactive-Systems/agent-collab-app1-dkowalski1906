import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { Cross2Icon, Pencil2Icon, PlusIcon } from "@radix-ui/react-icons";
import { removeTask } from "@/store/tasks";

function Box({ task, onEditClick, isAdd, onAddClick }) {
  if (isAdd) {
    return (
      <div
        style={{
          width: "240px",
          height: "240px",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
        }}
      >
        <Card
          variant="classic"
          size="3"
          radius="large"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            border: "3px solid var(--gray-9)",
            margin: 0,
            boxSizing: "border-box",
          }}
        >
          <Button
            variant="ghost"
            size="2"
            onClick={onAddClick}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <PlusIcon />
            <Text size="4">Ajouter</Text>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "240px",
        height: "240px",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      <Card
        variant="classic"
        size="3"
        radius="large"
        style={{
          width: 240,
          height: 240,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          border: "2px solid var(--gray-9)",
          margin: 0,
          boxSizing: "border-box",
        }}
      >
        <Flex align="center" gap="3" mb="2">
          <Text size="4" weight="bold">
            {task.title}
          </Text>
        </Flex>
        <Flex direction="column" justify="between" style={{ flex: 1 }}>
          <Text size="3" color="gray">
            {task.description}
          </Text>
          <Flex
            justify="between"
            align="end"
            mt="2"
            gap="4"
            style={{ marginTop: "20px" }}
          >
            <Button
              variant="ghost"
              color="gray"
              size="1"
              onClick={onEditClick}
              aria-label="Modifier la tâche"
            >
              <Pencil2Icon />
            </Button>
            <Button
              variant="ghost"
              color="red"
              size="1"
              onClick={() => removeTask(task.id)}
              aria-label="Supprimer la tâche"
            >
              <Cross2Icon />
            </Button>
          </Flex>
        </Flex>
      </Card>
    </div>
  );
}

export default Box;
