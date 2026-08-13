# PDF — Community Relief platform

Civilian humanitarian website for the PDF community. Public pages have a distinct design. The staff Admin Panel, APIs, database schema and n8n webhooks stay on the shared community-platform contracts so editors can change copy, stories, giving figures, events and galleries and the front updates.

**BCC-website is not modified.** This repository is the PDF client copy.

## Public site

- `/` Home
- `/about` About
- `/our-work` Our work
- `/giving` Giving
- `/certificates` Certificates
- `/stories` News & stories
- `/events` Events
- `/gallery` Gallery
- `/approach` Our approach
- `/get-involved` Get involved
- `/admin` Staff Admin Panel (unchanged workflow)

Admin edits still flow through `/api/home`, `/api/pages`, `/api/posts`, `/api/events`, `/api/media`, `/api/inquiries` and `/api/subscribers`.

## n8n (existing 7 workflows)

Keep the same environment names and payload shapes:

1. Inquiry alert — `N8N_INQUIRY_ALERT_WEBHOOK`
2. Publish distribution — `N8N_PUBLISH_WEBHOOK`
3. Subscribe alert — `N8N_SUBSCRIBE_ALERT_WEBHOOK`
4. Event mail — `N8N_EVENT_MAIL_WEBHOOK`
5. n8n API / stats — `N8N_BASE_URL`, `N8N_API_KEY`
6. Shared secret — `N8N_INQUIRY_WEBHOOK_SECRET` (also `/api/n8n/stats`)
7. CRM routing — `CRM_ALERTS_ENABLED`, `CRM_TELEGRAM_CHAT_ID`, `CRM_ALERT_EMAIL`

Point these at your existing n8n instance. Do not commit secrets.

## Local

Requires Node.js `>=22.13.0`.

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Public: `http://localhost:3000`
- Admin: `http://localhost:3000/admin`
