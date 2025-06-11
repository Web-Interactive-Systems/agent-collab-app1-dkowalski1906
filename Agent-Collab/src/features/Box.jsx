import { Card, Flex, Text } from "@radix-ui/themes";

function Box({ agent }) {
  return (
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
      }}
    >
      <Flex
        direction="column"      // empiler verticalement
        justify="center"        // centrer verticalement
        align="center"          // centrer horizontalement
        gap={8}
        style={{ minHeight: 100 }} // hauteur minimum pour mieux voir le centrage
      >
        {/* Emoji */}
        {agent.emoji && (
          <Text size="6" aria-label="emoji" style={{ userSelect: "none" }}>
            {agent.emoji}
          </Text>
        )}

        {/* Texte */}
        <Text
          size="4"
          weight="bold"
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}
        >
          {agent.title}
        </Text>
        <Text
          size="3"
          color="gray"
          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}
        >
          {agent.role}
        </Text>
        {agent.response && (
          <Text
            size="2"
            color="gray"
            style={{ marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", textAlign: "center" }}
          >
            {agent.response}
          </Text>
        )}
      </Flex>
    </Card>
  );
}

export default Box;
