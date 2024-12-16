import { Button, Divider, Form, Input } from "@nextui-org/react";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const LoginForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <Form className=" gap-6 items-center">
        <Input
          label="Email"
          type="email"
          labelPlacement="outside"
          placeholder="Enter your email"
          required
        />
        <Input
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
