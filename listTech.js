const fs = require('fs');
const path = require('path');

function scanDirectory(dir, callback) {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (err) return;
    files.forEach(file => {
      const filePath = path.join(dir, file.name);
      if (file.isDirectory() && !file.name.startsWith('.') && file.name !== 'node_modules') {
        scanDirectory(filePath, callback);
      } else if (file.isFile()) {
        callback(filePath);
      }
    });
  });
}

function extractImports(filePath) {
  const imports = new Set();
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importRegex = /(?:import|require)\s*\(?['"]([^'"]+)['"]\)?/g;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
      const importPath = match[1];
      if (!importPath.startsWith('.') && !importPath.startsWith('/')) {
        const packageName = importPath.startsWith('@') 
          ? importPath.split('/').slice(0, 2).join('/')
          : importPath.split('/')[0];
        imports.add(packageName);
      }
    }
  } catch {}
  return imports;
}

const technologies = new Set();
const projectDir = process.cwd();

try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(projectDir, 'package.json'), 'utf8'));
  if (packageJson.dependencies) {
    Object.keys(packageJson.dependencies).forEach(dep => technologies.add(dep));
  }
  if (packageJson.devDependencies) {
    Object.keys(packageJson.devDependencies).forEach(dep => technologies.add(dep));
  }
} catch {}

const configMappings = {
  'next.config.js': 'Next.js',
  'next.config.mjs': 'Next.js',
  'tailwind.config.js': 'Tailwind CSS',
  'tailwind.config.ts': 'Tailwind CSS',
  'tsconfig.json': 'TypeScript',
  '.eslintrc.js': 'ESLint',
  '.eslintrc.json': 'ESLint',
  'jest.config.js': 'Jest',
  'playwright.config.ts': 'Playwright',
  'prisma/schema.prisma': 'Prisma',
  'postcss.config.js': 'PostCSS',
  'vercel.json': 'Vercel',
  'render.yaml': 'Render',
  'render.production.yaml': 'Render',
  'Dockerfile': 'Docker',
  'docker-compose.yml': 'Docker',
  '.husky': 'Husky'
};

Object.entries(configMappings).forEach(([file, tech]) => {
  try {
    if (fs.existsSync(path.join(projectDir, file))) {
      technologies.add(tech);
    }
  } catch {}
});

const envFiles = ['.env', '.env.local', '.env.production'];
envFiles.forEach(envFile => {
  try {
    const content = fs.readFileSync(path.join(projectDir, envFile), 'utf8');
    if (content.includes('DATABASE_URL') && content.includes('postgresql')) {
      technologies.add('PostgreSQL');
    }
  } catch {}
});

let filesProcessed = 0;
const targetExtensions = ['.js', '.jsx', '.ts', '.tsx'];

scanDirectory(projectDir, (filePath) => {
  if (targetExtensions.includes(path.extname(filePath))) {
    const imports = extractImports(filePath);
    imports.forEach(imp => technologies.add(imp));
    filesProcessed++;
  }
});

setTimeout(() => {
  const techList = Array.from(technologies).sort();
  techList.forEach(tech => console.log(tech));
}, 1000);