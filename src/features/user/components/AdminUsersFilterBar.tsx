"use client";

import { useEffect, useRef, useState } from "react";
import { RefreshCw, Search } from "lucide-react";
import { RefetchOptions } from "@tanstack/react-query";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Spinner } from "@/components/ui/spinner";
import { useGenderSearchParam } from "@/features/user/hooks";
import { UsersFilter } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaginationSearchParam } from "@/hooks/usePaginationSearchParam";
import { useQuerySearchParam } from "@/hooks/useQuerySearchParam";
import { Button } from "@/components/ui/button";

type AdminUsersFilterBarProps = {
  isFetching: boolean;
  isError: boolean;
  onRefetch?: (options?: RefetchOptions) => void;
};

export const AdminUsersFilterBar: React.FC<AdminUsersFilterBarProps> = ({
  isFetching,
  isError,
  onRefetch,
}) => {
  const isFirstRender = useRef(true);

  const [, setPage] = usePaginationSearchParam();
  const [search, setSearch] = useQuerySearchParam();

  const [gender, setGender] = useGenderSearchParam();
  const [inputValue, setInputValue] = useState(search);

  const debouncedSearch = useDebounce(inputValue, 300);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (debouncedSearch !== search) {
      setPage(1);
      setSearch(debouncedSearch);
    }
  }, [debouncedSearch, setSearch, setPage, search]);

  const handleGenderChange = (value: UsersFilter["gender"]) => {
    setPage(1);
    setGender(value);
  };

  return (
    <div className="w-full flex gap-3 justify-between">
      <div className="flex gap-3 items-center">
        <Input
          leftIcon={<Search className="h-4 w-4" />}
          placeholder="Search by name..."
          className="max-w-64 rounded-sm"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {isFetching && (
          <div className="flex items-center gap-2 italic text-nowrap text-xs text-muted-foreground">
            <Spinner className="h-4 w-4" /> Fetching data...
          </div>
        )}

        {isError && (
          <Button variant="default" onClick={() => onRefetch?.()}>
            Reload
            <RefreshCw />
          </Button>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <label
          htmlFor="filter-gender"
          className="text-sm text-muted-foreground"
        >
          Gender:
        </label>
        <Select
          value={gender}
          onValueChange={(value) =>
            handleGenderChange(value as UsersFilter["gender"])
          }
        >
          <SelectTrigger id="filter-gender" className="h-9 w-35 rounded-sm">
            <SelectValue placeholder="All" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
