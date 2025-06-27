//import { Markdown } from "@/components/Markdown";
import { FaceIcon, PersonIcon } from "@radix-ui/react-icons";
import { Flex, Card, Text, Code } from "@radix-ui/themes";
import { styled } from "@stitches/react";
import { useStore } from "@nanostores/react";
import { $messages } from "@/store/store";
import { Markdown } from "@/components/Markdown";

const ListContainer = styled(Card, {
  background: "Indigo",
  color: "white",
  borderRadius: 10,
  width: "70%",
  height: "auto",
  padding: "10px",
  margin: "10px",
  textShadow: "none",
});

function ChatList() {
  const messages = useStore($messages);

  return (
    <Flex direction="column" gap="2" style={{ overflowY: "auto" }}>
      {messages.map((message) => (
        <Flex
          key={message.id}
          justify={message.role === "user" ? "end" : "start"}
        >
          <Card
            variant="classic"
            radius="large"
            width="auto"
            style={{
              width: "100%",
              padding: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              border: "2px solid var(--gray-9)",
            }}
          >
            <Flex align="center" gap="2" mb="2">
              {message.role === "user" ? (
                <PersonIcon height="22px" width="22px" />
              ) : (
                <FaceIcon height="22px" width="22px" />
              )}
              <Text size="4" weight="bold">
                {message.role === "user" ? "Vous" : "IA"}
              </Text>
            </Flex>
            <Flex>
              {/* <Code size="3" weight="medium" style={{ width: "100%", background: "var(--gray-2)" }}>
                <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", width: "100%", background: "var(--gray-2)" }}>
                  {message.content}
                </pre>
              </Code> */}

              <Markdown content={message.content} />
            </Flex>
          </Card>
        </Flex>
      ))}
    </Flex>
  );
}

export default ChatList;
