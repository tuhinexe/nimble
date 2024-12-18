"use client";

import { Button, Card, Divider, Form, Input } from "@nextui-org/react";
import LoginForm from "@nimble/components/Auth/LoginForm";
import RegisterForm from "@nimble/components/Auth/RegisterForm";
import { APP_URL } from "@nimble/constants";
import useAppDispatch from "@nimble/hooks/useAppDispatch";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import { ErrorHandler } from "@nimble/services/errorHandler";
import { setOwner } from "@nimble/store/slices/owner";
import { appSelector } from "@nimble/store/store";
import clsx from "clsx";
import { sendEmailVerification } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const Login = (props: Props) => {
  const [authType, setAuthType] = useState<"login" | "signup">("signup");
  const { signInWithGoogle, createUser } = useNimbleApi();
  const dispatch = useAppDispatch();
  const { currentSubDomain } = useSelector(appSelector);
  const router = useRouter();

  useEffect(() => {
    if (!currentSubDomain || currentSubDomain !== "app") {
      router.push(`${APP_URL}/login`);
    }
  }, [currentSubDomain]);

  const handleGoogleLogin = async () => {
    try {
      const { user } = await signInWithGoogle();
      // console.log(user);
      const reqData = {
        name: user.displayName,
        email: user.email,
        method: "google",
        image: user.photoURL,
      };

      const result = await createUser(reqData).unwrap();

      if (result?.success) {
        console.log(result);
        dispatch(setOwner(result.user));
        toast.success("Login successful");
      }
      console.log(reqData);
    } catch (error) {
      console.log(error);
      // ErrorHandler.handleError(error);
    }
  };
  return (
    <section
      className={clsx(
        "flex flex-col md:flex-row md:justify-center items-center h-screen p-4"
      )}
    >
      <div className="flex md:w-[40%] items-center justify-center flex-col gap-4">
        <h1 className="text-5xl font-icon text-primary font-bold">Nimble</h1>
        <h1 className="font-head text-main text-6xl dark:text-white">
          Less Yapping
        </h1>
        <h1 className="font-head text-main text-6xl dark:text-white">
          More Making
        </h1>
        <Image
          unoptimized
          width={500}
          height={500}
          src={"/assets/login.webp"}
          alt="login_page_image"
        />
      </div>
      <hr className="w-[1px] hidden md:block h-[80%] bg-gray-400" />
      <div className="md:w-[40%] w-[95%] flex items-center justify-center pb-4">
        <Card className="w-[400px] flex flex-col items-center p-8 gap-4">
          <h1 className="text-xl">Get started for free</h1>
          <div>
            <Button
              onPress={handleGoogleLogin}
              className="border border-black dark:text-black bg-white"
            >
              <Image
                src={"/assets/google-logo.svg"}
                alt="google"
                width={30}
                height={20}
              />
              Sign in with Google
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Divider />
            Or
            <Divider />
          </div>
          {authType === "login" ? <LoginForm /> : <RegisterForm />}
          <div className="flex gap-1 items-center justify-center">
            <p className="text-sm">
              {authType === "login"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            {authType === "login" ? (
              <span
                onClick={() => setAuthType("signup")}
                className="text-sm text-primary cursor-pointer"
              >
                Register
              </span>
            ) : (
              <span
                onClick={() => setAuthType("login")}
                className="text-sm text-primary cursor-pointer"
              >
                Login
              </span>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Login;
