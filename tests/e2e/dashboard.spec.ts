import { test, expect } from '@playwright/test';

// Helper function to login
async function login(page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'demo@mohitai.com');
  await page.fill('input[type="password"]', 'Demo123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display dashboard metrics', async ({ page }) => {
    // Check for metric cards
    await expect(page.locator('text=Total Leads')).toBeVisible();
    await expect(page.locator('text=Active Campaigns')).toBeVisible();
    await expect(page.locator('text=Emails Sent')).toBeVisible();
    await expect(page.locator('text=Conversion Rate')).toBeVisible();
    
    // Check for charts
    await expect(page.locator('[data-testid="performance-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="activity-chart"]')).toBeVisible();
  });

  test('should navigate through sidebar', async ({ page }) => {
    // Test navigation items
    const navItems = [
      { text: 'Leads', url: '/leads' },
      { text: 'Campaigns', url: '/campaigns' },
      { text: 'Conversations', url: '/conversations' },
      { text: 'Analytics', url: '/analytics' },
      { text: 'Settings', url: '/settings' },
    ];

    for (const item of navItems) {
      await page.click(`nav >> text=${item.text}`);
      await expect(page).toHaveURL(item.url);
      await expect(page.locator('h1')).toContainText(item.text);
    }
  });

  test('should toggle dark mode', async ({ page }) => {
    // Find and click theme toggle
    await page.click('[data-testid="theme-toggle"]');
    
    // Check if dark mode is applied
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Toggle back
    await page.click('[data-testid="theme-toggle"]');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('should show notifications', async ({ page }) => {
    // Click notification bell
    await page.click('[data-testid="notification-bell"]');
    
    // Should show notification dropdown
    await expect(page.locator('[data-testid="notification-dropdown"]')).toBeVisible();
    
    // Should show notification items
    await expect(page.locator('text=New lead assigned')).toBeVisible();
  });

  test('should update breadcrumbs on navigation', async ({ page }) => {
    // Navigate to nested page
    await page.goto('/leads');
    await expect(page.locator('[data-testid="breadcrumb"]')).toContainText('Leads');
    
    // Go deeper
    await page.click('[data-testid="lead-item"]', { timeout: 5000 });
    await expect(page.locator('[data-testid="breadcrumb"]')).toContainText('Lead Details');
  });
});

test.describe('Lead Management', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/leads');
  });

  test('should display leads table', async ({ page }) => {
    // Check table headers
    await expect(page.locator('th:has-text("Name")')).toBeVisible();
    await expect(page.locator('th:has-text("Email")')).toBeVisible();
    await expect(page.locator('th:has-text("Company")')).toBeVisible();
    await expect(page.locator('th:has-text("Score")')).toBeVisible();
    await expect(page.locator('th:has-text("Status")')).toBeVisible();
    
    // Check for lead rows
    await expect(page.locator('tbody tr')).toHaveCount(10); // Assuming 10 per page
  });

  test('should filter leads', async ({ page }) => {
    // Open filter panel
    await page.click('button:has-text("Filter")');
    
    // Filter by status
    await page.selectOption('select[name="status"]', 'qualified');
    await page.click('button:has-text("Apply")');
    
    // Check filtered results
    await expect(page.locator('tbody tr')).toHaveCount(5); // Assuming fewer qualified leads
    await expect(page.locator('td:has-text("Qualified")')).toBeVisible();
  });

  test('should sort leads', async ({ page }) => {
    // Click on Score column to sort
    await page.click('th:has-text("Score")');
    
    // Verify sorting indicator
    await expect(page.locator('th:has-text("Score") [data-testid="sort-desc"]')).toBeVisible();
    
    // Click again to reverse sort
    await page.click('th:has-text("Score")');
    await expect(page.locator('th:has-text("Score") [data-testid="sort-asc"]')).toBeVisible();
  });

  test('should create new lead', async ({ page }) => {
    // Click add lead button
    await page.click('button:has-text("Add Lead")');
    
    // Fill lead form
    await page.fill('input[name="firstName"]', 'John');
    await page.fill('input[name="lastName"]', 'Doe');
    await page.fill('input[name="email"]', 'john.doe@example.com');
    await page.fill('input[name="phone"]', '+1234567890');
    await page.fill('input[name="company"]', 'Acme Corp');
    await page.fill('input[name="title"]', 'CEO');
    
    // Submit form
    await page.click('button:has-text("Create Lead")');
    
    // Should show success message
    await expect(page.locator('text=Lead created successfully')).toBeVisible();
    
    // Should appear in list
    await expect(page.locator('td:has-text("John Doe")')).toBeVisible();
  });

  test('should bulk import leads', async ({ page }) => {
    // Click import button
    await page.click('button:has-text("Import")');
    
    // Upload CSV file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('./tests/fixtures/sample-leads.csv');
    
    // Map columns
    await page.selectOption('select[data-field="firstName"]', 'First Name');
    await page.selectOption('select[data-field="lastName"]', 'Last Name');
    await page.selectOption('select[data-field="email"]', 'Email');
    
    // Start import
    await page.click('button:has-text("Start Import")');
    
    // Should show progress
    await expect(page.locator('[data-testid="import-progress"]')).toBeVisible();
    
    // Should show completion
    await expect(page.locator('text=Import completed')).toBeVisible({ timeout: 30000 });
  });

  test('should edit lead details', async ({ page }) => {
    // Click on a lead
    await page.click('tbody tr:first-child');
    
    // Click edit button
    await page.click('button:has-text("Edit")');
    
    // Update fields
    await page.fill('input[name="title"]', 'VP of Sales');
    await page.fill('input[name="leadScore"]', '95');
    
    // Save changes
    await page.click('button:has-text("Save")');
    
    // Should show success message
    await expect(page.locator('text=Lead updated successfully')).toBeVisible();
  });

  test('should delete lead', async ({ page }) => {
    // Click on a lead
    await page.click('tbody tr:first-child');
    
    // Click delete button
    await page.click('button:has-text("Delete")');
    
    // Confirm deletion
    await page.click('button:has-text("Confirm Delete")');
    
    // Should show success message
    await expect(page.locator('text=Lead deleted successfully')).toBeVisible();
  });
});

test.describe('Campaign Management', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/campaigns');
  });

  test('should create email campaign', async ({ page }) => {
    // Click create campaign
    await page.click('button:has-text("Create Campaign")');
    
    // Fill campaign details
    await page.fill('input[name="name"]', 'Q4 Outreach Campaign');
    await page.fill('textarea[name="description"]', 'End of year promotion campaign');
    await page.selectOption('select[name="type"]', 'email');
    
    // Select audience
    await page.click('button:has-text("Select Audience")');
    await page.check('input[value="high-value-leads"]');
    await page.click('button:has-text("Apply")');
    
    // Configure email
    await page.fill('input[name="subject"]', 'Special Year-End Offer');
    await page.fill('[data-testid="email-editor"]', 'Dear {{firstName}}, We have a special offer...');
    
    // Schedule campaign
    await page.click('input[name="scheduledDate"]');
    await page.click('button:has-text("Tomorrow")');
    
    // Save campaign
    await page.click('button:has-text("Create Campaign")');
    
    // Should show success
    await expect(page.locator('text=Campaign created successfully')).toBeVisible();
  });

  test('should preview campaign', async ({ page }) => {
    // Click on existing campaign
    await page.click('td:has-text("Welcome Campaign")');
    
    // Click preview button
    await page.click('button:has-text("Preview")');
    
    // Should show preview modal
    await expect(page.locator('[data-testid="campaign-preview"]')).toBeVisible();
    
    // Should show personalized content
    await expect(page.locator('text=Dear John')).toBeVisible();
  });

  test('should start campaign', async ({ page }) => {
    // Find draft campaign
    await page.click('tr:has-text("Draft")');
    
    // Click start button
    await page.click('button:has-text("Start Campaign")');
    
    // Confirm
    await page.click('button:has-text("Yes, Start")');
    
    // Should update status
    await expect(page.locator('text=Campaign started')).toBeVisible();
    await expect(page.locator('[data-testid="campaign-status"]')).toContainText('Active');
  });

  test('should pause campaign', async ({ page }) => {
    // Find active campaign
    await page.click('tr:has-text("Active")');
    
    // Click pause button
    await page.click('button:has-text("Pause")');
    
    // Should update status
    await expect(page.locator('[data-testid="campaign-status"]')).toContainText('Paused');
  });
});

test.describe('Email Composer', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/campaigns/new');
  });

  test('should use email template', async ({ page }) => {
    // Open template library
    await page.click('button:has-text("Use Template")');
    
    // Select template
    await page.click('[data-testid="template-card"]:has-text("Welcome Email")');
    
    // Should populate editor
    await expect(page.locator('[data-testid="email-editor"]')).toContainText('Welcome to');
  });

  test('should insert personalization tokens', async ({ page }) => {
    // Click in editor
    await page.click('[data-testid="email-editor"]');
    
    // Insert token
    await page.click('button:has-text("Insert Token")');
    await page.click('text=First Name');
    
    // Should insert token
    await expect(page.locator('[data-testid="email-editor"]')).toContainText('{{firstName}}');
  });

  test('should validate email before sending', async ({ page }) => {
    // Try to send without subject
    await page.click('button:has-text("Send")');
    
    // Should show validation error
    await expect(page.locator('text=Subject is required')).toBeVisible();
    
    // Fill subject
    await page.fill('input[name="subject"]', 'Test Email');
    
    // Try to send without content
    await page.click('button:has-text("Send")');
    
    // Should show validation error
    await expect(page.locator('text=Email content is required')).toBeVisible();
  });
});