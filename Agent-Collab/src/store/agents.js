import { atom } from "nanostores";

export const $agents = atom([
  { title: "Damien", role: "Bot", response: "Hello!", emoji: "🤖" },
  { title: "Théo", role: "test", response: "Test response", emoji: "🧪" },
]);

export const addAgent = (agent) => {
  // s'assurer que l'agent a bien toutes les propriétés requises
  const newAgent = {
    title: agent.title || "",
    role: agent.role || "",
    response: agent.response || "",
    emoji: agent.emoji || "",
  };
  $agents.set([...$agents.get(), newAgent]);
};
