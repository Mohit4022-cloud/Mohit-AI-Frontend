export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || '',
  authToken: process.env.TWILIO_AUTH_TOKEN || '',
  phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  voiceSettings: {
    voice: 'Polly.Joanna',
    language: 'en-US',
  },
};

export function getTwilioClient() {
  if (!twilioConfig.accountSid || !twilioConfig.authToken) {
    console.warn('Twilio credentials not configured');
    return null;
  }
  
  const twilio = require('twilio');
  return twilio(twilioConfig.accountSid, twilioConfig.authToken);
}