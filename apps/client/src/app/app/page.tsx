"use client";

import { Button, Image } from "@heroui/react";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import { ownerSelector } from "@nimble/store/store";

import { useRouter } from "next/navigation";

import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
  const { owner } = useSelector(ownerSelector);
  const { logout, logoutState } = useNimbleApi();
  const router = useRouter();

  useEffect(() => {
    if (!owner) {
      router.push("/login");
    }
  }, [owner]);

  const handleLogout = async () => {
    try {
      const result = await logout("").unwrap();
      console.log(result);

      if (result?.success) {
        toast.success("Logout successful");

        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        />
      )}
      <Button onPress={handleLogout} variant="bordered">
        Logout
      </Button>
    </div>
  );
};

export default page;
