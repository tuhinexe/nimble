"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@nimble/config/site";
import { ThemeSwitch } from "@nimble/components/theme-switch";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <button onClick={() => toast.success("Hii")}>Hello Nimble</button>
      <ThemeSwitch />

      <button onClick={() => signIn("google")}>Signin with Google</button>
    </section>
  );
}
