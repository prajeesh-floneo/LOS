import { 
  LoanApplicationInput, 
  LoanEligibility, 
  LoanQuote, 
  LoanType,
  LoanApplicationResult 
} from '@/types/loan';

/**
 * Calculate age from date of birth
 */
export function calculateAge(dateOfBirth: string): number {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Determine loan eligibility based on age and employment
 */
export function checkEligibility(
  age: number,
  employmentType: string,
  annualIncome: number,
  fullName: string
): LoanEligibility {
  // Check employment and income
  if (employmentType === 'unemployed' || annualIncome <= 0) {
    return {
      isEligible: false,
      eligibleLoanTypes: [],
      ineligibilityReason: 'No income or unemployed - not eligible for any loan',
      age,
      fullName
    };
  }

  // Age-based eligibility
  if (age < 24) {
    return {
      isEligible: true,
      eligibleLoanTypes: ['automobile'],
      age,
      fullName
    };
  } else if (age >= 24 && age <= 60) {
    return {
      isEligible: true,
      eligibleLoanTypes: ['housing', 'personal', 'property', 'automobile'],
      age,
      fullName
    };
  } else {
    return {
      isEligible: false,
      eligibleLoanTypes: [],
      ineligibilityReason: 'Age over 60 - not eligible for any loan',
      age,
      fullName
    };
  }
}

/**
 * Calculate maximum loan amount based on loan type and annual income
 */
export function calculateMaxLoanAmount(loanType: LoanType, annualIncome: number): number {
  switch (loanType) {
    case 'personal':
      return annualIncome * 0.20; // 20%
    case 'automobile':
      return annualIncome * 0.40; // 40%
    case 'housing':
    case 'property':
      return annualIncome * 0.50; // 50%
    default:
      return 0;
  }
}

/**
 * Determine tenure period based on age
 */
export function calculateTenure(age: number): number {
  if (age >= 24 && age < 40) {
    return 20;
  } else if (age >= 40 && age < 50) {
    return 15;
  } else if (age >= 50 && age <= 60) {
    return 10;
  } else if (age < 24) {
    return 20; // For automobile loans for under 24
  }
  return 0;
}

/**
 * Calculate interest rate based on loan type and age
 */
export function calculateInterestRate(loanType: LoanType, age: number): number {
  if (loanType === 'housing' || loanType === 'property') {
    if (age >= 24 && age < 40) return 8.0;
    if (age >= 40 && age < 50) return 8.5;
    if (age >= 50 && age <= 60) return 9.0;
  } else if (loanType === 'automobile') {
    if (age < 24) return 7.0; // For under 24
    if (age >= 24 && age < 40) return 7.0;
    if (age >= 40 && age < 50) return 8.0;
    if (age >= 50 && age <= 60) return 9.5;
  } else if (loanType === 'personal') {
    if (age >= 24 && age <= 50) return 6.5;
  }
  return 0;
}

/**
 * Calculate monthly payment using loan amortization formula
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment;
}

/**
 * Generate loan quote for a specific loan type
 */
export function generateLoanQuote(
  loanType: LoanType,
  age: number,
  annualIncome: number,
  fullName: string
): LoanQuote {
  const eligibleAmount = calculateMaxLoanAmount(loanType, annualIncome);
  const tenureYears = calculateTenure(age);
  const interestRate = calculateInterestRate(loanType, age);
  const monthlyPayment = calculateMonthlyPayment(eligibleAmount, interestRate, tenureYears);
  const totalPayment = monthlyPayment * tenureYears * 12;

  return {
    fullName,
    age,
    loanType,
    eligibleAmount,
    tenureYears,
    interestRate,
    monthlyPayment,
    totalPayment
  };
}

