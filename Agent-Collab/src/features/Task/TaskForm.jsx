import {
  Card,
  Flex,
  TextArea,
  Button,
  Text,
  Separator,
} from "@radix-ui/themes";
import { PlusIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

function TaskForm({ onClose, task, isEdit, onSubmit }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");

  const handleSubmit = () => {
    if (!title) {
      alert("Veuillez remplir le titre.");
      return;
    }
    onSubmit({
      ...task,
      title,
      description,
    });
    setTitle("");
    setDescription("");
  };

  return (
    <Card
      size="4"
      style={{
        margin: "auto",
        position: "relative",
        width: "100%",
        height: "90vh",
        maxHeight: "98vh",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      <Flex direction="row" justify="end" align="center" height="5%">
        {onClose && (
          <Button variant="ghost" size="1" color="indigo" onClick={onClose}>
            <Cross2Icon width="22px" height="22px" />
          </Button>
        )}
      </Flex>
      <Flex direction="column" gap="4" justify="between" height="95%">
        <Flex direction="column" gap="1">
          <Text as="label" weight="bold">
            Titre
          </Text>
          <TextArea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Entrez le titre"
            size="3"
            radius="full"
          />
        </Flex>
        <Flex direction="column" gap="1">
          <Text as="label" weight="bold">
            Description
          </Text>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Entrez la description"
            size="3"
          />
        </Flex>
        <Separator my="2" />
        <Button onClick={handleSubmit} mt="2" color="indigo" size="3">
          {isEdit ? (
            <Pencil2Icon height="22px" width="22px" />
          ) : (
            <PlusIcon height="22px" width="22px" />
          )}
          {isEdit ? "Modifier la tâche" : "Ajouter la tâche"}
        </Button>
      </Flex>
    </Card>
  );
}

export default TaskForm;
