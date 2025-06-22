export const twilioConfig = {
  accountSid: process.env.TWILIO_ACCOUNT_SID || '',
  authToken: process.env.TWILIO_AUTH_TOKEN || '',
  phoneNumber: process.env.TWILIO_PHONE_NUMBER || '',
  voiceSettings: {
    voice: 'Polly.Joanna',
    language: 'en-US',
  },
};

export const TWILIO_VOICE_SETTINGS = {
  voice: 'Polly.Joanna',
  language: 'en-US',
};

export const TWILIO_CALL_STATUS = {
  QUEUED: 'queued',
  RINGING: 'ringing',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  BUSY: 'busy',
  NO_ANSWER: 'no-answer',
  CANCELED: 'canceled',
} as const;

export const TWILIO_RECORDING_STATUS = {
  IN_PROGRESS: 'in-progress',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  ABSENT: 'absent',
} as const;

export function getTwilioConfig() {
  return twilioConfig;
}

export function getTwilioClient() {
  if (!twilioConfig.accountSid || !twilioConfig.authToken) {
    console.warn('Twilio credentials not configured');
    return null;
  }
  
  const twilio = require('twilio');
  return twilio(twilioConfig.accountSid, twilioConfig.authToken);
}