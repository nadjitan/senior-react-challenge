"use client";

import { parseAsInteger, useQueryState } from "nuqs";

export const usePaginationSearchParam = () => {
  return useQueryState("page", parseAsInteger.withDefault(1));
};
