"use client";
import { LoansType, PendingStaffUpdate, Stafftype } from "@/utils/types";
import React from "react";
import PendingUpdateWrapper from "@components/dashboard/pendingUpdate";
import { usePendingUpdatePage } from "@hooks/usePendingUpdate";
import { SpinnerTwo } from "@components/icons/Spinner";
import { toast } from "react-toastify";

const StaffUpdatePage = () => {
  const { data, isLoading, error } = usePendingUpdatePage();
//   if(error){
//     return <div>
//         An error occurred
//     </div>
//   }
  return (
    <div className="flex  w-full items-center justify-center">
      {isLoading && (
        <div className=" py-36">
          <SpinnerTwo className="!mx-auto !w-16 !h-16" />
        </div>
      )}
      {!isLoading && !data?.length && !error && (
        <div className="flex justify-center items-center py-36">
          <p>No pending updates found</p>
        </div>
      )}
      {!isLoading && data && data.length > 0 && (
        <PendingUpdateWrapper pendingUpdate={data ?? []} />
      )}
    </div>
  );
};

export default StaffUpdatePage;
