// Script to seed 100 dummy leads
const API_URL = 'https://mohit-ai-backend.onrender.com/api';

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

    // Now seed leads
    console.log('Seeding 100 dummy leads...');
    const seedResponse = await fetch(`${API_URL}/seed/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        count: 100
      })
    });

    if (!seedResponse.ok) {
      const error = await seedResponse.text();
      throw new Error(`Seed failed: ${error}`);
    }

    const result = await seedResponse.json();
    console.log('Success!', result.message);
    console.log('\nSample leads created:');
    result.sample.forEach((lead, i) => {
      console.log(`${i + 1}. ${lead.firstName} ${lead.lastName} - ${lead.company} (${lead.status})`);
    });

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
seedLeads();