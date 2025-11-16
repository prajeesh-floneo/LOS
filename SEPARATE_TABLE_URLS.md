# 📊 Separate Table URLs - Documentation

You now have **2 separate URLs** - one for each table!

---

## 🎯 **The Two URLs**

### **URL 1: Applicant Details Table**
```
GET /api/applications/applicants
```

**Returns ONLY personal and professional information**

### **URL 2: Collateral Table**
```
GET /api/applications/collateral
```

**Returns ONLY eligibility status and loan quotes**

---

## 🌐 **Full URLs (After Deployment)**

### **Local Development (with ngrok):**
```
https://abc123.ngrok-free.app/api/applications/applicants
https://abc123.ngrok-free.app/api/applications/collateral
```

### **Production (Vercel):**
```
https://loan-origination-system.vercel.app/api/applications/applicants
https://loan-origination-system.vercel.app/api/applications/collateral
```

---

## 📋 **URL 1: Applicant Details Table**

### **Endpoint:**
```
GET /api/applications/applicants
```

### **Response Structure:**
```json
{
  "success": true,
  "tableName": "Applicant Details",
  "count": 2,
  "data": [
    {
      "applicationId": "LN17631411417423807",
      "submittedAt": "2025-01-12T10:30:00.000Z",
      "fullName": "Prajeesh A",
      "age": 21,
      "dateOfBirth": "2004-05-17",
      "gender": "Male",
      "maritalStatus": "Single",
      "phoneNumber": "75111 02493",
      "email": "prajeep6@gmail.com",
      "employmentType": "Self-Employed",
      "annualIncome": 900000,
      "requestedLoanType": "Housing Loan",
      "expectedLoanAmount": 500000,
      "preferredTenure": "5 Years"
    },
    {
      "applicationId": "LN17631411417423808",
      "submittedAt": "2025-01-12T11:00:00.000Z",
      "fullName": "John Doe",
      "age": 35,
      "dateOfBirth": "1989-03-20",
      "gender": "Male",
      "maritalStatus": "Married",
      "phoneNumber": "+1 555-1234",
      "email": "john@example.com",
      "employmentType": "Salaried",
      "annualIncome": 750000,
      "requestedLoanType": "Personal Loan",
      "expectedLoanAmount": 200000,
      "preferredTenure": "10 Years"
    }
  ]
}
```

### **Fields in This Table:**
- `applicationId` - Unique application ID
- `submittedAt` - Submission timestamp
- `fullName` - Applicant's full name
- `age` - Calculated age
- `dateOfBirth` - Date of birth
- `gender` - Gender
- `maritalStatus` - Marital status
- `phoneNumber` - Phone number
- `email` - Email address
- `employmentType` - Employment type
- `annualIncome` - Annual income
- `requestedLoanType` - Requested loan type
- `expectedLoanAmount` - Expected loan amount
- `preferredTenure` - Preferred tenure

---

## 💰 **URL 2: Collateral Table**

### **Endpoint:**
```
GET /api/applications/collateral
```

### **Response Structure:**
```json
{
  "success": true,
  "tableName": "Collateral",
  "count": 2,
  "data": [
    {
      "applicationId": "LN17631411417423807",
      "submittedAt": "2025-01-12T10:30:00.000Z",
      "applicantName": "Prajeesh A",
      "eligibilityStatus": "ELIGIBLE",
      "ineligibilityReason": null,
      "eligibleLoanTypes": ["Automobile Loan"],
      "loanQuotes": [
        {
          "loanType": "Automobile Loan",
          "loanAmount": 360000,
          "monthlyPayment": 2791.076,
          "interestRate": 7,
          "tenureYears": 20
        }
      ]
    },
    {
      "applicationId": "LN17631411417423808",
      "submittedAt": "2025-01-12T11:00:00.000Z",
      "applicantName": "John Doe",
      "eligibilityStatus": "ELIGIBLE",
      "ineligibilityReason": null,
      "eligibleLoanTypes": ["Personal Loan", "Automobile Loan"],
      "loanQuotes": [
        {
          "loanType": "Personal Loan",
          "loanAmount": 150000,
          "monthlyPayment": 1395.538,
          "interestRate": 10,
          "tenureYears": 15
        },
        {
          "loanType": "Automobile Loan",
          "loanAmount": 300000,
          "monthlyPayment": 2325.897,
          "interestRate": 7,
          "tenureYears": 20
        }
      ]
    }
  ]
}
```

### **Fields in This Table:**
- `applicationId` - Unique application ID
- `submittedAt` - Submission timestamp
- `applicantName` - Applicant's name (for reference)
- `eligibilityStatus` - "ELIGIBLE" or "NOT ELIGIBLE"
- `ineligibilityReason` - Reason if not eligible
- `eligibleLoanTypes` - Array of eligible loan types
- `loanQuotes` - Array of loan quote objects:
  - `loanType` - Type of loan
  - `loanAmount` - Eligible loan amount
  - `monthlyPayment` - Monthly payment amount
  - `interestRate` - Interest rate percentage
  - `tenureYears` - Loan tenure in years

---

## 🔧 **How to Use in External Apps**

### **Make.com - Separate Tables to Separate Google Sheets**

**Scenario 1: Applicant Details → Google Sheet 1**

1. Add "HTTP" → "Make a request"
   - URL: `https://your-url.vercel.app/api/applications/applicants`
   - Method: GET
2. Add "Iterator" to loop through `data` array
3. Add "Google Sheets" → "Add a row"
   - Sheet: "Applicants"
   - Map fields: `fullName`, `email`, `phoneNumber`, `annualIncome`, etc.

**Scenario 2: Collateral → Google Sheet 2**

1. Add "HTTP" → "Make a request"
   - URL: `https://your-url.vercel.app/api/applications/collateral`
   - Method: GET
2. Add "Iterator" to loop through `data` array
3. Add "Google Sheets" → "Add a row"
   - Sheet: "Loan Quotes"
   - Map fields: `applicantName`, `eligibilityStatus`, `loanQuotes`, etc.

---

### **Zapier - Two Separate Zaps**

**Zap 1: Sync Applicant Details**

1. Trigger: Schedule (every 30 minutes)
2. Action: Webhooks by Zapier → GET
   - URL: `https://your-url.vercel.app/api/applications/applicants`
3. Action: Loop through results
4. Action: Create/Update in your database

**Zap 2: Sync Collateral Data**

1. Trigger: Schedule (every 30 minutes)
2. Action: Webhooks by Zapier → GET
   - URL: `https://your-url.vercel.app/api/applications/collateral`
3. Action: Loop through results
4. Action: Create/Update in your database

---

### **n8n - Two HTTP Request Nodes**

**Workflow:**

1. **Cron Trigger** (every 30 minutes)
2. **HTTP Request Node 1:**
   - URL: `https://your-url.vercel.app/api/applications/applicants`
   - Output: Applicant details
3. **HTTP Request Node 2:**
   - URL: `https://your-url.vercel.app/api/applications/collateral`
   - Output: Collateral data
4. **Process each separately** (different database tables, sheets, etc.)

---

## 📊 **Complete URL Reference**

| Table | Endpoint | Returns |
|-------|----------|---------|
| **Applicant Details** | `/api/applications/applicants` | Personal & professional info only |
| **Collateral** | `/api/applications/collateral` | Eligibility & loan quotes only |
| **Both Tables** | `/api/applications/export` | Complete data (both tables) |
| **Single Application** | `/api/applications/{id}` | One application (both tables) |

---

## 🧪 **Testing**

### **Test Applicant Details URL:**
```bash
curl https://your-url.vercel.app/api/applications/applicants
```

### **Test Collateral URL:**
```bash
curl https://your-url.vercel.app/api/applications/collateral
```

### **Expected Response (Empty):**
```json
{
  "success": true,
  "tableName": "Applicant Details",
  "count": 0,
  "data": []
}
```

### **After Submitting Applications:**
You'll see actual data in the `data` array!

---

## ✅ **Summary**

You now have **2 separate URLs**:

1. **`/api/applications/applicants`** → Applicant Details Table
2. **`/api/applications/collateral`** → Collateral Table

**Benefits:**
- ✅ Clean separation of data
- ✅ Easier to integrate with external apps
- ✅ Can send to different destinations (different sheets, tables, etc.)
- ✅ Smaller payload size (only the data you need)
- ✅ Better organization

**After Vercel deployment, your URLs will be:**
```
https://your-app.vercel.app/api/applications/applicants
https://your-app.vercel.app/api/applications/collateral
```

🎉 **Perfect for external apps!**


