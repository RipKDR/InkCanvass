# Troubleshooting Guide

## Common Issues and Solutions

### 🗄️ Database Connection Issues

**Error: "DATABASE_URL is not set"**
```bash
# Solution: Create and configure .env file
cp env.example .env
# Edit .env and set your DATABASE_URL
```

**Error: "Connection failed"**
- Check if your database is running
- Verify your DATABASE_URL format: `postgresql://username:password@host:port/database`
- For cloud databases, ensure your IP is whitelisted

**Free Database Options:**
- **Neon** (Recommended): https://neon.tech (Free tier available)
- **Supabase**: https://supabase.com (Free tier available)
- **Railway**: https://railway.app

### 📦 Dependency Issues

**Error: "Module not found"**
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Error: "TypeScript compilation failed"**
```bash
# Solution: Check TypeScript version
npm run check
```

### 🚀 Server Startup Issues

**Error: "Port already in use"**
```bash
# Solution: Change port in .env file
PORT=3001
```

**Error: "Cannot find module"**
```bash
# Solution: Ensure you're in the correct directory
cd InkCanvas
npm run dev
```

### 🎨 Frontend Issues

**Error: "Vite build failed"**
```bash
# Solution: Clear cache and rebuild
rm -rf dist
npm run build
```

**Error: "React components not loading"**
- Check browser console for errors
- Ensure all dependencies are installed
- Try clearing browser cache

### 🔧 Development Workflow

**Quick Setup:**
```bash
# 1. Install dependencies
npm run setup

# 2. Configure database
# Edit .env file with your DATABASE_URL

# 3. Set up database schema
npm run db:push

# 4. Add sample data (optional)
npm run db:seed

# 5. Start development server
npm run start:dev
```

**Reset Everything:**
```bash
# Remove all generated files
rm -rf node_modules dist .env
npm run setup
```

### 📱 Mobile/Responsive Issues

**Layout broken on mobile:**
- Check Tailwind CSS classes
- Ensure responsive design classes are used
- Test with different screen sizes

### 🖼️ Image/Asset Issues

**Images not loading:**
- Check file paths in `attached_assets/`
- Ensure images are in the correct format (jpg, png, webp)
- Verify file permissions

### 🔍 Debug Mode

**Enable verbose logging:**
```bash
# Add to .env file
DEBUG=true
NODE_ENV=development
```

**Check server logs:**
```bash
# View real-time logs
npm run dev
```

### 📞 Getting Help

If you're still experiencing issues:

1. Check the browser console for errors
2. Check the terminal/server logs
3. Verify your Node.js version (18+ required)
4. Ensure all environment variables are set
5. Try the reset workflow above

**Common Environment Variables:**
```env
DATABASE_URL=postgresql://username:password@host:port/database
PORT=5000
NODE_ENV=development
DEBUG=true
```
