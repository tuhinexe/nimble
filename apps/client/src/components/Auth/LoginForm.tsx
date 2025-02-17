"use client";

import { Button, Divider, Form, Input } from "@heroui/react";
import { APP_URL } from "@nimble/constants";
import { loginWithPassword } from "@nimble/firebase/auth";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import { PressEvent } from "@react-types/shared";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const LoginForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser } = useNimbleApi();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { email, password } = Object.fromEntries(
        new FormData(e.currentTarget)
      );

      if (!email || !password) {
        return toast.error("Please fill in all fields");
      }

      if (!email.toString().includes("@")) {
        return toast.error("Invalid email");
      }
      const { user } = await loginWithPassword(
        email as string,
        password as string
      );
      // console.log(user);

      if (user.emailVerified) {
        const result = await createUser({
          name: user.displayName ?? user.email?.split("@")[0],
          email: user.email,
          method: "google",
          image: user.photoURL ?? "",
        }).unwrap();

        console.log(result);

        if (result?.success) {
          toast.success("Login successful");
          router.push(`${APP_URL}/app`);
        }
      } else {
        return toast.error("Email not verified. Please verify your email");
      }
    } catch (error: any) {
      console.log(error);
      if (error?.code === "auth/user-not-found") {
        return toast.error("Account not found");
      }

      if (error?.code === "auth/invalid-credential") {
        return toast.error("Invalid credentials");
      }
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Form onSubmit={handleLogin} className=" gap-6 items-center">
        <Input
          isRequired
          label="Email"
          name="email"
          type="email"
          labelPlacement="outside"
          placeholder="Enter your email"
          required
        />
        <Input
          name="password"
          isRequired
          endContent={
            <div
              className="cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </div>
          }
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          required
          type={showPassword ? "text" : "password"}
        />
        <Button type="submit" className="w-full text-white bg-primary">
          Login
        </Button>

        <p className=" cursor-pointer text-xs text-primary">
          Forgot password?{" "}
        </p>
      </Form>
    </div>
  );
};

export default LoginForm;
