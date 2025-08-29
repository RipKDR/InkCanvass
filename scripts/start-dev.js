#!/usr/bin/env node

import { spawn } from 'child_process';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function checkDatabaseConnection() {
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL is not set in your .env file');
    console.log('💡 Please set your DATABASE_URL and try again');
    process.exit(1);
  }

  try {
    console.log('🔍 Checking database connection...');
    const sql = neon(process.env.DATABASE_URL);
    await sql`SELECT 1`;
    console.log('✅ Database connection successful');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('\n💡 Please check your DATABASE_URL and ensure your database is running');
    console.log('   You can use a free database service like:');
    console.log('   - Neon: https://neon.tech');
    console.log('   - Supabase: https://supabase.com');
    return false;
  }
}

async function startDevelopment() {
  console.log('🚀 Starting Berserk Tattoos development server...\n');

  // Check database connection
  const dbConnected = await checkDatabaseConnection();
  if (!dbConnected) {
    process.exit(1);
  }

  console.log('🎯 Starting development server...\n');

  // Start the development server
  const devProcess = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit',
    shell: true
  });

  devProcess.on('error', (error) => {
    console.error('❌ Failed to start development server:', error);
    process.exit(1);
  });

  devProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ Development server exited with code ${code}`);
      process.exit(code);
    }
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...');
    devProcess.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down development server...');
    devProcess.kill('SIGTERM');
  });
}

// Run the startup
startDevelopment();
