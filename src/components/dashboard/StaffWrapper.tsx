"use client";
import { LoansType, Stafftype } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Filter from "./SearchFilter";
import * as XLSX from "xlsx";
import Link from "next/link";
type Props = {
  staffs: Stafftype[];
};

const StaffWrapper = ({ staffs }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  console.log(staffs, "staffs -->");
  useEffect(() => {
    if (staffs && staffs.length > 0) {
      setIsLoading(false);
    }
  }, [staffs]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if ((!isLoading && !staffs) || staffs.length === 0) {
    return <div>No staffs available</div>;
  }

  const itemsPerPage = 12;
  const pageCount = Math.ceil(staffs.length / itemsPerPage);
  const endOffset = offset + itemsPerPage;
  const currentstaffs = staffs.slice(offset, endOffset);
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    let offset = (selected * itemsPerPage) % staffs.length;
    setOffset(offset);
  };

  const filteredStaffs = currentstaffs.filter((staff) => {
    return (
      staff.staffId.toLowerCase().includes(search.toLowerCase()) ||
      staff.staffEmail
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      staff.firstName.toString().toLowerCase().includes(search.toLowerCase()) ||
      staff.lastName.toString().toLowerCase().includes(search.toLowerCase())
    );
  });
  const placeholder = "Search by Staff Id or Staff Email or Staff Name";

  return (
    <div className=" w-full mt-10 px-2 sm:px-10 md:mt-20">
      <h1 className="text-center mb-5">
        <span className="text-2xl font-bold">Staff</span>
      </h1>
      <div className="flex justify-between items-center gap-10 mb-10">
        <Filter
          setSearch={setSearch}
          search={search}
          placeholder={placeholder}
        />
        <button
          onClick={() => exportToExcel(staffs)}
          className="bg-green-500 text-white px-3 py-2 rounded-md flex-shrink-1"
        >
          Export to Excel
        </button>
      </div>
      <div className="overflow-x-auto min-h-[400px]">
        <table className="border border-collapse w-full whitespace-nowrap">
          <thead>
            <tr className="*:px-2 *:py-2 *:border ">
              <td>No</td>
              <th>Staff Id</th>
              <th>Staff Email</th>
              <th>Staff Name</th>
              <th>Monthly Salary</th>
            </tr>
          </thead>
          <tbody className="h-fit">
            {filteredStaffs.map((staff, index) => (
              <tr
                key={staff.staffId}
                className="*:px-2 *:py-2 *:border *:text-center *:text-sm"
              >
                <td>{index + 1}</td>
                <td>{staff.staffId}</td>
                <td> {staff.staffEmail}</td>
                <td className="capitalize">
                  {staff.firstName} {staff.lastName}
                </td>
                <td> &#8358;{staff.monthlySalary.toLocaleString("en-us")}</td>
                <td>
                  <Link
                    href={`/dashboard/staffs/${staff.staffId}`}
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
          Showing {offset + 1} - {endOffset} of {staffs.length} loans
        </p>
      </div>
    </div>
  );
};

export default StaffWrapper;

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

const exportToExcel = (staffs: Stafftype[]) => {
  const formattedStaffs = staffs.map((staff) => {
    return {
      StaffId: staff.staffId,
      StaffEmail: staff.staffEmail,
      StaffName: staff.firstName + " " + staff.lastName,
      monthlySalary: staff.monthlySalary,
    };
  });
  const ws = XLSX.utils.json_to_sheet(formattedStaffs);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "staffs.xlsx");
};
