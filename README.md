# Berserk Tattoos - Tattoo Studio Website

A modern full-stack tattoo studio website built with React, Express, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database (local or cloud)

### 1. Quick Start (Recommended)

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

**Manual Setup:**
```bash
cd InkCanvas
npm run setup
```

### 2. Set Up Environment Variables

The setup scripts will automatically create a `.env` file from `env.example`. Edit `.env` and set your database connection:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/berserk_tattoos
PORT=5000
NODE_ENV=development
```

### 3. Set Up Database

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your system
2. Create a database named `berserk_tattoos`
3. Update the `DATABASE_URL` in your `.env` file

#### Option B: Cloud Database (Recommended)
- **Neon** (Free tier available): https://neon.tech
- **Supabase** (Free tier available): https://supabase.com
- **Railway**: https://railway.app

### 4. Run Database Migrations

```bash
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 📁 Project Structure

```
InkCanvas/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utility functions
├── server/                # Express backend
│   ├── index.ts          # Server entry point
│   ├── routes.ts         # API routes
│   └── storage.ts        # Database operations
├── shared/               # Shared types and schemas
│   └── schema.ts         # Database schema
└── attached_assets/      # Static assets
```

## 🛠️ Available Scripts

- `npm run setup` - Initial project setup
- `npm run dev` - Start development server
- `npm run start:dev` - Start with database connection check
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push database schema changes
- `npm run db:seed` - Add sample data to database
- `npm run check` - Type check the codebase

## 🎨 Features

- **Artist Profiles**: Showcase tattoo artists with portfolios
- **Gallery**: Browse tattoo artwork by style and artist
- **Booking System**: Schedule tattoo appointments
- **Contact Form**: Get in touch with the studio
- **Responsive Design**: Works on all devices
- **Dark Theme**: Edgy, professional aesthetic

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **artists**: Artist profiles and information
- **gallery_items**: Tattoo artwork and portfolio pieces
- **bookings**: Client appointment requests
- **contacts**: Contact form submissions

## 🚀 Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Variables for Production

```env
DATABASE_URL=your_production_database_url
NODE_ENV=production
PORT=5000
```

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, TypeScript, Drizzle ORM
- **Database**: PostgreSQL
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: TanStack Query
- **Forms**: React Hook Form with Zod validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
