//import { Markdown } from "@/components/Markdown";
import { FaceIcon, PersonIcon } from "@radix-ui/react-icons";
import { Box, Flex } from "@radix-ui/themes";
import { styled } from "@stitches/react";

export const ListContainer = styled(Box, {
  background: "Indigo",
  color: "white",
  borderRadius: 10,
  width: "70%",
  height: "auto",
  padding: "10px",
  margin: "10px",
  textShadow: "none",
});

function ChatList({ messages }) {
  return (
    <Flex direction="column" gap="2">
      {messages.map((message) => (
        <Flex
          key={message.id}
          justify={message.role === "user" ? "end" : "start"}
        >
          <ListContainer>
            <Flex align="center" gap="2">
              {message.role === "user" ? <PersonIcon height="22px" width="22px" /> : <FaceIcon height="35px" width="35px" />}
              <Box>{message.content}</Box>
            </Flex>
          </ListContainer>
        </Flex>
      ))}
    </Flex>
  );
}

export default ChatList;
