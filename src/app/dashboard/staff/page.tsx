"use client";
import StaffWrapper from "@/components/dashboard/StaffWrapper";
import DashboardWrapper from "@/components/dashboard/LoanWrapper";
import { Endpoints } from "@/utils/endpoint";
import { processNoAuth } from "@/utils/http";
import { LoansType, Stafftype } from "@/utils/types";
import React from "react";
import { useStaff } from "@/hooks/usePendingUpdate";
import Spinner, { SpinnerTwo } from "@/components/icons/Spinner";

const StaffsPage = () => {
  const { data, isLoading, error } = useStaff();
  return (
    <div className="flex  w-full items-center justify-center">
      <div className="flex  w-full items-center justify-center">
        {/* {isLoading && (
          <div className=" py-36">
            <SpinnerTwo className="mx-auto text-20 w-16 h-16" />
          </div>
        )} */}
        {/* {!isLoading && !data?.length && (
          <div className="flex justify-center items-center py-36">
            <p>No Staff found</p>
          </div>
        )} */}
        {!isLoading && data && data.length > 0 && (
          <StaffWrapper staffs={data} />
        )}
      </div>
    </div>
  );
};

export default StaffsPage;
