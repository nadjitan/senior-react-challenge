"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getUsers } from "@/features/user/actions";
import { useEffect } from "react";
import { showErrorToast } from "@/components/ui/sonner";
import { USER_KEYS } from "../keys";

type UseUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  gender?: "male" | "female";
};

export const useUsers = ({
  page = 1,
  limit = 10,
  search,
  gender,
}: UseUsersParams) => {
  const skip = (page - 1) * limit;
  const isSearching = !!search?.trim();

  const query = useQuery({
    queryKey: isSearching
      ? USER_KEYS.search({ query: search!, limit, skip, gender })
      : USER_KEYS.list({ limit, skip, gender }),

    queryFn: () =>
      getUsers({
        query: isSearching ? search : undefined,
        limit,
        skip,
        gender,
      }),

    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (query.isError) {
      showErrorToast(query.error.message);
    }
  }, [query.error, query.isError]);

  return query;
};
