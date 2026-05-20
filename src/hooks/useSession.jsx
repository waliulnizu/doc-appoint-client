"use client";

import { authClient } from "@/lib/auth-client";

export const useSession = () => {
  const {
    data,
    isPending,
    isRefetching,
    error,
    refetch,
  } = authClient.useSession();

  return {
    session: data,
    user: data?.user,
    loading: isPending || isRefetching,
    error,
    refetch,
  };
};
