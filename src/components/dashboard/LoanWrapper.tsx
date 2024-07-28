"use client";
import { LoansType } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
import OtherFilters from "./OtherFilters";
import { useFilterLoan } from "@/hooks/usePendingUpdate";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Description } from "node_modules/@headlessui/react/dist/components/description/description";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  loans: LoansType[];
};
type OtherFiltersType = {
  filter: "All" | "Running" | "Due This Month" | "Matured" | "Date Taken";
};
const LoanWrapper = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [otherFilters, setOtherFilters] = useState<OtherFiltersType>({
    filter: "All",
  });
  const [filteredLoans, setFilteredLoans] = useState<LoansType[]>([]);
  // const [dateTaken, setDateTaken] = useState<Date>(new Date());
  const [rangeTaken, setRangeTaken] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [callRange, setCallRange] = useState(false);

  const handleOtherFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as OtherFiltersType["filter"];
    if (value === "Date Taken") {
      setIsOpen(true);
      return;
    }
    setOtherFilters({ filter: value });
  };
  const handleDateFetch = () => {
    setOtherFilters({ filter: "Date Taken" });
    setCallRange(true);
    setIsOpen(false);
  };
  const {
    isLoading: isLoadingSearch,
    data: newFilterLoan,
    error,
  } = useFilterLoan({
    search: otherFilters.filter,
    dateTaken: callRange
      ? [rangeTaken[0].toISOString(), rangeTaken[1].toISOString()]
      : null,
  });
  useEffect(() => {
    if (newFilterLoan) {
      setIsLoading(false);
      setFilteredLoans(newFilterLoan);
    }
  }, []);
  useEffect(() => {
    if (newFilterLoan) {
      setCallRange(false);
      setFilteredLoans(newFilterLoan);
    }
  }, [otherFilters.filter]);
  useEffect(() => {
    const searchLowerCase = search.toLowerCase();
    const filtered = newFilterLoan
      ? newFilterLoan.filter((loan) => {
          return (
            loan.staffId.toLowerCase().includes(searchLowerCase) ||
            loan.amount.toString().toLowerCase().includes(searchLowerCase) ||
            timeFormatter(loan.createdDate as unknown as Date)
              .toString()
              .toLowerCase()
              .includes(searchLowerCase)
          );
        })
      : [];

    setFilteredLoans(filtered);
    setOffset(0); // Reset offset to 0 whenever the search term changes
  }, [search, newFilterLoan, otherFilters.filter]);

  const itemsPerPage = 12;
  const pageCount = Math.ceil(filteredLoans.length / itemsPerPage);
  const endOffset = offset + itemsPerPage;
  const currentLoans = filteredLoans.slice(offset, endOffset);

  const handlePageClick = (data: any) => {
    const selected = data.selected;
    const newOffset = (selected * itemsPerPage) % filteredLoans.length;
    setOffset(newOffset);
  };

  const placeholder = "Search by Staff Id or Amount taken";

  const formatAmount = (amount: string | number) => {
    if (typeof amount === "number") return amount.toFixed(2);
    return parseFloat(amount.replace(/,/g, "")).toFixed(2);
  };

  const calRemainingTenor = (tenor: any[]) => {
    const remainingTenor = tenor.filter((t) => !t.fullyPaid);
    return remainingTenor.length;
  };
  const clearFilters = () => {
    setSearch("");
    setOtherFilters({ filter: "All" });
  };
  return (
    <div className="w-full mt-10 px-2 sm:px-10 md:mt-20">
      <h1 className="text-center mb-5">
        <span className="text-2xl font-bold">Staff Loans</span>
      </h1>
      <div className="flex flex-col gap-4 lg:justify-between lg:flex-row lg:items-center lg:gap-10 mb-10">
        <div className="flex gap-2 flex-1">
          <SearchFilter
            setSearch={setSearch}
            search={search}
            placeholder={placeholder}
          />
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white px-3 py-2 rounded-md flex-shrink-1 lg:hidden"
          >
            Clear Filters
          </button>
        </div>
        <div className="flex gap-6 mx-auto">
          <OtherFilters
            handleChange={handleOtherFilterChange}
            selectedVal={otherFilters.filter}
          />
          <button
            onClick={() => exportToExcel(filteredLoans)}
            className="bg-green-500 text-white px-3 py-2 rounded-md flex-shrink-1"
          >
            Export to Excel
          </button>
          <button
            onClick={clearFilters}
            className="bg-red-500 text-white px-3 py-2 rounded-md flex-shrink-1 hidden lg:block"
          >
            Clear Filters
          </button>
        </div>
      </div>
      <div className="text-center mb-3">
        Showing{" "}
        {otherFilters.filter === "All"
          ? "All"
          : otherFilters.filter === "Running"
          ? "Running Loans"
          : otherFilters.filter === "Due This Month"
          ? "Loans Due This Month"
          : otherFilters.filter === "Matured"
          ? "Matured Loans"
          : otherFilters.filter === "Date Taken" &&
            ` Loans Taken between ${rangeTaken[0].toLocaleDateString()} and ${rangeTaken[1].toLocaleDateString()}`}
      </div>
      <div className="overflow-x-auto min-h-[400px]">
        <table className="border border-collapse w-full whitespace-nowrap">
          <thead>
            <tr className="*:px-2 *:py-2 *:border ">
              <th>Staff Id</th>
              <th>Loan Request Date</th>
              <th>Amount Taken</th>
              <th>Total Repayment</th>
              <th>Amount Paid</th>
              <th>Outstanding</th>
              <th>
                Tenor <span className="text-sm">(Month)</span>
              </th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="h-fit">
            {isLoadingSearch &&
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <tr
                  key={index}
                  className="*:px-2 *:py-2 *:border *:text-center *:text-sm"
                >
                  <td
                    colSpan={10}
                    className={`${
                      index % 2 === 0 ? "bg-gray-300" : "bg-gray-200"
                    } animate-pulse h-10`}
                  ></td>
                </tr>
              ))}
            {!isLoadingSearch &&
              currentLoans.map((loan) => (
                <tr
                  key={loan.loanId}
                  className="*:px-2 *:py-2 *:border *:text-center *:text-sm"
                >
                  <td>{loan.staffId}</td>
                  <td>{timeFormatter(loan.createdDate as unknown as Date)}</td>
                  <td>
                    {parseFloat(formatAmount(loan.amount)).toLocaleString(
                      "en-NG",
                      {
                        style: "currency",
                        currency: "NGN",
                      }
                    )}
                  </td>
                  <td>
                    {parseFloat(
                      formatAmount(loan.totalRepayment)
                    ).toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })}
                  </td>
                  <td>
                    {loan.amountPaid ? (
                      loan.amountPaid.toLocaleString("en-NG", {
                        currency: "NGN",
                        style: "currency",
                      })
                    ) : (
                      <span>&#8358;0.00</span>
                    )}
                  </td>
                  <td className="text-center px-3 text-gray-700 border">
                    {loan.amountPaid
                      ? Math.abs(
                          parseFloat(formatAmount(loan.totalRepayment)) -
                            loan.amountPaid
                        ).toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })
                      : parseFloat(
                          formatAmount(loan.totalRepayment)
                        ).toLocaleString("en-NG", {
                          style: "currency",
                          currency: "NGN",
                        })}
                  </td>
                  <td>{loan.loanTenure.length}</td>
                  <td>
                    {calRemainingTenor(loan.loanTenure) > 0
                      ? "Running"
                      : "Completed"}
                  </td>
                  <td>
                    <Link
                      href={`/dashboard/loans/${loan.loanId}?staffId=${loan.staffId}`}
                      className="text-blue-500 font-bold gap-1 flex items-center justify-center"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex max-md:flex-col max-md:justify-center gap-4 items-center justify-center mt-10 md:space-x-10">
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
      <DateModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        // setDateTaken={setDateTaken}
        // dateTaken={dateTaken}
        handleDateFetch={handleDateFetch}
        rangeTaken={rangeTaken}
        setRangeTaken={setRangeTaken}
      />
    </div>
  );
};

export default LoanWrapper;

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

const exportToExcel = (loans: LoansType[]) => {
  const formattedLoans = loans.map((loan) => {
    return {
      StaffId: loan.staffId,
      LoanRequestDate: timeFormatter(loan.createdDate as unknown as Date),
      StaffEmail: loan.staff.staffEmail,
      StaffName: loan.staff.staffName,
      AmountTaken: loan.amount,
      TotalRepayment: loan.totalRepayment,
      TotalRepaid: loan.amountPaid,
      Tenor:
        loan.loanTenure.length > 1
          ? `${loan.loanTenure.length} months`
          : `${loan.loanTenure.length} month`,
      // Status: "Running",
      LoanStatus: loan.loanStatus,
    };
  });
  const ws = XLSX.utils.json_to_sheet(formattedLoans);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "loans.xlsx");
};

const DateModal = ({
  isOpen,
  setIsOpen,
  // setDateTaken,
  // dateTaken,
  handleDateFetch,
  rangeTaken,
  setRangeTaken,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // setDateTaken: React.Dispatch<React.SetStateAction<Date>>;
  // dateTaken?: Date;
  handleDateFetch?: () => void;
  rangeTaken: Date[];
  setRangeTaken: React.Dispatch<React.SetStateAction<Date[]>>;
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          as="div"
          className="max-w-lg space-y-4 border bg-white p-12"
        >
          <DialogTitle as="div" className="font-bold text-center">
            Choose a Range
          </DialogTitle>
          <Description as="div" className={"flex gap-6"}>
            <DatePicker
              selected={rangeTaken[0]}
              onChange={(date) => setRangeTaken([date as Date, rangeTaken[1]])}
              className="w-full p-2 border border-gray-300 rounded-md"
              name="rangeOne"
            />

            <DatePicker
              selected={rangeTaken[1]}
              onChange={(date) => setRangeTaken([rangeTaken[0], date as Date])}
              className="w-full p-2 border border-gray-300 rounded-md"
              name="rangeTwo"
            />
          </Description>

          <div className="flex gap-4 items-center justify-center">
            <button
              onClick={handleDateFetch}
              className="text-center border border-green-400 rounded-full py-1.5 px-4"
            >
              Chose
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
