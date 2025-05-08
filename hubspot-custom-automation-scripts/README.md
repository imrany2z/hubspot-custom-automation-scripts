# HubSpot Custom Automation Scripts

A collection of custom JavaScript functions used within HubSpot workflows to automate business logic, improve data hygiene, and streamline CRM operations. These functions are used in conjunction with HubSpot's serverless workflow actions or webhook integrations.

## ✨ Features

- ✅ Associate Deals with Tickets based on loan ID
- 📞 Deduplicate Contacts by Phone Number (1-to-1 and many-to-one logic)
- ☎️ Format US phone numbers to +1 (XXX) XXX-XXXX format
- 🔁 Auto-update Deal Owner to match Contact Owner
- 📊 Calculate derived values (e.g., income-based math) for decision logic
- 📌 Auto-tag after-hours call outcomes
- 📲 Automated outbound call handling with screen pop and Dialpad API

## 🔍 Scripts

| Script File                          | Purpose                                                   |
|-------------------------------------|-----------------------------------------------------------|
| `associate-deal-with-ticket.js`     | Links a ticket to the correct deal based on a shared ID   |
| `update-deal-owner-from-contact.js` | Aligns deal owner with contact owner if mismatched        |
| `phone-number-deduplication.js`     | Merges contact if duplicate phone found (single match)    |
| `phone-number-deduplication-multi.js`| Merges many contacts with same phone, retry on rate limit |
| `phone-number-formatting.js`        | Standardizes phone format                                 |
| `tag-call-outcome.js`               | Tags calls after working hours with specific disposition  |
| `math-loan-calculation.js`          | Computes advanced values from deal inputs                 |

## 🛠️ Tech Stack

- JavaScript (Node.js runtime)
- HubSpot Private App API (`@hubspot/api-client`)
- Serverless Functions (HubSpot Workflows)
- Zapier (for outbound dialing, lead routing)
- Dialpad API

## 🖼️ Example Workflow

Add your flow image to `docs/flow-overview.png`.

---

## 👤 Author

**Imran Ali**  
CRM Automation Specialist | HubSpot Developer | Workflow Engineer  
[LinkedIn](https://linkedin.com/in/yourprofile) • [Email](mailto:you@example.com)
