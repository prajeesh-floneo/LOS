# 💻 Code Examples for External Apps

This document provides code examples for integrating with the Loan Origination System API.

---

## JavaScript/Node.js Examples

### **Fetch Single Application**

```javascript
async function getApplication(applicationId) {
  const response = await fetch(
    `http://localhost:3001/api/applications/${applicationId}`
  );
  const data = await response.json();
  
  if (data.success) {
    console.log("Applicant:", data.applicantDetails.fullName);
    console.log("Status:", data.collateral.eligibilityStatus);
    console.log("Loan Quotes:", data.collateral.loanQuotes);
  }
  
  return data;
}

// Usage
getApplication("LN1736683200123");
```

### **Fetch All Applications**

```javascript
async function getAllApplications() {
  const response = await fetch(
    "http://localhost:3001/api/applications/export"
  );
  const data = await response.json();
  
  console.log(`Total Applications: ${data.count}`);
  
  data.applications.forEach(app => {
    console.log(`\n${app.applicantDetails.fullName}`);
    console.log(`Status: ${app.collateral.eligibilityStatus}`);
    console.log(`Quotes: ${app.collateral.loanQuotes.length}`);
  });
  
  return data;
}

// Usage
getAllApplications();
```

### **Webhook Receiver (Express.js)**

```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.post('/webhook', (req, res) => {
  const data = req.body;
  
  // Extract applicant details
  const applicant = data.applicantDetails;
  const collateral = data.collateral;
  
  console.log(`New Application: ${data.applicationId}`);
  console.log(`Applicant: ${applicant.fullName}`);
  console.log(`Status: ${collateral.eligibilityStatus}`);
  
  // Process the data (save to database, send email, etc.)
  // ...
  
  res.json({ status: 'received' });
});

app.listen(3000, () => {
  console.log('Webhook receiver running on port 3000');
});
```

---

## Python Examples

### **Fetch Single Application**

```python
import requests

def get_application(application_id):
    url = f"http://localhost:3001/api/applications/{application_id}"
    response = requests.get(url)
    data = response.json()
    
    if data['success']:
        print(f"Applicant: {data['applicantDetails']['fullName']}")
        print(f"Status: {data['collateral']['eligibilityStatus']}")
        print(f"Loan Quotes: {data['collateral']['loanQuotes']}")
    
    return data

# Usage
get_application("LN1736683200123")
```

### **Fetch All Applications**

```python
import requests

def get_all_applications():
    url = "http://localhost:3001/api/applications/export"
    response = requests.get(url)
    data = response.json()
    
    print(f"Total Applications: {data['count']}")
    
    for app in data['applications']:
        print(f"\n{app['applicantDetails']['fullName']}")
        print(f"Status: {app['collateral']['eligibilityStatus']}")
        print(f"Quotes: {len(app['collateral']['loanQuotes'])}")
    
    return data

# Usage
get_all_applications()
```

### **Webhook Receiver (Flask)**

```python
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/webhook', methods=['POST'])
def receive_webhook():
    data = request.json
    
    # Extract applicant details
    applicant = data['applicantDetails']
    collateral = data['collateral']
    
    print(f"New Application: {data['applicationId']}")
    print(f"Applicant: {applicant['fullName']}")
    print(f"Status: {collateral['eligibilityStatus']}")
    
    # Process the data (save to database, send email, etc.)
    # ...
    
    return jsonify({"status": "received"}), 200

if __name__ == '__main__':
    app.run(port=5000)
```

---

## PHP Examples

### **Fetch Single Application**

```php
<?php
function getApplication($applicationId) {
    $url = "http://localhost:3001/api/applications/" . $applicationId;
    $response = file_get_contents($url);
    $data = json_decode($response, true);
    
    if ($data['success']) {
        echo "Applicant: " . $data['applicantDetails']['fullName'] . "\n";
        echo "Status: " . $data['collateral']['eligibilityStatus'] . "\n";
    }
    
    return $data;
}

// Usage
getApplication("LN1736683200123");
?>
```


