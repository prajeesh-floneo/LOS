# 🌐 ngrok Setup Guide - Expose Local Server to Internet

This guide will help you expose your local development server to the internet so external apps can access your API endpoints.

---

## 🎯 What is ngrok?

**ngrok** creates a secure tunnel from the internet to your local development server.

**Benefits:**
- ✅ Test webhooks with external services (Make.com, Zapier, n8n)
- ✅ Share your local app with others
- ✅ No deployment needed for testing
- ✅ Free tier available

---

## 📥 Step 1: Install ngrok

### **Option A: Download from Website**
1. Go to https://ngrok.com/download
2. Sign up for a free account
3. Download ngrok for Windows
4. Extract the ZIP file to a folder (e.g., `C:\ngrok`)

### **Option B: Install via Chocolatey (Windows)**
```bash
choco install ngrok
```

### **Option C: Install via Scoop (Windows)**
```bash
scoop install ngrok
```

---

## 🔑 Step 2: Authenticate ngrok

1. Sign up at https://ngrok.com
2. Get your auth token from https://dashboard.ngrok.com/get-started/your-authtoken
3. Run this command (replace with your token):

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

---

## 🚀 Step 3: Start Your Development Server

Make sure your Next.js app is running:

```bash
npm run dev
```

**Note the port number** (e.g., `3003` or `3000`)

---

## 🌍 Step 4: Start ngrok Tunnel

Open a **new terminal** and run:

```bash
ngrok http 3003
```

**Replace `3003` with your actual port number**

---

## 📋 Step 5: Get Your Public URLs

You'll see output like this:

```
ngrok

Session Status                online
Account                       your-email@example.com (Plan: Free)
Version                       3.5.0
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://abc123def456.ngrok-free.app -> http://localhost:3003

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

**Copy the HTTPS URL:** `https://abc123def456.ngrok-free.app`

---

## 🔗 Your API Endpoints

Replace `https://abc123def456.ngrok-free.app` with your actual ngrok URL:

### **1. Fetch Single Application by ID**
```
GET https://abc123def456.ngrok-free.app/api/applications/{applicationId}
```

**Example:**
```
https://abc123def456.ngrok-free.app/api/applications/LN17631411417423807
```

### **2. Export All Applications**
```
GET https://abc123def456.ngrok-free.app/api/applications/export
```

### **3. Submit Application (for testing)**
```
https://abc123def456.ngrok-free.app/apply
```

---

## 🧪 Test Your Endpoints

### **Test in Browser:**
1. Copy your ngrok URL
2. Add `/api/applications/export` to the end
3. Paste in browser: `https://abc123def456.ngrok-free.app/api/applications/export`
4. You should see JSON response

### **Test with curl:**
```bash
curl https://abc123def456.ngrok-free.app/api/applications/export
```

### **Test with Postman:**
1. Open Postman
2. Create new GET request
3. URL: `https://abc123def456.ngrok-free.app/api/applications/export`
4. Send request

---

## 🔧 Configure External Apps

### **Make.com**

**To receive data FROM your app (webhook):**
1. In Make.com, create "Webhooks" → "Custom Webhook"
2. Copy the webhook URL
3. Add to your `.env` file:
   ```env
   WEBHOOK_URL=https://hook.us1.make.com/your-webhook-id
   ```
4. Restart your dev server

**To fetch data TO Make.com (HTTP request):**
1. Add "HTTP" → "Make a request" module
2. Method: GET
3. URL: `https://abc123def456.ngrok-free.app/api/applications/export`

---

### **Zapier**

**To receive data FROM your app (webhook):**
1. Create Zap → "Webhooks by Zapier" → "Catch Hook"
2. Copy webhook URL
3. Add to `.env`:
   ```env
   WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...
   ```

**To fetch data TO Zapier:**
1. Add "Webhooks by Zapier" → "GET"
2. URL: `https://abc123def456.ngrok-free.app/api/applications/export`

---

### **n8n**

**To receive data FROM your app:**
1. Add "Webhook" node
2. Copy webhook URL
3. Add to `.env`:
   ```env
   WEBHOOK_URL=https://your-n8n.com/webhook/...
   ```

**To fetch data TO n8n:**
1. Add "HTTP Request" node
2. Method: GET
3. URL: `https://abc123def456.ngrok-free.app/api/applications/export`

---

## 📊 Monitor Requests

ngrok provides a web interface to monitor all requests:

**Open in browser:**
```
http://127.0.0.1:4040
```

You'll see:
- All incoming requests
- Request/response details
- Replay requests
- Inspect payloads

---

## ⚠️ Important Notes

### **Free Tier Limitations:**
- ✅ HTTPS tunnel
- ✅ Random subdomain (changes each restart)
- ❌ Custom subdomain (paid feature)
- ❌ Reserved domain (paid feature)

### **URL Changes on Restart:**
- Each time you restart ngrok, you get a **new URL**
- You'll need to update external apps with the new URL
- **Solution:** Use ngrok paid plan for static domains, or deploy to production

### **Keep ngrok Running:**
- Don't close the ngrok terminal
- If you close it, the tunnel stops
- External apps won't be able to reach your server

---

## 🚀 Next Steps

### **For Testing (Current Setup):**
1. ✅ Use ngrok for testing with external apps
2. ✅ Update webhook URLs when ngrok restarts
3. ✅ Monitor requests via ngrok web interface

### **For Production (Permanent Solution):**
1. Deploy to Vercel, Render, or Railway
2. Get permanent URLs
3. No need for ngrok anymore

---

## 🆘 Troubleshooting

### **ngrok command not found?**
- Make sure ngrok is in your PATH
- Or run from the folder where you extracted it: `.\ngrok http 3003`

### **Tunnel not working?**
- Check if dev server is running
- Verify the port number is correct
- Make sure firewall isn't blocking ngrok

### **External app can't reach URL?**
- Copy the HTTPS URL (not HTTP)
- Make sure ngrok terminal is still running
- Check ngrok web interface (http://127.0.0.1:4040) for errors

---

## 📞 Support

- ngrok Documentation: https://ngrok.com/docs
- ngrok Dashboard: https://dashboard.ngrok.com


