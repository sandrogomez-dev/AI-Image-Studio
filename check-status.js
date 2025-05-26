#!/usr/bin/env node

const http = require('http');
const https = require('https');
const { execSync } = require('child_process');

console.log('🔍 AI Image Studio - Status Check\n');

// Check if frontend is running
function checkService(url, name) {
  return new Promise((resolve) => {
    const request = url.startsWith('https') ? https : http;
    const req = request.get(url, (res) => {
      console.log(`✅ ${name}: Running on ${url} (Status: ${res.statusCode})`);
      resolve(true);
    });
    
    req.on('error', () => {
      console.log(`❌ ${name}: Not running on ${url}`);
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      console.log(`⏱️  ${name}: Timeout on ${url}`);
      req.destroy();
      resolve(false);
    });
  });
}

async function checkStatus() {
  console.log('📁 Project Structure:');
  try {
    const files = execSync('dir /b', { encoding: 'utf8' }).split('\n').filter(f => f.trim());
    files.forEach(file => {
      if (file.includes('frontend')) console.log('  ✅ frontend/');
      else if (file.includes('backend')) console.log('  ✅ backend/');
      else if (file.includes('package.json')) console.log('  ✅ package.json');
      else if (file.includes('README.md')) console.log('  ✅ README.md');
    });
  } catch (error) {
    console.log('  ❌ Error checking structure');
  }

  console.log('\n🌐 Service Status:');
  await checkService('http://localhost:3000', 'Frontend (Next.js)');
  await checkService('http://localhost:8000', 'Backend (FastAPI)');
  
  console.log('\n📦 Dependencies:');
  try {
    execSync('npm list --depth=0', { stdio: 'ignore' });
    console.log('  ✅ Root dependencies installed');
  } catch {
    console.log('  ⚠️  Root dependencies missing (run: npm install)');
  }

  try {
    execSync('cd frontend && npm list --depth=0', { stdio: 'ignore' });
    console.log('  ✅ Frontend dependencies installed');
  } catch {
    console.log('  ⚠️  Frontend dependencies missing (run: cd frontend && npm install)');
  }

  console.log('\n🚀 Quick Commands:');
  console.log('  npm run dev:frontend  # Start frontend only');
  console.log('  npm run dev:backend   # Start backend only');
  console.log('  npm run dev           # Start both services');
  console.log('  npm run docker:up     # Start with Docker');
  
  console.log('\n📖 Visit: http://localhost:3000');
}

checkStatus().catch(console.error); 