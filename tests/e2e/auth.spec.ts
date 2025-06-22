import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies and local storage before each test
    await page.context().clearCookies();
    await page.evaluate(() => localStorage.clear());
  });

  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    
    // Check page title and form elements
    await expect(page).toHaveTitle(/Login/i);
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
    
    // Check for "Remember me" and "Forgot password" links
    await expect(page.locator('text=Remember me')).toBeVisible();
    await expect(page.locator('text=Forgot password')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in login form
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'Demo123!');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Should show user info in header
    await expect(page.locator('text=Demo User')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in invalid credentials
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'WrongPassword');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
    
    // Should not redirect
    await expect(page).toHaveURL('/login');
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in invalid email
    await page.fill('input[type="email"]', 'not-an-email');
    await page.fill('input[type="password"]', 'Password123!');
    
    // Click login button
    await page.click('button[type="submit"]');
    
    // Should show validation error
    await expect(page.locator('text=Please enter a valid email')).toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    // First login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'Demo123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
    
    // Click user menu
    await page.click('[data-testid="user-menu"]');
    
    // Click logout
    await page.click('text=Logout');
    
    // Should redirect to login
    await expect(page).toHaveURL('/login');
    
    // Should not be able to access dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveURL('/login?redirect=%2Fdashboard');
  });

  test('should persist login across page refreshes', async ({ page }) => {
    // Login
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'Demo123!');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('/dashboard');
    
    // Refresh page
    await page.reload();
    
    // Should still be logged in
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('text=Demo User')).toBeVisible();
  });

  test('should redirect to original page after login', async ({ page }) => {
    // Try to access protected page
    await page.goto('/settings');
    
    // Should redirect to login with redirect parameter
    await expect(page).toHaveURL('/login?redirect=%2Fsettings');
    
    // Login
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'Demo123!');
    await page.click('button[type="submit"]');
    
    // Should redirect to original page
    await expect(page).toHaveURL('/settings');
  });

  test('should handle network errors gracefully', async ({ page, context }) => {
    // Block API requests
    await context.route('**/api/auth/login', route => route.abort());
    
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'Demo123!');
    await page.click('button[type="submit"]');
    
    // Should show network error
    await expect(page.locator('text=Network error')).toBeVisible();
  });

  test('should handle slow network gracefully', async ({ page, context }) => {
    // Delay API response
    await context.route('**/api/auth/login', async route => {
      await new Promise(resolve => setTimeout(resolve, 3000));
      await route.continue();
    });
    
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'Demo123!');
    await page.click('button[type="submit"]');
    
    // Should show loading state
    await expect(page.locator('button[type="submit"]')).toBeDisabled();
    await expect(page.locator('text=Signing in...')).toBeVisible();
    
    // Should eventually succeed
    await expect(page).toHaveURL('/dashboard', { timeout: 10000 });
  });
});

test.describe('Registration Flow', () => {
  test('should register new user', async ({ page }) => {
    await page.goto('/register');
    
    // Fill registration form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', `test${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'TestPass123!');
    await page.fill('input[name="confirmPassword"]', 'TestPass123!');
    await page.fill('input[name="organizationName"]', 'Test Organization');
    
    // Accept terms
    await page.check('input[name="acceptTerms"]');
    
    // Submit form
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard');
  });

  test('should validate password requirements', async ({ page }) => {
    await page.goto('/register');
    
    // Fill weak password
    await page.fill('input[name="password"]', 'weak');
    await page.click('body'); // Trigger blur
    
    // Should show password requirements
    await expect(page.locator('text=At least 8 characters')).toBeVisible();
    await expect(page.locator('text=One uppercase letter')).toBeVisible();
    await expect(page.locator('text=One number')).toBeVisible();
    await expect(page.locator('text=One special character')).toBeVisible();
  });

  test('should check password match', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('input[name="password"]', 'TestPass123!');
    await page.fill('input[name="confirmPassword"]', 'DifferentPass123!');
    await page.click('body'); // Trigger blur
    
    // Should show mismatch error
    await expect(page.locator('text=Passwords do not match')).toBeVisible();
  });
});

test.describe('Password Reset Flow', () => {
  test('should request password reset', async ({ page }) => {
    await page.goto('/login');
    await page.click('text=Forgot password');
    
    // Should navigate to forgot password page
    await expect(page).toHaveURL('/forgot-password');
    
    // Fill email
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.click('button[type="submit"]');
    
    // Should show success message
    await expect(page.locator('text=Password reset link sent')).toBeVisible();
  });
});

test.describe('Two-Factor Authentication', () => {
  test('should enable 2FA', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.fill('input[type="email"]', 'demo@mohitai.com');
    await page.fill('input[type="password"]', 'Demo123!');
    await page.click('button[type="submit"]');
    
    // Navigate to security settings
    await page.goto('/settings/security');
    
    // Click enable 2FA
    await page.click('text=Enable Two-Factor Authentication');
    
    // Should show QR code
    await expect(page.locator('[data-testid="2fa-qr-code"]')).toBeVisible();
    
    // Should show backup codes
    await expect(page.locator('text=Backup codes')).toBeVisible();
  });
});