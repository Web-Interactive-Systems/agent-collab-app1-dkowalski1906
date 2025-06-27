import {
  Card,
  Flex,
  TextArea,
  Button,
  Text,
  Separator,
  TextField,
} from "@radix-ui/themes";
import { PlusIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { useState } from "react";

function TaskForm({ onClose, task, isEdit, onSubmit }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [estimatedTime, setEstimatedTime] = useState(
    task?.estimatedTime || null
  );
  const [realizedTime, setRealizedTime] = useState(task?.realizedTime || null);
  const [assignedTo, setAssignedTo] = useState(task?.assignedTo || "");
 const [dueDate, setDueDate] = useState(task?.dueDate || null);

  const handleSubmit = () => {
    if (!title) {
      alert("Veuillez remplir le titre.");
      return;
    }
    onSubmit({
      ...task,
      title,
      description,
      estimatedTime,
      realizedTime,
      assignedTo,
      dueDate
    });
    setTitle("");
    setDescription("");
    setEstimatedTime(null);
    setAssignedTo("");
    setRealizedTime(null);
    setDueDate(null);
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
          <TextField.Root
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="titre"
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
            placeholder="description"
            size="3"
            style={{ height: "100px" }}
          />
        </Flex>
        <Flex direction="column" gap="1">
          <Text as="label" weight="bold">
            Data d'échéance
          </Text>
          <TextField.Root
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              placeholder="YYYY-MM-DD"
              size="3"
              radius="full"
              style={{ width: "150px" }}
            />
        </Flex>
        <Flex direction="row" gap="1">
          <Flex direction="column" gap="1" style={{ flex: 1 }}>
            <Text as="label" weight="bold">
              Temps estimé (heures)
            </Text>
            <TextField.Root
              value={estimatedTime}
              onChange={(e) => setEstimatedTime(e.target.value)}
              placeholder="durée"
              size="3"
              radius="full"
              style={{ width: "70px" }}
            />
          </Flex>
          <Flex direction="column" gap="1" style={{ flex: 1 }}>
            <Text as="label" weight="bold">
              Temps réalisé (heures)
            </Text>
            <TextField.Root
              value={realizedTime}
              onChange={(e) => setRealizedTime(e.target.value)}
              placeholder="durée"
              size="3"
              radius="full"
              style={{ width: "70px" }}
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1" style={{ flex: 1 }}>
            <Text as="label" weight="bold">
              Assignation
            </Text>
            <TextField.Root
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="nom"
              size="3"
              radius="full"
              style={{ width: "auto" }}
            />
          </Flex>
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
