import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { Cross2Icon, LockClosedIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { removeAgent } from "@/store/agents";
import React from "react";

function Box({ agent, onEditClick }) {
  return (
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
        {agent.emoji && (
          <Text size="6" aria-label="emoji">
            {agent.emoji}
          </Text>
        )}
        <Text size="4" weight="bold">
          {agent.title}
        </Text>
      </Flex>
      <Flex direction="column" justify="between" style={{ flex: 1 }}>
        <Text size="3" color="gray">
          {agent.role}
        </Text>
        <Flex justify="between" align="end" mt="2" gap="4" style={{ marginTop: "20px" }}>
          {agent.locked && <LockClosedIcon></LockClosedIcon>}
          <Button
            variant="ghost"
            color="gray"
            size="1"
            onClick={onEditClick}
            aria-label="Modifier l'agent"
            disabled={agent.locked}
          >
            <Pencil2Icon />
          </Button>
          <Button
            variant="ghost"
            color="red"
            size="1"
            onClick={() => removeAgent(agent.id)}
            aria-label="Supprimer l'agent"
            disabled={agent.locked}
          >
            <Cross2Icon />
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
}

export default Box;
