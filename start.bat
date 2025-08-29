@echo off
echo 🚀 Starting Berserk Tattoos Setup...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo 💡 Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ package.json not found
    echo 💡 Please run this script from the InkCanvas directory
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
)

REM Create .env file if it doesn't exist
if not exist ".env" (
    if exist "env.example" (
        echo 🔧 Creating .env file...
        copy env.example .env >nul
        echo ✅ .env file created from env.example
        echo ⚠️  Please edit .env file and set your DATABASE_URL
        echo.
        echo 💡 You can get a free database from:
        echo    - Neon: https://neon.tech
        echo    - Supabase: https://supabase.com
        echo.
        pause
    ) else (
        echo ⚠️  No env.example file found
    )
)

REM Check if DATABASE_URL is configured
if exist ".env" (
    findstr /C:"DATABASE_URL=" .env >nul
    if %errorlevel% neq 0 (
        echo ⚠️  DATABASE_URL not found in .env file
        echo 💡 Please configure your database connection
        pause
    ) else (
        findstr /C:"username:password" .env >nul
        if %errorlevel% equ 0 (
            echo ⚠️  DATABASE_URL still has default values
            echo 💡 Please update with your actual database credentials
            pause
        )
    )
)

echo 🎯 Starting development server...
echo.
echo 📖 The application will be available at http://localhost:5000
echo 🛑 Press Ctrl+C to stop the server
echo.

npm run dev

pause
