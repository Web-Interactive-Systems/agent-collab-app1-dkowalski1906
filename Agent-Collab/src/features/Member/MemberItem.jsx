import React from "react";
import { Card, Flex, Text, Button } from "@radix-ui/themes";
import { Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";

const MemberItem = ({ member, onDeleteClick, onEditClick }) => (
  <Card
    variant="classic"
    size="3"
    radius="large"
    style={{
      width: 250,
      height: 250,
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
        {member.name}
      </Text>
    </Flex>
    <Flex direction="column" justify="between" style={{ flex: 1 }}>
      <Text size="3" color="gray">
        {member.job}
      </Text>
      <Text size="3" color="gray">
        Niveau : {member.level}
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
          aria-label="Modifier le membre"
        >
          <Pencil2Icon />
        </Button>
        <Button
          variant="ghost"
          color="red"
          size="1"
          onClick={onDeleteClick}
          aria-label="Supprimer le membre"
        >
          <Cross2Icon />
        </Button>
      </Flex>
    </Flex>
  </Card>
);

export default MemberItem;
