"use client";
import { Endpoints } from "@/utils/endpoint";
import { fetcher } from "./fetcher";
import useSWR from "swr";
import { LoansType, Stafftype } from "@/utils/types";

export const useStaff = () => {
  const { isLoading, data, error } = useSWR<Stafftype[]>(
    Endpoints.getAllStaff,
    fetcher
  );
  console.log(data, "data -->");
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
  search:"All" | "Running" | "Due This Month" | "Matured" | "Date Taken";
  dateTaken?: string[] | null;
}) => {
  const { isLoading, data, error } = useSWR<LoansType[]>(
    search && search !== "Date Taken"
      ? `${Endpoints.getAllStaffLoans}?limit=10&page=1&search=${search}`
      : search === "Date Taken" &&
          dateTaken &&
          dateTaken?.length > 0 &&
          `${Endpoints.getAllStaffLoans}?limit=10&page=1&dateField=${dateTaken}&search=${search}`,
    fetcher,
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