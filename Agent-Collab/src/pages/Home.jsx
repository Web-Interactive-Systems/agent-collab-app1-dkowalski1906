import { Resizable } from "@/components/Resizable";
import Chat from "@/features/Chat/Chat";
import { Flex } from "@radix-ui/themes";
import Agent from "@/features/Agent/Agent";

function Home() {
  return (
    <Flex
      gap="0"
      width="100vw"
      height="calc(100vh - 42px)"
      style={{
        width: "100vw",
        height: "calc(100vh - 42px)",
        minWidth: "100vw",
        minHeight: "calc(100vh - 42px)",
        maxWidth: "100vw",
        maxHeight: "calc(100vh - 42px)",
        overflow: "hidden",
      }}
    >
      <Flex
        width="70%"
        height="100%"
        style={{
          minWidth: 0,
          minHeight: 0,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Agent />
      </Flex>
      <Flex
        width="30%"
        height="100%"
        style={{
          borderLeft: "2px solid var(--gray-9)",
          background: "var(--focus-a3)",
          minWidth: 0,
          minHeight: 0,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Chat />
      </Flex>
    </Flex>
  );
}

export default Home;
