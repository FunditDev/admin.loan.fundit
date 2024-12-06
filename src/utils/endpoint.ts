import { register } from "module";
import { get } from "node_modules/axios/index.cjs";

export const Endpoints = {
  loginAdmin: "/v2/smartcash/admin/login",
  registerAdmin: "/v2/smartcash/admin/register",
  resendVerification: "/v2/smartcash/admin/resendVerification",
  verifyEmail: "/v2/smartcash/admin/verifyEmail",
  getAllStaffLoans: "/v2/smartcash/admin/getAllStaffLoans",
  getStaffLoans: "/v2/smartcash/getStaffLoans",
  getAllStaff: "/v2/smartcash/admin/getAllStaff",
  getStaff: "/v2/smartcash/admin/getStaff",
  updateStaff: "/v2/smartcash/admin/updateStaff",
  confirmUpdate: "/v2/smartcash/admin/confirmUpdate",
  updateAndApprove: "/v2/smartcash/admin/updateAndApprove",
  rejectUpdate: "/v2/smartcash/admin/rejectUpdate",
  deleteStaff: "/v2/smartcash/admin/deleteStaff",
  viewAllLoans: "/v2/smartcash/admin/viewAllLoans",
  viewLoanDueByCurrentMonth: "/v2/smartcash/admin/LoanDueByCurrentMonth",
  viewOutstandingLoans: "/v2/smartcash/admin/viewOutstandingLoans",
  getDashboardData: "/v2/smartcash/admin/getDashboardData",
  getSingleStaffLoanById: "/v2/smartcash/getSingleStaffLoan",
  addNewStaff:"/v2/smartcash/admin/add-staff",
  bulkUploadStaff: "/v2/smartcash/admin/bulkUploadStaff",
  getPendingUpdate: "/v2/smartcash/admin/getPendingUpdate",
  logout: "/v2/smartcash/admin/logout",
  resetTempPassword: "/v2/smartcash/admin/resetTempPassword",
  sendResetToken: "/v2/smartcash/admin/resetPassword",
  confirmResetPassword: "/v2/smartcash/admin/confirmPasswordReset",
  
};
