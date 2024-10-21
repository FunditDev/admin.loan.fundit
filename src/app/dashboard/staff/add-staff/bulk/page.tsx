"use client";
import { Endpoints } from "@/utils/endpoint";
import { processWithAuth } from "@/utils/http";
import path from "path";
import React from "react";
import * as XLSX from "xlsx";

const BulkUpload = () => {
  const parseExcel = (filePath: string) => {
    const workbook = XlSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;

    const parsedData = XlSX.utils.sheet_to_json(workbook.Sheets[sheetNames[0]]); // Parse the first sheet
    return parsedData;
  };

  const [parsedData, setParsedData] = React.useState<any[]>([]);

  // Function to upload a single row of data to the server
  const handleFileUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file

    if (file) {
      const reader = new FileReader();

      reader.onload = function (event) {
        const data = new Uint8Array(event.target.result); // Read file data as an array buffer
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
    for (let i = 0; i < parsedData.length; i++) {
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
        bankName:'Smartcash Wallet'

      });
      console.log(res, "res -->");
    }
    // for (const staff of parsedData) {
    //   const res = await processWithAuth("post", Endpoints.bulkUploadStaff, {
    //     staffId: staff.EMPLOYEE_NUMBER,
    //     firstName: staff.First_Name,
    //     lastName: staff.Last_Name,
    //     email: staff.EMAIL_ADDRESS,
    //     earnings: staff.Monthly_Payment_to_Smartcash,
    //     bvn: staff.BVN,
    //     bankAccount: staff.ACCOUNT_NO,
    //     legalEmployer: staff.Legal_Employer,
    //   });
    //   return {
    //     status: res.status,
    //     data: res.data,
    //   };
    //   console.log(res, "res -->");
    // }
  };

  console.log(parsedData, "parsedData -->");
  return (
    <div>
      <input
        type="file"
        name="sc-file"
        id="upload sc file"
        onChange={handleFileUpload}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default BulkUpload;
