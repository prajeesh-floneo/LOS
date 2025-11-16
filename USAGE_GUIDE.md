# Loan Origination System - Usage Guide

## Quick Start

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3000` (or the port shown in the terminal)

3. **Fill out the loan application form:**
   - Enter your first name and last name
   - Select your date of birth
   - Choose your employment type
   - Enter your annual income

4. **Submit and view results:**
   - Click "Submit Application"
   - View your eligibility status
   - Review personalized loan quotes

## Test Scenarios

### Scenario 1: Young Professional (Under 24)
**Input:**
- Name: Sarah Johnson
- Date of Birth: 2002-05-15 (Age: 22)
- Employment: Employed
- Annual Income: $45,000

**Expected Result:**
- ✓ Eligible for: Automobile loan only
- Automobile loan: $18,000 (40% of income)
- Tenure: 20 years
- Interest Rate: 7%

### Scenario 2: Mid-Career Professional (24-40)
**Input:**
- Name: Michael Chen
- Date of Birth: 1990-03-20 (Age: 34)
- Employment: Self-Employed
- Annual Income: $80,000

**Expected Result:**
- ✓ Eligible for: All loan types
- Personal loan: $16,000 (20% of income) at 6.5%
- Automobile loan: $32,000 (40% of income) at 7%
- Housing loan: $40,000 (50% of income) at 8%
- Property loan: $40,000 (50% of income) at 8%
- Tenure: 20 years

### Scenario 3: Experienced Professional (40-50)
**Input:**
- Name: Jennifer Martinez
- Date of Birth: 1980-08-10 (Age: 44)
- Employment: Employed
- Annual Income: $120,000

**Expected Result:**
- ✓ Eligible for: All loan types
- Personal loan: $24,000 (20% of income) at 6.5%
- Automobile loan: $48,000 (40% of income) at 8%
- Housing loan: $60,000 (50% of income) at 8.5%
- Property loan: $60,000 (50% of income) at 8.5%
- Tenure: 15 years

### Scenario 4: Senior Professional (50-60)
**Input:**
- Name: Robert Williams
- Date of Birth: 1970-12-05 (Age: 54)
- Employment: Employed
- Annual Income: $150,000

**Expected Result:**
- ✓ Eligible for: All loan types
- Personal loan: Not available (age > 50)
- Automobile loan: $60,000 (40% of income) at 9.5%
- Housing loan: $75,000 (50% of income) at 9%
- Property loan: $75,000 (50% of income) at 9%
- Tenure: 10 years

### Scenario 5: Unemployed Applicant
**Input:**
- Name: David Brown
- Date of Birth: 1985-06-15 (Age: 39)
- Employment: Unemployed
- Annual Income: $0

**Expected Result:**
- ✗ Not Eligible
- Reason: "No income or unemployed - not eligible for any loan"

### Scenario 6: Retired Applicant (Over 60)
**Input:**
- Name: Patricia Davis
- Date of Birth: 1960-01-20 (Age: 64)
- Employment: Retired
- Annual Income: $50,000

**Expected Result:**
- ✗ Not Eligible
- Reason: "Age over 60 - not eligible for any loan"

## Webhook Integration

### Setting Up Webhook

1. **Create a `.env.local` file:**
   ```bash
   cp .env.local.example .env.local
   ```

2. **Add your webhook URL:**
   ```
   WEBHOOK_URL=https://your-webhook-endpoint.com/loan-applications
   ```

3. **Test with webhook.site:**
   - Visit https://webhook.site
   - Copy your unique URL
   - Add it to `.env.local`
   - Submit a loan application
   - View the data received at webhook.site

### Webhook Payload Example

```json
{
  "userDetails": {
    "fullName": "John Doe",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "age": 34,
    "employmentType": "employed",
    "annualIncome": 75000
  },
  "eligibility": {
    "isEligible": true,
    "eligibleLoanTypes": ["housing", "personal", "property", "automobile"],
    "age": 34,
    "fullName": "John Doe"
  },
  "quotes": [
    {
      "fullName": "John Doe",
      "age": 34,
      "loanType": "housing",
      "eligibleAmount": 37500,
      "tenureYears": 20,
      "interestRate": 8,
      "monthlyPayment": 313.36,
      "totalPayment": 75206.40
    }
    // ... more quotes
  ]
}
```

## Running Tests

```bash
npm test
```

This will run all unit tests to verify:
- Age calculation
- Eligibility rules
- Loan amount calculations
- Tenure periods
- Interest rates
- Monthly payment calculations

## API Testing with cURL

Test the API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/loan-application \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "employmentType": "employed",
    "annualIncome": 75000
  }'
```

