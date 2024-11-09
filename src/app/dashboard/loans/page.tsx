'use client'
import LoanWrapper from "@/components/dashboard/LoanWrapper";

import { OtherFiltersTypes } from "@/utils/types";
import { useSearchParams } from "next/navigation";
import React from "react";

// };
const Page = () => {
  // const { isLoading, data: loans, error } = useLoan();
  const searchParams = useSearchParams();
  const filters = searchParams.get("filter") as OtherFiltersTypes;
  return (
    <div className="flex  w-full items-center justify-center ">
      <LoanWrapper filter={filters}/>
    </div>
  );
};

export default Page;
