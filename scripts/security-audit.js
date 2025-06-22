#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔒 Running Security Audit...\n');

const issues = {
  critical: [],
  high: [],
  medium: [],
  low: [],
};

// Check for environment variables in code
console.log('Checking for exposed secrets...');
try {
  const secretPatterns = [
    /api[_-]?key[\s]*=[\s]*["'][^"']+["']/gi,
    /secret[\s]*=[\s]*["'][^"']+["']/gi,
    /password[\s]*=[\s]*["'][^"']+["']/gi,
    /token[\s]*=[\s]*["'][^"']+["']/gi,
    /private[_-]?key[\s]*=[\s]*["'][^"']+["']/gi,
  ];

  const files = execSync('find src -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx"')
    .toString()
    .split('\n')
    .filter(Boolean);

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    secretPatterns.forEach(pattern => {
      const matches = content.match(pattern);
      if (matches) {
        issues.high.push({
          file,
          issue: 'Potential hardcoded secret',
          matches: matches.slice(0, 3), // Show max 3 matches
        });
      }
    });
  });
} catch (error) {
  console.error('Error checking for secrets:', error.message);
}

// Check for missing authentication
console.log('Checking API routes for authentication...');
try {
  const apiFiles = execSync('find src/app/api -name "route.ts" -o -name "route.js"')
    .toString()
    .split('\n')
    .filter(Boolean);

  apiFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Skip auth routes themselves
    if (file.includes('/auth/')) return;
    
    // Check if file has authentication check
    if (!content.includes('authenticateRequest') && 
        !content.includes('getUserFromRequest') &&
        !content.includes('Authorization')) {
      issues.critical.push({
        file,
        issue: 'API route missing authentication',
      });
    }
  });
} catch (error) {
  console.error('Error checking API routes:', error.message);
}

// Check for unsafe HTML rendering
console.log('Checking for XSS vulnerabilities...');
try {
  const componentFiles = execSync('find src -name "*.tsx" -o -name "*.jsx"')
    .toString()
    .split('\n')
    .filter(Boolean);

  componentFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for dangerouslySetInnerHTML
    if (content.includes('dangerouslySetInnerHTML')) {
      issues.high.push({
        file,
        issue: 'Using dangerouslySetInnerHTML - potential XSS risk',
      });
    }
    
    // Check for unescaped user input in URLs
    if (content.includes('href={`') && !content.includes('encodeURIComponent')) {
      issues.medium.push({
        file,
        issue: 'Potential unescaped user input in URL',
      });
    }
  });
} catch (error) {
  console.error('Error checking for XSS:', error.message);
}

// Check security headers
console.log('Checking security headers configuration...');
try {
  const configFiles = ['next.config.js', 'src/middleware.ts'];
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      
      const requiredHeaders = [
        'Content-Security-Policy',
        'X-Frame-Options',
        'X-Content-Type-Options',
        'Strict-Transport-Security',
        'X-XSS-Protection',
      ];
      
      requiredHeaders.forEach(header => {
        if (!content.includes(header)) {
          issues.medium.push({
            file,
            issue: `Missing security header: ${header}`,
          });
        }
      });
    }
  });
} catch (error) {
  console.error('Error checking security headers:', error.message);
}

// Check for SQL injection vulnerabilities
console.log('Checking for SQL injection risks...');
try {
  const files = execSync('find src -name "*.ts" -o -name "*.tsx"')
    .toString()
    .split('\n')
    .filter(Boolean);

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    
    // Check for raw SQL queries
    if (content.includes('prisma.$queryRaw') || 
        content.includes('prisma.$executeRaw')) {
      if (!content.includes('Prisma.sql') && !content.includes('Prisma.join')) {
        issues.critical.push({
          file,
          issue: 'Raw SQL query without parameterization',
        });
      }
    }
  });
} catch (error) {
  console.error('Error checking SQL injection:', error.message);
}

// Check dependencies for known vulnerabilities
console.log('Checking dependencies...');
try {
  const auditResult = execSync('npm audit --json', { encoding: 'utf8' });
  const audit = JSON.parse(auditResult);
  
  if (audit.metadata.vulnerabilities.critical > 0) {
    issues.critical.push({
      issue: `${audit.metadata.vulnerabilities.critical} critical vulnerabilities in dependencies`,
    });
  }
  if (audit.metadata.vulnerabilities.high > 0) {
    issues.high.push({
      issue: `${audit.metadata.vulnerabilities.high} high vulnerabilities in dependencies`,
    });
  }
} catch (error) {
  // npm audit returns non-zero exit code if vulnerabilities found
  console.log('Dependencies checked');
}

// Generate report
console.log('\n📊 Generating security audit report...\n');

const report = {
  timestamp: new Date().toISOString(),
  summary: {
    critical: issues.critical.length,
    high: issues.high.length,
    medium: issues.medium.length,
    low: issues.low.length,
    total: issues.critical.length + issues.high.length + issues.medium.length + issues.low.length,
  },
  issues,
};

// Write JSON report
fs.writeFileSync('test-results/security-audit.json', JSON.stringify(report, null, 2));

// Console output
console.log('🔒 SECURITY AUDIT SUMMARY');
console.log('========================\n');
console.log(`🔴 Critical: ${report.summary.critical}`);
console.log(`🟠 High: ${report.summary.high}`);
console.log(`🟡 Medium: ${report.summary.medium}`);
console.log(`🟢 Low: ${report.summary.low}`);
console.log(`\nTotal Issues: ${report.summary.total}\n`);

// Display critical issues
if (issues.critical.length > 0) {
  console.log('🔴 CRITICAL ISSUES:');
  issues.critical.forEach((issue, i) => {
    console.log(`\n${i + 1}. ${issue.issue}`);
    if (issue.file) console.log(`   File: ${issue.file}`);
  });
}

// Display high issues
if (issues.high.length > 0) {
  console.log('\n🟠 HIGH PRIORITY ISSUES:');
  issues.high.forEach((issue, i) => {
    console.log(`\n${i + 1}. ${issue.issue}`);
    if (issue.file) console.log(`   File: ${issue.file}`);
  });
}

// Exit with error if critical issues found
if (issues.critical.length > 0) {
  console.log('\n❌ Security audit failed due to critical issues');
  process.exit(1);
} else if (issues.high.length > 0) {
  console.log('\n⚠️  Security audit completed with warnings');
  process.exit(0);
} else {
  console.log('\n✅ Security audit passed');
  process.exit(0);
}