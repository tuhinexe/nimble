import { Button, Divider, Form, Input } from "@nextui-org/react";
import React from "react";

type Props = {};

const RegisterForm = (props: Props) => {
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
          label="Password"
          labelPlacement="outside"
          placeholder="Enter a strong password"
          required
          type="password"
        />
        <Button type="submit" className="w-full text-white bg-primary">
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default RegisterForm;
