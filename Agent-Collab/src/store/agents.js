import { atom } from "nanostores";
import React from "react";

export const $agents = atom([
  {
    id: "1",
    title: "Scifi Writer",
    role: "Écrit des histoires SF.",
    response: "Je peux t'aider à écrire de la science-fiction.",
    emoji: "🤖",
    temperature: 0.7,
  },
  {
    id: "2",
    title: "Code Assistant",
    role: "Aide à coder.",
    response: "Je t'aide à corriger ou écrire du code.",
    emoji: "💻",
    temperature: 0.3,
  },
  {
    id: "3",
    title: "Travel Planner",
    role: "Planifie des voyages.",
    response: "Je propose des destinations et itinéraires.",
    emoji: "🌍",
    temperature: 0.5,
  },
]);

export const addAgent = (agent) => {
  const newAgent = {
    id: agent.id || Date.now().toString(),
    title: agent.title || "",
    role: agent.role || "",
    response: agent.response || "",
    emoji: agent.emoji || "",
    temperature: agent.temperature || 0.7,
  };
  $agents.set([...$agents.get(), newAgent]);
};

export const deleteAgent = (id) => {
  $agents.set($agents.get().filter((agent) => agent.id !== id));
};

// Ajoute ou met à jour un agent selon l'id
export const updateAgent = (agent) => {
  $agents.set(
    $agents.get().map((a) => (a.id === agent.id ? { ...a, ...agent } : a))
  );
};
