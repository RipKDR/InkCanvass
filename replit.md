# Berserk Tattoos - Tattoo Studio Website

## Overview

Berserk Tattoos is a modern tattoo studio website built as a full-stack application featuring a React frontend and Express backend. The application showcases tattoo artists, their portfolios, services, and provides booking functionality for clients. The design emphasizes a dark, edgy aesthetic with elegant typography befitting a premium tattoo studio.

## User Preferences

```
Preferred communication style: Simple, everyday language.
```

## System Architecture

This is a modern full-stack web application with the following architectural decisions:

### Frontend Architecture
- **React 18** with TypeScript for type safety and better developer experience
- **Vite** as the build tool for fast development and optimized production builds
- **Tailwind CSS** with shadcn/ui components for consistent, customizable UI design
- **TanStack Query** for efficient server state management and data fetching
- **Wouter** as a lightweight client-side router
- **React Hook Form** with Zod validation for robust form handling

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints
- **Drizzle ORM** for type-safe database operations with PostgreSQL
- **Neon Database** (@neondatabase/serverless) for serverless PostgreSQL hosting
- **RESTful API** design with clear separation of concerns

### Database Design
The application uses PostgreSQL with four main entities:
- **Artists**: Store artist profiles, specialties, and experience
- **Gallery Items**: Portfolio pieces linked to artists with categorization
- **Bookings**: Client booking requests with artist preferences and tattoo details
- **Contacts**: General contact form submissions

## Key Components

### Data Layer
- **Shared Schema**: Common TypeScript types and Zod schemas used across frontend and backend
- **Storage Interface**: Abstracted data access layer with in-memory implementation for development
- **Database Migrations**: Drizzle-managed schema migrations for production database

### UI Components
- **shadcn/ui Library**: Professional component library with consistent theming
- **Custom Navigation**: Responsive navigation with scroll effects and mobile menu
- **Form Components**: Validated forms for booking and contact functionality
- **Gallery Display**: Masonry-style layout for showcasing tattoo artwork

### Business Logic
- **Artist Management**: CRUD operations for artist profiles and portfolios
- **Booking System**: Multi-step booking process with artist selection and style preferences
- **Content Management**: Dynamic gallery filtering and artist-specific content

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Layer**: Express routes handle requests and validate data using Zod schemas
3. **Storage Layer**: Abstracted storage interface handles data persistence
4. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
5. **Response Handling**: Type-safe responses sent back to frontend
6. **UI Updates**: TanStack Query manages cache invalidation and UI updates

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React, React DOM, React Hook Form, TanStack Query
- **Backend Stack**: Express.js, Drizzle ORM, Neon Database driver
- **Build Tools**: Vite, TypeScript, esbuild for production builds
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer

### UI Component Library
- **Radix UI**: Accessible headless components for complex UI interactions
- **Lucide React**: Consistent icon library
- **Class Variance Authority**: Type-safe component variant management

### Development Tools
- **TypeScript**: Type safety across the entire application
- **Zod**: Runtime type validation and schema definition
- **ESModules**: Modern module system throughout the application

## Deployment Strategy

### Development Environment
- **Vite Dev Server**: Hot module replacement for rapid development
- **TSX**: TypeScript execution for server development
- **In-Memory Storage**: Seeded data for development without database dependency

### Production Build
- **Frontend**: Vite builds optimized static assets to `/dist/public`
- **Backend**: esbuild bundles server code to `/dist/index.js`
- **Database**: Drizzle pushes schema changes to production PostgreSQL
- **Hosting**: Designed for deployment on platforms supporting Node.js applications

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string for production
- **NODE_ENV**: Environment detection for development vs production features
- **Replit Integration**: Special handling for Replit development environment

The application follows modern web development practices with clear separation of concerns, type safety, and scalable architecture suitable for a professional tattoo studio's online presence.