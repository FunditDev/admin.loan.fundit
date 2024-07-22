"use client";
import { LoansType, PendingStaffUpdate, Stafftype } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
// import Filter from "../shared/Filter";
import * as XLSX from "xlsx";
import Link from "next/link";
import SearchFilter from "./SearchFilter";
type Props = {
  pendingUpdate: PendingStaffUpdate[];
};

const PendingUpdateWrapper = ({ pendingUpdate }: Props) => {
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");

  const itemsPerPage = 12;
  const pageCount = Math.ceil(pendingUpdate.length / itemsPerPage);
  const endOffset = offset + itemsPerPage;
  const currentpendingUpdate = pendingUpdate.slice(offset, endOffset);
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    let offset = (selected * itemsPerPage) % pendingUpdate.length;
    setOffset(offset);
  };

  const filteredpendingUpdate = currentpendingUpdate.filter((staff) => {
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
  const placeholder = "Search by staff Id or staff Email or staff Name";

  return (
    <div className=" w-full mt-10 px-2 sm:px-10 md:mt-20">
      <h1 className="text-center mb-5">
        <span className="text-2xl font-bold">Staff Pending Update</span>
      </h1>
      <div className="flex justify-between items-center gap-10 mb-10">
        <SearchFilter
          setSearch={setSearch}
          search={search}
          placeholder={placeholder}
        />
        <button
          onClick={() => exportToExcel(pendingUpdate)}
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
            {filteredpendingUpdate.map((staff, index) => (
              <tr
                key={staff.staffId}
                className="*:px-2 *:py-2 *:border *:text-center *:text-sm"
              >
                <td>{index + 1}</td>
                <td>{staff.staffId}</td>
                <td> {staff.staffEmail}</td>
                <td>
                  {staff.firstName} {staff.lastName}
                </td>
                <td>
                  {" "}
                  &#8358;
                  {(staff.earnings as unknown as number).toLocaleString(
                    "en-us"
                  )}
                </td>
                <td>
                  <Link
                    href={`/dashboard/staff/staff-updates/${staff.staffId}`}
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
          Showing {offset + 1} - {endOffset} of {pendingUpdate.length} Pending
          Updates
        </p>
      </div>
    </div>
  );
};

export default PendingUpdateWrapper;

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

const exportToExcel = (pendingUpdate: Stafftype[]) => {
  const formattedPendingUpdate = pendingUpdate.map((staff) => {
    return {
      StaffId: staff.staffId,
      StaffEmail: staff.staffEmail,
      StaffName: staff.firstName + " " + staff.lastName,
      earnings: staff.earnings,
    };
  });
  const ws = XLSX.utils.json_to_sheet(formattedPendingUpdate);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "pendingUpdate.xlsx");
};
