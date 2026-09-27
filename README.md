# Telecom Project Tracker

A cloud-based Telecom Project Control Dashboard for monitoring work packages, PO status, site readiness, action tracking, and management attention.

![Telecom Project Tracker Dashboard](dashboard.png)

## Live Demo

https://telecom-project-tracker.telkomproject-rifky.workers.dev/

## What This Project Demonstrates

This project simulates a telecom project-control workflow using 320 anonymized/dummy work packages.

It is designed around practical Project Controller / PMO activities:

- Tracking telecom work packages
- Monitoring PO status
- Monitoring TI/site readiness
- Identifying management attention
- Assigning actions and owners
- Tracking due dates
- Reviewing project KPIs
- Filtering and searching project data

## Key Features

### Project Dashboard
- Total work packages
- PO Closed
- PO Outstanding
- Critical projects
- Overdue actions
- PO Status chart
- Attention Level chart

### Project Tracker
- Search
- Region, SOW, PO Status and Attention filters
- Editable project fields
- Horizontal scrolling
- 25 records per page
- Direct page navigation
- Selected project detail panel

### Project Control Logic

Attention levels are automatically derived from project conditions:

| Level | Condition |
|---|---|
| CRITICAL | Block Access |
| HIGH | Not Started / PO Outstanding |
| MEDIUM | PO Open |
| NORMAL | No current management attention |

### Management Attention

The dashboard highlights projects requiring follow-up and shows:

- Attention level
- Site ID
- Region
- PO status
- TI status
- Reason
- Required action
- Action owner
- Due date

## Technology Stack

- HTML
- CSS
- JavaScript
- Cloudflare Workers
- Cloudflare D1
- SQLite-compatible database
- REST API
- Wrangler CLI

## Architecture

```text
Browser
   |
   v
Cloudflare Workers
   |
   +---- Web Dashboard
   |
   +---- REST API
            |
            v
       Cloudflare D1
          SQLite
```

## Project Structure

```text
Telecom-Project-Tracker/
├── public/
│   └── index.html
├── src/
│   └── worker.js
├── seed.sql
├── wrangler.toml
├── package.json
├── README.md
└── screenshots/
```

## Skills Demonstrated

- Telecom Project Control
- PMO workflow
- Project coordination
- KPI dashboard design
- Action tracking
- Data management
- REST API integration
- SQLite / D1 database
- Cloud deployment
- Frontend development

## Data & Privacy

All project/company information in this public demonstration is dummy or anonymized and is not intended to represent confidential client data.

## Author

**Rifky Syukur Raharja**

Telecom Project Control | PMO | Project Coordination
