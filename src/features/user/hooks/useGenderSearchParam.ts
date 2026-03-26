import { UsersFilter } from "@/types/user";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { useEffect, useRef } from "react";

const gender = ["male", "female", "all"] as const;

type Options = {
  onChange?: (value: UsersFilter["gender"]) => void;
};

export const useGenderSearchParam = (options?: Options) => {
  const { onChange } = options ?? {};

  const query = useQueryState(
    "gender",
    parseAsStringLiteral(gender).withDefault("all"),
  );

  const prevGender = useRef(query[0]);

  useEffect(() => {
    if (prevGender.current !== query[0]) {
      onChange?.(query[0]);
      prevGender.current = query[0];
    }
  }, [onChange, query]);

  return query;
};
