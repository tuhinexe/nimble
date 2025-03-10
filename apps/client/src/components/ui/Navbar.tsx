"use client";
import { Avatar } from "@heroui/react";
import { ownerSelector } from "@nimble/store/store";
import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const Navbar = (props: Props) => {
  const { owner } = useSelector(ownerSelector);
  return (
    <nav className="p-2 shadow-lg w-full">
      <Avatar
        name={owner?.name}
        src={owner?.imageUrl}
        alt="logo"
        size="md"
        className="rounded-full ml-auto"
      />
    </nav>
  );
};

export default Navbar;
