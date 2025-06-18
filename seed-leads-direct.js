// Script to seed leads using the existing API
const API_URL = 'https://mohit-ai-backend.onrender.com/api';

// Lead templates
const sources = ['Website', 'LinkedIn', 'Email Campaign', 'Webinar', 'Trade Show', 'Referral', 'Cold Outreach'];
const statuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'UNQUALIFIED', 'OPPORTUNITY', 'CUSTOMER', 'LOST'];
const industries = ['Technology', 'Healthcare', 'Finance', 'Retail', 'Manufacturing', 'Education', 'Real Estate'];
const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Moore'];
const companies = ['Tech Corp', 'Global Solutions', 'Innovate Inc', 'Digital Dynamics', 'Cloud Systems', 'Data Insights', 'Smart Tech', 'Future Vision', 'NextGen Solutions', 'Alpha Innovations'];
const titles = ['CEO', 'CTO', 'VP Sales', 'Marketing Director', 'Product Manager', 'Sales Manager', 'Operations Director', 'CFO', 'Head of Growth', 'Business Development Manager'];

async function createLead(token, leadData) {
  const response = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(leadData)
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Failed to create lead:', error);
    return null;
  }
  
  return await response.json();
}

async function seedLeads() {
  try {
    // First login to get token
    console.log('Logging in...');
    const loginResponse = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'mohit@mohitAI.com',
        password: '12341234'
      })
    });

    if (!loginResponse.ok) {
      throw new Error('Login failed');
    }

    const { token } = await loginResponse.json();
    console.log('Login successful!');
    
    console.log('Creating 100 dummy leads...');
    let successCount = 0;
    
    // Create leads in batches
    for (let i = 0; i < 100; i++) {
      const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
      const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
      const company = companies[Math.floor(Math.random() * companies.length)] + ` ${Math.floor(Math.random() * 1000)}`;
      const domain = company.toLowerCase().replace(/\s+/g, '') + '.com';
      
      const leadData = {
        firstName,
        lastName,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@${domain}`,
        phone: `+1${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`,
        company,
        title: titles[Math.floor(Math.random() * titles.length)],
        source: sources[Math.floor(Math.random() * sources.length)],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        score: Math.floor(Math.random() * 100),
        notes: `Interested in ${['automation', 'scaling sales', 'lead generation', 'CRM integration', 'AI solutions'][Math.floor(Math.random() * 5)]}. ${['High priority', 'Follow up next week', 'Needs nurturing', 'Ready to buy', 'Budget approved'][Math.floor(Math.random() * 5)]}.`,
        industry: industries[Math.floor(Math.random() * industries.length)],
        companySize: companySizes[Math.floor(Math.random() * companySizes.length)],
        website: `https://${domain}`,
        linkedinUrl: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}`,
        // Custom fields as JSON
        customFields: {
          budget: ['< $10k', '$10k-$50k', '$50k-$100k', '$100k-$500k', '$500k+'][Math.floor(Math.random() * 5)],
          timeline: ['Immediate', '1-3 months', '3-6 months', '6-12 months', 'Just researching'][Math.floor(Math.random() * 5)],
          leadTemperature: ['Hot', 'Warm', 'Cold'][Math.floor(Math.random() * 3)],
          preferredContactMethod: ['Email', 'Phone', 'LinkedIn'][Math.floor(Math.random() * 3)],
          competitors: ['Competitor A', 'Competitor B', 'None'][Math.floor(Math.random() * 3)],
          painPoints: ['Manual processes', 'Slow response times', 'Poor lead qualification', 'No automation'][Math.floor(Math.random() * 4)]
        }
      };
      
      const result = await createLead(token, leadData);
      if (result) {
        successCount++;
        if (successCount % 10 === 0) {
          console.log(`Created ${successCount} leads...`);
        }
      }
      
      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    console.log(`\n✅ Successfully created ${successCount} dummy leads!`);
    console.log('You can now view them in your dashboard.');

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
console.log('Starting lead generation...');
seedLeads();