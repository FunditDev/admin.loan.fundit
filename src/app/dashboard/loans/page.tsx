import LoanWrapper from "@/components/dashboard/LoanWrapper";
import Spinner, { SpinnerTwo } from "@/components/icons/Spinner";
import { useLoan } from "@/hooks/usePendingUpdate";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { LoansType } from "@/utils/types";
import React from "react";

// const getLoans = async (): Promise<LoansType[]> => {
//   const loans = await processNoAuth("get", Endpoints.getAllStaffLoans);
//   console.log(loans, "loans -->");
//   return loans?.data;
// };
const Page = () => {
  // const { isLoading, data: loans, error } = useLoan();
  return (
    <div className="flex  w-full items-center justify-center ">
      <LoanWrapper />
    </div>
  );
};

export default Page;
