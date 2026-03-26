"use client";

import {
  AdminUsersFilterBar,
  AdminUsersTable,
  AdminUsersTablePagination,
} from "@/features/user/components";
import { useGenderSearchParam, useUsers } from "@/features/user/hooks";
import { useQuerySearchParam } from "@/hooks/useQuerySearchParam";
import { usePaginationSearchParam } from "@/hooks/usePaginationSearchParam";

export const Presentational: React.FC = () => {
  const [page] = usePaginationSearchParam();
  const [search] = useQuerySearchParam();

  const [gender] = useGenderSearchParam();

  const {
    data: usersData,
    isFetching,
    isError,
    refetch,
  } = useUsers({
    page,
    search,
    gender: gender === "all" ? undefined : gender,
  });

  const isUsersDataDefined = usersData !== undefined;

  return (
    <div className="flex flex-col h-full flex-1 items-center justify-center px-4 md:px-10">
      <div className="max-w-7xl w-full h-160 min-h-160 flex flex-col gap-4">
        <AdminUsersFilterBar
          isFetching={isFetching}
          isError={isError}
          onRefetch={refetch}
        />

        <div className="flex flex-col w-full gap-4">
          {isUsersDataDefined && <AdminUsersTable usersData={usersData} />}
          {isUsersDataDefined && (
            <AdminUsersTablePagination usersData={usersData} />
          )}

          {isError && (
            <p className="flex justify-center items-center text-sm text-muted-foreground">
              No data found...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
