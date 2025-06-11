import { atom } from "nanostores";

export const $messages = atom([
  { role: "user", content: "Bonjour ! comment çava ?", id: "1" },
  {
    role: "assistant",
    content: "Bonjour !! je vais bien.. merci.  Je suis là pour aider",
    id: "2",
  },
  { role: "user", content: "Aide moi à apprendre react", id: "3" },
]);

export const addMessage = (msg) => {
 $messages.set([...$messages.get(), msg]);
};

export const updateMessages = (msgs) => {
 $messages.set(msgs);
};