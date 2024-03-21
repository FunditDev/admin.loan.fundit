"use client";
import {Endpoints} from "@/utils/endpoint";
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
    Endpoints.getAllStaffLoans,
    fetcher
  );
  console.log(data, "data -->");
  return {
    isLoading,
    data,
    error,
  };
};
