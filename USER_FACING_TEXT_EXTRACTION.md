# User-Facing Text Extraction Report

This document contains all user-facing text strings extracted from the specified components, organized by file and including line numbers for reference.

## 1. Sidebar.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/layouts/Sidebar.tsx`

### Navigation Items
- Line 28: "Dashboard"
- Line 29: "Contacts"
- Line 30: "Calling"
- Line 31: "Email"
- Line 32: "Pipeline"
- Line 33: "Calendar"
- Line 34: "Reports"
- Line 35: "Team"
- Line 36: "Playbooks"
- Line 40: "Settings"

### Brand Name
- Line 66: "Harper AI"

### User Profile
- Line 137: "User avatar" (alt text)
- Line 161: "Logout" (title attribute)
- Line 164: "Logout"

## 2. CallInterface.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/features/calling/CallInterface.tsx`

### Call Interface Text
- Line 163: "Make a Call"
- Line 169: "Enter phone number" (placeholder)
- Line 199: "Show Dialpad"
- Line 209: "Call"
- Line 219: "Hide Dialpad"
- Line 225: "Device Status: 🟢 Ready" / "Device Status: 🔴 Not Ready"

### Call Status Display
- Line 117: Phone number display (formatted)
- Line 118: Call status (capitalized)
- Line 121: Call duration display

## 3. TestCallDialog.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/calling/TestCallDialog.tsx`

### Dialog Content
- Line 171: "Test Call" (button text)
- Line 178: "Test Twilio Integration"
- Line 181: "Enter your phone number to receive a test call from Harper AI powered by Twilio and ElevenLabs."
- Line 188: "Phone Number" (label)
- Line 192: "(555) 123-4567" (placeholder)
- Line 198: "US numbers only. We'll call you immediately."
- Line 213: "Initiating call to {phoneNumber}..."

### Success Messages
- Line 223: "Call initiated successfully! You should receive a call within seconds."
- Line 229: "Call SID:"
- Line 234: "Status:"
- Line 244: "What you'll hear:"
- Line 247: "• A greeting from Harper AI"
- Line 248: "• Options to replay or end the call"
- Line 249: "• ElevenLabs voice (if configured)"

### Error Messages
- Line 68: "Invalid phone number"
- Line 69: "Please enter a valid 10-digit US phone number"
- Line 91: "Call initiated!"
- Line 92: "You should receive a call shortly."
- Line 97: "Call failed"
- Line 110: "Unable to start call"
- Line 111: "Please check your network connection or Twilio credentials."
- Line 260: "Failed to initiate call"
- Line 266: "Error details:"
- Line 272: "Troubleshooting:"
- Line 274: "• Ensure Twilio credentials are set in .env"
- Line 275: "• Verify your Twilio phone number is active"
- Line 276: "• Check that the number can make outbound calls"
- Line 277: "• Confirm webhook URLs are accessible"

### Transcript Section
- Line 287: "Live Transcript"
- Line 305: "AI Agent" / "Caller"

### Dialog Actions
- Line 323: "Cancel"
- Line 332: "Calling..."
- Line 337: "Make Test Call"
- Line 350: "Try Another Number"
- Line 353: "Close"

## 4. ContactFormModal.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/contacts/ContactFormModal.tsx`

### Dialog Header
- Line 162: "Edit Contact" / "New Contact"

### Form Labels
- Line 170: "First Name *"
- Line 179: "Last Name *"
- Line 191: "Email *"
- Line 201: "Phone"
- Line 213: "Title"
- Line 221: "Department"
- Line 231: "Company"
- Line 236: "Company name" (placeholder)
- Line 242: "Lead Status"
- Line 251: "New"
- Line 252: "Contacted"
- Line 253: "Qualified"
- Line 254: "Lost"
- Line 255: "Won"
- Line 260: "Lead Score (0-100)"
- Line 274: "LinkedIn URL"
- Line 280: "https://linkedin.com/in/..." (placeholder)
- Line 284: "Twitter Username"
- Line 289: "@username" (placeholder)
- Line 295: "Tags (comma separated)"
- Line 300: "e.g. hot lead, enterprise, decision maker" (placeholder)

### Success/Error Messages
- Line 141: "Contact updated successfully" / "Contact created successfully"
- Line 136: "Failed to save contact"
- Line 140: "Success"
- Line 148: "Error"

### Dialog Actions
- Line 307: "Cancel"
- Line 310: "Saving..." / "Update" / "Create"

## 5. ImportContactsModal.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/contacts/ImportContactsModal.tsx`

### Dialog Header
- Line 185: "Import Contacts"

### Import Options
- Line 196: "Upload File"
- Line 204: "Paste CSV"

### Alert Message
- Line 211-213: "CSV must include: First Name, Last Name, and Email columns. Optional: Phone, Title, Company, Department, LinkedIn, Twitter, Tags."

### Form Elements
- Line 218: "Select CSV File"
- Line 228: "Selected: {file.name} ({file.size} KB)"
- Line 234: "Paste CSV Data"
- Line 239-241: CSV placeholder example

### CSV Format Example
- Line 249: "CSV Format Example:"
- Line 251-253: CSV format example text

### Success/Error Messages
- Line 37-38: "Invalid file type", "Please select a CSV file"
- Line 50: "CSV must have at least a header row and one data row"
- Line 114: "Skipping row {i + 1}: missing required fields"
- Line 136: "Please provide CSV data"
- Line 140: "No valid contacts found in CSV"
- Line 158: "Import failed"
- Line 164: "Import successful"
- Line 165: "Imported {count} contacts, skipped {skipped} duplicates"
- Line 172: "Import failed"

### Dialog Actions
- Line 260: "Cancel"
- Line 266: "Importing..." / "Import Contacts"

## 6. ProfileSettings.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/settings/ProfileSettings.tsx`

### Form Sections
- Line 96: "Basic Information"
- Line 105: "Full Name"
- Line 108: "John Doe" (placeholder)
- Line 122: "Email Address"
- Line 125: "john@example.com" (placeholder)
- Line 128: "This email will be used for login and notifications"
- Line 140: "Change Password"
- Line 142: "Leave blank to keep your current password"
- Line 152: "New Password"
- Line 155: "••••••••" (placeholder)
- Line 158: "Must be at least 8 characters long"
- Line 172: "Confirm Password"
- Line 175: "••••••••" (placeholder)

### Validation Messages
- Line 25: "Full name is required"
- Line 26: "Invalid email address"
- Line 35: "Passwords don't match"

### Success/Error Messages
- Line 72: "Profile updated"
- Line 73: "Your profile information has been saved."
- Line 82: "Update failed"
- Line 83: "Failed to update your profile. Please try again."

### Actions
- Line 189: "Saving..."
- Line 194: "Save Changes"

## 7. NotificationSettings.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/settings/NotificationSettings.tsx`

### Notification Options
- Line 52: "Call Transcripts"
- Line 53: "Receive notifications when call transcripts are ready"
- Line 58: "Email Campaigns"
- Line 59: "Get updates on email campaign performance and responses"
- Line 63: "Follow-up Reminders"
- Line 65: "Receive reminders for scheduled follow-ups and meetings"

### Email Preferences
- Line 96: "Email Preferences"
- Line 99: "Notification Frequency"
- Line 101: "Choose how often you want to receive email notifications"
- Line 113: "Instant notifications"
- Line 122: "Daily digest"
- Line 131: "Weekly summary"

### Success/Error Messages
- Line 33: "Notifications updated"
- Line 34: "Your notification preferences have been saved."
- Line 39: "Update failed"
- Line 40: "Failed to update notification settings. Please try again."

### Actions
- Line 143: "Saving..."
- Line 148: "Save Preferences"

## 8. ThemeSettings.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/settings/ThemeSettings.tsx`

### Theme Options
- Line 59: "Choose Theme"
- Line 34: "Light"
- Line 35: "Classic light theme for day time"
- Line 41: "Dark"
- Line 42: "Easy on the eyes for night time"
- Line 48: "System"
- Line 49: "Automatically match your system theme"

### Theme Preview
- Line 105: "// Preview"
- Line 106: "Hello World"

### Additional Options
- Line 120: "Additional Options"
- Line 125: "High Contrast"
- Line 127: "Increase contrast for better readability"
- Line 131: "Coming Soon"
- Line 136: "Custom Colors"
- Line 138: "Personalize your color scheme"
- Line 142: "Coming Soon"

### Success Messages
- Line 26: "Theme updated"
- Line 27: "Theme changed to {theme} mode."

### Info Message
- Line 152: "✓"
- Line 153: "Theme changes are applied immediately and saved automatically."

## 9. IntegrationSettings.tsx
**File Path:** `/Users/mohit/mohit-inbound-sdr/Mohit-AI-Frontend/src/components/settings/IntegrationSettings.tsx`

### Tab Labels
- Line 205: "Twilio Voice"
- Line 209: "ElevenLabs AI"

### Twilio Configuration
- Line 219: "Twilio Configuration"
- Line 222: "Connect your Twilio account for voice calling capabilities"
- Line 229: "Configured" / "Not Configured"
- Line 246: "Account SID"
- Line 249: "AC..." (placeholder)
- Line 254: "Found in your Twilio Console dashboard"
- Line 265: "Auth Token"
- Line 271: "Enter your Auth Token" (placeholder)
- Line 290: "Keep this secret - it provides full access to your account"
- Line 302: "Phone Number"
- Line 305: "+14155551234" (placeholder)
- Line 310: "Your Twilio phone number in E.164 format"
- Line 322: "Base URL"
- Line 325: "https://harper-ai-frontend.onrender.com" (placeholder)
- Line 330: "Your deployment URL for webhook callbacks"
- Line 343: "Twilio is configured! Your webhook URLs:"
- Line 367: "Test Connection"

### ElevenLabs Configuration
- Line 382: "ElevenLabs Configuration"
- Line 385: "AI-powered voice synthesis for natural conversations"
- Line 392: "Configured" / "Not Configured"
- Line 409: "API Key"
- Line 414: "sk_..." (placeholder)
- Line 433: "Get your API key from the ElevenLabs dashboard"
- Line 445: "Voice ID"
- Line 448: "21m00Tcm4TlvDq8ikWAM" (placeholder)
- Line 453: "Default: Rachel voice. Find more in your ElevenLabs voice library"
- Line 465: "Agent ID"
- Line 468: "Enter your ElevenLabs Agent ID" (placeholder)
- Line 473: "Your conversational AI agent ID from ElevenLabs"
- Line 485: "Pre-generated Audio URL (Optional)"
- Line 489: "https://your-site.com/greeting.mp3" (placeholder)
- Line 494: "Use a pre-generated MP3 file instead of real-time TTS"
- Line 516: "Test Voice"

### Advanced Configuration
- Line 533: "Advanced Configuration"
- Line 536: "Optional webhook for custom integrations"
- Line 545: "Event Webhook URL"
- Line 549: "https://your-domain.com/webhook" (placeholder)
- Line 554: "Receive real-time call events and transcripts"

### Validation Messages
- Line 48: "Invalid Account SID - must start with AC"
- Line 52: "Invalid Auth Token - must be at least 32 characters"
- Line 56: "Must be E.164 format (+1234567890)"
- Line 63: "Invalid URL"
- Line 66: "Invalid URL"
- Line 67: "Invalid URL"

### Success/Error Messages
- Line 138: "Integrations updated"
- Line 139: "Your integration settings have been saved and are ready to use."
- Line 151: "Update failed"
- Line 152: "Failed to save settings: {errorMessage}"
- Line 176: "{service} connected!"
- Line 177: "Connection test successful."
- Line 184: "Connection failed"
- Line 185: "Unable to connect to service. Please check your credentials."

### Actions
- Line 361: "Testing..."
- Line 511: "Testing..."
- Line 571: "Refresh"
- Line 577: "Saving..."
- Line 582: "Save All Settings"