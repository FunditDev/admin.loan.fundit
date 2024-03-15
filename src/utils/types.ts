export interface LoginType {
  staffId: string;
  password: string;
}

export type tokenType = "token" | "refreshToken";
export type LoansType = {
  staffId: string;
  staffName: string;
  staffEmail: string;
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
  staffName: string;
  staffEmail: string;
  monthlySalary: number;
}
