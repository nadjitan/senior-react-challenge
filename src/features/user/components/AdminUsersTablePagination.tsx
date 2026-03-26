import { useState } from "react";

import {
  ChevronsLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GetUsersResponse } from "@/types/user";
import { usePaginationSearchParam } from "@/hooks/usePaginationSearchParam";
import { useGenderSearchParam } from "../hooks";
import { useQuerySearchParam } from "@/hooks/useQuerySearchParam";

type Props = {
  usersData: GetUsersResponse;
};

export const AdminUsersTablePagination: React.FC<Props> = ({ usersData }) => {
  const [page, setPage] = usePaginationSearchParam();

  const [inputPage, setInputPage] = useState(page);
  useGenderSearchParam({ onChange: () => setInputPage(1) });
  useQuerySearchParam({ onChange: () => setInputPage(1) });

  const total = Number(Math.ceil(usersData.total / usersData.limit));
  const totalPages = Number.isFinite(total) ? total : 0;
  const isEmptyData = usersData.total === 0;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
    setInputPage(newPage);
  };

  const handlePageChange = (value: string) => {
    // Only allow numeric input (can be zero)
    if (/^[0-9]*$/.test(value)) setInputPage(Number(value));
  };

  const handlePageInputChange = () => {
    let newPage = Number(inputPage);

    if (isNaN(newPage) || newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;

    setPage(newPage);
    setInputPage(newPage);
  };

  const handlePageInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handlePageInputChange();
  };

  if (isEmptyData) {
    return (
      <p className="flex justify-center items-center text-sm text-muted-foreground">
        No data found...
      </p>
    );
  }

  return (
    <div className="flex justify-end items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleChangePage(1)}
        disabled={page === 1}
      >
        <ChevronsLeftIcon className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleChangePage(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </Button>

      <div className="flex items-center gap-1.5 px-3 text-nowrap text-sm text-muted-foreground">
        <span>Page</span>
        <Input
          className="size-8 text-center p-1 text-foreground rounded-sm"
          value={inputPage}
          max={totalPages}
          onChange={(e) => handlePageChange(e.target.value)}
          onBlur={handlePageInputChange}
          onKeyDown={handlePageInputEnter}
        />
        <span>of {totalPages === 0 ? "-" : totalPages}</span>
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleChangePage(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => handleChangePage(totalPages)}
        disabled={page === totalPages}
      >
        <ChevronsRightIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};
