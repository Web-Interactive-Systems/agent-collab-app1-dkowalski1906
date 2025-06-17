import React from "react";
import { Flex, Button } from "@radix-ui/themes";
import {
  EXPRESSIONES,
  GESTURES,
  SYMBOLS,
  FOOD,
  ACTIVITIES,
  PLACES,
  NATURE,
} from "../../utils/emojis.js";

export function EmojiTabs({ selectedCategory, onSelectCategory }) {
  // Liste synchronisée avec les catégories du fichier emojis.js
  const categories = [
    { key: "EXPRESSIONES", label: "Smileys" },
    { key: "GESTURES", label: "Gestes" },
    { key: "SYMBOLS", label: "Symboles" },
    { key: "FOOD", label: "Nourriture" },
    { key: "ACTIVITIES", label: "Activités" },
    { key: "PLACES", label: "Lieux" },
    { key: "NATURE", label: "Nature" },
  ];

  return (
    <Flex gap="2" mb="2" wrap="wrap">
      {categories.map((cat) => (
        <Button
          key={cat.key}
          variant={cat.label === selectedCategory ? "solid" : "outline"}
          color={cat.label === selectedCategory ? "indigo" : "gray"}
          onClick={() => onSelectCategory(cat.label)}
          size="1"
        >
          {cat.label}
        </Button>
      ))}
    </Flex>
  );
}
