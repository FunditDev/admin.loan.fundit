import { register } from "module";
import { get } from "node_modules/axios/index.cjs";

export const Endpoints = {
  loginAdmin: "/v2/smartcash/adminLogin",
  registerAdmin: "/v2/smartcash/registerAdmin",
  getAllStaffLoans: "/v2/smartcash/getAllStaffLoans",
  getStaffLoans: "/v2/smartcash/getStaffLoans",
  getAllStaff: "/v2/smartcash/getAllStaff",
  getStaff: "/v2/smartcash/getStaff",
  updateStaff: "/v2/smartcash/updateStaff",
  confirmUpdate: "/v2/smartcash/confirmUpdate",
  updateAndApprove: "/v2/smartcash/updateAndApprove",
  rejectUpdate: "/v2/smartcash/rejectUpdate",
  deleteStaff: "/v2/smartcash/deleteStaff",
  viewAllLoans: "/v2/smartcash/viewAllLoans",
  viewLoanDueByCurrentMonth: "/v2/smartcash/LoanDueByCurrentMonth",
  viewOutstandingLoans: "/v2/smartcash/viewOutstandingLoans",
  getDashboardData: "/v2/smartcash/getDashboardData",
  getSingleStaffLoanById: "/v2/smartcash/getSingleStaffLoan",
  addNewStaff:"/v2/smartcash/add-staff",
  getPendingUpdate: "/v2/smartcash/getPendingUpdate",
  logout: "/v2/smartcash/logout",

  
};
