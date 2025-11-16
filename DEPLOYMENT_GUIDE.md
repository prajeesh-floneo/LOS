# 🚀 Deployment Guide - Production URLs

This guide will help you deploy your Loan Origination System to get permanent, public URLs for your API endpoints.

---

## 🎯 Why Deploy?

**Current Situation (Development):**
- ❌ `http://localhost:3003` - Only works on your computer
- ❌ ngrok URLs change every restart
- ❌ Not suitable for production use

**After Deployment (Production):**
- ✅ Permanent public URLs
- ✅ Always accessible to external apps
- ✅ Professional domain names
- ✅ Automatic HTTPS
- ✅ Better performance

---

## 🏆 Recommended: Deploy to Vercel (Easiest)

**Why Vercel?**
- ✅ Built specifically for Next.js
- ✅ Free tier available
- ✅ Automatic deployments from GitHub
- ✅ Global CDN
- ✅ Zero configuration needed

### **Step 1: Prepare Your Code**

Make sure you have a GitHub repository:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create GitHub repo and push
# (Follow GitHub instructions to create a new repository)
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### **Step 2: Deploy to Vercel**

**Option A: Using Vercel Dashboard (Easiest)**

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Click "Deploy"
6. Wait 2-3 minutes

**Option B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? loan-origination-system
# - Directory? ./
# - Override settings? No
```

### **Step 3: Get Your Production URLs**

After deployment, you'll get URLs like:

```
https://loan-origination-system.vercel.app
```

**Your API Endpoints:**

```
GET https://loan-origination-system.vercel.app/api/applications/{applicationId}
GET https://loan-origination-system.vercel.app/api/applications/export
```

### **Step 4: Configure Environment Variables**

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add your webhook URL:
   ```
   Key: WEBHOOK_URL
   Value: https://hook.us1.make.com/your-webhook-id
   ```
3. Click "Save"
4. Redeploy the project

---

## 🔧 Alternative: Deploy to Render

**Why Render?**
- ✅ Free tier with databases
- ✅ Easy deployment
- ✅ Good for full-stack apps

### **Step 1: Create Render Account**

1. Go to https://render.com
2. Sign up with GitHub

### **Step 2: Create New Web Service**

1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** loan-origination-system
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** Free

4. Click "Create Web Service"

### **Step 3: Get Your Production URLs**

```
https://loan-origination-system.onrender.com
```

**Your API Endpoints:**

```
GET https://loan-origination-system.onrender.com/api/applications/{applicationId}
GET https://loan-origination-system.onrender.com/api/applications/export
```

---

## 🚂 Alternative: Deploy to Railway

**Why Railway?**
- ✅ Simple deployment
- ✅ Free tier
- ✅ Good developer experience

### **Step 1: Create Railway Account**

1. Go to https://railway.app
2. Sign up with GitHub

### **Step 2: Deploy**

1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository
4. Railway auto-detects Next.js
5. Click "Deploy"

### **Step 3: Get Your Production URLs**

```
https://loan-origination-system.up.railway.app
```

---

## 📋 After Deployment Checklist

### **1. Update External Apps**

Replace ngrok URLs with production URLs:

**Make.com:**
- Update HTTP request URLs to production URLs

**Zapier:**
- Update webhook GET URLs to production URLs

**n8n:**
- Update HTTP request node URLs

### **2. Update Environment Variables**

Add to your hosting platform:

```env
WEBHOOK_URL=https://hook.us1.make.com/your-webhook-id
```

### **3. Test All Endpoints**

```bash
# Test export endpoint
curl https://your-app.vercel.app/api/applications/export

# Test single application (replace with real ID)
curl https://your-app.vercel.app/api/applications/LN17631411417423807
```

### **4. Update Documentation**

Update your `.env.example` file:

```env
# Production
WEBHOOK_URL=https://hook.us1.make.com/your-webhook-id

# Your production URL
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

---

## 🌐 Custom Domain (Optional)

### **Add Custom Domain to Vercel**

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `loans.yourdomain.com`)
3. Update DNS records as instructed
4. Wait for DNS propagation (5-60 minutes)

**Your new URLs:**
```
https://loans.yourdomain.com/api/applications/export
https://loans.yourdomain.com/api/applications/{applicationId}
```

---

## 📊 Comparison Table

| Feature | Vercel | Render | Railway | ngrok |
|---------|--------|--------|---------|-------|
| **Free Tier** | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Limited |
| **Permanent URLs** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Custom Domain** | ✅ Yes | ✅ Yes | ✅ Yes | 💰 Paid |
| **Auto Deploy** | ✅ Yes | ✅ Yes | ✅ Yes | ❌ No |
| **Best For** | Next.js | Full-stack | Any app | Testing |

---

## 🎯 Recommended Workflow

### **For Development & Testing:**
1. Use `localhost:3003` for local development
2. Use **ngrok** when testing with external apps
3. Keep ngrok running during testing sessions

### **For Production:**
1. Deploy to **Vercel** (recommended for Next.js)
2. Get permanent URLs
3. Configure external apps with production URLs
4. Set up automatic deployments from GitHub

---

## 🆘 Troubleshooting

### **Build fails on Vercel?**
- Check build logs in Vercel dashboard
- Make sure all dependencies are in `package.json`
- Verify Next.js version compatibility

### **Environment variables not working?**
- Add them in hosting platform dashboard
- Redeploy after adding variables
- Don't commit `.env` to GitHub

### **API endpoints return 404?**
- Check file structure: `app/api/applications/[applicationId]/route.ts`
- Verify deployment completed successfully
- Check deployment logs

---

## 📞 Support

- **Vercel Docs:** https://vercel.com/docs
- **Render Docs:** https://render.com/docs
- **Railway Docs:** https://docs.railway.app


