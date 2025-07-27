# Mohit AI - External Pages (v8)

This repository contains only the external/public-facing pages of Mohit AI, completely isolated from internal dashboard functionality.

## Pages Included

- **Homepage** - Landing page with hero, features, and CTAs
- **About** - Company information and mission
- **Pricing** - Pricing plans and comparison
- **Features** - Detailed feature descriptions
- **Solutions** - Industry-specific solutions
  - For SDRs
  - For Managers
  - Enterprise
  - Small Business
- **Resources** - Documentation and guides
- **Security** - Security and compliance information
- **Contact** - Contact form and information
- **Demo** - Product demo page

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Radix UI components

## Project Structure

```
src/
├── app/           # Next.js app directory with all pages
├── components/    # Reusable components
│   ├── layouts/   # Navigation and layout components
│   └── ui/        # UI component library
└── public/        # Static assets
```

All pages are fully self-contained with their own styling and work independently without any backend or authentication requirements.