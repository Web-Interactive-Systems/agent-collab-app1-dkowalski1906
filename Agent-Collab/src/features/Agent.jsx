import { Flex } from "@radix-ui/themes";
import AgentList from "./AgentList";
import Formulaire from "./Formulaire";
import { useState } from "react";

function Agent() {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <Flex
      position="relative"
      width="100%"
      height="100%"
      minHeight="0"
      minWidth="0"
      style={{
        overflow: "hidden",
        background: isFormVisible ? "rgba(10,10,20,0.92)" : "unset",
        transition: "background 0.2s",
      }}
    >
      <Flex
        display="flex"
        justify="between"
        align="start"
        width="100%"
        height="100%"
        minHeight="0"
        minWidth="0"
        style={{
          overflow: "hidden",
          margin: 15,
        }}
      >
        <AgentList onAddClick={() => setFormVisible(true)} />
      </Flex>
      {isFormVisible && (
        <Flex
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          style={{
            background: "rgba(10,10,20,0.92)",
            zIndex: 100,
            alignItems: "center",
            justifyContent: "center",
            minHeight: 0,
            minWidth: 0,
            overflow: "hidden",
            display: "flex",
          }}
          onClick={() => setFormVisible(false)}
        >
          <Flex
            position="relative"
            zIndex="101"
            boxShadow="0 8px 32px 0 #6366f133"
            borderRadius="20"
            minWidth="400px"
            maxWidth="480px"
            width="100%"
            background="var(--color-panel-solid)"
            maxHeight="98vh"
            height="90vh"
            overflowY="auto"
            transition="background 0.2s"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: "0 8px 32px 0 #6366f133",
              borderRadius: 20,
              minWidth: 400,
              maxWidth: 480,
              width: "100%",
              background: "var(--color-panel-solid)",
              maxHeight: "98vh",
              height: "90vh",
              overflowY: "auto",
              transition: "background 0.2s",
            }}
          >
            <Formulaire onClose={() => setFormVisible(false)} />
          </Flex>
        </Flex>
      )}
    </Flex>
  );
}

export default Agent;
