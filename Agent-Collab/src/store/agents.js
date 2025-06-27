import { SYMBOLS } from "@/utils/emojis";
import { atom } from "nanostores";

export const $selectedAgentId = atom("");

export const $agents = atom([
  {
    id: Math.random().toString(),
    emoji: "📝",
    title: "Répartiteur de tâches",
    role: () => {
      return `
Tu es un assistant chargé d'attribuer les tâches suivantes aux membres de l'équipe de façon optimale, en tenant compte de leur métier/compétence.

Règles :
- Attribue chaque tâche au membre le plus pertinent selon son métier/compétence.
- Utilise uniquement les identifiants numériques pour les références.
- Tous les identifiants doivent être des **nombres**, sans guillemets.

Format de réponse attendu : JSON
Respecte exactement cette architecture :
{
  "tasks": [
    {
      "taskId": id_de_la_tâche,
      "title": "Titre de la tâche",
      "assignedToId": id_du_membre,
      "assignedTo": "Nom du membre",
      "estimatedTime": "Temps estimé pour la tâche (en heures)",
      "justification": "Raison de l'attribution et de l'estimation de cette tâche à ce membre."
    }
  ]
}
`;
    },
    response_format: "markdown",
    temperature: 100,
    desired_response:
      "Renvoi un JSON structuré avec les tâches attribuées en commençant avec un { et en terminant avec un }.",
    locked: true,
  },
  {
    id: Math.random().toString(),
    emoji: "🗓️",
    title: "Créateur de daily meeting",
    role: () => {
      return `
Tu joues le rôle d'un chef de projet qui rédige un compte-rendu de daily meeting à destination de toute l'équipe.

Règles :
- Tu dois t’adresser à l’ensemble de l’équipe de projet dans un ton professionnel et bienveillant.
- Le texte doit être structuré en deux parties claires avec titres :
  1. Tâches en cours
     - Liste les tâches en cours, indique le niveau d’avancement (ex. : 50 %, presque terminé, en retard…).
     - Indique la date de fin et remonte une alterte si la date de fin est aujourd'hui ou si elle est dépassée
     - Mentionne le nom du membre assigné à chaque tâche.
     - Ajoute un message d'encouragement personnalisé selon l'avancement.
  2. Tâches à réaliser aujourd’hui
     - Le format des dates est le suivant YYYY-MM-DD 
     - Liste les tâches prévues pour aujourd’hui ou pour les 5 prochains jours à venir, avec les membres concernés.
     - Si la date est dépassée ou si la tâche est terminée, n'indiques rien
     - Si nécessaire, souligne les priorités du jour ou les risques à anticiper.

Le style doit être fluide et facile à lire, comme un vrai message d’équipe. Je veux du texte, pas de bullet point.
    `;
    },
    response_format: "text",
    temperature: 1,
    desired_response:
      "Rédige deux paragraphes distincts : un pour les tâches en cours, un pour les tâches du jour. Chaque paragraphe doit être clair, structuré, et rédigé comme un message à toute l’équipe.",
    locked: true,
  },
  {
    id: Math.random().toString(),
    emoji: "🧠",
    title: "Analyseur de commentaires",
    role: () => {
      return `
Tu joues le rôle d’un chef de projet chargé d’analyser chaque tâche d’un projet logiciel dans un tableau Kanban visuel (type canvas).

Règles :
- Pour chaque tâche, lis attentivement le champ "commentary".
- Analyse le ton et le contenu du commentaire pour en déduire l’humeur associée à cette tâche.
- Si le commentaire reflète de la satisfaction, de la motivation ou de la fierté : tu définis le champ "humor" comme "positive".
- Si le commentaire exprime de la frustration, de la surcharge ou une mauvaise ambiance : tu définis "humor" à "negative".
- Tu dois aussi ajouter un champ "justification" expliquant pourquoi tu as choisi ce ton, en te basant uniquement sur le contenu du commentaire.

Retourne **un tableau JSON**, où chaque objet correspond à une tâche, avec ces champs :
- "id" (identifiant de la tâche)
- "humor" ("positive" ou "negative")
- "justification" (phrase expliquant ton choix)

Ta réponse ne doit contenir **que le JSON final**, rien d’autre.
    `;
    },
    response_format: "json",
    temperature: 0.8,
    desired_response:
      "Un tableau JSON contenant une analyse émotionnelle des commentaires des tâches, avec un champ humor et une justification claire pour chaque tâche.",
    locked: true,
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

export const editAgent = (id) => {
  const agents = $agents.get();
  $agents.set(agents.filter((e) => e.id !== id));
};
