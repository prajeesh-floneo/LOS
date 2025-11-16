export type EmploymentType =
  | "salaried"
  | "self-employed"
  | "freelancer"
  | "unemployed"
  | "retired";

export type LoanType = "housing" | "personal" | "property" | "automobile";

export type Gender = "male" | "female" | "other" | "prefer-not-to-say";

export type MaritalStatus = "single" | "married" | "divorced" | "widowed";

export interface LoanApplicationInput {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  maritalStatus: MaritalStatus;
  phoneNumber: string;
  email: string;
  employmentType: EmploymentType;
  annualIncome: number;
  requestedLoanType?: LoanType;
  expectedLoanAmount?: number;
  preferredTenure?: number;
}

export interface LoanEligibility {
  isEligible: boolean;
  eligibleLoanTypes: LoanType[];
  ineligibilityReason?: string;
  age: number;
  fullName: string;
}

export interface LoanQuote {
  fullName: string;
  age: number;
  loanType: LoanType;
  eligibleAmount: number;
  tenureYears: number;
  interestRate: number;
  monthlyPayment: number;
  totalPayment: number;
}

export interface LoanApplicationResult {
  userDetails: {
    fullName: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    age: number;
    gender: Gender;
    maritalStatus: MaritalStatus;
    phoneNumber: string;
    email: string;
    employmentType: EmploymentType;
    annualIncome: number;
    requestedLoanType?: LoanType;
    expectedLoanAmount?: number;
    preferredTenure?: number;
  };
  eligibility: LoanEligibility;
  quotes: LoanQuote[];
  ineligibilityReason?: string;
}
