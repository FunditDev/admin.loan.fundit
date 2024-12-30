"use client";
import { Endpoints } from "@/utils/endpoint";
import { processWithAuth } from "@/utils/http";
import React from "react";
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

  // Function to upload a single row of data to the server
  const handleFileUpload = (e: any) => {
    // return
    const file = e.target.files[0]; // Get the uploaded file

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event: any) {
        const data = new Uint8Array(event?.target.result as any); // Read file data as an array buffer
        const workbook = XLSX.read(data); // Parse the Excel file

        // Assuming you're reading the first sheet:
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setParsedData(jsonData);
        // extractCreditiumData(jsonData); // Set the parsed data to state
      };

      reader.readAsArrayBuffer(file); // Read the file as an array buffer
    }
  };
  const extractCreditiumData = (jsonData: any[]) => {
    // Filter out the rows containing the "Creditium" header and extract relevant data
    console.log(jsonData, "jsonData -->");
    const creditiumData = jsonData
      .filter((row) => row["Creditium"]) // Adjust to match the header name exactly
      .map((row) => ({
        staffId: row["staffId"], // Replace with actual column name from your Excel
        accountNumber: row["account numbers"], // Replace with actual column name
      }));

    setParsedData(creditiumData); // Set extracted data
    console.log("Extracted Data:", creditiumData);
  };
  console.log(parsedData, "parsedData -->");

  const handleUpload = async () => {
    // return
    let stoppedNumber = 0;
    for (let i = 26; i < parsedData.length; i++) {
      try {
        //   if (i > 2) {
        //     return;
        //   }
        const staff = parsedData[i];
        // return
        if (!staff) {
          return;
        }

        const res = await processWithAuth(
          "post",
          `${Endpoints.addNewStaff}/${companyCode}`,
          {
            staffId: staff["EMPLOYEE_NUMBER"].toString(),
            firstName: staff["First Name"],
            lastName: staff["Last Name"],
            staffEmail: staff["EMAIL_ADDRESS"],
            earnings: staff["Monthly Payment"],
            bvn: staff["BVN"].toString(),
            bankAccount: staff["Account Number"].toString(),
            legalEmployer: staff["LEGAL_EMPLOYER_NAME"],
            bankName: "Smartcash Wallet",
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
      </div>
    </div>
  );
};

export default BulkUpload;
