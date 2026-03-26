import { type NextPage } from "next";
import { Suspense } from "react";

import { getUsers } from "@/features/user/actions";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { USER_KEYS } from "@/features/user/keys";
import { Spinner } from "@/components/ui/spinner";

import { Presentational } from "./Presentational";

const Page: NextPage = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: USER_KEYS.list({ limit: 10, skip: 0 }),
    queryFn: () => getUsers({ limit: 10, skip: 0 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense
        fallback={
          <div className="flex items-center gap-2 italic text-nowrap text-xs text-muted-foreground">
            <Spinner className="h-4 w-4" /> Fetching data...
          </div>
        }
      >
        <Presentational />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
