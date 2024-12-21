import { Button, Divider, Form, Input } from "@nextui-org/react";
import { auth } from "@nimble/firebase/config";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  User,
} from "firebase/auth";
import { Eye, EyeClosed } from "lucide-react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const RegisterForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { email, password } = Object.fromEntries(
        new FormData(e.currentTarget)
      );
      console.log(email, password);

      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      if (password.length < 6) {
        return toast.error("Password must be at least 6 characters long");
      }

      const { user } = await createUserWithEmailAndPassword(
        auth,
        email as string,
        password as string
      );
      if (user) {
        await sendEmailVerification(user);
        toast.success("Email verification sent. Verify and login");

        formRef.current?.reset();
      }

      console.log(user);
    } catch (error: any) {
      console.log(error?.code);
      if (error?.code === "auth/email-already-in-use") {
        return toast.error("Account already exists with this email");
      } else {
        toast.error("An error occurred");
      }
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <Form ref={formRef} onSubmit={handleSignup} className="gap-6">
        <Input
          isRequired
          errorMessage="Please enter a valid email"
          label="Email"
          type="email"
          name="email"
          labelPlacement="outside"
          placeholder="Enter your email"
        />
        <Input
          isRequired
          name="password"
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
          placeholder="Enter a strong password"
          required
          type={showPassword ? "text" : "password"}
        />
        <Button type="submit" className="w-full text-white bg-primary">
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
