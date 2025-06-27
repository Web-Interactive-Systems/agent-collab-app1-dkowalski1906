import React, { useState } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import {
  Card,
  Flex,
  TextArea,
  Button,
  Text,
  Box,
  Separator,
  Dialog,
} from "@radix-ui/themes";
import {
  PlusIcon,
  Cross2Icon,
  FaceIcon,
  Pencil2Icon,
} from "@radix-ui/react-icons";
import { addAgent, updateCurrentAgent } from "@/store/store";
import { EmojiTabs } from "./EmojiTabs";
import { EmojiPicker } from "./EmojiPicker";
import {
  EXPRESSIONES,
  GESTURES,
  SYMBOLS,
  FOOD,
  ACTIVITIES,
  PLACES,
  NATURE,
} from "../../utils/emojis.js";

function Formulaire({ onClose, agent, isEdit }) {
  const [title, setTitle] = useState(agent?.title || "");
  const [role, setRole] = useState(agent?.role || "");
  const [desiredResponse, setDesiredResponse] = useState(agent?.response || "");
  const [temperature, setTemperature] = useState(agent?.temperature ?? 50);
  const [selectedEmoji, setSelectedEmoji] = useState(agent?.emoji || "");
  const [showEmojiPopup, setShowEmojiPopup] = useState(false);

  // Liste des catégories synchronisée avec le fichier emojis.js
  const emojiCategories = [
    { key: "EXPRESSIONES", label: "Smileys", data: EXPRESSIONES },
    { key: "GESTURES", label: "Gestes", data: GESTURES },
    { key: "SYMBOLS", label: "Symboles", data: SYMBOLS },
    { key: "FOOD", label: "Nourriture", data: FOOD },
    { key: "ACTIVITIES", label: "Activités", data: ACTIVITIES },
    { key: "PLACES", label: "Lieux", data: PLACES },
    { key: "NATURE", label: "Nature", data: NATURE },
  ];
  const [emojiCategory, setEmojiCategory] = useState(emojiCategories[0].label);

  const handleSubmit = () => {
    if (!title || !role || !desiredResponse) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const newAgent = {
      title,
      role,
      response: desiredResponse,
      temperature,
      emoji: selectedEmoji,
      id: agent?.id || null,
    };

    if (isEdit) {
      updateCurrentAgent(newAgent);
    } else {
      addAgent(newAgent);
    }

    setTitle("");
    setRole("");
    setDesiredResponse("");
    setTemperature(1);
    setSelectedEmoji("");
    setEmojiCategory("Smileys");

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
      <Flex direction="column" gap="4" justify="between" height="95%">
        <Flex direction="row" gap="3" align="center">
          <Flex direction="column" gap="1" flex={1}>
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
          <Flex direction="column" gap="1" flex={1}>
            <Text as="label" weight="bold">
              Rôle
            </Text>
            <TextArea
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Décrivez le rôle de l'agent"
              size="3"
              radius="full"
            />
          </Flex>
        </Flex>
        <Flex direction="column" gap="1">
          <Text as="label" weight="bold">
            Réponse attendue
          </Text>
          <TextArea
            value={desiredResponse}
            onChange={(e) => setDesiredResponse(e.target.value)}
            placeholder="Décrivez la réponse attendue"
            size="3"
          />
        </Flex>
        <Flex direction="column" gap="1">
          <Text as="label" weight="bold">
            Température ({temperature})
          </Text>
          {/* Correction : Utilise un Box AVEC un minHeight et sans overflow caché, et retire tous les styles sur RadixSlider.Root */}
          <Box width="100%" minHeight="40px">
            <RadixSlider.Root
              min={0}
              max={100}
              step={1}
              value={[temperature]}
              onValueChange={(val) => setTemperature(val[0])}
              style={{
                width: "100%",
                height: 32,
                display: "flex",
                alignItems: "center",
                // AUCUN overflow, zIndex, position, etc.
              }}
            >
              <RadixSlider.Track
                style={{
                  flexGrow: 1,
                  borderRadius: 9999,
                  height: 6,
                  background: "#bdbdbd",
                  position: "relative",
                }}
              >
                <RadixSlider.Range
                  style={{
                    background: "#6366f1",
                    height: "100%",
                    borderRadius: "9999px",
                    position: "absolute",
                  }}
                />
              </RadixSlider.Track>
              <RadixSlider.Thumb
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#6366f1",
                  border: "2px solid #fff",
                  boxShadow: "0 2px 8px #6366f155",
                  display: "block",
                }}
              />
            </RadixSlider.Root>
          </Box>
        </Flex>
        <Flex direction="column" gap="1">
          <Text as="label" weight="bold">
            Emoji
          </Text>
          <Flex align="center" gap="2">
            <Button
              type="button"
              variant="soft"
              color="indigo"
              onClick={() => setShowEmojiPopup(true)}
              title="Choisir un emoji"
            >
              <FaceIcon />
              Choisir un emoji
            </Button>
            {selectedEmoji && (
              <Text as="span" size="6" ml="2">
                {selectedEmoji}
              </Text>
            )}
          </Flex>
          <Dialog.Root open={showEmojiPopup} onOpenChange={setShowEmojiPopup}>
            <Dialog.Content
              maxWidth="350px"
              style={{
                height: 480,
                minHeight: 480,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Flex
                direction="column"
                align="center"
                gap="2"
                style={{ height: "100%", width: "100%" }}
              >
                <Flex
                  direction="row"
                  align="center"
                  justify="between"
                  width="100%"
                  mb="3"
                >
                  <Text as="span" size="5" weight="bold">
                    Choisir un emoji
                  </Text>
                  <Button
                    variant="ghost"
                    size="1"
                    color="indigo"
                    onClick={() => setShowEmojiPopup(false)}
                    aria-label="Fermer"
                    ml="auto"
                  >
                    <Cross2Icon width="22px" height="22px" />
                  </Button>
                </Flex>
                <EmojiTabs
                  selectedCategory={emojiCategory}
                  onSelectCategory={setEmojiCategory}
                />
                {/* Liste des emojis scrollable */}
                <div
                  style={{
                    flex: 1,
                    width: "100%",
                    overflowY: "auto",
                    marginBottom: 16,
                  }}
                >
                  <EmojiPicker
                    category={
                      emojiCategories.find((c) => c.label === emojiCategory)
                        ?.data || []
                    }
                    selectedEmoji={selectedEmoji}
                    onSelectEmoji={setSelectedEmoji}
                  />
                </div>
                <Button
                  mt="4"
                  color="indigo"
                  size="3"
                  style={{ alignSelf: "stretch" }}
                  onClick={() => setShowEmojiPopup(false)}
                  disabled={!selectedEmoji}
                >
                  <PlusIcon />
                  Ajouter l'emoji
                </Button>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </Flex>
        <Separator my="2" />
        <Button onClick={handleSubmit} mt="2" color="indigo" size="3">
          {isEdit ? (
            <Pencil2Icon height="22px" width="22px" />
          ) : (
            <PlusIcon height="22px" width="22px" />
          )}
          {isEdit ? "Modifier l'agent" : "Ajouter l'agent"}
        </Button>
      </Flex>
    </Card>
  );
}

export default Formulaire;
