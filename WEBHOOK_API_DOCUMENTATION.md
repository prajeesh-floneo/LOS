# 🔗 Webhook & API Documentation for External Apps

This document explains how external applications can integrate with your Loan Origination System to fetch application data.

---

## 📊 Data Structure

All endpoints return data in **two clean tables**:

### **Table 1: Applicant Details**
Contains all personal and professional information about the applicant.

### **Table 2: Collateral**
Contains eligibility assessment and loan quotes.

---

## 🎯 Available Endpoints

### **1. Webhook (Push) - Automatic Data Sending**

When a user submits a loan application, the system automatically sends data to your webhook URL.

#### **Setup:**
1. Set your webhook URL in the `.env` file:
   ```env
   WEBHOOK_URL=https://your-external-app.com/webhook
   ```

2. Your webhook endpoint will receive a POST request with this structure:

#### **Webhook Payload:**
```json
{
  "applicationId": "LN1736683200123",
  "submittedAt": "2025-01-12T10:30:00.000Z",
  
  "applicantDetails": {
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
  
  "collateral": {
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
  }
}
```

---

### **2. GET Single Application by ID**

Fetch a specific application using its Application ID.

#### **Endpoint:**
```
GET http://localhost:3001/api/applications/{applicationId}
```

#### **Example Request:**
```bash
curl http://localhost:3001/api/applications/LN1736683200123
```

#### **Example Response:**
```json
{
  "success": true,
  "applicationId": "LN1736683200123",
  "submittedAt": "2025-01-12T10:30:00.000Z",
  
  "applicantDetails": {
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
  
  "collateral": {
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
  }
}
```

#### **Error Response (404):**
```json
{
  "success": false,
  "error": "Application not found",
  "message": "No application found with ID: LN1736683200123"
}
```

---

### **3. GET All Applications (Export)**

Fetch all submitted applications in one request.

#### **Endpoint:**
```
GET http://localhost:3001/api/applications/export
```

#### **Example Request:**
```bash
curl http://localhost:3001/api/applications/export
```

#### **Example Response:**
```json
{
  "success": true,
  "count": 2,
  "applications": [
    {
      "applicationId": "LN1736683200123",
      "submittedAt": "2025-01-12T10:30:00.000Z",
      "applicantDetails": { ... },
      "collateral": { ... }
    },
    {
      "applicationId": "LN1736683200456",
      "submittedAt": "2025-01-12T11:00:00.000Z",
      "applicantDetails": { ... },
      "collateral": { ... }
    }
  ]
}
```

---

## 🔧 Integration Examples

### **Example 1: Make.com (Integromat)**

1. Create a new scenario
2. Add "Webhooks" module → "Custom Webhook"
3. Copy the webhook URL
4. Add it to your `.env` file as `WEBHOOK_URL`
5. Use "Parse JSON" module to extract `applicantDetails` and `collateral`
6. Map the data to your desired destination (Google Sheets, Airtable, etc.)

---

### **Example 2: Zapier**

1. Create a new Zap
2. Choose "Webhooks by Zapier" as trigger
3. Select "Catch Hook"
4. Copy the webhook URL
5. Add it to your `.env` file as `WEBHOOK_URL`
6. Test by submitting a loan application
7. Map `applicantDetails` and `collateral` to your action (e.g., Create Google Sheet Row)

---

### **Example 3: n8n**

1. Create a new workflow
2. Add "Webhook" node
3. Set method to POST
4. Copy the webhook URL
5. Add it to your `.env` file as `WEBHOOK_URL`
6. Add "Set" node to extract `applicantDetails` and `collateral`
7. Connect to your database or spreadsheet

---


