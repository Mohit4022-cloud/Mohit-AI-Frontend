const fs = require('fs').promises;
const { execSync } = require('child_process');
const path = require('path');

// Helper function to copy files/directories recursively
async function copyRecursive(src, dest) {
  const stat = await fs.stat(src);
  
  if (stat.isDirectory()) {
    await fs.mkdir(dest, { recursive: true });
    const files = await fs.readdir(src);
    
    for (const file of files) {
      await copyRecursive(
        path.join(src, file),
        path.join(dest, file)
      );
    }
  } else {
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(src, dest);
  }
}

async function createMinimalDeployment() {
  console.log('Creating minimal deployment for Azure...');
  
  const deployFiles = [
    'package.json',
    'package-lock.json',
    'next.config.mjs',
    '.deployment',
    'azure-app-service.yml',
    'server.js',
    'src',
    'app',
    'components',
    'styles',
    'public',
    'prisma',
    'tsconfig.json',
    'tailwind.config.ts',
    'postcss.config.mjs'
  ];
  
  // Create deployment directory
  try {
    await fs.rmdir('azure-minimal', { recursive: true });
  } catch (e) {}
  await fs.mkdir('azure-minimal', { recursive: true });
  
  // Copy only source files
  for (const file of deployFiles) {
    try {
      await fs.access(file);
      console.log(`Copying ${file}...`);
      await copyRecursive(file, path.join('azure-minimal', file));
    } catch (e) {
      console.log(`Skipping ${file} (not found)`);
    }
  }
  
  // Create deployment instructions
  const readme = `# Azure Deployment Instructions

This minimal package contains only source files.
Azure will build the app during deployment.

## Deploy using:

1. Azure CLI:
   az webapp deployment source config-zip --src minimal.zip --name mohitai --resource-group <rg>

2. Git deployment:
   - Connect your repo to Azure App Service
   - Push this branch
   - Azure will build automatically

3. VS Code:
   - Install Azure App Service extension
   - Right-click on 'azure-minimal' folder
   - Select "Deploy to Web App"

Package created: ${new Date().toISOString()}
`;
  
  await fs.writeFile('azure-minimal/README-DEPLOYMENT.md', readme);
  
  // Check size before zipping
  const sizeCheck = execSync('du -sh azure-minimal').toString().trim();
  console.log(`\nPackage size before compression: ${sizeCheck}`);
  
  // Create zip
  console.log('\nCreating zip file...');
  execSync('cd azure-minimal && zip -r ../minimal.zip . -x "node_modules/*" ".next/*" "*.map" ".git/*"');
  
  const zipSize = execSync('ls -lh minimal.zip | awk \'{print $5}\'').toString().trim();
  console.log(`\n✅ Created minimal.zip (${zipSize})`);
  console.log('This should be well under GitHub\'s 100MB limit!');
  console.log('\nNext step: Deploy using Azure CLI or portal');
}

createMinimalDeployment().catch(console.error);