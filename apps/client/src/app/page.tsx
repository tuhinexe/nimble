"use client";

import { Link } from "@heroui/react";

import { siteConfig } from "@nimble/config/site";

import toast from "react-hot-toast";
import { useEffect } from "react";
import { ErrorHandler } from "@nimble/services/errorHandler";
import { useDispatch, useSelector } from "react-redux";
import { appSelector, ownerSelector } from "@nimble/store/store";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import { setOwner } from "@nimble/store/slices/owner";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAppDispatch from "@nimble/hooks/useAppDispatch";
import { setSubDomain } from "@nimble/store/slices/appSlice";

export default function Home() {
  const { signInWithGoogle } = useNimbleApi();
  const { currentSubDomain } = useSelector(appSelector);
  const router = useRouter();

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const url = new URL(window.location.href);
  //     console.log(url.hostname.split(".")[0]);
  //     dispatch(setSubDomain(url.hostname.split(".")[0]));
  //   }

  //   if (currentSubDomain === "app") {
  //     router.push("/app");
  //   }
  // }, [currentSubDomain]);
  // const handleSignUp = async () => {
  //   const user = await signInWithGoogle();

  //   console.log(user);
  // };

  return (
    <div>
      Hello
      {/* <ThemeSwitch /> */}
      <h1 className="text-5xl font-icon font-bold text-primary">Nimble</h1>
      {/* <button onClick={handleSignUp}>Sign up with google</button> */}
    </div>
  );
}
