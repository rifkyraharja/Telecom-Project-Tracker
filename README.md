# Telecom Project Tracker

A web-based Telecom Project Control Dashboard for monitoring work packages, purchase orders, site readiness, action tracking, and management attention.

## Live Demo

https://telecom-project-tracker.telkomproject-rifky.workers.dev/

## Overview

Telecom Project Tracker is a portfolio project based on a realistic telecom project-control workflow.

The dashboard is designed to help a Project Controller / PMO / Project Coordinator monitor:

- Work package progress
- PO status
- TI / site readiness status
- Attention level
- Action owner and due date
- Follow-up requirements
- Management attention items

The dataset contains 320 anonymized / dummy work packages for demonstration purposes.

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
- Region filter
- SOW filter
- PO Status filter
- Attention filter
- Editable project fields
- Horizontal scrolling for detailed project data
- Pagination with 25 records per page
- Direct page navigation

### Project Control
Attention levels are automatically derived from project conditions:

1. CRITICAL — Block Access
2. HIGH — Not Started / PO Outstanding
3. MEDIUM — PO Open
4. NORMAL — No current management attention

### Management Attention
The dashboard highlights projects requiring follow-up, including:

- Critical issues
- High-priority follow-ups
- Medium-priority PO actions
- Action owner
- Due date
- Required action

## Technology Stack

- HTML / CSS / JavaScript
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
   +---- Static Dashboard
   |
   +---- REST API
            |
            v
      Cloudflare D1
         SQLite
```

## Data Model

The tracker includes project-control fields such as:

- Customer
- Project
- Region
- Province
- Site ID
- New XL ID
- SOW
- Scope
- PO Status
- TI Status
- Payment Status
- WCC Status
- Attention Reason
- Attention Level
- Action Required
- Action Owner
- Last Update
- Action Due Date
- Action Status
- Days to Due
- Follow-up Flag
- Report Flag

## Portfolio Note

All project/company data used in this public demonstration are dummy or anonymized. The project is intended to demonstrate project-control, dashboard, data-management, and web application skills without exposing confidential project information.

## Skills Demonstrated

- Project Control
- PMO workflow
- Telecom project tracking
- Data management
- Dashboard design
- KPI reporting
- Action tracking
- REST API integration
- SQLite / D1 database
- Cloud deployment
- Basic frontend development

## Author

Rifky Syukur Raharja
