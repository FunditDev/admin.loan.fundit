"use client";
import { SpinnerTwo } from "@/components/icons/Spinner";
import { Endpoints } from "@/utils/endpoint";
import { processWithAuth } from "@/utils/http";
import {
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const companyCode = process.env.NEXT_PUBLIC_COMPANY_CODE;
const DashboardPage = () => {
  const [dashboardData, setDashboardData] = React.useState({
    totalLoansAmount: 0,
    totalLoansCount: 0,
    currentLoansDueForRepaymentCount: 0,
    currentLoansDueForRepaymentAmount: 0,
    notPerformingLoanCount: 0,
    notPerformingLoansAmount: 0,
    liquidatedLoansCount: 0,
    liquidatedLoansAmount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const getDashboardData = async () => {
    try {
      const dashboardData = await processWithAuth(
        "get",
        `${Endpoints.getDashboardData}/${companyCode}`
      );
      setIsLoading(false);
      setDashboardData(dashboardData?.data);
      return dashboardData?.data;
    } catch (err) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div className="flex  w-full items-start mt-10">
      {isLoading && <SpinnerTwo className="!mx-auto " />}
      {!isLoading && (
        <div className="grid items-center sm:grid-cols-2 md:grid-cols-3 gap-8 w-full">
          {/* <div className="py-20 px-4 bg-white shadow-lg text-center rounded-md">
          <UserCircleIcon className="h-20 w-20 mx-auto text-blue-500" />
          <Link href="/dashboard/staffs" className="text-blue-500 font-bold gap-1 flex items-center justify-center">
           View All Staffs
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div> */}
          <div className="py-10 px-4 min-h-52 h-full shadow-custom border text-center rounded-md flex bg-blue-500 text-white flex-col gap-10 relative">
            <div className=" font-bold gap-1 flex items-center justify-center flex-col ">
              <div className="gap-1 flex items-center justify-center">
                Total Loan Amount ({dashboardData.totalLoansCount})
              </div>
              <p>{dashboardData.totalLoansAmount}</p>
            </div>
            <Link
              href={"/dashboard/loans?filter=Disbursed"}
              className="text-blue-100 font-bold gap-1 flex items-center justify-center bottom-10 inset-x-0 absolute"
            >
              View All
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="py-10 px-4 min-h-52 h-full  shadow-custom border text-center rounded-md flex flex-col gap-10 bg-green-500 text-white">
            <div className=" font-bold gap-1 flex items-center flex-col justify-center ">
              <div className="gap-1 flex items-center justify-center ">
                Total Loan Due by the end of the month (
                {dashboardData.currentLoansDueForRepaymentCount})
              </div>
              <p>{dashboardData.currentLoansDueForRepaymentAmount}</p>
            </div>
            <Link
              href={`/dashboard/loans?filter=Due-This-Month`}
              className="text-green-100 font-bold gap-1 flex items-center justify-center bottom-10 inset-x-0"
            >
              View All
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="py-10 px-4 min-h-52 h-full bg-red-500 shadow-custom border text-center rounded-md flex flex-col gap-10 relative">
            {/* <BanknotesIcon className="h-20 w-20 mx-auto text-blue-500" /> */}
            <div className="text-white font-bold gap-1 flex items-center justify-center  flex-col">
              <div className="gap-1 flex items-center justify-center ">
                Total Outstanding Loan ({dashboardData.notPerformingLoanCount})
              </div>
              <p>{dashboardData.notPerformingLoansAmount}</p>
            </div>
            <Link
              href={`/dashboard/loans?filter=Outstanding`}
              className="text-red-100 font-bold gap-1 flex items-center justify-center absolute bottom-10 inset-x-0"
            >
              View All
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
          <div className="py-10 px-4 min-h-52 h-full bg-indigo-500 hover:bg-indigo-600 duration-300 transition-all shadow-custom border text-center rounded-md flex flex-col gap-10 relative">
            {/* <BanknotesIcon className="h-20 w-20 mx-auto text-blue-500" /> */}
            <div className="text-white font-bold gap-1 flex items-center justify-center  flex-col">
              <div className="gap-1 flex items-center justify-center ">
                Total Liquidated Loans ({dashboardData.liquidatedLoansCount})
              </div>
              <p>{dashboardData.liquidatedLoansAmount}</p>
            </div>
            <Link
              href={"/dashboard/loans?filter=Liquidated"}
              className="text-red-100 font-bold gap-1 flex items-center justify-center absolute bottom-10 inset-x-0"
            >
              View All
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
