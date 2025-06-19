# 🚀 Quick Start Guide - Fix Network Error

## The Problem
You're getting a network error because the frontend is trying to connect to a backend API that isn't running.

## Quick Solutions

### Option 1: Use Mock Authentication (Fastest)
1. Create a temporary mock auth for testing:

```bash
# Create a mock API route
mkdir -p src/app/api/auth
```

2. Create `src/app/api/auth/login/route.ts`:
```typescript
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // Mock authentication - accept any login for testing
  if (email && password) {
    return NextResponse.json({
      user: {
        id: '1',
        email: email,
        name: 'Test User',
        role: 'admin',
        organizationId: 'org-1'
      },
      token: 'mock-jwt-token-for-testing'
    });
  }
  
  return NextResponse.json(
    { message: 'Invalid credentials' },
    { status: 401 }
  );
}
```

### Option 2: Run the Backend
If you have the backend code in `mohit-ai-backend-new`:

```bash
# Terminal 1 - Run Backend
cd mohit-ai-backend-new
npm install
npm run dev

# Terminal 2 - Run Frontend
cd mohit-inbound-sdr
npm run dev
```

### Option 3: Use a Deployed Backend
If you have a deployed backend, update `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NEXT_PUBLIC_WS_URL=wss://your-backend.onrender.com
```

## Immediate Fix (Mock Auth)

Run these commands to enable mock authentication:

```bash
# 1. Create the API route file
cat > src/app/api/auth/login/route.ts << 'EOF'
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, password } = await request.json();
  
  // Mock authentication - accept any login for testing
  if (email && password) {
    return NextResponse.json({
      user: {
        id: '1',
        email: email,
        name: 'Test User',
        role: 'admin',
        organizationId: 'org-1'
      },
      token: 'mock-jwt-token-for-testing'
    });
  }
  
  return NextResponse.json(
    { message: 'Invalid credentials' },
    { status: 401 }
  );
}
EOF

# 2. Update .env.local to use local API
cat > .env.local << 'EOF'
# Use Next.js API routes for mock backend
NEXT_PUBLIC_API_URL=/api
NEXT_PUBLIC_WS_URL=ws://localhost:3000

# App Configuration
NEXT_PUBLIC_APP_NAME=Mohit AI
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

# 3. Restart the development server
npm run dev
```

Now you can login with any email/password combination!

## Test Credentials
- Email: `test@example.com`
- Password: `password` (or anything)

## Next Steps
1. Once logged in, you can explore all the features
2. The data is mocked, so changes won't persist
3. To connect to a real backend, follow Option 2 or 3 above

## Need the Backend?
The backend code should be in the `mohit-ai-backend-new` directory. If you need help setting it up, let me know!