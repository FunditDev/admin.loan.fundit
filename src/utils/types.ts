export interface LoginType {
  staffId: string;
  password: string;
}
export type ResetType={
  email:string
}
export interface Registertype {
  staffId: string;
  password: string;
  firstName: string;
  lastName: string;
  staffEmail: string;
}

export type tokenType = "token" | "refreshToken" | "staff";
export type LoansType = {
  staff: {
    staffId: string;
    staffName: string;
    staffEmail: string;
    bankAccount: string;
    bvn: string;
  };
  staffId: string;
  amount: string;
  amountRequested: string;
  createdDate: string;
  loanId: string;
  loanStatus: string;
  acceptanceMessage: string;
  loanTenure: {
    month: number;
    amount: string;
    repaymentDate: Date;
    amountPaid: number;
    interestPenalty: number;
    fullyPaid: boolean;
    dateFullyPaid: Date;
    partialPayment: number;
    originalAmount: string;
  }[];
  message: string;
  scorePercent: number;
  totalRepayment: string;
  amountPaid: number;
  repayment: {
    repaymentAmount: number;
    date: Date;
  }[];
  fullyPaid: boolean;
  interestPenalty: number;
  pendingLoanId: string;
  nextRepaymentAmount: number;
  paymentType: "Liquidation" | "Repayment";
};
export type LoanType = {
  amount: number;
  createdDate: string;
  loanStatus: string;
  loanId: string;
  loanTenure: {
    month: number;
    amount: string;
  }[];
  message: string;
  scorePercent: number;
  totalRepayment: string;
};

export type Stafftype = {
  staffId: string;
  firstName: string;
  lastName: string;
  staffEmail: string;
  earnings: number;
};

export type PendingStaffUpdate = {
  isPendingUpdate: boolean;
  updateType: "UPDATE" | "DELETE";
} & Stafftype;

export type Updatetype = {
  staffId: string;
  firstName: string;
  lastName: string;
  staffEmail: string;
  earnings: string;
  isPendingUpdate: boolean;
  updateType: "UPDATE" | "DELETE";
};

export type ResetTemporaryPasswordType = {
  email: string;
  oldPassword: string;
  password: string;
  confirmPassword: string;
};
export type SignUpType = {};

export enum FilterTypes {
  All = "All",
  Running = "Running",
  DueThisMonth = "Due This Month",
  Matured = "Matured",
  DateTaken = "Date Taken",
  Disbursed = "Disbursed",
  Pending = "Pending",
  Rejected = "Rejected",
  NonDisbursed = "Non Disbursed",
  Outstanding = "Outstanding",
  // DateDisbursed = "Date Disbursed",
  Liquidated = "Liquidated",
}

export type OtherFiltersTypes = `${FilterTypes}`;
