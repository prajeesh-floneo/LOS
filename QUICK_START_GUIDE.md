# 🚀 Quick Start Guide - External App Integration

This guide will help you quickly integrate your external app with the Loan Origination System.

---

## ⚡ 5-Minute Setup

### **Step 1: Choose Your Integration Method**

You have 3 options:

1. **Webhook (Push)** - Automatic data sending when applications are submitted
2. **API Fetch by ID** - Fetch specific application data on demand
3. **API Export All** - Fetch all applications at once

---

### **Step 2: Set Up Webhook (Optional)**

If you want automatic data pushing:

1. **Get your webhook URL** from your external app:
   - Make.com: Create scenario → Webhooks → Custom Webhook
   - Zapier: Create Zap → Webhooks by Zapier → Catch Hook
   - n8n: Create workflow → Webhook node
   - Custom: Your server endpoint (e.g., `https://yourapp.com/webhook`)

2. **Add to `.env` file:**
   ```env
   WEBHOOK_URL=https://your-webhook-url-here
   ```

3. **Restart your server:**
   ```bash
   npm run dev
   ```

4. **Test it:**
   - Submit a loan application at `http://localhost:3001/apply`
   - Check your external app to see if data was received

---

### **Step 3: Test the API Endpoints**

#### **Test 1: Fetch Single Application**

1. Submit a test application at `http://localhost:3001/apply`
2. Note the Application ID (e.g., `LN1736683200123`)
3. Test the API:

```bash
curl http://localhost:3001/api/applications/LN1736683200123
```

You should see:
```json
{
  "success": true,
  "applicationId": "LN1736683200123",
  "applicantDetails": { ... },
  "collateral": { ... }
}
```

#### **Test 2: Fetch All Applications**

```bash
curl http://localhost:3001/api/applications/export
```

You should see:
```json
{
  "success": true,
  "count": 1,
  "applications": [ ... ]
}
```

---

## 📊 Understanding the Data Structure

Every response contains **two tables**:

### **Table 1: applicantDetails**
```json
{
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
}
```

### **Table 2: collateral**
```json
{
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
```

---

## 🎯 Common Use Cases

### **Use Case 1: Send to Google Sheets**

**Using Make.com:**
1. Webhook trigger receives data
2. Google Sheets module → Add a row
3. Map fields:
   - Column A: `applicantDetails.fullName`
   - Column B: `applicantDetails.email`
   - Column C: `collateral.eligibilityStatus`
   - Column D: `collateral.loanQuotes[0].loanAmount`

**Using Zapier:**
1. Webhooks by Zapier → Catch Hook
2. Google Sheets → Create Spreadsheet Row
3. Map the same fields as above

---

### **Use Case 2: Send Email Notification**

**Using Make.com:**
1. Webhook trigger receives data
2. Email module → Send an Email
3. To: `applicantDetails.email`
4. Subject: "Your Loan Application {{applicationId}}"
5. Body: Include eligibility status and loan quotes

**Using Zapier:**
1. Webhooks by Zapier → Catch Hook
2. Gmail → Send Email
3. Map the same fields as above

---

### **Use Case 3: Save to Database**

**Using n8n:**
1. Webhook node receives data
2. Set node to extract fields
3. MySQL/PostgreSQL node → Insert
4. Map `applicantDetails` to your table columns

---

## 🔍 Testing Checklist

- [ ] Webhook URL is set in `.env` file
- [ ] Server is running (`npm run dev`)
- [ ] Can submit application at `/apply`
- [ ] Webhook receives data (check external app)
- [ ] Can fetch single application by ID
- [ ] Can fetch all applications via export endpoint
- [ ] Data structure matches documentation

---

## 🆘 Troubleshooting

### **Webhook not receiving data?**
- Check if `WEBHOOK_URL` is set in `.env`
- Restart the server after adding webhook URL
- Check server logs for webhook errors
- Verify your webhook URL is accessible

### **API returns 404?**
- Check the Application ID is correct
- Ensure the application was submitted successfully
- Try the export endpoint to see all available IDs

### **CORS errors?**
- The API already has CORS enabled (`Access-Control-Allow-Origin: *`)
- If still having issues, check your browser console
- Try using a tool like Postman or curl first

---

## 📚 Next Steps

1. Read the full [WEBHOOK_API_DOCUMENTATION.md](./WEBHOOK_API_DOCUMENTATION.md)
2. Check [CODE_EXAMPLES.md](./CODE_EXAMPLES.md) for code samples
3. Implement your integration
4. Test thoroughly before production

---

## 🎉 You're Ready!

Your Loan Origination System is now ready to integrate with external apps!


