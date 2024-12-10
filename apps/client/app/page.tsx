import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      Hello worlds
      <ThemeSwitch />
    </section>
  );
}
