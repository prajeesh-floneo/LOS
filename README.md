# AI-Powered Loan Origination System

A comprehensive loan origination system that automatically evaluates loan eligibility and generates personalized loan quotes based on user information.

## Features

### 1. User-Facing Loan Application Form
- Collects personal details (first name, last name, date of birth)
- Collects professional details (employment type, annual income)
- Clean, responsive UI built with Next.js and Tailwind CSS

### 2. Intelligent Eligibility Criteria

#### Age-Based Eligibility
- **Under 24**: Eligible for automobile loans only
- **24-50 years**: Eligible for all loan types (housing, personal, property, automobile)
- **50-60 years**: Eligible for all loan types
- **Over 60**: Not eligible for any loans

#### Employment Check
- Users with no income or unemployed status are not eligible for any loans

### 3. Loan Amount Calculation
- **Personal Loan**: Maximum 20% of annual income
- **Automobile Loan**: Maximum 40% of annual income
- **Housing/Property Loan**: Maximum 50% of annual income

### 4. Tenure Periods
- **Ages 24-40**: 20 years repayment
- **Ages 40-50**: 15 years repayment
- **Ages 50-60**: 10 years repayment

### 5. Interest Rates

#### Housing/Property Loans
- 24-40 years: 8%
- 40-50 years: 8.5%
- 50-60 years: 9%

#### Automobile Loans
- Under 24: 7%
- 24-40 years: 7%
- 40-50 years: 8%
- 50-60 years: 9.5%

#### Personal Loans
- 24-50 years: 6.5%

### 6. Data Output
- Combines first name and last name into full name
- Calculates user's age from date of birth
- Displays all user details in a structured table format

### 7. Quote Generation
- Provides detailed quotes including:
  - Full name
  - Eligible loan amount
  - Tenure period
  - Interest rate
  - Monthly payment
  - Total payment amount
- Clear ineligibility reasons when applicable

### 8. Webhook Integration
- Sends all application data and quotes to external systems
- Configurable webhook URL via environment variables

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd loan-origination-system
```

2. Install dependencies:
```bash
npm install
```

3. Configure webhook (optional):
```bash
cp .env.local.example .env.local
# Edit .env.local and add your webhook URL
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
loan-origination-system/
├── app/
│   ├── api/
│   │   └── loan-application/
│   │       └── route.ts          # API endpoint for loan processing
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   └── LoanApplicationForm.tsx   # Main application form component
├── lib/
│   └── loanCalculator.ts         # Business logic for loan calculations
├── types/
│   └── loan.ts                   # TypeScript type definitions
└── package.json
```

## API Endpoints

### POST /api/loan-application

Processes a loan application and returns eligibility and quotes.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "dateOfBirth": "1990-01-01",
  "employmentType": "employed",
  "annualIncome": 50000
}
```

**Response:**
```json
{
  "userDetails": {
    "fullName": "John Doe",
    "firstName": "John",
    "lastName": "Doe",
    "dateOfBirth": "1990-01-01",
    "age": 34,
    "employmentType": "employed",
    "annualIncome": 50000
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
      "eligibleAmount": 25000,
      "tenureYears": 20,
      "interestRate": 8,
      "monthlyPayment": 209.11,
      "totalPayment": 50186.40
    }
    // ... more quotes
  ]
}
```

## Technologies Used

- **Next.js 15**: React framework for production
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React**: UI library

## License

MIT

