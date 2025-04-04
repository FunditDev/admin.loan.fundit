"use client";
import { getResponseErrorMessage } from "@/utils/data-utils";
import { Endpoints } from "@/utils/endpoint";
import { processWithAuth } from "@/utils/http";
import React from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const companyCode = process.env.NEXT_PUBLIC_COMPANY_CODE;
const BulkUpload = () => {
  const parseExcel = (filePath: string) => {
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;

    const parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]); // Parse the first sheet
    return parsedData;
  };

  const [parsedData, setParsedData] = React.useState<any[]>([]);
  const [startNumber, setStartNumber] = React.useState(0);
  const [errMessage, setErrMessage] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<any>(null);

  // Function to upload a single row of data to the server
  const handleFileUpload = (e: any) => {
    // return
    const file = e.target.files[0]; // Get the uploaded file
    setFile(file);
  };

  const handleUpload = async () => {
    try {
      const res = await processWithAuth(
        "post",
        `${Endpoints.addNewStaff}/bulk/${companyCode}`,
        {},
        undefined,
        file
      );
      console.log(res, "res -->");
    } catch (error: any) {
      console.log(error, "error -->");
      if (error) {
        setError(error.error);
        toast.error(error.error, {
          toastId: "uploadError",
          position: "top-right",
          pauseOnHover: true,
        });
      }
    }
  };
  const handleUpdateUpload = async () => {
    // return
    let stoppedNumber = 0;
    for (let i = 93; i < 100; i++) {
      try {
        //   if (i > 2) {
        //     return;
        //   }
        const staff = parsedData[i];
        console.log(staff);
        const res = await processWithAuth(
          "post",
          `${Endpoints.updateAndApprove}/${companyCode}`,
          {
            staffId: staff["Staff Id"].toString(),
            nuban: staff.Nuban,
          }
        );
        console.log(res, "res -->", i);
      } catch (error: any) {
        console.log(error, "error -->");
        if (error) {
          stoppedNumber = i;
          console.log(`stopped at ${stoppedNumber}`);
          break;
        }
      }
      // return;
    }
  };
  // return(
  //   <div className="">howdy !</div>
  // )
  return (
    <div className="flex flex-col gap-3 py-6">
      <input
        type="file"
        name="sc-file"
        id="upload sc file"
        onChange={handleFileUpload}
      />

      <div className="flex gap-8">
        <button onClick={handleUpload} className="bg-green-500 py-2 px-2">
          Upload New Staff
        </button>
        {/* <button
          className="bg-orange-500 py-2 px-2"
          onClick={handleUpdateUpload}
          >
          Bulk Update Staff
          </button> */}
      </div>
      {errMessage && <p className="text-red-500">{errMessage}</p>}
      {/* /excel format for uploading new staff */}
      <div className="flex flex-col gap-3">
        <h1>Excel format for uploading new staff</h1>
        {/* table */}
        <div className="overflow-x-auto min-h-[100px]">
          <table className="border border-collapse w-full whitespace-nowrap table-auto">
            <thead>
              <tr className="*:px-2 *:py-2 *:border ">
                <th>EMPLOYEE_NUMBER</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>EMAIL_ADDRESS</th>
                <th>Monthly Payment</th>
                <th>BVN</th>
                <th>Account Number</th>
                <th>LEGAL_EMPLOYER_NAME</th>
              </tr>
            </thead>
            <tbody>
              <tr className="*:px-2 *:py-2 *:border *:text-center">
                <td>363636</td>
                <td>John</td>
                <td>Doe</td>
                <td>johndoe@airtel.com.ng </td>
                <td>100000</td>
                <td>1234567890</td>
                <td>22345678901</td>
                <td>Airtel Nigeria</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-500">
          Note: The first row of the excel file should contain the headers
          above.
        </p>
        {error && (
          <p className="text-red-500">{JSON.stringify(error, null, 2)}</p>
        )}
      </div>
    </div>
  );
};

export default BulkUpload;
