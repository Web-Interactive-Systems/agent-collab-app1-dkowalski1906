import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Button, Flex, TextArea } from "@radix-ui/themes";
import { styled } from "@/lib/stitches";
import { useRef, useState } from "react";

const PromptContainer = styled(Flex, {
  background: "var(--accent-2)",
  borderRadius: 100,
  border: "2px solid",
  width: "30vw",
  height: "auto",
  textShadow: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0",
  margin: "0",
});

const PromptArea = styled(TextArea, {
  width: "100%",
  height: "auto",
  minHeight: "unset",
  padding: "0",
  margin: "auto",
  boxSizing: "border-box",
  textAlign: "center",
  boxShadow: "none",
  outline: "none",
  background: "none",
  "& textarea": {
    lineHeight: "1",
    fontSize: "1rem",
    fontWeight: 450,
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});


function ChatPrompt({ onAddMessage }) {
  const [isPromptEmpty, setIsPromptEmpty] = useState(true);
  const promptRef = useRef(null);

  const onTextChange = (e) => {
    promptRef.current = e.target.value;
    setIsPromptEmpty(promptRef.current.trim().length === 0);
  };

  const onSendPrompt = async () => {
    onAddMessage({
      content: promptRef.current,
      role: "user",
      id: Math.random().toString(),
    });
  };

  return (
    <Flex direction="column" mt="auto" width="100%" gap="2">
      <PromptContainer>
        <PromptArea
          placeholder="Comment puis-je aider..."
          onChange={onTextChange}
        />
      </PromptContainer>
      <Flex justify="start" width="100%">
        <Button disabled={isPromptEmpty} onClick={onSendPrompt}>
          <PaperPlaneIcon />
        </Button>
      </Flex>
    </Flex>
  );
}

export default ChatPrompt;
