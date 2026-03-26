import { type NextPage } from "next";
import { Suspense } from "react";

import { getUsers } from "@/features/user/actions";
import { getQueryClient } from "@/lib/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { USER_KEYS } from "@/features/user/keys";
import { Spinner } from "@/components/ui/spinner";

import { Presentational } from "./Presentational";

type PageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

const LIMIT = 10;

const Page: NextPage<PageProps> = async ({ searchParams }) => {
  const queryClient = getQueryClient();

  const pageParam = (await searchParams).page;
  const page = Number(pageParam ?? "1");
  const skip = (page - 1) * LIMIT;

  await queryClient.prefetchQuery({
    queryKey: USER_KEYS.list({ limit: LIMIT, skip }),
    queryFn: () => getUsers({ limit: LIMIT, skip }),
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
