# PLATEFUL

**A Plate for Every Hand — Converting Surplus into Support, and Waste into Hope through AI-Powered Connections.**

## Overview

Plateful is a platform designed to combat hunger and food waste by connecting surplus food sources (Plate Givers) with non-governmental organizations (Plate Sharers) that serve underprivileged communities. Through real-time listings, intelligent logistics, and community engagement, Plateful facilitates efficient and dignified food sharing at scale. The system prioritizes perishable items, restricts overstocking, and enables users to fund and monitor impact through transparent crowdfunding mechanisms.

## Demonstration Links

- **Demo Video:** [Watch Here](https://drive.google.com/file/d/1npKxaZ3WOSpXu_zM1x7WDlU2GxvNjYSE/view)
- **Website Demonstration:** [Watch Here](https://drive.google.com/file/d/1-P9TSejuR74IrlvfKArs8GqkGIjDFD1f/view?usp=sharing)
- **Presentation:** [Click Here](https://www.canva.com/design/DAGkUr3MUJ4/Ho0Qg3negsPfrtzPnflcPA/view?utm_content=DAGkUr3MUJ4&utm_campaign=designshare&utm_medium=link2&utm_source=uniquelinks&utlId=h10af00e94c)
- **Live Site:** [plateeful.netlify.app](https://plateeful.netlify.app/)

### System Architecture
<img width="7676" height="8192" alt="Untitled diagram-2026-09-29-104946" src="https://github.com/user-attachments/assets/6ed9caf5-be3d-40b5-b050-bb3894237fb2" />

## Features
- Real-time food listing and matching
- Geo-targeted pickup scheduling
- Donation scheduling and logistics management
- Verification for Plate Sharers
- Analytics dashboard (impact tracker and logs)
- Multilingual and offline support
- Campaign launch and participation
- Government and CSR collaborations
- Crowdfunding feature with real-time donation tracking and impact visibility

## User Roles

- **Plate Givers:** Individuals or organizations donating food
- **Plate Sharers:** Verified individuals, NGOs, or communities receiving food
- **Donors:** Individuals making monetary contributions via crowdfunding, with real-time impact tracking

## Business Model

- Free for Plate Givers to donate
- Plate Sharers pay a small logistics fee
- Plateful earns a platform fee from each logistics transaction
- Optional subscriptions and CSR partnerships for scale

## Technology Stack

- **Frontend:** React, Vite, TypeScript
- **Backend:** FastAPI
- **Mobile Integration:** Capacitor
- **AI Module:** CNN-based food scanner (TensorFlow / PyTorch)
- **Database:** MySQL
- **Cloud and Hosting:** (Add your hosting service here)
- **Other:** Arduino Lilypad integration for smart pings (if used)

## Getting Started

### Prerequisites

- Node.js
- Python 3.8+
- MongoDB
- Mongoose
- [Capacitor CLI](https://capacitorjs.com/docs/getting-started)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/plateful.git
   cd plateful
   ```
2. For Frontend
   ```bash
   npm install
   npm run dev
   ```
3. For Backend
   ```bash
   cd mongoose
   npm install
   npm run devStart
   ```
