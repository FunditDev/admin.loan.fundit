import DashboardWrapper from "@/components/dashboard/dashboardWrapper";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { LoansType } from "@/utils/types";
import React from "react";

const getLoans = async (): Promise<LoansType[]> => {
  const loans = await processNoAuth("get", Endpoints.getAllStaffLoans);
  console.log(loans, "loans -->");
  return loans?.data;
};
const page = async () => {
  const loans = await getLoans();
  return (
    <div className="flex  w-full items-center justify-center">
      <DashboardWrapper loans={loans} />
    </div>
  );
};

export default page;
