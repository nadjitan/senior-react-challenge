"use server";

import { API_URL } from "@/constants";
import { User } from "@/types/user";

export const getUserById = async (id: string): Promise<User> => {
  const res = await fetch(`${API_URL}/users/${id}`);

  if (!res.ok) throw new Error("Failed to fetch user");

  return res.json();
};
