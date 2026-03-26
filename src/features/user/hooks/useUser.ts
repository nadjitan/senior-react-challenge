"use client";

import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/features/user/actions";
import { USER_KEYS } from "../keys";

export const useUser = (id?: string) => {
  return useQuery({
    queryKey: id ? USER_KEYS.detail(id) : [],
    queryFn: () => getUserById(id!),
    enabled: !!id,
  });
};
