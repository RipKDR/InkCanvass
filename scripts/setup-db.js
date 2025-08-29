#!/usr/bin/env node

import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { artists, galleryItems, bookings, contacts } from '../shared/schema.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql);

const sampleArtists = [
  {
    name: "Monique 'Ink' Rodriguez",
    specialty: "Traditional Japanese & Blackwork",
    bio: "A master of traditional Japanese tattooing with over 15 years of experience. Known for bold, clean lines and deep cultural respect.",
    yearsExperience: 15,
    totalPieces: 1200,
    themeColor: "#FF6B6B",
    profileImage: "/artists/monique.jpg",
    skills: ["Traditional Japanese", "Blackwork", "Linework", "Cultural Tattoos"]
  },
  {
    name: "Ben 'Steel' Thompson",
    specialty: "Neo-Traditional & Color Realism",
    bio: "Specializing in vibrant neo-traditional pieces and stunning color realism. Every piece tells a story.",
    yearsExperience: 12,
    totalPieces: 950,
    themeColor: "#4ECDC4",
    profileImage: "/artists/ben.jpg",
    skills: ["Neo-Traditional", "Color Realism", "Portraits", "Nature Art"]
  },
  {
    name: "Amelia 'Raven' Chen",
    specialty: "Minimalist & Geometric",
    bio: "Creating elegant, minimalist designs that speak volumes through simplicity. Perfect for first-timers and art lovers.",
    yearsExperience: 8,
    totalPieces: 600,
    themeColor: "#45B7D1",
    profileImage: "/artists/amelia.jpg",
    skills: ["Minimalist", "Geometric", "Fine Line", "Abstract"]
  }
];

const sampleGalleryItems = [
  {
    title: "Dragon & Cherry Blossoms",
    style: "Traditional Japanese",
    artistId: "monique-id",
    imageUrl: "/gallery/dragon-cherry.jpg",
    description: "Traditional Japanese dragon with cherry blossoms, symbolizing strength and beauty."
  },
  {
    title: "Geometric Wolf",
    style: "Geometric",
    artistId: "amelia-id",
    imageUrl: "/gallery/geometric-wolf.jpg",
    description: "Minimalist geometric wolf design with clean lines and perfect symmetry."
  },
  {
    title: "Neo-Traditional Rose",
    style: "Neo-Traditional",
    artistId: "ben-id",
    imageUrl: "/gallery/neo-rose.jpg",
    description: "Vibrant neo-traditional rose with bold colors and modern styling."
  }
];

async function setupDatabase() {
  try {
    console.log('🗄️  Setting up database with sample data...');

    // Insert sample artists
    console.log('👨‍🎨 Adding sample artists...');
    const insertedArtists = await db.insert(artists).values(sampleArtists).returning();
    console.log(`✅ Added ${insertedArtists.length} artists`);

    // Update gallery items with actual artist IDs
    const updatedGalleryItems = sampleGalleryItems.map(item => ({
      ...item,
      artistId: insertedArtists.find(artist => 
        artist.name.includes(item.artistId.split('-')[0])
      )?.id || insertedArtists[0].id
    }));

    // Insert sample gallery items
    console.log('🖼️  Adding sample gallery items...');
    const insertedGalleryItems = await db.insert(galleryItems).values(updatedGalleryItems).returning();
    console.log(`✅ Added ${insertedGalleryItems.length} gallery items`);

    console.log('🎉 Database setup complete!');
    console.log('\nSample data includes:');
    console.log(`- ${insertedArtists.length} artists`);
    console.log(`- ${insertedGalleryItems.length} gallery items`);
    console.log('\nYou can now run: npm run dev');

  } catch (error) {
    console.error('❌ Error setting up database:', error.message);
    if (error.message.includes('DATABASE_URL')) {
      console.error('\n💡 Make sure to set your DATABASE_URL in the .env file');
    }
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
