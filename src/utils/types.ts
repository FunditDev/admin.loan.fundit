export interface LoginType {
  staffId: string;
  password: string;
}

export type tokenType = "token" | "refreshToken";
export type LoansType = {
  staffId: string;
  staffName: string;
  staffEmail: string;
  amount: string;
  createdDate: string;
  loanStatus: string;
  loanId: string;
  loanTenure: {
    month: number;
      amount: string;
      repaymentDate: Date;
      amountPaid: number;
      interestPenalty: number;
      fullyPaid: boolean;
      dateFullyPaid: Date;
  }[];
  message: string;
  scorePercent: number;
  totalRepayment: string;
  amountPaid: number;
  repayment: {
    repaymentAmount: number;
    date: Date;
  }[];
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

export type Stafftype ={
  staffId: string;
  firstName: string;
  lastName: string;
  staffEmail: string;
  monthlySalary: number;
}
