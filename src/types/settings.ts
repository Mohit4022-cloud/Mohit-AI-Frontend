export interface Settings {
  general: {
    companyName: string;
    timezone: string;
    dateFormat: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  integrations: {
    twilio?: {
      enabled: boolean;
      accountSid: string;
      authToken: string;
    };
    salesforce?: {
      enabled: boolean;
      instanceUrl: string;
    };
  };
}