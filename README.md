# AI Bond Tracker

A modern web application for tracking investment-grade tech bond prices with AI-powered insights.

## Features

- **Live Price Table** - Real-time bond pricing with sorting and filtering
- **AI Summaries** - Expandable AI-generated insights for each bond
- **Issuer Spotlight** - Featured tech issuers with key metrics
- **Historic Charts** - Visual price history and trends
- **Responsive Design** - Optimized for desktop and mobile

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **GSAP** with ScrollTrigger for scroll-based animations
- **Recharts** for data visualization
- **Radix UI** for accessible components

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server runs at `http://localhost:5173`

## Project Structure

```
src/
├── sections/          # Page sections (Hero, LivePriceTable, etc.)
├── components/ui/     # Reusable UI components
├── data/              # Bond data and utilities
├── types/             # TypeScript type definitions
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## License

MIT
