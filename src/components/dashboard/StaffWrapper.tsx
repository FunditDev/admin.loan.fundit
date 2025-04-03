"use client";
import { LoansType, Stafftype } from "@/utils/types";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Filter from "./SearchFilter";
import * as XLSX from "xlsx";
import Link from "next/link";
import { Dialog, DialogPanel } from "@headlessui/react";
import Image from "next/image";
import {
  ArrowDownTrayIcon,
  DocumentArrowUpIcon,
  FolderPlusIcon,
} from "@heroicons/react/24/outline";
import { Endpoints } from "@/utils/endpoint";
import { processWithAuth } from "@/utils/http";
import { toast } from "react-toastify";
import { Span } from "next/dist/trace";
import Spinner, { SpinnerTwo } from "../icons/Spinner";
type Props = {
  staffs: Stafftype[];
};

const companyCode = process.env.NEXT_PUBLIC_COMPANY_CODE;

const StaffWrapper = ({ staffs }: Props) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [offset, setOffset] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [filteredStaffs, setFilteredStaffs] = useState<Stafftype[]>(staffs);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // if (staffs && staffs.length > 0) {
    //   setIsLoading(false);
    //   // setFilteredStaffs(staffs);
    // }
    setIsLoading(false);
  }, [staffs]);

  const itemsPerPage = 25;
  const pageCount = Math.ceil(filteredStaffs.length / itemsPerPage);
  const endOffset = offset + itemsPerPage;
  const currentstaffs = filteredStaffs.slice(offset, endOffset);
  const handlePageClick = (data: any) => {
    let selected = data.selected;
    let offset = (selected * itemsPerPage) % filteredStaffs.length;
    setOffset(offset);
  };

  const placeholder = "Search by Staff Id or Staff Email or Staff Name";
  useEffect(() => {
    const filteredStaff = staffs.filter((staff) => {
      return (
        staff.staffId.toLowerCase().includes(search.toLowerCase()) ||
        staff.staffEmail
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        staff.firstName
          .toString()
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        staff.lastName.toString().toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilteredStaffs(filteredStaff);
    setOffset(0);
  }, [search]);

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
        <div className="flex gap-6 mx-auto">
          <button
            onClick={() => exportToExcel(staffs)}
            className="bg-green-500 text-white px-3 py-2 rounded-md flex-shrink-1"
          >
            Export to Excel
          </button>
          <Link href="/dashboard/staff/add-staff">
            <button className="bg-blue-500 text-white px-3 py-2 rounded-md flex-shrink-1">
              Add Staff
            </button>
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-orange-500 text-white px-3 py-2 rounded-md flex-shrink-1 flex items-center  "
          >
            <FolderPlusIcon className="h-4 w-4" />
            <span className="ml-1">Import Staff</span>
          </button>
          <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
            <div className="fixed inset-0 bg-black opacity-30" />
            <DialogPanel>
              <div className="fixed inset-0 flex items-center justify-center max-w-xl ml-auto lg:mx-auto">
                <ImportStaffsModal onClose={() => setIsOpen(false)} />
              </div>
            </DialogPanel>
          </Dialog>
        </div>
      </div>
      <div className="overflow-x-auto min-h-[400px]">
        <table className="border border-collapse w-full whitespace-nowrap">
          <thead>
            <tr className="*:px-2 *:py-2 *:border ">
              <td>No</td>
              <th>Staff Id</th>
              <th>Staff Email</th>
              <th>Staff Name</th>
              <th>Earnings</th>
            </tr>
          </thead>
          <tbody className="h-fit">
            {isLoading &&
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
            {!currentstaffs.length && (
              <tr className="*:px-2 *:py-2 *:border *:text-center *:text-sm">
                <td colSpan={5} className="text-center">
                  No staff found
                </td>
              </tr>
            )}
            {currentstaffs.map((staff, index) => (
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
                <td> &#8358;{staff.earnings.toLocaleString("en-us")}</td>
                <td>
                  <Link
                    href={`/dashboard/staff/${staff.staffId}`}
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
          Showing {offset + 1} - {endOffset} of {filteredStaffs.length} Staff
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
      earnings: staff.earnings,
    };
  });
  const ws = XLSX.utils.json_to_sheet(formattedStaffs);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, "staffs.xlsx");
};

export function ImportStaffsModal({ onClose }: { onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleFileDownload = () => {
    // Define the path to your existing file in the public folder
    setError(null);
    const filePath = "/public/demo.xlsx";

    // Fetch the file as a Blob (this ensures it downloads)
    fetch(filePath)
      .then((response) => response.blob()) // Convert the response to a Blob
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob); // Create a URL for the Blob
        link.download = "staffs.xlsx"; // Specify the file name to save as
        link.click(); // Trigger the download
      })
      .catch((err) => console.error("Error downloading the file", err));
  };

  const handleFileUpload = async () => {
    setIsLoading(true);
    setError(null);
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    try {
      const res = await processWithAuth(
        "post",
        `${Endpoints.addNewStaff}/bulk/${companyCode}`,
        {},
        undefined,
        file
      );
      console.log(res, "res -->");
      toast.success("Staffs imported successfully", {
        toastId: "uploadSuccess",
        position: "top-right",
        pauseOnHover: true,
      });
      onClose();
    } catch (error: any) {
      console.log(error, "error -->");
      if (error) {
        setIsLoading(false);
        setError(error.error);
        toast.error(error.error, {
          toastId: "uploadError",
          position: "top-right",
          pauseOnHover: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      {/* <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="w-5 h-5" />
        </button> */}
      <div className="bg-white p-3 rounded-lg border border-[#D8E7F2]">
        <label
          className="border-2 border-dashed border-gray-300 rounded-lg flex gap-2 items-center justify-center p-6 py-10 text-blue-500 cursor-pointer hover:bg-gray-100 bg-[#F7FAFF] text-sm"
          htmlFor="file-input"
        >
          <DocumentArrowUpIcon className=" stroke-[2.6px] text-[#016BB5] size-3" />
          <input
            type="file"
            accept=".xlsx"
            className="hidden"
            id="file-input"
            name="file"
            onChange={handleFileChange}
          />
          {file ? (
            <span className="text-xs text-gray-600">
              {file.name} - {file.size} bytes
            </span>
          ) : (
            <span className="text-xs text-gray-600">Upload Staffs</span>
          )}
          <span className="underline">choose CSV file</span>
        </label>

        <div className="bg-[#F5F5F5] p-4 py-8 rounded-lg mt-4 flex flex-col">
          <p className="font-semibold flex items-center gap-2 text-sm text-gray-600">
            <Image
              src={"/excel-export.png"}
              width={20}
              height={20}
              alt="excel"
            />
            Sample format
          </p>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600 max-w-xs">
              Download this sample CSV file to see the required format. Ensure
              all fields are filled for a successful import.
            </p>
            <button
              onClick={handleFileDownload}
              className="rounded-full border-[#757575] border h-10 w-10 flex items-center justify-center"
            >
              <ArrowDownTrayIcon className="text-[#757575] size-4" />
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="h-8 cursor-pointer rounded-md px-3 text-xs  text-red-200 bg-red-600 hover:bg-red-900"
          >
            Cancel
          </button>
          <button
            disabled={!file || isLoading}
            onClick={handleFileUpload}
            className=" h-8 min-w-[80px] flex items-center justify-center cursor-pointer rounded-md px-3 text-xs  text-blue-200 bg-blue-600 hover:bg-blue-900 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <SpinnerTwo className="h-4 w-4 animate-spin text-white !mx-auto " />
            ) : (
              <span>Upload</span>
            )}
          </button>
        </div>
      {error && (
        <div className="text-red-500 text-sm mt-2 leading-relaxed">
          <p>{error}</p>
        </div>
      )}
      </div>
    </div>
  );
}
