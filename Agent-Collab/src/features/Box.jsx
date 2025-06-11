import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import { deleteAgent } from "@/store/agents";
import React, { useState } from "react";
import Formulaire from "./Formulaire";

function Box({ agent }) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <Card
        variant="classic"
        size="3"
        radius="large"
        style={{
          width: 240,
          height: 150,
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
        <Flex direction="column" justify="end" style={{ flex: 1 }}>
          <Text size="3" color="gray" truncate>
            {agent.role}
          </Text>
          <Flex justify="end" align="end" mt="2" gap="4">
            <Button
              variant="ghost"
              color="gray"
              size="1"
              onClick={() => setEditOpen(true)}
              aria-label="Modifier l'agent"
            >
              <Pencil2Icon />
            </Button>
            <Button
              variant="ghost"
              color="red"
              size="1"
              onClick={() => deleteAgent(agent.id)}
              aria-label="Supprimer l'agent"
            >
              <Cross2Icon />
            </Button>
          </Flex>
        </Flex>
      </Card>
      {editOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(10,10,20,0.92)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setEditOpen(false)}
        >
          <div
            style={{
              minWidth: 400,
              maxWidth: 480,
              width: "100%",
              background: "var(--color-panel-solid)",
              borderRadius: 20,
              boxShadow: "0 8px 32px 0 #6366f133",
              maxHeight: "98vh",
              height: "90vh",
              overflowY: "auto",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <Formulaire
              onClose={() => setEditOpen(false)}
              agent={agent}
              isEdit
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Box;
