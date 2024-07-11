import { get } from "node_modules/axios/index.cjs";

export const Endpoints = {
  loginAdmin: "/v2/smartcash/adminLogin",
  getAllStaffLoans: "/v2/smartcash/getAllStaffLoans",
  getStaffLoans: "/v2/smartcash/getStaffLoans",
  getAllStaff: "/v2/smartcash/getAllStaff",
  getStaff: "/v2/smartcash/getStaff",
  updateStaff: "/v2/smartcash/updateStaff",
  deleteStaff: "/v2/smartcash/deleteStaff",
  viewAllLoans: "/v2/smartcash/viewAllLoans",
  viewLoanDueByCurrentMonth: "/v2/smartcash/LoanDueByCurrentMonth",
  viewOutstandingLoans: "/v2/smartcash/viewOutstandingLoans",
  getDashboardData: "/v2/smartcash/getDashboardData",
  getSingleStaffLoanById: "/v2/smartcash/getSingleStaffLoan",
  
};
