#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
  red: '\x1b[31m'
};

// Patterns to search for
const patterns = {
  envVars: /TWILIO_|ELEVENLABS_|TWELVEPLUS_|TWELVE_PLUS_/i,
  processEnv: /process\.env\.(TWILIO_|ELEVENLABS_|TWELVEPLUS_|TWELVE_PLUS_)/i,
  imports: /(?:import|require)\s*\(?\s*['"](?:twilio|elevenlabs|12plus|twelveplus)/i,
  components: /(?:LiveCall|LiveCalls|CallWidget|LiveCallButton)/
};

// File extensions to search
const searchExtensions = ['.js', '.jsx', '.ts', '.tsx'];
const envExtensions = ['.env', '.env.local', '.env.development', '.env.production'];

let totalMatches = 0;
const results = [];

// Function to recursively scan directory
function scanDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath);
      } else if (stat.isFile()) {
        const ext = path.extname(file);
        const basename = path.basename(file);
        
        // Check env files
        if (basename.startsWith('.env') || envExtensions.includes(ext)) {
          checkEnvFile(filePath);
        }
        
        // Check source files
        if (searchExtensions.includes(ext)) {
          checkSourceFile(filePath);
        }
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

// Function to check env files
function checkEnvFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      if (patterns.envVars.test(line)) {
        const match = {
          file: filePath,
          line: index + 1,
          content: line.trim(),
          type: 'Environment Variable'
        };
        results.push(match);
        totalMatches++;
      }
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

// Function to check source files
function checkSourceFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    lines.forEach((line, index) => {
      // Check for process.env usage
      if (patterns.processEnv.test(line)) {
        const match = {
          file: filePath,
          line: index + 1,
          content: line.trim(),
          type: 'process.env usage'
        };
        results.push(match);
        totalMatches++;
      }
      
      // Check for imports
      if (patterns.imports.test(line)) {
        const match = {
          file: filePath,
          line: index + 1,
          content: line.trim(),
          type: 'Import/Require'
        };
        results.push(match);
        totalMatches++;
      }
      
      // Check for component names
      if (patterns.components.test(line)) {
        const match = {
          file: filePath,
          line: index + 1,
          content: line.trim(),
          type: 'Component Reference'
        };
        results.push(match);
        totalMatches++;
      }
    });
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
  }
}

// Main execution
console.log(`${colors.bright}${colors.blue}Scanning for Live Call functionality...${colors.reset}\n`);

const srcPath = path.join(process.cwd(), 'src');
const rootPath = process.cwd();

// Check if src directory exists
if (!fs.existsSync(srcPath)) {
  console.error(`${colors.red}Error: src/ directory not found in current directory${colors.reset}`);
  process.exit(1);
}

// Scan src directory
scanDirectory(srcPath);

// Also check root directory for env files
const rootFiles = fs.readdirSync(rootPath);
rootFiles.forEach(file => {
  if (file.startsWith('.env')) {
    checkEnvFile(path.join(rootPath, file));
  }
});

// Print results
if (totalMatches === 0) {
  console.log(`${colors.yellow}No live call functionality found.${colors.reset}`);
} else {
  console.log(`${colors.green}Found ${totalMatches} match${totalMatches === 1 ? '' : 'es'}:${colors.reset}\n`);
  
  // Group results by file
  const groupedResults = {};
  results.forEach(result => {
    if (!groupedResults[result.file]) {
      groupedResults[result.file] = [];
    }
    groupedResults[result.file].push(result);
  });
  
  // Print grouped results
  Object.entries(groupedResults).forEach(([file, matches]) => {
    console.log(`${colors.bright}${file}${colors.reset}`);
    matches.forEach(match => {
      console.log(`  Line ${match.line}: ${colors.yellow}[${match.type}]${colors.reset} ${match.content}`);
    });
    console.log('');
  });
}

process.exit(0);