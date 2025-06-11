import { Flex } from "@radix-ui/themes";
import AgentList from "./AgentList";
import Formulaire from "./Formulaire";
import { useState } from "react";

function Agent() {
  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Flex display="flex" justify="between" align="start" width="100%">
        <AgentList onAddClick={() => setFormVisible(true)} />
      </Flex>

      {isFormVisible && (
        <div
          style={{
            position: "absolute",
            top: 50,
            right: 50,
            zIndex: 10,
          }}
        >
          <Formulaire onClose={() => setFormVisible(false)} />
        </div>
      )}
    </div>
  );
}

export default Agent;
