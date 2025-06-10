import { Flex } from "@radix-ui/themes";
import ChatList from "./ChatList";
import ChatPrompt from "./ChatPrompt";
import { useState } from "react";

function Chat() {

  const [messages, setMessages] = useState([
    { role: "user", content: "Bonjour ! comment çava ?", id: "1" },
    {
      role: "assistant",
      content: "Bonjour !! je vais bien.. merci.  Je suis là pour aider",
      id: "2",
    },
    { role: "user", content: "Aide moi à apprendre react", id: "3" },
  ]);

  const handleAddMessage = (message) => {
    setMessages((prev) => [...prev, message]);

  }

  return (
    <Flex direction="column" gap="4" width="100%" height="100%" p="1">
      <ChatList messages={messages}/>
      <ChatPrompt onAddMessage={handleAddMessage} />
    </Flex>
  );
}

export default Chat;
