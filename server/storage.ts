import { type Artist, type InsertArtist, type GalleryItem, type InsertGalleryItem, type Booking, type InsertBooking, type Contact, type InsertContact } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Artists
  getArtists(): Promise<Artist[]>;
  getArtist(id: string): Promise<Artist | undefined>;
  createArtist(artist: InsertArtist): Promise<Artist>;
  
  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByArtist(artistId: string): Promise<GalleryItem[]>;
  getGalleryItemsByStyle(style: string): Promise<GalleryItem[]>;
  createGalleryItem(item: InsertGalleryItem): Promise<GalleryItem>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Contacts
  getContacts(): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private artists: Map<string, Artist>;
  private galleryItems: Map<string, GalleryItem>;
  private bookings: Map<string, Booking>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.artists = new Map();
    this.galleryItems = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed artists
    const ameliaId = randomUUID();
    const benId = randomUUID();
    const moniqueId = randomUUID();

    const amelia: Artist = {
      id: ameliaId,
      name: "Amelia Kelso",
      specialty: "Fine Line Specialist",
      bio: "Amelia specializes in delicate fine line work and minimalist botanical designs. Her attention to detail and precision has made her one of Melbourne's most sought-after fine line artists.",
      yearsExperience: 8,
      totalPieces: 450,
      themeColor: "#C4A484",
      profileImage: "https://unavatar.io/instagram/amzkelso",
      skills: ["Fine Line", "Minimalist", "Botanical", "Geometric"],
      createdAt: new Date(),
    };

    const ben: Artist = {
      id: benId,
      name: "Ben White Raven",
      specialty: "Realism Master",
      bio: "Ben is a master of photorealistic tattoos, specializing in portraits and wildlife. His ability to capture emotion and detail in ink is unmatched.",
      yearsExperience: 12,
      totalPieces: 600,
      themeColor: "#8B9DC3",
      profileImage: "https://unavatar.io/instagram/ben_whiteraven",
      skills: ["Realism", "Portraits", "Animals", "Color Work"],
      createdAt: new Date(),
    };

    const monique: Artist = {
      id: moniqueId,
      name: "Monique Moore",
      specialty: "Blackwork Specialist",
      bio: "Monique creates bold, striking blackwork pieces with gothic and traditional influences. Her powerful designs make a statement.",
      yearsExperience: 10,
      totalPieces: 520,
      themeColor: "#7B1113",
      profileImage: "https://unavatar.io/instagram/moniquemoore666",
      skills: ["Blackwork", "Gothic", "Traditional", "Bold Designs"],
      createdAt: new Date(),
    };

    this.artists.set(ameliaId, amelia);
    this.artists.set(benId, ben);
    this.artists.set(moniqueId, monique);

    // Seed gallery items
    const galleryItems = [
      {
        id: randomUUID(),
        title: "Realistic Portrait",
        style: "Realism",
        artistId: benId,
        imageUrl: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
        description: "Detailed portrait tattoo with incredible realism",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Geometric Lines",
        style: "Fine Line",
        artistId: ameliaId,
        imageUrl: "https://images.unsplash.com/photo-1590333748338-d629e4564ad9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=900",
        description: "Delicate fine line geometric design",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Bold Blackwork",
        style: "Blackwork",
        artistId: moniqueId,
        imageUrl: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
        description: "Striking blackwork with gothic elements",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Floral Detail",
        style: "Fine Line",
        artistId: ameliaId,
        imageUrl: "https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
        description: "Intricate botanical fine line work",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Animal Portrait",
        style: "Realism",
        artistId: benId,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800",
        description: "Realistic wildlife portrait tattoo",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        title: "Traditional Style",
        style: "Traditional",
        artistId: moniqueId,
        imageUrl: "https://images.unsplash.com/photo-1590736969955-71cc94901144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=700",
        description: "Bold traditional tattoo design",
        createdAt: new Date(),
      },
    ];

    galleryItems.forEach(item => {
      this.galleryItems.set(item.id, item);
    });
  }

  // Artists
  async getArtists(): Promise<Artist[]> {
    return Array.from(this.artists.values());
  }

  async getArtist(id: string): Promise<Artist | undefined> {
    return this.artists.get(id);
  }

  async createArtist(insertArtist: InsertArtist): Promise<Artist> {
    const id = randomUUID();
    const artist: Artist = {
      ...insertArtist,
      // Ensure types align with inferred select types
      skills: (insertArtist.skills as unknown as string[]),
      id,
      createdAt: new Date(),
    };
    this.artists.set(id, artist);
    return artist;
  }

  // Gallery
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }

  async getGalleryItemsByArtist(artistId: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(item => item.artistId === artistId);
  }

  async getGalleryItemsByStyle(style: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(item => item.style === style);
  }

  async createGalleryItem(insertItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = randomUUID();
    const item: GalleryItem = {
      ...insertItem,
      description: insertItem.description ?? null,
      id,
      createdAt: new Date(),
    };
    this.galleryItems.set(id, item);
    return item;
  }

  // Bookings
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = {
      ...insertBooking,
      preferredArtist: insertBooking.preferredArtist ?? null,
      styles: insertBooking.styles as string[],
      id,
      status: "pending",
      createdAt: new Date(),
    };
    this.bookings.set(id, booking);
    return booking;
  }

  // Contacts
  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { ...insertContact, id, createdAt: new Date() };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
