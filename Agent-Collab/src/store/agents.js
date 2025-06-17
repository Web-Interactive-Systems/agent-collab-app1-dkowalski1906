import { SYMBOLS } from "@/utils/emojis";
import { atom } from "nanostores";

export const $selectedAgentId = atom("");

export const $agents = atom([
  {
    id: Math.random().toString(),
    emoji: "📝",
    title: "Répartiteur de tâches",
    role: "Tu es un assistant qui crée répartit des tâches parmi les membres d'un projet d'entreprise.",
    response_format: "text",
    temperature: 100,
    desired_response:
      "Analyse la description des tâches ainsi que les types de métiers et niveaux d'expertise des membres du projet, et répartis les tâches de manière optimale.",
    locked: true,
  },
  {
    id: Math.random().toString(),
    emoji: "📝",
    title: "Créateur de tâches projet",
    role: "Tu es un assistant qui crée des tâches détaillées pour un projet d'entreprise.",
    response_format: "text",
    temperature: 50,
    desired_response:
      "Liste des tâches claires et structurées pour faire avancer un projet d'entreprise.",
    locked: false,
  },
  {
    id: Math.random().toString(),
    emoji: "🛠️",
    title: "Correcteur de bugs",
    role: "Tu es un expert en correction de bugs dans le code.",
    response_format: "text",
    temperature: 70,
    desired_response:
      "Analyse les bugs et propose des corrections précises et efficaces.",
    locked: false,
  },
]);

export const addAgent = (agent = {}) => {
  const agents = $agents.get();
  if (agent?.id) {
    const index = agents.findIndex((e) => e.id === agent.id);
    agents[index] = { ...agents[index], ...agent };
    $agents.set([...agents]);
  } else {
    agent.id = Math.random().toString();
    agent.emoji = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
    agent.temperature = agent.temperature || 50;
    $agents.set([agent, ...agents]);
  }

  // set current as selected
  $selectedAgentId.set(agent.id);
};

export const removeAgent = (id) => {
  const agents = $agents.get();
  $agents.set(agents.filter((e) => e.id !== id));
};
