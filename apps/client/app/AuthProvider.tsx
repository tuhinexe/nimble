"use client";

import { useNimbleApi } from "@nimble/hooks/useNimbleApi";
import { ownerSelector } from "@nimble/store/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { useFetchProfileQuery } = useNimbleApi();
  const owner = useSelector(ownerSelector);
  const { data, isFetching } = useFetchProfileQuery();

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleOwnerFetch = async () => {
      console.log("Fetching owner");
      console.log(data);
    };

    handleOwnerFetch();
  }, []);

  return <>{children}</>;
};

export default AuthProvider;
