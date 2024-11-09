"use client";
import { Endpoints } from "@/utils/endpoint";
import { fetcher, fetcherWithAuth } from "./fetcher";
import useSWR from "swr";
import {
  LoansType,
  OtherFiltersTypes,
  PendingStaffUpdate,
  Stafftype,
} from "@/utils/types";

export const useStaff = () => {
  const { isLoading, data, error } = useSWR<Stafftype[]>(
    Endpoints.getAllStaff,
    fetcherWithAuth,
    { revalidateOnMount: true, revalidateOnFocus: false }
  );
  return {
    isLoading,
    data,
    error,
  };
};

export const useLoan = () => {
  const { isLoading, data, error } = useSWR<LoansType[]>(
    `${Endpoints.getAllStaffLoans}?limit=10&page=1`,
    fetcher,
    { revalidateOnMount: false, revalidateOnFocus: false }
  );
  console.log(data, "data -->");
  return {
    isLoading,
    data,
    error,
  };
};
export const useFilterLoan = ({
  search = "All",
  dateTaken = null,
}: {
  search: OtherFiltersTypes;
  dateTaken?: string[] | null;
}) => {
  const { isLoading, data, error } = useSWR<LoansType[]>(
    search && search !== "Date Taken"
      ? `${Endpoints.getAllStaffLoans}?limit=10&page=1&search=${search}`
      : search === "Date Taken" &&
          dateTaken &&
          dateTaken?.length > 0 &&
          `${Endpoints.getAllStaffLoans}?limit=10&page=1&dateField=${dateTaken}&search=${search}`,
    fetcherWithAuth,
    { revalidateOnMount: true, revalidateOnFocus: false }
  );
  return {
    isLoading,
    data,
    error,
  };
};

export const useSingleSmartcashloan = ({
  loanId,
  staffId,
}: {
  loanId: string;
  staffId: string;
}) => {
  const { isLoading, data, error } = useSWR<LoansType>(
    `${Endpoints.getSingleStaffLoanById}/${loanId}?staffId=${staffId}`,
    fetcher
  );
  return {
    isLoading,
    data,
    error,
  };
};

export const usePendingUpdate = () => {
  const { isLoading, data, error } = useSWR<PendingStaffUpdate[]>(
    Endpoints.getPendingUpdate,
    fetcherWithAuth
  );
  return {
    isLoading,
    data,
    error,
  };
};
export const usePendingUpdatePage = () => {
  const { isLoading, data, error } = useSWR<PendingStaffUpdate[]>(
    Endpoints.getPendingUpdate,
    fetcherWithAuth,
    {
      revalidateOnMount: true,
      revalidateOnFocus: false,
    }
  );
  return {
    isLoading,
    data,
    error,
  };
};
