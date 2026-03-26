"use server";

import { API_URL } from "@/constants";
import { GetUsersResponse } from "@/types/user";

type Props = {
  query?: string;
  limit?: number;
  skip?: number;
  gender?: "male" | "female";
};

export const getUsers = async ({
  query,
  limit = 10,
  skip = 0,
  gender,
}: Props): Promise<GetUsersResponse> => {
  let url = `${API_URL}/users`;
  const params = new URLSearchParams();

  params.append("limit", String(limit));
  params.append("skip", String(skip));

  const hasQuery = !!query?.trim();
  const hasGender = !!gender;

  if (hasGender) {
    url = `${API_URL}/users/filter`;
    params.append("key", "gender");
    params.append("value", gender!);
  } else if (hasQuery) {
    url = `${API_URL}/users/search`;
    params.append("q", query!);
  }

  const res = await fetch(`${url}?${params.toString()}`);

  if (!res.ok) {
    if (gender) throw new Error("Failed to filter users");
    if (query) throw new Error("Failed to search users");
    throw new Error("Failed to fetch users");
  }

  const usersData: GetUsersResponse = await res.json();

  if (query && gender) {
    const filteredUsers = usersData.users.filter(
      (user) =>
        user.gender === gender &&
        (user.firstName.includes(query) ||
          user.lastName.includes(query) ||
          user.email.includes(query)),
    );

    const paginatedUsers = filteredUsers.slice(skip, skip + limit);

    return {
      limit,
      skip,
      total: filteredUsers.length,
      users: paginatedUsers,
    };
  }

  return { ...usersData, limit };
};
