import { type NextPage } from "next";

import { getUsers } from "@/features/user/actions";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { Presentational } from "./Presentational";
import { USER_KEYS } from "@/features/user/keys";

const Page: NextPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: USER_KEYS.list({ limit: 10, skip: 0 }),
    queryFn: () => getUsers({ limit: 10, skip: 0 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Presentational />
    </HydrationBoundary>
  );
};

export default Page;
