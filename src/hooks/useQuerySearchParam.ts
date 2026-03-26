"use client";

import { useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

type Options = {
  onChange?: (value: string) => void;
};

export const useQuerySearchParam = (options?: Options) => {
  const { onChange } = options ?? {};

  const query = useQueryState("q", { defaultValue: "" });
  const prevQuery = useRef(query[0]);

  useEffect(() => {
    if (prevQuery.current !== query[0]) {
      onChange?.(query[0]);
      prevQuery.current = query[0];
    }
  }, [onChange, query]);

  return query;
};
