import fetch from 'node-fetch';

// Use the token from the curl command
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWMybDh0YmgwMDAxMm5vdDhmYzdwY2p4IiwiZW1haWwiOiJtb2hpdEBtb2hpdEFJLmNvbSIsIm9yZ2FuaXphdGlvbklkIjoiY21jMmw4dGJoMDAwMDJub3RsY2N2N3pybSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTc1MDI5MDI5MCwiZXhwIjoxNzUwODk1MDkwfQ.dFxXdKU6c76pysjR54uwosVvIoO8S_3pzq5FCyrJQ90';
const API_URL = 'https://mohit-ai-backend.onrender.com/api';

// Sample data
const sampleLeads = [
  {
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@techcorp.com',
    phone: '+1-555-123-4567',
    company: 'TechCorp Solutions',
    jobTitle: 'VP of Sales',
    source: 'Website',
    status: 'NEW',
    score: 85,
    qualificationData: {
      notes: 'Looking for AI SDR solution to scale their sales team',
      budget: '$50k-$100k',
      timeline: 'Immediate',
      interest: 'High',
      painPoint: 'Missing 40% of inbound leads due to slow response'
    }
  },
  {
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'mchen@innovateai.com',
    phone: '+1-555-234-5678',
    company: 'Innovate AI',
    jobTitle: 'CEO',
    source: 'LinkedIn',
    status: 'CONTACTED',
    score: 92,
    qualificationData: {
      notes: 'Scheduled demo for next week',
      budget: '$100k+',
      timeline: '1-3 months',
      interest: 'High',
      painPoint: 'Need 24/7 lead coverage'
    }
  },
  {
    firstName: 'Emily',
    lastName: 'Rodriguez',
    email: 'emily.r@cloudscale.io',
    phone: '+1-555-345-6789',
    company: 'CloudScale',
    jobTitle: 'Head of Growth',
    source: 'Webinar',
    status: 'QUALIFIED',
    score: 78,
    qualificationData: {
      notes: 'Attended webinar on AI lead qualification',
      budget: '$10k-$50k',
      timeline: '3-6 months',
      interest: 'Medium',
      painPoint: 'Lead qualification taking too long'
    }
  },
  {
    firstName: 'David',
    lastName: 'Thompson',
    email: 'david@startupinc.com',
    phone: '+1-555-456-7890',
    company: 'StartupInc',
    jobTitle: 'Founder',
    source: 'Referral',
    status: 'NEW',
    score: 70,
    qualificationData: {
      notes: 'Referred by existing customer',
      budget: '< $10k',
      timeline: 'Immediate',
      interest: 'High',
      painPoint: 'Small team, can\'t respond to leads fast enough'
    }
  },
  {
    firstName: 'Jessica',
    lastName: 'Martinez',
    email: 'jmartinez@enterprise.com',
    phone: '+1-555-567-8901',
    company: 'Enterprise Solutions',
    jobTitle: 'Director of Sales Ops',
    source: 'Email Campaign',
    status: 'OPPORTUNITY',
    score: 95,
    qualificationData: {
      notes: 'In final stages of vendor evaluation',
      budget: '$500k+',
      timeline: 'Immediate',
      interest: 'High',
      painPoint: 'Need enterprise-grade solution for 500+ SDRs'
    }
  },
  {
    firstName: 'Robert',
    lastName: 'Wilson',
    email: 'rwilson@globaltech.com',
    phone: '+1-555-678-9012',
    company: 'GlobalTech Industries',
    jobTitle: 'CTO',
    source: 'Trade Show',
    status: 'CONTACTED',
    score: 65,
    qualificationData: {
      notes: 'Met at SaaStr conference',
      budget: '$50k-$100k',
      timeline: '6+ months',
      interest: 'Medium',
      painPoint: 'Exploring AI options for sales automation'
    }
  },
  {
    firstName: 'Amanda',
    lastName: 'Davis',
    email: 'amanda.davis@retailplus.com',
    phone: '+1-555-789-0123',
    company: 'RetailPlus',
    jobTitle: 'VP Marketing',
    source: 'Website',
    status: 'NEW',
    score: 55,
    qualificationData: {
      notes: 'Downloaded whitepaper on AI SDR ROI',
      budget: 'Unknown',
      timeline: 'Just researching',
      interest: 'Low',
      painPoint: 'Curious about AI capabilities'
    }
  },
  {
    firstName: 'Christopher',
    lastName: 'Lee',
    email: 'clee@fintech.io',
    phone: '+1-555-890-1234',
    company: 'FinTech Solutions',
    jobTitle: 'Sales Manager',
    source: 'LinkedIn',
    status: 'QUALIFIED',
    score: 88,
    qualificationData: {
      notes: 'Has budget approved, needs technical demo',
      budget: '$10k-$50k',
      timeline: '1-3 months',
      interest: 'High',
      painPoint: 'Losing leads to competitors due to slow response'
    }
  },
  {
    firstName: 'Nicole',
    lastName: 'Brown',
    email: 'nbrown@healthcare.com',
    phone: '+1-555-901-2345',
    company: 'HealthCare Plus',
    jobTitle: 'Business Development Director',
    source: 'Referral',
    status: 'CUSTOMER',
    score: 100,
    qualificationData: {
      notes: 'Signed contract last week, onboarding scheduled',
      budget: '$100k+',
      timeline: 'Immediate',
      interest: 'High',
      painPoint: 'Needed HIPAA-compliant solution'
    }
  },
  {
    firstName: 'James',
    lastName: 'Taylor',
    email: 'jtaylor@consulting.com',
    phone: '+1-555-012-3456',
    company: 'Strategic Consulting Group',
    jobTitle: 'Partner',
    source: 'Website',
    status: 'UNQUALIFIED',
    score: 25,
    qualificationData: {
      notes: 'Looking for different type of solution',
      budget: 'No budget',
      timeline: 'Not applicable',
      interest: 'Low',
      painPoint: 'Needs outbound SDR, not inbound'
    }
  }
];

async function createSampleLeads() {
  console.log('Creating 10 sample leads with realistic data...\n');
  let created = 0;

  for (let i = 0; i < sampleLeads.length; i++) {
    const lead = sampleLeads[i];
    
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
        console.log(`✓ Created lead: ${lead.firstName} ${lead.lastName} - ${lead.company} (${lead.status})`);
      } else {
        const error = await response.text();
        console.log(`✗ Failed to create ${lead.firstName} ${lead.lastName}:`, error.substring(0, 100));
      }
    } catch (error) {
      console.error(`✗ Error creating ${lead.firstName} ${lead.lastName}:`, error.message);
    }

    // 2 second delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log(`\n✅ Successfully created ${created} sample leads!`);
  console.log('\nYou can now view them in your dashboard at https://mohit-ai-frontend.onrender.com/dashboard');
}

createSampleLeads().catch(console.error);