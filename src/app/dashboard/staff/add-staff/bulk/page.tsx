"use client";
import { Endpoints } from "@/utils/endpoint";
import { processWithAuth } from "@/utils/http";
import path from "path";
import React from "react";
import { start } from "repl";
import * as XLSX from "xlsx";

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
    return
    const file = e.target.files[0]; // Get the uploaded file

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event: any) {
        const data = new Uint8Array(event?.target.result as any); // Read file data as an array buffer
        const workbook = XLSX.read(data, { type: "array" }); // Parse the Excel file

        // Assuming you're reading the first sheet:
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert sheet to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setParsedData(jsonData); // Set the parsed data to state
      };

      reader.readAsArrayBuffer(file); // Read the file as an array buffer
    }
  };

  const handleUpload = async () => {
    let stoppedNumber = 0;
    return
    for (let i = 0; i < parsedData.length; i++) {
      try {
        //   if (i > 2) {
        //     return;
        //   }
        const staff = parsedData[i];

        const res = await processWithAuth("post", Endpoints.addNewStaff, {
          staffId: staff.EMPLOYEE_NUMBER.toString(),
          firstName: staff.First_Name,
          lastName: staff.Last_Name,
          staffEmail: staff.EMAIL_ADDRESS,
          earnings: staff.Monthly_Payment_to_Smartcash,
          bvn: staff.BVN.toString(),
          bankAccount: staff.ACCOUNT_NO.toString(),
          legalEmployer: staff.Legal_Employer,
          bankName: "Smartcash Wallet",
        });
        console.log(res, "res -->");
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
return(
  <div className="">howdy !</div>
)
  return (
    <div>
      <input
        type="file"
        name="sc-file"
        id="upload sc file"
        onChange={handleFileUpload}
      />
      <button onClick={() => handleUpload()}>Upload</button>
    </div>
  );
};

export default BulkUpload;
