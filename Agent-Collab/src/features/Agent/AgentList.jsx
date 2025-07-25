import { $agents } from "@/store/agents";
import { useStore } from "@nanostores/react";
import Box from "./AgentItem";
import { Card, Button, Text, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

function AgentList({ onAddClick, onEditClick }) {
  const cards = useStore($agents);

  const BOX_WIDTH = 250;
  const BOX_HEIGHT = 250;

  return (
    <>
      <Flex
        direction="column"
        gap="4"
        style={{ width: "100%", height: "100%" }}
      >
        <Text size="7" weight="bold">
          Liste des agents
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
          <div
            style={{
              width: BOX_WIDTH,
              height: BOX_HEIGHT,
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
          {cards.map((agent) => (
            <div
              key={agent.id}
              style={{
                width: BOX_WIDTH,
                height: BOX_HEIGHT,
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
              }}
            >
              <Box agent={agent} onEditClick={() => onEditClick(agent)} />
            </div>
          ))}
        </div>
      </Flex>
    </>
  );
}

export default AgentList;
