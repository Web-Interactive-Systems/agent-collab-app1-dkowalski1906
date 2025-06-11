import React, { useState } from "react";
import * as RadixSlider from "@radix-ui/react-slider";
import { Card, Flex, TextArea, Button } from "@radix-ui/themes";
import { PlusIcon } from "@radix-ui/react-icons";
import { addAgent } from "@/store/agents";

import { EmojiTabs } from "./EmojiTabs";
import { EmojiPicker } from "./EmojiPicker";

function Formulaire() {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [desiredResponse, setDesiredResponse] = useState("");
  const [temperature, setTemperature] = useState(1);
  const [emojiCategory, setEmojiCategory] = useState("Smileys");
  const [selectedEmoji, setSelectedEmoji] = useState("");

  const handleSubmit = () => {
    if (!title || !role || !desiredResponse) {
      alert("Please fill all required fields.");
      return;
    }

    const newAgent = {
      title,
      role,
      response: desiredResponse,
      temperature,
      emoji: selectedEmoji,
      id: Date.now().toString(),
    };

    addAgent(newAgent);

    // Reset form
    setTitle("");
    setRole("");
    setDesiredResponse("");
    setTemperature(1);
    setSelectedEmoji("");
    setEmojiCategory("Smileys");
  };

  return (
    <Card style={{ padding: 20, margin: "auto" }}>
      <Flex direction="column" gap={20}>
        {/* Title */}
        <Flex direction="column" gap={5}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            style={{
              padding: 8,
              borderRadius: 8,
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </Flex>

        {/* Role */}
        <Flex direction="column" gap={5}>
          <label>Role</label>
          <TextArea
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter role"
            style={{ width: "100%" }}
          />
        </Flex>

        {/* Desired Response */}
        <Flex direction="column" gap={5}>
          <label>Desired Response</label>
          <TextArea
            value={desiredResponse}
            onChange={(e) => setDesiredResponse(e.target.value)}
            placeholder="Enter desired response"
            style={{ width: "100%" }}
          />
        </Flex>

        {/* Temperature */}
        <Flex direction="column" gap={5}>
          <label>Temperature ({temperature.toFixed(1)})</label>
          <RadixSlider.Root
            min={0}
            max={100}
            step={0.1}
            value={[temperature]}
            onValueChange={(val) => setTemperature(val[0])}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "100%",
              height: 20,
            }}
          >
            <RadixSlider.Track
              style={{
                backgroundColor: "#ccc",
                position: "relative",
                flexGrow: 1,
                borderRadius: 9999,
                height: 4,
              }}
            >
              <RadixSlider.Range
                style={{
                  position: "absolute",
                  backgroundColor: "#4f46e5",
                  height: "100%",
                  borderRadius: "9999px",
                }}
              />
            </RadixSlider.Track>
            <RadixSlider.Thumb
              style={{
                display: "block",
                width: 16,
                height: 16,
                backgroundColor: "#4f46e5",
                borderRadius: "50%",
              }}
            />
          </RadixSlider.Root>
        </Flex>

        {/* Emoji picker */}
        <Flex direction="column" gap={5}>
          <label>Emoji</label>
          <EmojiTabs
            selectedCategory={emojiCategory}
            onSelectCategory={setEmojiCategory}
          />
          <EmojiPicker
            category={emojiCategory}
            selectedEmoji={selectedEmoji}
            onSelectEmoji={setSelectedEmoji}
          />
          {selectedEmoji && (
            <TextArea
              readOnly
              value={`Selected emoji: ${selectedEmoji}`}
              style={{ marginTop: 10, width: "100%", height: 40, fontSize: 24, textAlign: "center" }}
            />
          )}
        </Flex>

        {/* Submit button */}
        <Button onClick={handleSubmit} style={{ marginTop: 10 }}>
          <PlusIcon />
          Ajouter agent
        </Button>
      </Flex>
    </Card>
  );
}

export default Formulaire;
