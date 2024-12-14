"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@nimble/config/site";
import { ThemeSwitch } from "@nimble/components/theme-switch";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { ErrorHandler } from "@nimble/services/errorHandler";
import { useDispatch, useSelector } from "react-redux";
import { ownerSelector } from "@nimble/store/store";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import { setOwner } from "@nimble/store/slices/owner";

export default function Home() {
  const { signInWithGoogle } = useNimbleApi();

  const handleSignUp = async () => {
    const user = await signInWithGoogle();

    console.log(user);
  };
  return (
    <div>
      Hello
      <ThemeSwitch />
      <button onClick={handleSignUp}>Sign up with google</button>
    </div>
  );
}
