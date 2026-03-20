
🛡️ Review Shield — Complete Product Documentation
Version: 1.0
Prepared For: Product, Engineering, Design & Business Teams
System Type: SaaS (Multi-tenant Reputation Management Platform)

1. Executive Summary
Review Shield is a unified reputation management system that combines:
🟢 System 1 — Review Funnel Engine
Controls customer review flow through smart routing, feedback capture, and conversion optimization.
🔵 System 2 — Direct Review Control Center
Monitors, manages, responds to, and recovers reviews posted directly on platforms like Google and Facebook.
👉 Together, Review Shield acts as a complete Reputation Operating System for businesses.

2. Product Objectives
Primary Goals
• Increase public review volume
• Improve average rating score
• Capture negative feedback privately
• Reduce unresolved complaints
• Improve response speed
Secondary Goals
• Provide actionable insights
• Automate reputation workflows
• Offer agency white-label solution

3. Target Users
Primary Users
• Local businesses (salons, clinics, restaurants)
• Service providers (real estate, consultants)
• E-commerce brands
Secondary Users
• Marketing agencies
• SaaS integrators
• Franchise networks

4. System Overview (Unified Architecture)
High-Level Flow
Customers → Funnel → Routing Logic → Public Review OR Private Feedback
Platforms → Sync Engine → Database → Alerts → Dashboard → Reply / Recovery

5. MODULE A — REVIEW FUNNEL SYSTEM

5.1 Purpose
Guide customers toward public reviews while capturing private complaints early.

5.2 Entry Channels
Users enter via:
• QR code
• SMS link
• WhatsApp link
• Email link
• NFC card
• Website CTA

5.3 Funnel Workflow (Compliant Design)
Step 1 — Landing Page
Displays:
• business branding
• welcome message
• CTA to rate

Step 2 — Rating Screen
⭐⭐⭐⭐⭐ selection UI
Stored instantly in session.

Step 3 — Smart Routing Logic
IF rating ≥ 4:
• Show public review CTA (primary)
• Show feedback CTA (secondary)
IF rating ≤ 3:
• Show support CTA (primary)
• Show public review CTA (secondary)
⚠ Public review option always visible (policy-safe).

Step 4 — Public Redirect Options
Supported:
• Google
• Facebook
• Trustpilot
• Zomato
• Practo

Step 5 — Feedback Capture (Private)
Fields:
• message
• category
• optional contact
• attachment
Categories:
• staff
• pricing
• service
• delay
• cleanliness

5.4 Funnel Features
A. Custom Branding
• logo
• color theme
• tone
• CTA text

B. Campaign Tracking
UTM parameters:
?source=sms
?campaign=promo
Tracked metrics:
• visits
• ratings
• conversions

C. Analytics Metrics
• funnel conversion rate
• rating distribution
• redirect CTR
• feedback %

6. MODULE B — DIRECT REVIEW CONTROL CENTER

6.1 Purpose
Handle reviews posted directly on platforms.

6.2 Supported Platforms
Primary:
• Google
• Facebook
Secondary:
• Trustpilot
• Zomato
• Practo
• Justdial

6.3 Data Flow
Platform APIs → Sync Jobs → DB → Alerts Engine → Dashboard → Actions

6.4 Core Features

A. Unified Review Inbox
Filters:
• platform
• rating
• location
• sentiment
• replied/unreplied
• date
Columns:
• reviewer
• rating
• review text
• sentiment
• reply status
Supports bulk actions.

B. Sync Engine
Methods
Webhook where available
Cron fallback: every 10 minutes
Logic
Fetch new reviews → deduplicate → store → trigger alerts

C. Smart Alerts Engine
Rules:
rating ≤3 → urgent
no reply in 24h → reminder
review spike → alert
Channels:
• email
• WhatsApp
• push

D. Reply System
Features:
• inline reply editor
• AI suggestion engine
• templates
• bulk reply
Tone modes:
• professional
• empathetic
• premium
• casual

E. Recovery Workflow
Flow:
1 detect negative
2 send private outreach
3 resolve
4 request update

F. Sentiment & Insight Engine
AI detects:
• complaint trends
• keywords
• staff mentions
Dashboard shows:
• recurring issues
• location comparisons
• rating trend

7. Unified Dashboard Structure
Sidebar:
• Funnel Analytics
• Review Inbox
• Needs Attention
• Responded
• Insights
• Automations
• Settings

8. Database Architecture

funnel_sessions
id
location_id
rating
redirected_to
created_at

feedback
id
session_id
message
category
sentiment
created_at

platform_reviews
id
platform
location_id
reviewer
rating
text
sentiment
replied
response_text
created_at

alert_logs
id
review_id
alert_type
sent_via
status
created_at

9. API Specification

Funnel
GET /r/{slug}
POST /rate
POST /feedback

Reviews
GET /reviews
GET /reviews/{id}
POST /reviews/reply

Sync
POST /sync/google
POST /sync/facebook

Analytics
GET /analytics/funnel
GET /analytics/reviews

10. Automation Engine

Example Rules
IF funnel rating ≤3 → notify support
IF review ≤3 → alert
IF resolved → request update

11. KPIs

Funnel KPIs
• conversion rate
• rating distribution
• redirect rate

Direct KPIs
• avg rating growth
• response time
• unresolved reviews
• sentiment trend

12. Security & Compliance
• GDPR compliant
• encryption at rest
• rate limiting
• CAPTCHA
⚠ Must avoid review gating practices.

13. MVP Roadmap

Phase 1
• funnel system
• Google sync
• inbox
• replies
• alerts

Phase 2
• AI replies
• analytics
• tagging

Phase 3
• automation
• recovery workflows
• competitor tracking

14. Monetization Model
Plans
Free:
• limited funnel usage
Pro:
• automation
• analytics
Agency:
• white-label
• multi-client

15. Positioning Statement
👉 “Generate more great reviews. Fix bad ones fast.”


 Core Stack (Finalized)
🔹 Backend
Framework: Laravel (latest LTS)
Why (for your case):
Easy deployment on Hostinger shared/VPS


Strong queue + cron support


Perfect for API + admin panel


Works well with R2 (S3-compatible)



🔹 Frontend
Framework: React (Vite)
Stack:
React + Vite


TailwindCSS


Axios (API calls)


Zustand (state management)


Why NOT Next.js:
You don’t need SSR


Simpler deployment on Hostinger


Lower complexity



🔹 Database
MySQL (Hostinger default) ✅
 (Postgres is better, but MySQL is fine for now)



🔹 Storage
👉 Cloudflare
Use for:
feedback attachments


logs (optional)


exports



🔹 Queue System
Redis (if VPS) ✅


Database queue (if shared hosting fallback)



🔹 Server
Hostinger Setup Options:
Option A (Recommended)
Hostinger VPS


Full control


Redis + Supervisor support


Option B (Budget)
Shared hosting


Use:


database queue


cron jobs



2️⃣ Final System Architecture

🔁 Full Flow
User → React App → Laravel API → DB

Platform APIs → Laravel Sync Jobs → DB → Dashboard

Queue → Alerts / Replies / Sync

🧩 Component Breakdown
Frontend (React)
Dashboard


Review Inbox


Funnel Builder


Analytics



Backend (Laravel)
Auth system


Funnel engine


Review sync engine


Alerts engine


AI integration


API layer



3️⃣ Third-Party APIs (Final Selection)

🔵 MUST HAVE (MVP)

Google Reviews
👉 Google Business Profile API
Features:
fetch reviews


reply to reviews



Email
👉 Amazon SES

SMS (India friendly)
👉 MSG91

🟡 SHOULD HAVE (Phase 2)

WhatsApp
👉 WhatsApp Cloud API

AI
👉 OpenAI
Use for:
reply generation


sentiment



🟠 OPTIONAL

Facebook Reviews
👉 Meta Graph API

Payments
👉 Razorpay

4️⃣ Hosting Architecture (Hostinger Specific)

Folder Structure
/public_html  → Laravel public
/app          → Laravel app
/react-app    → built React files

Deployment Flow
React:
npm run build
Upload /dist → serve via Laravel or subdomain

Laravel:
composer install
php artisan migrate
php artisan config:cache

Cron Setup (IMPORTANT)
Add in Hostinger cron:
* * * * * php /path-to-project/artisan schedule:run

5️⃣ R2 Storage Setup

Laravel Config
Use S3 driver:
FILESYSTEM_DISK=s3

AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_DEFAULT_REGION=auto
AWS_BUCKET=your-bucket
AWS_ENDPOINT=https://<accountid>.r2.cloudflarestorage.com

Use Cases
feedback uploads


export reports


media assets



6️⃣ Queue Strategy (Important for Scale)

If VPS:
Redis + Horizon ✅


If Shared:
database queue


php artisan queue:work

Job Types:
review_sync_job


send_alert_job


ai_reply_job



7️⃣ API Architecture

Auth:
Laravel Sanctum (SPA)



Structure:
/api/auth
/api/funnel
/api/reviews
/api/analytics
/api/integrations

8️⃣ Security Setup

Must Implement:
rate limiting:


->middleware('throttle:200,1')
encrypted tokens


CSRF protection


API validation
