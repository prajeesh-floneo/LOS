import {
  calculateAge,
  checkEligibility,
  calculateMaxLoanAmount,
  calculateTenure,
  calculateInterestRate,
  calculateMonthlyPayment,
  generateLoanQuote,
} from '../loanCalculator';

describe('Loan Calculator Tests', () => {
  describe('calculateAge', () => {
    it('should calculate age correctly', () => {
      const dob = '1990-01-01';
      const age = calculateAge(dob);
      expect(age).toBeGreaterThanOrEqual(34);
    });
  });

  describe('checkEligibility', () => {
    it('should reject unemployed users', () => {
      const result = checkEligibility(30, 'unemployed', 0, 'John Doe');
      expect(result.isEligible).toBe(false);
      expect(result.ineligibilityReason).toContain('unemployed');
    });

    it('should reject users with no income', () => {
      const result = checkEligibility(30, 'employed', 0, 'John Doe');
      expect(result.isEligible).toBe(false);
      expect(result.ineligibilityReason).toContain('No income');
    });

    it('should allow only automobile loans for users under 24', () => {
      const result = checkEligibility(22, 'employed', 50000, 'Jane Doe');
      expect(result.isEligible).toBe(true);
      expect(result.eligibleLoanTypes).toEqual(['automobile']);
    });

    it('should allow all loan types for users aged 24-50', () => {
      const result = checkEligibility(35, 'employed', 50000, 'John Smith');
      expect(result.isEligible).toBe(true);
      expect(result.eligibleLoanTypes).toContain('housing');
      expect(result.eligibleLoanTypes).toContain('personal');
      expect(result.eligibleLoanTypes).toContain('property');
      expect(result.eligibleLoanTypes).toContain('automobile');
    });

    it('should allow all loan types for users aged 50-60', () => {
      const result = checkEligibility(55, 'employed', 50000, 'Mary Johnson');
      expect(result.isEligible).toBe(true);
      expect(result.eligibleLoanTypes.length).toBe(4);
    });

    it('should reject users over 60', () => {
      const result = checkEligibility(65, 'employed', 50000, 'Bob Senior');
      expect(result.isEligible).toBe(false);
      expect(result.ineligibilityReason).toContain('over 60');
    });
  });

  describe('calculateMaxLoanAmount', () => {
    it('should calculate 20% for personal loans', () => {
      expect(calculateMaxLoanAmount('personal', 100000)).toBe(20000);
    });

    it('should calculate 40% for automobile loans', () => {
      expect(calculateMaxLoanAmount('automobile', 100000)).toBe(40000);
    });

    it('should calculate 50% for housing loans', () => {
      expect(calculateMaxLoanAmount('housing', 100000)).toBe(50000);
    });

    it('should calculate 50% for property loans', () => {
      expect(calculateMaxLoanAmount('property', 100000)).toBe(50000);
    });
  });

  describe('calculateTenure', () => {
    it('should return 20 years for age 24-39', () => {
      expect(calculateTenure(30)).toBe(20);
      expect(calculateTenure(24)).toBe(20);
      expect(calculateTenure(39)).toBe(20);
    });

    it('should return 15 years for age 40-49', () => {
      expect(calculateTenure(40)).toBe(15);
      expect(calculateTenure(45)).toBe(15);
      expect(calculateTenure(49)).toBe(15);
    });

    it('should return 10 years for age 50-60', () => {
      expect(calculateTenure(50)).toBe(10);
      expect(calculateTenure(55)).toBe(10);
      expect(calculateTenure(60)).toBe(10);
    });

    it('should return 20 years for under 24', () => {
      expect(calculateTenure(22)).toBe(20);
    });
  });

  describe('calculateInterestRate', () => {
    it('should return correct rates for housing loans', () => {
      expect(calculateInterestRate('housing', 30)).toBe(8.0);
      expect(calculateInterestRate('housing', 45)).toBe(8.5);
      expect(calculateInterestRate('housing', 55)).toBe(9.0);
    });

    it('should return correct rates for automobile loans', () => {
      expect(calculateInterestRate('automobile', 22)).toBe(7.0);
      expect(calculateInterestRate('automobile', 30)).toBe(7.0);
      expect(calculateInterestRate('automobile', 45)).toBe(8.0);
      expect(calculateInterestRate('automobile', 55)).toBe(9.5);
    });

    it('should return 6.5% for personal loans aged 24-50', () => {
      expect(calculateInterestRate('personal', 30)).toBe(6.5);
      expect(calculateInterestRate('personal', 50)).toBe(6.5);
    });
  });

  describe('calculateMonthlyPayment', () => {
    it('should calculate monthly payment correctly', () => {
      const payment = calculateMonthlyPayment(100000, 8, 20);
      expect(payment).toBeGreaterThan(0);
      expect(payment).toBeCloseTo(836.44, 1);
    });
  });

  describe('generateLoanQuote', () => {
    it('should generate complete loan quote', () => {
      const quote = generateLoanQuote('housing', 35, 100000, 'John Doe');
      expect(quote.fullName).toBe('John Doe');
      expect(quote.age).toBe(35);
      expect(quote.loanType).toBe('housing');
      expect(quote.eligibleAmount).toBe(50000);
      expect(quote.tenureYears).toBe(20);
      expect(quote.interestRate).toBe(8.0);
      expect(quote.monthlyPayment).toBeGreaterThan(0);
      expect(quote.totalPayment).toBeGreaterThan(quote.eligibleAmount);
    });
  });
});

