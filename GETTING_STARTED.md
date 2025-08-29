# 🚀 Getting Started - Berserk Tattoos

## Quick Start (Choose One)

### Option 1: One-Click Start (Recommended)

**Windows:**
```bash
cd InkCanvas
start.bat
```

**Mac/Linux:**
```bash
cd InkCanvas
./start.sh
```

### Option 2: Manual Setup

```bash
cd InkCanvas
npm run setup
```

## What You Need

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **A PostgreSQL database** - Get a free one from:
   - [Neon](https://neon.tech) (Recommended)
   - [Supabase](https://supabase.com)
   - [Railway](https://railway.app)

## Setup Steps

1. **Run the setup script** (see Quick Start above)
2. **Get a database URL** from one of the services above
3. **Edit `.env` file** and paste your database URL:
   ```env
   DATABASE_URL=postgresql://your-connection-string
   ```
4. **Set up the database:**
   ```bash
   npm run db:push
   ```
5. **Add sample data (optional):**
   ```bash
   npm run db:seed
   ```
6. **Start the server:**
   ```bash
   npm run start:dev
   ```

## 🎯 You're Done!

- **Website**: http://localhost:5000
- **API**: http://localhost:5000/api

## 🆘 Need Help?

- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- Read the full [README.md](./README.md)
- Ensure your Node.js version is 18 or higher

## 🎨 What You Get

- **Artist Profiles**: Showcase tattoo artists
- **Gallery**: Browse tattoo artwork
- **Booking System**: Schedule appointments
- **Contact Form**: Get in touch
- **Responsive Design**: Works on all devices
- **Dark Theme**: Professional aesthetic
