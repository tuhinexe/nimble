"use client";

import useAppDispatch from "@nimble/hooks/useAppDispatch";
import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import { setOwner } from "@nimble/store/slices/owner";
import { ownerSelector } from "@nimble/store/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

type CurrentData = {
  user: {
    id: string;
    name: string;
    email: string;
  };
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { useFetchProfileQuery } = useNimbleApi();
  const { owner } = useSelector(ownerSelector);
  const ownerData = useFetchProfileQuery(undefined, {});
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOwnerFetch = async () => {
      if (ownerData.status === "fulfilled") {
        const data = ownerData.data as CurrentData;
        dispatch(setOwner(data.user));
        if (!data.user) {
          router.replace("/login");
        } else {
          router.replace("/app");
        }
      } else if (ownerData.status === "rejected") {
        router.replace("/login");
      }
    };

    handleOwnerFetch();
  }, [ownerData]);

  return <>{children}</>;
};

export default AuthProvider;
