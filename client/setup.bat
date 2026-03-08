@echo off
REM Flight Flavour Setup Script for Windows

echo 🚀 Setting up Flight Flavour...
echo.

REM Check if .env already exists
if exist ".env" (
    echo ⚠️  .env file already exists. Skipping setup.
    echo    If you need to reset, delete .env and run this script again.
    goto :end
)

REM Copy example file
if exist ".env.example" (
    copy .env.example .env
    echo ✅ Created .env file from .env.example
    echo.
    echo 📝 Please edit .env and add your Kiwi.com API key:
    echo    REACT_APP_API_KEY=your_actual_api_key_here
    echo.
    echo 🔗 Get your API key from: https://partners.kiwi.com/
    echo.
    echo 🛠️  After updating .env, run: npm start
) else (
    echo ❌ .env.example not found. Please check your setup.
    exit /b 1
)

:end
echo.
echo Setup complete! 🎉