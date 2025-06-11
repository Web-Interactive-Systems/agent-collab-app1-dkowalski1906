import React from "react";
import { Flex } from "@radix-ui/themes";

export function EmojiTabs({ selectedCategory, onSelectCategory }) {
  const categories = ["Smileys", "Animals", "Food"];

  return (
    <Flex gap={10} style={{ marginBottom: 10 }}>
      {categories.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onSelectCategory(cat)}
          style={{
            padding: "6px 12px",
            borderRadius: 6,
            border: "1px solid",
            borderColor: cat === selectedCategory ? "#4f46e5" : "#ccc",
            backgroundColor: cat === selectedCategory ? "#e0e7ff" : "white",
            cursor: "pointer",
          }}
        >
          {cat}
        </button>
      ))}
    </Flex>
  );
}
