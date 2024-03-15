
import { ArrowRightIcon,BanknotesIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";

const page = async () => {
  return (
    <div className="flex  w-full items-center justify-center">
      <div className="grid items-center sm:grid-cols-2 gap-8 w-full">
        <div className="py-20 px-4 bg-white shadow-lg text-center rounded-md">
          <UserCircleIcon className="h-20 w-20 mx-auto text-blue-500" />
          <Link href="/dashboard/staffs" className="text-blue-500 font-bold gap-1 flex items-center justify-center">
           View All Staffs
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
        <div className="py-20 px-4 bg-white shadow-lg text-center rounded-md">
          <BanknotesIcon className="h-20 w-20 mx-auto text-blue-500" />
          <Link href="/dashboard/loans" className="text-blue-500 font-bold gap-1 flex items-center justify-center">
            View All Loans
            <ArrowRightIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;
