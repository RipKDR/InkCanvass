#!/bin/bash

echo "🚀 Starting Berserk Tattoos Setup..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    echo "💡 Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found"
    echo "💡 Please run this script from the InkCanvas directory"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install dependencies"
        exit 1
    fi
fi

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    if [ -f "env.example" ]; then
        echo "🔧 Creating .env file..."
        cp env.example .env
        echo "✅ .env file created from env.example"
        echo "⚠️  Please edit .env file and set your DATABASE_URL"
        echo
        echo "💡 You can get a free database from:"
        echo "   - Neon: https://neon.tech"
        echo "   - Supabase: https://supabase.com"
        echo
        read -p "Press Enter to continue..."
    else
        echo "⚠️  No env.example file found"
    fi
fi

# Check if DATABASE_URL is configured
if [ -f ".env" ]; then
    if ! grep -q "DATABASE_URL=" .env; then
        echo "⚠️  DATABASE_URL not found in .env file"
        echo "💡 Please configure your database connection"
        read -p "Press Enter to continue..."
    elif grep -q "username:password" .env; then
        echo "⚠️  DATABASE_URL still has default values"
        echo "💡 Please update with your actual database credentials"
        read -p "Press Enter to continue..."
    fi
fi

echo "🎯 Starting development server..."
echo
echo "📖 The application will be available at http://localhost:5000"
echo "🛑 Press Ctrl+C to stop the server"
echo

npm run dev
