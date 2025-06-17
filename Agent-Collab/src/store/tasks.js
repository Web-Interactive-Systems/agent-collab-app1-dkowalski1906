import { atom } from "nanostores";

export const $tasks = atom([
  {
    id: "1",
    title: "Tâche 1",
    description: "Description de la tâche 1",
  },
  {
    id: "2",
    title: "Tâche 2",
    description: "Description de la tâche 2",
  },
  {
    id: "3",
    title: "Tâche 3",
    description: "Description de la tâche 3",
  },
]);

export const addTask = (task = {}) => {
  const tasks = $tasks.get();
  task.id = Math.random().toString();
  $tasks.set([task, ...tasks]);
};

export const removeTask = (id) => {
  const tasks = $tasks.get();
  $tasks.set(tasks.filter((t) => t.id !== id));
};

export const updateTask = (task = {}) => {
  const tasks = $tasks.get();
  const idx = tasks.findIndex((t) => t.id === task.id);
  if (idx !== -1) {
    tasks[idx] = { ...tasks[idx], ...task };
    $tasks.set([...tasks]);
  }
};
