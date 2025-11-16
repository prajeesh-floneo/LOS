# Loan Origination System - Business Rules Reference

## Quick Reference Card

### Age-Based Eligibility

| Age Range | Eligible Loan Types |
|-----------|-------------------|
| < 24 | Automobile only |
| 24-50 | All types (Housing, Personal, Property, Automobile) |
| 50-60 | All types except Personal |
| > 60 | Not eligible |

### Employment Requirements

| Employment Status | Eligibility |
|------------------|-------------|
| Employed | ✓ Eligible (if income > 0) |
| Self-Employed | ✓ Eligible (if income > 0) |
| Unemployed | ✗ Not eligible |
| Retired | ✓ Eligible (if age ≤ 60 and income > 0) |
| No Income ($0) | ✗ Not eligible |

### Loan Amount Calculations

| Loan Type | Maximum Amount |
|-----------|---------------|
| Personal | 20% of annual income |
| Automobile | 40% of annual income |
| Housing | 50% of annual income |
| Property | 50% of annual income |

### Tenure Periods

| Age Range | Repayment Period |
|-----------|-----------------|
| 24-39 | 20 years |
| 40-49 | 15 years |
| 50-60 | 10 years |
| < 24 | 20 years (automobile only) |

### Interest Rates

#### Housing & Property Loans
| Age Range | Interest Rate |
|-----------|--------------|
| 24-39 | 8.0% |
| 40-49 | 8.5% |
| 50-60 | 9.0% |

#### Automobile Loans
| Age Range | Interest Rate |
|-----------|--------------|
| < 24 | 7.0% |
| 24-39 | 7.0% |
| 40-49 | 8.0% |
| 50-60 | 9.5% |

#### Personal Loans
| Age Range | Interest Rate |
|-----------|--------------|
| 24-50 | 6.5% |

## Calculation Examples

### Example 1: Age 30, Income $100,000
- **Personal Loan:** $20,000 @ 6.5% for 20 years = $150.53/month
- **Automobile Loan:** $40,000 @ 7.0% for 20 years = $310.08/month
- **Housing Loan:** $50,000 @ 8.0% for 20 years = $418.22/month
- **Property Loan:** $50,000 @ 8.0% for 20 years = $418.22/month

### Example 2: Age 45, Income $150,000
- **Personal Loan:** $30,000 @ 6.5% for 15 years = $261.41/month
- **Automobile Loan:** $60,000 @ 8.0% for 15 years = $573.39/month
- **Housing Loan:** $75,000 @ 8.5% for 15 years = $738.99/month
- **Property Loan:** $75,000 @ 8.5% for 15 years = $738.99/month

### Example 3: Age 55, Income $200,000
- **Automobile Loan:** $80,000 @ 9.5% for 10 years = $1,025.84/month
- **Housing Loan:** $100,000 @ 9.0% for 10 years = $1,266.76/month
- **Property Loan:** $100,000 @ 9.0% for 10 years = $1,266.76/month

## Validation Rules

### Required Fields
- ✓ First Name (non-empty string)
- ✓ Last Name (non-empty string)
- ✓ Date of Birth (valid date)
- ✓ Employment Type (employed/self-employed/unemployed/retired)
- ✓ Annual Income (number ≥ 0)

### Business Validations
1. Age must be calculated from date of birth
2. Employment type must be valid enum value
3. Annual income must be non-negative
4. Unemployed applicants automatically rejected
5. Zero income applicants automatically rejected
6. Age over 60 automatically rejected

## Response Format

### Successful Application
```json
{
  "userDetails": {
    "fullName": "string",
    "age": number,
    "employmentType": "string",
    "annualIncome": number
  },
  "eligibility": {
    "isEligible": true,
    "eligibleLoanTypes": ["array of loan types"]
  },
  "quotes": [
    {
      "loanType": "string",
      "eligibleAmount": number,
      "tenureYears": number,
      "interestRate": number,
      "monthlyPayment": number,
      "totalPayment": number
    }
  ]
}
```

### Rejected Application
```json
{
  "userDetails": { ... },
  "eligibility": {
    "isEligible": false,
    "eligibleLoanTypes": []
  },
  "ineligibilityReason": "string explaining why"
}
```

## Monthly Payment Formula

```
M = P × [r(1 + r)^n] / [(1 + r)^n - 1]

Where:
M = Monthly payment
P = Principal (loan amount)
r = Monthly interest rate (annual rate / 12 / 100)
n = Number of payments (years × 12)
```

## Edge Cases Handled

1. **Leap year birthdays** - Correctly calculates age
2. **Same day birthday** - Counts as having reached that age
3. **Zero income** - Rejected regardless of employment type
4. **Boundary ages** - Correctly handles ages 24, 40, 50, 60
5. **Multiple loan types** - Generates separate quotes for each eligible type
6. **Webhook failures** - Application continues even if webhook fails
7. **Invalid dates** - Form validation prevents submission
8. **Negative income** - Form validation prevents negative values

## Testing Coverage

✅ Age calculation accuracy  
✅ All eligibility scenarios  
✅ Loan amount calculations  
✅ Tenure period assignments  
✅ Interest rate assignments  
✅ Monthly payment calculations  
✅ Quote generation completeness  
✅ Edge case handling  

Total: 20 automated tests, all passing

