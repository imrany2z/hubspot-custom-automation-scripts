# HubSpot Custom Automation Scripts

A collection of production-ready custom JavaScript scripts designed to run inside HubSpot workflows using custom code actions. These scripts automate lead handling, enforce data hygiene, and ensure ownership consistency across CRM objects — all using HubSpot’s Private App API and modern logic patterns.

---

## Features

- Associate Deals with Tickets based on shared Loan ID  
- Sync Deal Owner with Contact Owner if mismatched  
- Deduplicate contacts by phone (single and bulk logic)  
- Standardize phone numbers to +1 (XXX) XXX-XXXX  
- Auto-tag after-hours calls with custom disposition  
- Perform income-based loan calculations using formulas  

---

## Scripts Overview

| File Name                           | Description |
|------------------------------------|-------------|
| `associate-deal-with-ticket.js`    | Links a ticket to a matching deal using custom ID search |
| `update-deal-owner-from-contact.js`| Updates a deal’s owner if it doesn't match the associated contact |
| `phone-number-deduplication.js`    | Merges contact with a matching phone number (if only one match) |
| `phone-number-deduplication-multi.js`| Handles deduplication where multiple matches exist, with retry logic |
| `phone-number-formatting.js`       | Formats raw phone inputs into US-friendly standard |
| `tag-call-outcome.js`              | Applies a disposition tag to calls made outside working hours |
| `math-loan-calculation.js`         | Calculates custom logic (e.g. derived max loan) from income data |

---

## Tech Stack

- Node.js (for HubSpot custom code actions)
- `@hubspot/api-client`
- HubSpot CRM (Private App Tokens)
- Optional integrations: Zapier, Dialpad

---

## Usage

These scripts are designed for use in HubSpot workflows via custom code actions.  
Paste each script into HubSpot’s custom code editor, set your environment secrets, and configure the required input/output fields.

Learn more: [HubSpot Developer Docs](https://developers.hubspot.com/docs/api/workflows/custom-code-actions)

---

## Author

**Imran Ali**  
HubSpot Developer
[LinkedIn](https://linkedin.com/in/ia75040) • [Email](mailto:ia75040@gmail.com)

## License

This project is open source and available under the MIT License.
