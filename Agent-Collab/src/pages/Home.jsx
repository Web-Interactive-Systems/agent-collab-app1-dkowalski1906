import { Resizable } from "@/components/Resizable";
import Chat from "@/features/Chat";
import { Flex } from "@radix-ui/themes";

function Home() {
  return (
    <Flex gap="8" width="100%" height="100%">
      <h1>Agent view ici</h1>

      <Resizable
        class="resizable"
        style={{
          background: "var(--focus-a3)",
          borderLeft: "1px solid var(--gray-9)",
          marginLeft: "auto",
          width: 800
        }}
        enable={{
          top: false,
          right: false,
          bottom: false,
          left: true,
          topRight: false,
          bottomRight: false,
          bottomLeft: false,
          topLeft: false,
        }}
      >
        <Chat />
      </Resizable>
    </Flex>
  );
}

export default Home;
