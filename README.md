# Mohit AI Frontend

Modern, responsive frontend for the Mohit AI Inbound SDR platform.

## Features

- 🎨 **Modern UI**: Built with Next.js 14 and Tailwind CSS
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 🚀 **Real-time Updates**: WebSocket integration for live data
- 📊 **Interactive Dashboard**: Monitor lead response metrics
- 🔒 **Secure Auth**: JWT-based authentication
- 🌙 **Dark Mode**: Built-in theme support

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI
- **State**: Zustand for global state
- **Data Fetching**: TanStack Query
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod

## Quick Start

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
├── app/                # Next.js app router pages
│   ├── (auth)/        # Authentication pages
│   ├── (dashboard)/   # Protected dashboard pages
│   └── api/           # API routes (if needed)
├── components/        # Reusable components
│   ├── ui/           # Base UI components
│   ├── layouts/      # Layout components
│   └── features/     # Feature-specific components
├── lib/              # Utilities and helpers
├── services/         # API service layer
├── stores/           # Zustand stores
└── types/            # TypeScript types
```

## Key Features

### Dashboard
- Real-time lead response metrics
- Response time tracking
- Channel distribution visualization
- Active lead monitoring

### Lead Management
- Lead list with search and filters
- Lead detail view with conversation history
- Bulk import and assignment
- Qualification scoring

### Live Queue
- Real-time view of incoming leads
- Response status monitoring
- Channel-specific queues

### Analytics
- Response time trends
- Conversion funnel analysis
- Team performance metrics
- ROI calculations

## Development

### Code Style
- Use TypeScript strict mode
- Follow Next.js best practices
- Prefer server components when possible
- Use Tailwind for styling

### Testing
```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
npm run test:e2e    # E2E tests
```

### Building
```bash
npm run build       # Production build
npm run start       # Start production server
```

## Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t mohit-ai-frontend .
docker run -p 3000:3000 mohit-ai-frontend
```

### Traditional Hosting
```bash
npm run build
npm run start
```

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_WEBSOCKET_URL`: WebSocket server URL

## Contributing

1. Fork the repository
2. Create feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

Proprietary - Mohit AI © 2024# Trigger Render rebuild
