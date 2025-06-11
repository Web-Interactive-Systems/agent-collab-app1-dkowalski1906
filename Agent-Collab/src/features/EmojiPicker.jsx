import React from "react";
import { Flex } from "@radix-ui/themes";

export function EmojiPicker({ category, selectedEmoji, onSelectEmoji }) {
  const emojisByCategory = {
    Smileys: ["😀", "😅", "😎", "😍", "🤔"],
    Animals: ["🐶", "🐱", "🐰", "🦊", "🐼"],
    Food: ["🍎", "🍔", "🍕", "🥑", "🍣"],
  };

  const emojis = emojisByCategory[category] || [];

  return (
    <Flex wrap="wrap" gap={10}>
      {emojis.map((emoji) => (
        <button
          key={emoji}
          type="button"
          onClick={() => onSelectEmoji(emoji)}
          style={{
            fontSize: 24,
            padding: 6,
            borderRadius: 8,
            border: emoji === selectedEmoji ? "2px solid #4f46e5" : "1px solid #ccc",
            backgroundColor: emoji === selectedEmoji ? "#e0e7ff" : "white",
            cursor: "pointer",
            width: 40,
            height: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          aria-label={`Select emoji ${emoji}`}
        >
          {emoji}
        </button>
      ))}
    </Flex>
  );
}
