import React from "react";
import { Card, Button, Text, Flex } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import MemberItem from "./MemberItem";
import { useStore } from "@nanostores/react";
import { $members, removeMember } from "@/store/member";

const MemberList = ({ onAddClick, onEditClick }) => {
  const members = useStore($members);
  const BOX_WIDTH = 250;
  const BOX_HEIGHT = 250;

  return (
    <Flex
      direction="column"
      gap="4"
      style={{
        width: "100%",
        height: "100%",
        margin: "0px",
      }}
    >
      <Text size="7" weight="bold">
        Liste des membres
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
        {members.map((member) => (
          <div
            key={member.id}
            style={{
              width: BOX_WIDTH,
              height: BOX_HEIGHT,
              margin: 0,
              padding: 0,
              boxSizing: "border-box",
            }}
          >
            <MemberItem
              member={member}
              onEditClick={() => onEditClick(member)}
              onDeleteClick={() => removeMember(member.id)}
            />
          </div>
        ))}
      </div>
    </Flex>
  );
};

export default MemberList;
