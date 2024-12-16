import { Button, Divider, Form, Input } from "@nextui-org/react";
import { Eye, EyeClosed } from "lucide-react";
import React, { useState } from "react";

type Props = {};

const RegisterForm = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <Form className="gap-6">
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
