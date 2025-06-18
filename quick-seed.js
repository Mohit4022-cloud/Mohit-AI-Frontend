import fetch from 'node-fetch';

// Use the token from the curl command
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWMybDh0YmgwMDAxMm5vdDhmYzdwY2p4IiwiZW1haWwiOiJtb2hpdEBtb2hpdEFJLmNvbSIsIm9yZ2FuaXphdGlvbklkIjoiY21jMmw4dGJoMDAwMDJub3RsY2N2N3pybSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MDI5MDI5MCwiZXhwIjoxNzUwODk1MDkwfQ.dFxXdKU6c76pysjR54uwosVvIoO8S_3pzq5FCyrJQ90';
const API_URL = 'https://mohit-ai-backend.onrender.com/api';

// Lead templates
const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const companies = ['Tech Corp', 'Global Solutions', 'Innovate Inc', 'Digital Dynamics', 'Cloud Systems'];

async function createDummyLeads() {
  console.log('Creating 100 dummy leads...');
  let created = 0;

  for (let i = 0; i < 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const company = companies[Math.floor(Math.random() * companies.length)] + ` ${i}`;
    
    const lead = {
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      phone: `+1-555-${String(Math.floor(Math.random() * 900 + 100)).padStart(3, '0')}-${String(Math.floor(Math.random() * 9000 + 1000)).padStart(4, '0')}`,
      company,
      jobTitle: ['CEO', 'CTO', 'VP Sales', 'Manager'][Math.floor(Math.random() * 4)],
      source: ['Website', 'LinkedIn', 'Referral'][Math.floor(Math.random() * 3)],
      status: 'NEW',
      score: Math.floor(Math.random() * 100),
      qualificationData: {
        notes: 'Auto-generated lead for testing',
        budget: ['< $10k', '$10k-$50k', '$50k-$100k', '$100k+'][Math.floor(Math.random() * 4)],
        timeline: ['Immediate', '1-3 months', '3-6 months', '6+ months'][Math.floor(Math.random() * 4)],
        interest: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)]
      }
    };

    try {
      const response = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
        },
        body: JSON.stringify(lead)
      });

      if (response.ok) {
        created++;
        if (created % 10 === 0) {
          console.log(`Created ${created} leads...`);
        }
      } else {
        console.log(`Failed to create lead ${i}:`, await response.text());
      }
    } catch (error) {
      console.error(`Error creating lead ${i}:`, error.message);
    }

    // Delay to avoid rate limiting (1 second between requests)
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n✅ Successfully created ${created} leads!`);
}

createDummyLeads().catch(console.error);