export interface LoginType {
  staffId: string;
  password: string;
}

export type tokenType = "token" | "refreshToken"| "staff";
export type LoansType = {
  staff: {
    staffId: string;
    staffName: string;
    staffEmail: string;
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
    originalAmount:string;
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

export type Updatetype =
{
  staffId: string;
  firstName: string;
  lastName: string;
  staffEmail: string;
  earnings: string;
  isPendingUpdate: boolean;
  updateType: "UPDATE" | "DELETE";

}

