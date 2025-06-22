#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// HTML to Next.js page converter
function convertHtmlToNextJs(htmlPath, pageName) {
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Extract body content
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : '';
  
  // Extract styles from the HTML
  const styleMatch = htmlContent.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  const styles = styleMatch ? styleMatch.join('\n') : '';
  
  // Convert to JSX - properly escape and format
  let jsxContent = bodyContent
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/<script[\s\S]*?<\/script>/gi, '') // Remove script tags
    .replace(/href="([^"]+)\.html"/g, 'href="/$1"') // Convert .html links
    .replace(/href="index\.html"/g, 'href="/"') // Special case for index
    .replace(/<(\w+)([^>]*)\s*\/\s*>/g, '<$1$2 />') // Self-closing tags
    .replace(/&/g, '&amp;') // Escape ampersands
    .replace(/</g, '&lt;').replace(/>/g, '&gt;') // Escape angle brackets for JSX
    .trim();
  
  // Wrap in proper JSX syntax
  jsxContent = `<div dangerouslySetInnerHTML={{ __html: \`${jsxContent}\` }} />`;
  
  // Extract page title
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : pageName;
  
  // Generate Next.js page component
  const nextJsPage = `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${title}',
  description: 'Mohit AI - Your AI SDR That Never Sleeps',
}

export default function ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}Page() {
  return (
    <>
      ${jsxContent}
    </>
  )
}
`;

  return nextJsPage;
}

// Pages to convert
const pages = [
  { html: 'index.html', name: 'home', output: 'page.tsx' },
  { html: 'about.html', name: 'about', output: 'about/page.tsx' },
  { html: 'contact.html', name: 'contact', output: 'contact/page.tsx' },
  { html: 'demo.html', name: 'demo', output: 'demo/page.tsx' },
  { html: 'features.html', name: 'features', output: 'features/page.tsx' },
  { html: 'pricing.html', name: 'pricing', output: 'pricing/page.tsx' },
  { html: 'product.html', name: 'product', output: 'product/page.tsx' },
  { html: 'resources.html', name: 'resources', output: 'resources/page.tsx' },
  { html: 'security.html', name: 'security', output: 'security/page.tsx' },
  { html: 'enterprise.html', name: 'enterprise', output: 'solutions/enterprise/page.tsx' },
  { html: 'for-managers.html', name: 'managers', output: 'solutions/for-managers/page.tsx' },
  { html: 'for-sdrs.html', name: 'sdrs', output: 'solutions/for-sdrs/page.tsx' },
  { html: 'small-business.html', name: 'smallBusiness', output: 'solutions/small-business/page.tsx' },
  { html: 'solutions.html', name: 'solutions', output: 'solutions/page.tsx' },
];

const sourceDir = path.join(__dirname, '../Website-BlackBox-V1-improved/user-workspace');
const targetDir = path.join(__dirname, '../src/app');

// Create directories and convert pages
pages.forEach(({ html, name, output }) => {
  const htmlPath = path.join(sourceDir, html);
  const outputPath = path.join(targetDir, output);
  
  if (fs.existsSync(htmlPath)) {
    // Create directory if needed
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Convert and write
    const nextJsContent = convertHtmlToNextJs(htmlPath, name);
    fs.writeFileSync(outputPath, nextJsContent);
    console.log(`✓ Converted ${html} → ${output}`);
  } else {
    console.log(`✗ Missing ${html}`);
  }
});

// Copy styles
const stylesSource = path.join(sourceDir, 'styles-phase5.css');
const stylesTarget = path.join(__dirname, '../src/app/styles-phase5.css');
if (fs.existsSync(stylesSource)) {
  fs.copyFileSync(stylesSource, stylesTarget);
  console.log('✓ Copied styles-phase5.css');
}

console.log('\nConversion complete!');