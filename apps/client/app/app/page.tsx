"use client";

import { Image } from "@nextui-org/react";
import { ThemeSwitch } from "@nimble/components/theme-switch";
import { ownerSelector } from "@nimble/store/store";

import React from "react";
import { useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
  const { owner } = useSelector(ownerSelector);
  // console.log(owner);
  return (
    <div>
      App
      {owner && (
        <Image
          className="rounded-lg"
          src={owner.imageUrl}
          alt="logo"
          width={50}
          height={50}
          isBlurred
        />
      )}
      <ThemeSwitch />
    </div>
  );
};

export default page;
