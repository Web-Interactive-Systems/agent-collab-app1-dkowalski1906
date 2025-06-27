import { atom } from "nanostores";

export const $messages = atom([]);

export const addMessage = (msg) => {
 $messages.set([...$messages.get(), msg]);
};

export const updateMessages = (msgs) => {
 $messages.set(msgs);
};