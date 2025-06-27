import React, { useState, useEffect } from "react";
import {
  Card,
  Flex,
  TextArea,
  Button,
  Text,
  Separator,
} from "@radix-ui/themes";
import { PlusIcon, Cross2Icon, Pencil2Icon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import { addMember, updateMember } from "@/store/member";

function MemberForm({ onClose, member, isEdit }) {
  const [name, setName] = useState(member?.name || "");
  const [job, setJob] = useState(member?.job || "");
  const [level, setLevel] = useState(member?.level || "");

  const levels = ["Débutant", "Intermédiaire", "Avancé", "Expert"];

  useEffect(() => {
    if (member) {
      setName(member.name);
      setJob(member.job);
      setLevel(member.level);
    } else {
      setName("");
      setJob("");
      setLevel("");
    }
  }, [member]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !job || !level) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newMember = {
      name,
      job,
      level,
      id: member?.id || null,
    };

    if (isEdit) {
      updateMember(newMember);
    } else {
      addMember(newMember);
    }

    setName("");
    setJob("");
    setLevel("");

    if (onClose) onClose();
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

      <form onSubmit={handleSubmit} style={{ height: "95%" }}>
        <Flex
          direction="column"
          gap="4"
          justify="between"
          align="center"
          style={{ height: "100%" }}
        >
          <Flex direction={"column"} gap="3">
            <Flex direction="row" gap="3" align="center">
              <Flex direction="column" gap="1" flex={1}>
                <Text as="label" weight="bold">
                  Nom
                </Text>
                <TextArea
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Entrez le prénom et nom"
                  size="3"
                  radius="full"
                />
              </Flex>

              <Flex direction="column" gap="1" flex={1}>
                <Text as="label" weight="bold">
                  Métier
                </Text>
                <TextArea
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  placeholder="Décrivez le métier"
                  size="3"
                  radius="full"
                />
              </Flex>
            </Flex>

            <Flex direction="column" gap="1" flex={1}>
              <Text as="label" weight="bold">
                Niveau
              </Text>
              <Select.Root value={level} onValueChange={setLevel}>
                <Select.Trigger
                  style={{
                    width: "100%",
                    height: 40,
                    borderRadius: 8,
                    border: "1px solid var(--gray-7)",
                    padding: "0 12px",
                    background: "var(--color-panel-solid)",
                    fontSize: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    outline: "none",
                  }}
                >
                  <Select.Value placeholder="Choisir un niveau..." />
                  <Select.Icon
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path
                        d="M7 8l3 3 3-3"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content
                    position="popper"
                    sideOffset={4}
                    style={{
                      background: "var(--color-panel-solid)",
                      borderRadius: 8,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      minWidth: "180px",
                      zIndex: 1000,
                    }}
                  >
                    <Select.Viewport
                      style={{
                        borderRadius: 8,
                        border: "1px solid var(--gray-7)",
                        outline: "none",
                        background: "var(--color-panel-solid)",

                        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                      }}
                    >
                      {levels.map((lvl) => (
                        <Select.Item
                          key={lvl}
                          value={lvl}
                          style={{
                            padding: "10px 16px",
                            fontSize: 16,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Select.ItemText>{lvl}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </Flex>
          </Flex>

          <Button
            type="submit"
            mt="2"
            color="indigo"
            size="3"
            style={{ width: "100%" }}
          >
            {isEdit ? (
              <Pencil2Icon height="22px" width="22px" />
            ) : (
              <PlusIcon height="22px" width="22px" />
            )}
            {isEdit ? "Modifier le membre" : "Ajouter le membre"}
          </Button>
        </Flex>
      </form>
    </Card>
  );
}

export default MemberForm;
