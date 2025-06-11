import { $agents } from "@/store/agents";
import { useStore } from "@nanostores/react";
import Box from "./Box";
import { Flex, Card, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";

function AgentList({ onAddClick }) {
  const cards = useStore($agents);

  return (
    <Flex
      gap="20px"
      display="flex"
      justify="start"
      align="start"
      width="100%"
      height="100%"
      wrap="wrap"
    >
      {/* Première box "Ajouter" */}
      <Card
        variant="classic"
        size="3"
        radius="large"
        style={{
          width: 200,
          height: 200,
          backgroundColor: "#f9f9f9",
          padding: 12,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 100,
          cursor: "pointer",
        }}
      >
        <Button
          variant="ghost"
          size="2"
          style={{ display: "flex", alignItems: "center", gap: 8 }}
          onClick={onAddClick}
        >
          <PlusIcon />
          Ajouter
        </Button>
      </Card>

      {/* Liste des agents */}
      {cards.map((agent) => (
        <Box key={agent.id} agent={agent} />
      ))}
    </Flex>
  );
}

export default AgentList;
