"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@nimble/config/site";
import { ThemeSwitch } from "@nimble/components/theme-switch";
import toast from "react-hot-toast";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { ErrorHandler } from "@nimble/services/errorHandler";
import { useSelector } from "react-redux";
import { ownerSelector } from "@nimble/store/store";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";

export default function Home() {
  const { data: session, status } = useSession();
  const { owner } = useSelector(ownerSelector);
  const { signup, signupState } = useNimbleApi();
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "authenticated" && !owner) {
      console.log("this is session", session, owner);
      const userData = {
        email: session?.user?.email,
        name: session?.user?.name,
        image: session?.user?.image,
      };
    }
  }, [status, session, owner]);

  const handleSignup = async () => {
    try {
      if (!session) {
        await signIn("google", {
          redirect: false,
        });
        return;
      }
    } catch (error) {
      ErrorHandler.handleError(error);
    }
  };
  return (
    <section className="flex flex-col items-center justify-center gap-4 ">
      <button onClick={() => toast.success("Hii")}>Hello Nimble</button>
      <ThemeSwitch />

      <button onClick={handleSignup}>Signin with Google</button>
      <button onClick={() => signOut()}>Sign Out</button>
    </section>
  );
}
