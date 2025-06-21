# Harper AI SDR Platform - User-Facing Copy Documentation

This document contains all user-facing text extracted from the Harper AI SDR platform Next.js application. The text is organized by pages and components for easy reference.

## Table of Contents

- [Authentication Pages](#authentication-pages)
  - [Login Page](#login-page)
  - [Register Page](#register-page)
  - [Forgot Password Page](#forgot-password-page)
- [Dashboard Pages](#dashboard-pages)
  - [Main Dashboard](#main-dashboard)
  - [Calling Page](#calling-page)
  - [Contacts Page](#contacts-page)
  - [Calendar Page](#calendar-page)
  - [Email Page](#email-page)
  - [Pipeline Page](#pipeline-page)
  - [Playbooks Page](#playbooks-page)
  - [Reports Page](#reports-page)
  - [Settings Page](#settings-page)
  - [Team Page](#team-page)
- [Components](#components)
  - [Sidebar Navigation](#sidebar-navigation)
  - [Call Interface](#call-interface)
  - [Contact Management](#contact-management)
  - [Settings Components](#settings-components)
- [Error Pages](#error-pages)
- [Metadata](#metadata)

---

## Authentication Pages

### Login Page
**File:** `src/app/(auth)/login/page.tsx`

**Main Content:**
- Logo: "H"
- Page Title: "Welcome to Harper AI"
- Subtitle: "Sign in to your account to continue"
- Card Title: "Sign In"
- Card Description: "Enter your credentials to access your account"

**Form Fields:**
- Email Label: "Email"
- Email Placeholder: "Enter your email"
- Password Label: "Password"
- Password Placeholder: "Enter your password"
- Remember Me: "Remember me"
- Forgot Password Link: "Forgot password?"

**Buttons:**
- Sign In Button: "Sign In" / "Signing in..." (loading state)
- Social Login: "Or continue with"
  - "Google"
  - "Microsoft"
- Sign Up Link: "Don't have an account? Sign up"

**Development Mode:**
- "🚀 Development Mode"
- "Skip Login (Dev Bypass) →"

**Validation Messages:**
- "Please enter a valid email address"
- "Password must be at least 6 characters"

### Register Page
**File:** `src/app/(auth)/register/page.tsx`

**Main Content:**
- Logo: "H"
- Page Title: "Join Harper AI"
- Subtitle: "Create your account to get started"
- Card Title: "Create Account"
- Card Description: "Enter your details to create your account"

**Form Fields:**
- "Full Name" - Placeholder: "Enter your full name"
- "Email Address" - Placeholder: "Enter your email"
- "Organization Name" - Placeholder: "Enter your organization name"
- "Password" - Placeholder: "Create a password"
- "Confirm Password" - Placeholder: "Confirm your password"

**Agreement:**
- "I agree to the Terms of Service and Privacy Policy"

**Buttons:**
- "Create Account" / "Creating Account..." (loading state)
- "Already have an account? Sign in"

**Validation Messages:**
- "Name must be at least 2 characters"
- "Please enter a valid email address"
- "Password must be at least 8 characters"
- "Please confirm your password"
- "Organization name is required"
- "Passwords don't match"

**Success/Error Messages:**
- "Registration successful! Please check your email to verify your account."
- "Registration failed. Please try again."

### Forgot Password Page
**File:** `src/app/(auth)/forgot-password/page.tsx`

**Main Content:**
- Logo: "H"
- Page Title: "Forgot Password"
- Subtitle: "Enter your email to reset your password"
- Card Title: "Reset Password"
- Card Description: "We'll send you a link to reset your password"

**Form Fields:**
- "Email Address" - Placeholder: "Enter your email"

**Buttons:**
- "Send Reset Link" / "Sending..." (loading state)
- "Back to Sign In"

**Success State:**
- "Check your email"
- "We've sent a password reset link to your email address."

**Error Message:**
- "Failed to send reset email. Please try again."

---

## Dashboard Pages

### Main Dashboard
**File:** `src/app/(dashboard)/dashboard/page.tsx`

**Header:**
- Title: "Dashboard"
- Subtitle: "Welcome back! Here's your performance overview."

**Metric Cards:**
- "Calls Today"
- "Emails Sent"
- "New Leads"
- "Deals Won"
- "+X% from yesterday"

**Action Buttons:**
- "Today"
- "Start Calling"

**Sections:**
- "Recent Activity"
- "Today's Tasks"
- "Performance Overview"
- "Team Leaderboard"

**Activity Status Types:**
- "completed", "sent", "scheduled", "missed", "unknown"

**Task Priorities:**
- "high", "medium", "low"

### Calling Page
**File:** `src/app/(dashboard)/calling/page.tsx`

**Header:**
- Title: "AI-Powered Calling"
- Badge: "AI Enhanced"
- Subtitle: "Make intelligent calls with real-time coaching and analytics"

**Status Display:**
- "Call Active • X:XX"

**Test Section:**
- "Test Twilio + ElevenLabs Integration"
- "Make a test call to verify your Twilio and ElevenLabs setup"

**Call Queue:**
- "Call Queue"
- "... and X more"

**Tabs:**
- "Dialer"
- "Contacts"
- "History"

**Coming Soon Messages:**
- "Week view coming soon"
- "Day view coming soon"

### Contacts Page
**File:** `src/app/(dashboard)/contacts/page.tsx`

**Header:**
- Title: "Contacts"
- Subtitle: "X total contacts"

**Action Buttons:**
- "Export"
- "Add Contact"

**Stats Cards:**
- "Total Contacts"
- "Active"
- "Prospects"
- "Customers"

**Main Section:**
- Card Title: "All Contacts"
- Search: "Search contacts..."

**Table Headers:**
- "Name"
- "Contact Info"
- "Company"
- "Status"
- "Lead Score"
- "Actions"

**Dropdown Actions:**
- "Edit"
- "Delete"

**Status Types:**
- "active", "inactive", "prospect", "customer", "churned"

**Empty/Loading States:**
- "Loading contacts..."
- "No contacts found matching your search."
- "No contacts yet. Add your first contact!"

**Confirmation/Toast Messages:**
- "Are you sure you want to delete X?"
- "Contact deleted"
- "X has been removed from your contacts."
- "Error" / "Failed to delete contact"

### Calendar Page
**File:** `src/app/(dashboard)/calendar/page.tsx`

**Header:**
- Title: "Calendar"
- Subtitle: "X events today" or "Schedule meetings and manage appointments"

**Action Button:**
- "New Event"

**Stats Cards:**
- "Today"
- "This Week"
- "Calls"
- "Meetings"

**Sections:**
- "Upcoming Events"
- "Quick Actions"

**Quick Action Buttons:**
- "View All Events"
- "Schedule for Tomorrow"
- "Sync with Google Calendar" (Badge: "Soon")

**Empty State:**
- "No upcoming events"

**Coming Soon:**
- "Week view coming soon"
- "Day view coming soon"

### Email Page
**File:** `src/app/(dashboard)/email/page.tsx`

**Header:**
- Title: "AI Email Personalization"
- Subtitle: "Generate hyper-personalized cold emails at scale"

**Settings Panel:**
- Title: "Email Settings"
- Description: "Configure your email generation preferences"

**Email Configuration:**
- **Tone Options:**
  - "Professional"
  - "Consultative"
  - "Direct"
  - "Friendly"
  - "Urgent"

- **Length Options:**
  - "Short (Under 100 words)"
  - "Medium (100-150 words)"
  - "Long (150-200 words)"

- **Subject Style:**
  - "Question"
  - "Benefit-focused"
  - "Company-specific"
  - "Statistic/Data"
  - "Personal"

- **Other Settings:**
  - "Call to Action"
  - "Focus Areas" (pain-points, benefits, social-proof, urgency)
  - "Include Features" (company-news, industry-insights, role-challenges)
  - "Custom Instructions"

**Recipients Panel:**
- Title: "Select Recipients"
- Description: "Choose contacts from your database or upload a CSV"

**Tabs:**
- "Upload CSV"
- "Existing Contacts"

**Upload Section:**
- "Upload CSV file"
- "CSV must include: name, email, company, title"
- "Loaded Contacts"
- "... and X more"

**Contacts Section:**
- Search: "Search contacts..."
- "Loading contacts..."
- "No contacts found"
- "Add Contacts" button
- "X of Y selected"
- "Select All" / "Deselect All"
- "Score: X"

**Generate Button:**
- "Generate Emails"

**Results Panel:**
- Title: "Generated Emails"
- Description: "Review and export your personalized emails"
- Button: "Export CSV"
- Error Header: "Some emails failed to generate:"
- Labels: "Subject:", "Body:", "Personalization:"

**Toast Messages:**
- "Invalid CSV"
- "CSV Uploaded" / "X contacts loaded successfully"
- "Upload Failed"
- "Authentication Required" / "Please log in to generate emails"
- "Emails Generated" / "Successfully generated X personalized emails"
- "Generation Failed"

### Pipeline Page
**File:** `src/app/(dashboard)/pipeline/page.tsx`

**Header:**
- Title: "Pipeline"
- Subtitle: "Track deals and sales opportunities"

**Action Buttons:**
- "Filter"
- "Add Deal"

**Under Construction:**
- "🚧 Under Construction"
- "The sales pipeline is being built. Coming soon with features like:"
  - "• Deal tracking"
  - "• Stage management"
  - "• Revenue forecasting"
  - "• Win/loss analysis"
  - "• Activity timeline"
  - "• Custom fields"
- "← Back to Dashboard"

### Playbooks Page
**File:** `src/app/(dashboard)/playbooks/page.tsx`

**Header:**
- Title: "Playbooks"
- Subtitle: "Sales scripts and conversation guides"

**Action Buttons:**
- "Search"
- "Create Playbook"

**Under Construction:**
- "🚧 Under Construction"
- "The playbooks system is being built. Coming soon with features like:"
  - "• Sales scripts"
  - "• Objection handling"
  - "• Call guides"
  - "• Best practices"
  - "• Template library"
  - "• Performance tips"
- "← Back to Dashboard"

### Reports Page
**File:** `src/app/(dashboard)/reports/page.tsx`

**Header:**
- Title: "Reports & Analytics"
- Subtitle: Dynamic date range or "Track performance and gain insights"

**Period Options:**
- "Today"
- "This Week"
- "This Month"
- "This Quarter"
- "This Year"

**Export Button:**
- "Export" / "Exporting..." (loading state)

**Tabs:**
- "Overview"
- "Performance"
- "AI Insights"

**Overview Tab Sections:**
- **Top Performers**
  - Shows names with "calls" and "meetings" metrics

- **Activity Distribution**
  - "Cold Calls" - 45%
  - "Follow-ups" - 30%
  - "Email Outreach" - 20%
  - "Social Selling" - 5%

**Performance Tab Metrics:**
- "Response Time" / "Average time to respond"
- "Follow-up Rate" / "Leads followed up"
- "Lead Velocity" / "New leads per day"

**Quick Stats:**
- "Best Day" / "Tuesday"
- "Best Time" / "10-11 AM"
- "Avg Deal Size"
- "Tasks Done"

**Toast Messages:**
- "Report exported" / "Your report has been exported as [format]."
- "Export failed" / "Failed to export report. Please try again."

### Settings Page
**File:** `src/app/(dashboard)/settings/page.tsx`

**Header:**
- Title: "Settings"
- Subtitle: "Manage your account and preferences"

**Loading State:**
- "Loading settings..."

**Tabs:**
- "Profile"
- "Notifications"
- "Theme"
- "Integrations"

**Tab Content Headers:**
- "Profile Settings" / "Update your personal information and account details"
- "Notification Preferences" / "Choose how you want to be notified about activity"
- "Theme Preferences" / "Customize the appearance of the application"
- "Integration Settings" / "Connect and configure external services"

### Team Page
**File:** `src/app/(dashboard)/team/page.tsx`

**Header:**
- Title: "Team"
- Subtitle: "Manage team members and permissions"

**Action Buttons:**
- "Team Settings"
- "Invite Member"

**Under Construction:**
- "🚧 Under Construction"
- "The team management system is being built. Coming soon with features like:"
  - "• Team members"
  - "• Role permissions"
  - "• Performance tracking"
  - "• Team goals"
  - "• Activity monitoring"
  - "• Coaching tools"
- "← Back to Dashboard"

---

## Components

### Sidebar Navigation
**File:** `src/components/layouts/Sidebar.tsx`

**Brand:**
- Logo: "H"
- Name: "Harper AI"

**Navigation Items:**
- "Dashboard"
- "Contacts"
- "Calling"
- "Email"
- "Calendar"
- "Pipeline"
- "Reports"
- "Team"
- "Playbooks"
- "Settings"
- "Debug" (development)
- "Dev Login" (development)

**User Dropdown:**
- Default User: "John Doe"
- Default Email: "john@example.com"
- Menu Items:
  - "Profile"
  - "Settings"
  - "Logout"

### Call Interface
**File:** `src/components/calling/CallInterface.tsx`

**Main Card:**
- Title: "Make a Call"
- Label: "Phone Number"
- Placeholder: "Enter phone number"
- Device Status: "Device: Ready"

**Call Button States:**
- "Call" (disconnected)
- "Calling..." (ringing)
- "End Call" (connected)

**Status Card:**
- Title: "Call Status"
- States:
  - "Ready to call"
  - "Connecting..."
  - "Ringing..."
  - "Connected"
  - "Call failed"

**Loading/Error States:**
- "Loading..."
- "Failed to initialize calling service. Please check your settings."

### Test Call Dialog
**File:** `src/components/calling/TestCallDialog.tsx`

**Dialog Header:**
- Title: "Test Twilio Call"
- Description: "Make a test call to verify your Twilio configuration. This will call your phone and speak a test message using ElevenLabs."

**Form:**
- Label: "Your Phone Number"
- Placeholder: "+1234567890"
- Help Text: "Enter your phone number in E.164 format (e.g., +1234567890)"

**Test Message:**
- Title: "Test Message"
- Content: "Hello! This is a test call from Harper AI. Your Twilio and ElevenLabs integration is working correctly. Have a great day!"

**Success State:**
- "✅ Test Call Initiated Successfully!"
- "Your phone should ring shortly. The call will play the test message using ElevenLabs text-to-speech."
- "Call SID: [ID]"

**Error State:**
- "❌ Test Call Failed"
- "There was an error initiating the test call. Please check your configuration."
- "Error: [error message]"

**Troubleshooting Tips:**
- "Troubleshooting Tips:"
  - "Verify your Twilio credentials in Settings"
  - "Ensure your Twilio phone number can make outbound calls"
  - "Check that your ElevenLabs API key is valid"
  - "Make sure the phone number is in E.164 format"

**Live Transcript:**
- "📞 Live Transcript"
- "Waiting for call to connect..."

**Buttons:**
- "Make Test Call" / "Initiating Call..." (loading)
- "Close"

### Contact Management

#### Contact Form Modal
**File:** `src/components/contacts/ContactFormModal.tsx`

**Dialog Header:**
- Add Mode: "Add New Contact"
- Edit Mode: "Edit Contact"
- Description: "Fill in the contact details below."

**Form Fields:**
- "First Name" - Placeholder: "John"
- "Last Name" - Placeholder: "Doe"
- "Email" - Placeholder: "john.doe@example.com"
- "Phone" - Placeholder: "+1 (555) 123-4567"
- "Company" - Placeholder: "Acme Corp"
- "Title" - Placeholder: "Sales Manager"
- "Lead Status" - Placeholder: "Select status"
  - Options: "New", "Contacted", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"
- "Notes" - Placeholder: "Add any notes about this contact..."

**Buttons:**
- "Cancel"
- Add Mode: "Add Contact" / "Adding..." (loading)
- Edit Mode: "Update Contact" / "Updating..." (loading)

**Toast Messages:**
- Success: "Contact added successfully" / "Contact updated successfully"
- Error: "Error" / "Failed to add contact" / "Failed to update contact"

#### Import Contacts Modal
**File:** `src/components/contacts/ImportContactsModal.tsx`

**Dialog Header:**
- Title: "Import Contacts"
- Description: "Upload a CSV file to import multiple contacts at once"

**Form:**
- Label: "CSV File"
- Help Text: "CSV must include columns: firstName, lastName, email, phone (optional), company (optional), title (optional)"

**Preview Section:**
- "Preview"
- "[X] contacts ready to import"
- "Columns detected: [column names]"

**Buttons:**
- "Cancel"
- "Import Contacts" / "Importing..." (loading)

**Toast Messages:**
- Error: "Invalid CSV file. Please check the format and try again."
- Success: "Import Successful" / "[X] contacts imported successfully"
- Error: "Import Failed" / "Failed to import contacts"

### Settings Components

#### Profile Settings
**File:** `src/components/settings/ProfileSettings.tsx`

**Personal Information Section:**
- Title: "Personal Information"
- Fields:
  - "Full Name" - Default: "John Doe"
  - "Email" - Default: "john@example.com"
  - "Phone" - Default: "+1 (555) 123-4567"

**Security Section:**
- Title: "Security"
- Fields:
  - "Current Password" - Placeholder: "Enter current password"
  - "New Password" - Placeholder: "Enter new password"
  - "Confirm New Password" - Placeholder: "Confirm new password"
- Help Text: "Leave password fields empty if you don't want to change it"

**Button:**
- "Save Changes" / "Saving..." (loading)

**Toast Messages:**
- Success: "Profile updated successfully"
- Error: "Error" / "Failed to update profile. Please try again."

#### Notification Settings
**File:** `src/components/settings/NotificationSettings.tsx`

**Email Notifications Section:**
- Title: "Email Notifications"
- Options:
  - "New lead assigned" - "Receive notifications when new leads are assigned to you"
  - "Call reminders" - "Get reminded about scheduled calls"
  - "Performance reports" - "Receive weekly performance summaries"

**Push Notifications Section:**
- Title: "Push Notifications"
- Options:
  - "Desktop notifications" - "Show desktop alerts for important events"
  - "Sound alerts" - "Play sound for notifications"

**Email Frequency Section:**
- Title: "Email Frequency"
- Label: "Digest frequency"
- Options: "Real-time", "Daily", "Weekly", "Never"

**Button:**
- "Save Preferences" / "Saving..." (loading)

**Toast Messages:**
- Success: "Notification preferences saved"
- Error: "Error" / "Failed to save preferences. Please try again."

#### Theme Settings
**File:** `src/components/settings/ThemeSettings.tsx`

**Appearance Section:**
- Title: "Appearance"
- Subtitle: "Select your preferred theme"

**Theme Options:**
- "Light" - "Classic light theme"
- "Dark" - "Easy on the eyes"
- "System" - "Match your device"

**Customization Section:**
- Title: "Customization"
- Subtitle: "More customization options coming soon"

#### Integration Settings
**File:** `src/components/settings/IntegrationSettings.tsx`

**Twilio Configuration:**
- Title: "Twilio Configuration"
- Subtitle: "Configure your Twilio account for voice calling"
- Fields:
  - "Account SID" - Placeholder: "AC..."
  - "Auth Token" - Placeholder: "Enter your Twilio auth token"
  - "Phone Number" - Placeholder: "+1234567890"
  - Help: "Your Twilio phone number in E.164 format"

**Webhook URLs:**
- Title: "Webhook URLs"
- Subtitle: "Configure these URLs in your Twilio console:"
- Fields:
  - "Voice URL"
  - "Status Callback URL"

**ElevenLabs Configuration:**
- Title: "ElevenLabs Configuration"
- Subtitle: "Configure ElevenLabs for AI voice synthesis"
- Fields:
  - "API Key" - Placeholder: "Enter your ElevenLabs API key"
  - "Voice ID" - Placeholder: "Select a voice"
    - Options:
      - "Rachel - American Female"
      - "Josh - American Male"
      - "Emily - British Female"
      - "Adam - Deep Male"

**Buttons:**
- "Save Integration Settings" / "Saving..." (loading)
- "Test Twilio Connection"
- "Test ElevenLabs Connection"

**Toast Messages:**
- Success: "Integration settings saved successfully"
- Error: "Error" / "Failed to save settings. Please try again."
- Twilio Success: "Twilio connection successful!"
- Twilio Error: "Failed to connect to Twilio. Please check your credentials."
- ElevenLabs Success: "ElevenLabs connection successful!"
- ElevenLabs Error: "Failed to connect to ElevenLabs. Please check your API key."

---

## Error Pages

### Error Page
**File:** `src/app/error.tsx`

**Content:**
- Title: "Oops! Something went wrong"
- Description: "An unexpected error occurred. We apologize for the inconvenience."
- Error ID: "Error ID: [id]"

**Buttons:**
- "Try Again"
- "Go to Dashboard"

**Support:**
- "If this problem persists, please contact support@harperai.com"

### 404 Not Found Page
**File:** `src/app/not-found.tsx`

**Content:**
- Title: "404 - Page Not Found"
- Description: "The page you're looking for doesn't exist or has been moved."

**Buttons:**
- "Go Back"
- "Go to Dashboard"

**Popular Pages:**
- "Popular pages:"
  - "Dashboard"
  - "Calling"
  - "Reports"
  - "Contacts"

**Note:**
- "Many features are still under development. Check back soon!"

---

## Metadata

### Application Metadata
**File:** `src/app/layout.tsx`

- **Title:** "Harper AI - Modern SDR Platform"
- **Description:** "Advanced Sales Development Representative platform with AI-powered calling and email automation"
- **Keywords:** "SDR, sales, CRM, calling, email automation, AI"

---

## Homepage
**File:** `src/app/page.tsx`

**Content:**
- Logo: "H"
- Loading State: "Loading Harper AI..."

---

*This document was automatically generated from the Harper AI SDR platform codebase.*