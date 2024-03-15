import StaffWrapper from "@/components/dashboard/StaffWrapper";
import DashboardWrapper from "@/components/dashboard/LoanWrapper";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { LoansType, Stafftype } from "@/utils/types";
import React from "react";

const getStaffs = async (): Promise<Stafftype[]> => {
  const staffs = await processNoAuth("get", Endpoints.getAllStaff);
  console.log(staffs, "staffs -->");
  return staffs?.data;
};
const StaffsPage = async () => {
  const staffs = await getStaffs();
  return (
    <div className="flex  w-full items-center justify-center">
      <StaffWrapper staffs={staffs} />
    </div>
  );
};

export default StaffsPage;
