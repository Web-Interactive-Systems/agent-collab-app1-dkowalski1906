import { atom } from "nanostores";

export const $members = atom([
  {
    id: 1,
    name: "Damien Kowalski",
    job: "Développeur",
    level: "Expert",
  },
  {
    id: 2,
    name: "Tiphaine Marais",
    job: "Fonctionnel",
    level: "Avancé",
  },
  {
    id: 3,
    name: "Nicolas Salaun",
    job: "Lead Technique",
    level: "Expert",
  },
]);

export const addMember = (member = {}) => {
  const members = $members.get();
  member.id = Math.random().toString();
  $members.set([member, ...members]);
};

export const removeMember = (id) => {
  const members = $members.get();
  $members.set(members.filter((m) => m.id !== id));
};

export const updateMember = (member = {}) => {
  const members = $members.get();
  const idx = members.findIndex((m) => m.id === member.id);
  if (idx !== -1) {
    members[idx] = { ...members[idx], ...member };
    $members.set([...members]);
  }
};