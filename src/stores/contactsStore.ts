import { create } from "zustand";
import { Contact, CreateContact } from "@/types/contact";

interface ContactsState {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;

  // Actions
  loadContacts: (page?: number, limit?: number) => Promise<void>;
  addContact: (contact: CreateContact) => Promise<void>;
  updateContact: (contact: Partial<Contact> & { id: string }) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;

  // Helpers
  getContactById: (id: string) => Contact | undefined;
  searchContacts: (query: string) => Contact[];
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  loading: false,
  error: null,
  page: 1,
  limit: 50,
  total: 0,

  loadContacts: async (page = 1, limit = 50) => {
    // Prevent concurrent fetches
    if (get().loading) {
      return;
    }
    
    set({ loading: true, error: null });
    
    // Mock data for development - Generate 300 contacts
    const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'David', 'Lisa', 'Robert', 'Maria', 'James', 'Jennifer', 'William', 'Patricia', 'Richard', 'Linda', 'Joseph', 'Barbara', 'Thomas', 'Elizabeth', 'Charles', 'Susan'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
    const companies = ['Tech Corp', 'Marketing Inc', 'Sales Pro', 'Data Systems', 'Cloud Solutions', 'Digital Agency', 'Software House', 'Consulting Group', 'Startup Hub', 'Enterprise Co', 'Global Services', 'Innovation Labs', 'Creative Studio', 'Analytics Pro', 'Finance Corp', 'Healthcare Plus', 'Education First', 'Retail Chain', 'Manufacturing Co', 'Logistics Ltd'];
    const titles = ['CEO', 'CTO', 'CMO', 'CFO', 'VP Sales', 'VP Marketing', 'VP Engineering', 'Director', 'Manager', 'Team Lead', 'Senior Developer', 'Product Manager', 'Sales Manager', 'Marketing Manager', 'Account Executive', 'Business Analyst', 'Project Manager', 'Consultant', 'Specialist', 'Coordinator'];
    const industries = ['Technology', 'Marketing', 'Sales', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Consulting', 'Real Estate', 'Media', 'Entertainment', 'Hospitality', 'Transportation', 'Energy', 'Telecommunications', 'Insurance', 'Legal', 'Non-profit', 'Government'];
    const statuses: Contact['status'][] = ['new', 'contacted', 'qualified', 'converted', 'lost'];
    const notes = [
      'High priority lead',
      'Interested in premium features',
      'Requested demo',
      'Budget approved',
      'Decision maker',
      'Following up next week',
      'Needs more information',
      'Comparing with competitors',
      'Ready to purchase',
      'Long sales cycle',
      'Small budget',
      'Enterprise opportunity',
      'Referral from existing customer',
      'Met at conference',
      'Inbound from website',
      'Cold outreach',
      'Warm lead',
      'Needs technical review',
      'Waiting for approval',
      'Contract in negotiation'
    ];
    const tags = ['hot-lead', 'enterprise', 'mid-market', 'small-business', 'startup', 'high-value', 'urgent', 'long-term', 'referral', 'inbound', 'outbound', 'partner', 'customer', 'prospect', 'qualified', 'demo-scheduled', 'proposal-sent', 'follow-up', 'negotiation', 'closing'];

    const mockContacts: Contact[] = [];
    
    for (let i = 1; i <= 300; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const company = companies[Math.floor(Math.random() * companies.length)];
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${company.toLowerCase().replace(/\s+/g, '')}.com`;
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const leadScore = Math.floor(Math.random() * 100);
      const randomTags = Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => 
        tags[Math.floor(Math.random() * tags.length)]
      ).filter((tag, index, self) => self.indexOf(tag) === index);
      
      mockContacts.push({
        id: i.toString(),
        name: `${firstName} ${lastName}`,
        email: email,
        phone: `+1${Math.floor(Math.random() * 900 + 100)}${Math.floor(Math.random() * 900 + 100)}${Math.floor(Math.random() * 9000 + 1000)}`,
        company: company,
        title: titles[Math.floor(Math.random() * titles.length)],
        status: status,
        leadScore: leadScore,
        lastContactedAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
        notes: notes[Math.floor(Math.random() * notes.length)],
        industry: industries[Math.floor(Math.random() * industries.length)],
        tags: randomTags,
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
      });
    }
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Implement pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedContacts = mockContacts.slice(startIndex, endIndex);
    
    set({ 
      contacts: paginatedContacts, 
      loading: false,
      page,
      limit,
      total: mockContacts.length 
    });
    
    return;
    
    // Original API call commented out for now
    /*
    try {
      const response = await fetch(`/api/contacts?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load contacts");
      }

      set({ 
        contacts: data.data, 
        loading: false,
        page,
        limit,
        total: data.total || data.data.length 
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to load contacts",
        loading: false,
      });
    }
    */
  },

  addContact: async (contact: CreateContact) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add contact");
      }

      set((state) => ({
        contacts: [...state.contacts, data.data],
        loading: false,
      }));

      return data.data;
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add contact",
        loading: false,
      });
      throw error;
    }
  },

  updateContact: async (contact: Partial<Contact> & { id: string }) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/contacts/${contact.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update contact");
      }

      set((state) => ({
        contacts: state.contacts.map((c) =>
          c.id === contact.id ? data.data : c,
        ),
        loading: false,
      }));

      return data.data;
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to update contact",
        loading: false,
      });
      throw error;
    }
  },

  deleteContact: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete contact");
      }

      set((state) => ({
        contacts: state.contacts.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to delete contact",
        loading: false,
      });
      throw error;
    }
  },

  getContactById: (id: string) => {
    return get().contacts.find((c) => c.id === id);
  },

  searchContacts: (query: string) => {
    const lowerQuery = query.toLowerCase();
    return get().contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerQuery) ||
        c.email.toLowerCase().includes(lowerQuery) ||
        c.company?.toLowerCase().includes(lowerQuery) ||
        c.phone.includes(query),
    );
  },
}));
