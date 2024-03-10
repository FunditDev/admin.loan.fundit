"use client";
import { LoansType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Filter from "./Filter";
import { time } from "console";

type Props = {
  loans: LoansType[];
};

const DashboardWrapper = ({ loans }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  console.log(loans, "loans -->");
  useEffect(() => {
    if (loans && loans.length > 0) {
      setIsLoading(false);
    }
  }, [loans]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if ((!isLoading && !loans) || loans.length === 0) {
    return <div>No loans available</div>;
  }

  const itemsPerPage = 12;
  const pageCount = Math.ceil(loans.length / itemsPerPage);
  const endOffset = offset + itemsPerPage;
  const currentLoans = loans.slice(offset, endOffset);
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    let offset = (selected * itemsPerPage) % loans.length;
    setOffset(offset);
  };

  const filteredLoans = currentLoans.filter((loan) => {
    return (
      loan.staffId.toLowerCase().includes(search.toLowerCase()) ||
      loan.amount.toString().toLowerCase().includes(search.toLowerCase()) ||
      timeFormatter(loan.createdDate as unknown as Date)
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  });

  return (
    <div className=" w-full mt-10 px-2 sm:px-10 md:mt-20">
      <h1 className="text-center mb-5">
        <span className="text-2xl font-bold">Staff Loans</span>
      </h1>
      <Filter setSearch={setSearch} search={search} />
      <div className="overflow-x-auto min-h-[400px]">
        <table className="border border-collapse w-full whitespace-nowrap">
          <thead>
            <tr className="*:px-2 *:py-2 *:border ">
              <th>Staff Id</th>
              <th>Amount Taken</th>
              <th>Total Repayment</th>
              <th>
                Tenor <span className="text-sm">(Month)</span>
              </th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody className="h-fit">
            {filteredLoans.map((loan) => (
              <tr
                key={loan.loanId}
                className="*:px-2 *:py-2 *:border *:text-center *:text-sm"
              >
                <td>{loan.staffId}</td>
                <td> &#8358;{loan.amount}</td>
                <td> &#8358;{loan.totalRepayment}</td>
                <td>{loan.loanTenure.length}</td>
                <td>Running</td>
                <td>{timeFormatter(loan.createdDate as unknown as Date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center mt-10 space-x-10">
        <ReactPaginate
          pageCount={pageCount}
          breakLabel="..."
          nextLabel=" >"
          onPageChange={handlePageClick}
          previousLabel="< "
          renderOnZeroPageCount={null}
          pageRangeDisplayed={5}
          className="flex justify-center items-center space-x-3"
          activeClassName="bg-gray-500 text-white"
          previousClassName="text-sm font-medium text-gray-900 bg-gray-200 px-3 py-2 rounded-md"
          nextClassName="text-sm font-medium text-gray-900 bg-gray-200 px-3 py-2 rounded-md"
          pageClassName="text-sm font-medium text-gray-900 bg-gray-200 px-3 py-2 rounded-md"
        />
        <p>
          Showing {offset + 1} - {endOffset} of {filteredLoans.length} loans
        </p>
      </div>
    </div>
  );
};

export default DashboardWrapper;

const timeFormatter = (date: Date) => {
  const loanCreatedDate = new Date(date);
  const formattedDate = loanCreatedDate.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return formattedDate;
};
