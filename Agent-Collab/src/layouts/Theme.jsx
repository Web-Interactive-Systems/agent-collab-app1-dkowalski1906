import { Theme as RadixTheme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import "./index.css";

export default function Theme({ isLight, children }) {
  return (
    <RadixTheme
      appearance={isLight ? "light" : "dark"}
      accentColor="indigo"
      scaling="100%"
      radius="full"
    >
      {children}
    </RadixTheme>
  );
}
