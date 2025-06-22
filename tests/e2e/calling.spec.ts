import { test, expect } from '@playwright/test';

// Helper function to login
async function login(page) {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'demo@mohitai.com');
  await page.fill('input[type="password"]', 'Demo123!');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
}

test.describe('Calling Interface', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test('should display dialer interface', async ({ page }) => {
    await page.goto('/calls');
    
    // Check for dialer components
    await expect(page.locator('[data-testid="dial-pad"]')).toBeVisible();
    await expect(page.locator('[data-testid="phone-input"]')).toBeVisible();
    await expect(page.locator('button:has-text("Call")')).toBeVisible();
    
    // Check for call queue
    await expect(page.locator('[data-testid="call-queue"]')).toBeVisible();
  });

  test('should make outbound call', async ({ page }) => {
    await page.goto('/calls');
    
    // Enter phone number
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    
    // Start call
    await page.click('button:has-text("Call")');
    
    // Should show calling state
    await expect(page.locator('text=Connecting...')).toBeVisible();
    
    // Should show call controls
    await expect(page.locator('button:has-text("Mute")')).toBeVisible();
    await expect(page.locator('button:has-text("Hold")')).toBeVisible();
    await expect(page.locator('button:has-text("End Call")')).toBeVisible();
    
    // Should show timer
    await expect(page.locator('[data-testid="call-timer"]')).toBeVisible();
  });

  test('should use dial pad', async ({ page }) => {
    await page.goto('/calls');
    
    // Click dial pad numbers
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    for (const num of numbers) {
      await page.click(`[data-testid="dial-${num}"]`);
    }
    
    // Should populate phone input
    await expect(page.locator('[data-testid="phone-input"]')).toHaveValue('1234567890');
    
    // Test backspace
    await page.click('[data-testid="dial-backspace"]');
    await expect(page.locator('[data-testid="phone-input"]')).toHaveValue('123456789');
  });

  test('should handle call controls', async ({ page }) => {
    await page.goto('/calls');
    
    // Start a call
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    await page.click('button:has-text("Call")');
    
    // Test mute
    await page.click('button:has-text("Mute")');
    await expect(page.locator('button:has-text("Unmute")')).toBeVisible();
    await page.click('button:has-text("Unmute")');
    
    // Test hold
    await page.click('button:has-text("Hold")');
    await expect(page.locator('button:has-text("Resume")')).toBeVisible();
    await expect(page.locator('text=On Hold')).toBeVisible();
    await page.click('button:has-text("Resume")');
    
    // End call
    await page.click('button:has-text("End Call")');
    await expect(page.locator('[data-testid="call-ended"]')).toBeVisible();
  });

  test('should record call', async ({ page }) => {
    await page.goto('/calls');
    
    // Start a call
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    await page.click('button:has-text("Call")');
    
    // Start recording
    await page.click('button:has-text("Record")');
    await expect(page.locator('[data-testid="recording-indicator"]')).toBeVisible();
    await expect(page.locator('text=Recording')).toBeVisible();
    
    // Stop recording
    await page.click('button:has-text("Stop Recording")');
    await expect(page.locator('[data-testid="recording-indicator"]')).not.toBeVisible();
  });

  test('should transfer call', async ({ page }) => {
    await page.goto('/calls');
    
    // Start a call
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    await page.click('button:has-text("Call")');
    
    // Click transfer
    await page.click('button:has-text("Transfer")');
    
    // Should show transfer dialog
    await expect(page.locator('[data-testid="transfer-dialog"]')).toBeVisible();
    
    // Select transfer target
    await page.selectOption('select[name="transferTo"]', 'sales-team');
    await page.click('button:has-text("Transfer Now")');
    
    // Should show transfer success
    await expect(page.locator('text=Call transferred')).toBeVisible();
  });

  test('should show call script', async ({ page }) => {
    await page.goto('/calls');
    
    // Select a lead to call
    await page.click('[data-testid="call-queue-item"]:first-child');
    
    // Should show script panel
    await expect(page.locator('[data-testid="call-script"]')).toBeVisible();
    
    // Should show lead info
    await expect(page.locator('[data-testid="lead-info"]')).toBeVisible();
    await expect(page.locator('text=Previous Interactions')).toBeVisible();
    
    // Should show talking points
    await expect(page.locator('text=Key Talking Points')).toBeVisible();
  });

  test('should log call notes', async ({ page }) => {
    await page.goto('/calls');
    
    // Start a call
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    await page.click('button:has-text("Call")');
    
    // Add notes during call
    await page.fill('[data-testid="call-notes"]', 'Customer interested in premium plan');
    
    // End call
    await page.click('button:has-text("End Call")');
    
    // Should show disposition dialog
    await expect(page.locator('[data-testid="disposition-dialog"]')).toBeVisible();
    
    // Select disposition
    await page.selectOption('select[name="disposition"]', 'interested');
    await page.click('button:has-text("Save & Next")');
    
    // Should save call log
    await expect(page.locator('text=Call logged successfully')).toBeVisible();
  });

  test('should show real-time transcription', async ({ page }) => {
    await page.goto('/calls');
    
    // Start a call
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    await page.click('button:has-text("Call")');
    
    // Should show transcription panel
    await expect(page.locator('[data-testid="transcription-panel"]')).toBeVisible();
    
    // Should show live transcription
    await expect(page.locator('[data-testid="transcription-text"]')).toBeVisible();
  });

  test('should display sentiment analysis', async ({ page }) => {
    await page.goto('/calls');
    
    // Start a call
    await page.fill('[data-testid="phone-input"]', '+1234567890');
    await page.click('button:has-text("Call")');
    
    // Should show sentiment indicator
    await expect(page.locator('[data-testid="sentiment-indicator"]')).toBeVisible();
    
    // Should update sentiment
    await expect(page.locator('[data-testid="sentiment-positive"]')).toBeVisible();
  });
});

test.describe('Call Queue Management', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/calls');
  });

  test('should display call queue', async ({ page }) => {
    // Check queue is visible
    await expect(page.locator('[data-testid="call-queue"]')).toBeVisible();
    
    // Should show queue items
    await expect(page.locator('[data-testid="call-queue-item"]')).toHaveCount(5);
    
    // Should show lead info in queue
    await expect(page.locator('text=John Doe')).toBeVisible();
    await expect(page.locator('text=Acme Corp')).toBeVisible();
  });

  test('should filter call queue', async ({ page }) => {
    // Open filter
    await page.click('button:has-text("Filter Queue")');
    
    // Filter by priority
    await page.check('input[value="high-priority"]');
    await page.click('button:has-text("Apply")');
    
    // Should show filtered results
    await expect(page.locator('[data-testid="call-queue-item"]')).toHaveCount(2);
  });

  test('should reorder queue items', async ({ page }) => {
    // Get first item text
    const firstItem = await page.locator('[data-testid="call-queue-item"]:first-child').textContent();
    
    // Drag first item to third position
    await page.dragAndDrop(
      '[data-testid="call-queue-item"]:first-child',
      '[data-testid="call-queue-item"]:nth-child(3)'
    );
    
    // Verify order changed
    const newThirdItem = await page.locator('[data-testid="call-queue-item"]:nth-child(3)').textContent();
    expect(newThirdItem).toBe(firstItem);
  });

  test('should skip to next in queue', async ({ page }) => {
    // Get second item in queue
    const secondItem = await page.locator('[data-testid="call-queue-item"]:nth-child(2)').textContent();
    
    // Skip current
    await page.click('button:has-text("Skip")');
    
    // Second item should now be first
    const newFirstItem = await page.locator('[data-testid="call-queue-item"]:first-child').textContent();
    expect(newFirstItem).toBe(secondItem);
  });
});

test.describe('Call History', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
    await page.goto('/calls/history');
  });

  test('should display call history', async ({ page }) => {
    // Check for history table
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('th:has-text("Contact")')).toBeVisible();
    await expect(page.locator('th:has-text("Duration")')).toBeVisible();
    await expect(page.locator('th:has-text("Disposition")')).toBeVisible();
    await expect(page.locator('th:has-text("Date")')).toBeVisible();
  });

  test('should play call recording', async ({ page }) => {
    // Click on a call with recording
    await page.click('tr:has-text("Recording Available")');
    
    // Click play button
    await page.click('button:has-text("Play Recording")');
    
    // Should show audio player
    await expect(page.locator('audio')).toBeVisible();
    await expect(page.locator('[data-testid="audio-controls"]')).toBeVisible();
  });

  test('should view call details', async ({ page }) => {
    // Click on a call
    await page.click('tbody tr:first-child');
    
    // Should show call details panel
    await expect(page.locator('[data-testid="call-details"]')).toBeVisible();
    
    // Should show transcription
    await expect(page.locator('text=Transcription')).toBeVisible();
    
    // Should show notes
    await expect(page.locator('text=Call Notes')).toBeVisible();
    
    // Should show sentiment analysis
    await expect(page.locator('text=Sentiment Analysis')).toBeVisible();
  });

  test('should export call logs', async ({ page }) => {
    // Click export button
    await page.click('button:has-text("Export")');
    
    // Select date range
    await page.click('button:has-text("Last 30 days")');
    
    // Select format
    await page.selectOption('select[name="format"]', 'csv');
    
    // Download
    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click('button:has-text("Download")'),
    ]);
    
    // Verify download
    expect(download.suggestedFilename()).toContain('call-logs');
    expect(download.suggestedFilename()).toContain('.csv');
  });
});