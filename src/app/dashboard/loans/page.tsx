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
      {/* <div>
        <div className="mt-5 grid grid-cols-3">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div> */}
      {/* {isLoading && (
        <div className=" py-36">
          <SpinnerTwo className="mx-auto !w-11 !h-11" />
        </div>
      )}
      {!isLoading && !loans?.length && (
        <div className="flex justify-center items-center py-36">
          <p>No loans found</p>
        </div>
      )}
      {!isLoading && loans && loans.length > 0 && <LoanWrapper loans={loans} />} */}
      <LoanWrapper />
    </div>
  );
};

export default Page;
