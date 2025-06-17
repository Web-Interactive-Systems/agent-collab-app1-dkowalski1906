import React from "react";
import { Flex, Button } from "@radix-ui/themes";

export function EmojiPicker({ category, selectedEmoji, onSelectEmoji }) {
  // category est maintenant un tableau d'emojis
  const emojis = Array.isArray(category) ? category : [];

  return (
    <Flex wrap="wrap" gap="2">
      {emojis.map((emoji) => (
        <Button
          key={emoji}
          variant={emoji === selectedEmoji ? "solid" : "outline"}
          color={emoji === selectedEmoji ? "indigo" : "gray"}
          onClick={() => onSelectEmoji(emoji)}
          aria-label={`Select emoji ${emoji}`}
          style={{ fontSize: 24, width: 40, height: 40, padding: 0 }}
        >
          {emoji}
        </Button>
      ))}
    </Flex>
  );
}
