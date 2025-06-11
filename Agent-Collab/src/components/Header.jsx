import { MoonIcon, SunIcon, HomeIcon } from "@radix-ui/react-icons";
import { Button, Flex } from "@radix-ui/themes";
import { Link } from "raviger";

export function Header({ isLight, switchAppearance }) {
  return (
    <Flex style={{ boxShadow: "var(--shadow-3)", height: 42, width: "100vw" }}>
      <Flex
        justify="between"
        align="center"
        gap="3"
        width="100%"
        margin="0 auto"
        px="5"
      >
        <Flex justify="center" align="center" direction="row" gap="5">
          <Button variant="ghost" size="4" asChild>
            <Link href="/">
              <HomeIcon height="22" width="22" />
            </Link>
          </Button>
        </Flex>

        <Flex justify="center" align="center" direction="row" gap="5">
          <Button onClick={switchAppearance} variant="ghost" size="4">
            {isLight ? (
              <MoonIcon height="22" width="22" />
            ) : (
              <SunIcon height="22" width="22" />
            )}
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
