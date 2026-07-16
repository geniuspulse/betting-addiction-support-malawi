# Betting Addiction Support Malawi (BASM)

A digital platform helping betting addicts in Malawi through structured recovery programs, professional counselling, and peer community support.

## 🎯 Mission
To provide accessible, stigma-free support for individuals struggling with betting addiction in Malawi.

## 🌟 Features
- **Self-Assessment Quiz** — gauge addiction severity and get matched to the right program
- **Recovery Programs** — 3 tiers (30/60/90 day) with structured daily activities
- **Expert Counselling** — book one-on-one sessions with certified counsellors
- **Group Therapy** — anonymous peer support sessions
- **Crisis SOS** — immediate help when relapse risk is high
- **Progress Tracking** — milestones, badges, and accountability tools
- **Resource Library** — articles, videos, and self-help tools

## 🏗️ Project Structure
```
betting-addiction-support-malawi/
├── frontend/          # React.js frontend
│   └── src/
│       ├── components/   # Reusable UI components
│       ├── pages/        # App pages/screens
│       ├── hooks/        # Custom React hooks
│       └── utils/        # Helper functions
├── backend/           # Node.js + Express API
│   └── src/
│       ├── routes/       # API route definitions
│       ├── controllers/  # Business logic
│       ├── models/       # Database models
│       └── middleware/   # Auth, logging, etc.
└── docs/              # Project documentation
```

## 🛠️ Tech Stack
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Auth:** JWT

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- PostgreSQL 14+

### Installation
```bash
# Clone the repo
git clone https://github.com/geniuspulse/betting-addiction-support-malawi.git
cd betting-addiction-support-malawi

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### Running Locally
```bash
# Backend (from /backend)
npm run dev

# Frontend (from /frontend)
npm start
```

## 📋 Recovery Programs

| Program | Duration | Best For |
|---------|----------|----------|
| Awareness | 30 days | Mild / early-stage addiction |
| Recovery | 60 days | Moderate addiction |
| Intensive Support | 90 days | Severe addiction |

## 🤝 Contributing
Pull requests are welcome! Please read [CONTRIBUTING.md](docs/CONTRIBUTING.md) first.

## 📄 License
MIT License — see [LICENSE](LICENSE) for details.

## 📞 Crisis Support
If you or someone you know needs immediate help, please reach out to a mental health professional.
