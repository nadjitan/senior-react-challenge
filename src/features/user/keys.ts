export const USER_KEYS = {
  all: ["users"] as const,

  lists: () => [...USER_KEYS.all, "list"] as const,

  list: (params: { limit: number; skip: number; gender?: "male" | "female" }) =>
    [...USER_KEYS.lists(), params] as const,

  search: (params: {
    query: string;
    limit: number;
    skip: number;
    gender?: "male" | "female";
  }) => [...USER_KEYS.all, "search", params] as const,

  detail: (id: string) => [...USER_KEYS.all, "detail", id] as const,
};
