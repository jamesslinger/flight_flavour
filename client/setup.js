const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Flight Flavour...\n');

// Check if .env already exists
const envPath = path.join(__dirname, '.env');
const examplePath = path.join(__dirname, '.env.example');

if (fs.existsSync(envPath)) {
    console.log('⚠️  .env file already exists. Skipping setup.');
    console.log('   If you need to reset, delete .env and run this script again.');
    process.exit(0);
}

// Copy example file
if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log('✅ Created .env file from .env.example\n');
    console.log('📝 Please edit .env and add your Kiwi.com API key:');
    console.log('   REACT_APP_API_KEY=your_actual_api_key_here\n');
    console.log('🔗 Get your API key from: https://partners.kiwi.com/\n');
    console.log('🛠️  After updating .env, run: npm start\n');
    console.log('Setup complete! 🎉');
} else {
    console.error('❌ .env.example not found. Please check your setup.');
    process.exit(1);
}