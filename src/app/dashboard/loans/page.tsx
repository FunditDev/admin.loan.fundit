'use client'
import LoanWrapper from "@/components/dashboard/LoanWrapper";
import Spinner from "@/components/icons/Spinner";
import { useLoan } from "@/hooks/usePendingUpdate";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { LoansType } from "@/utils/types";
import React from "react";

const getLoans = async (): Promise<LoansType[]> => {
  const loans = await processNoAuth("get", Endpoints.getAllStaffLoans);
  console.log(loans, "loans -->");
  return loans?.data;
};
const Page =  () => {
  const { isLoading, data: loans, error } = useLoan();
  return (
    <div className="flex  w-full items-center justify-center">
      {isLoading && (
        <div className=" py-36">
          <Spinner className="mx-auto text-20 w-16 h-16 animate-spin" />
        </div>
      )}
      {!isLoading && !loans?.length && (
        <div className="flex justify-center items-center py-36">
          <p>No loans found</p>
        </div>
      )}
      {!isLoading && loans && loans.length > 0 && <LoanWrapper loans={loans} />}
    </div>
  );
};

export default Page;
