import { Header } from "@/components/Header";
import { Box, Flex } from "@radix-ui/themes";
import Theme from "./Theme";
import { useState } from "react";

export default function LayoutTheme({ children }) {

  const [isLight, setIsLight] = useState(true);

    const switchAppearance = () => {
        setIsLight(!isLight);
    }

  return (
    <Theme isLight={isLight}>
      <Flex direction="column" style={{ minHeight: "100vh" }}>
        <Box>
          <Header isLight={isLight} switchAppearance={switchAppearance} />
        </Box>
        <Box width="100%" style={{ height: "calc(100vh - 42px)" }} flex="1">
          {children}
        </Box>
        {/* <Box
          mt='auto'>
          <Footer />
        </Box> */}
      </Flex>
    </Theme>
  );
}