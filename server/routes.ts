import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBookingSchema, insertContactSchema } from "@shared/schema";

// Simple in-memory cache for Instagram responses
const igCache = new Map<string, { ts: number; data: any }>();
const IG_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function registerRoutes(app: Express): Promise<Server> {
  // Artists routes
  app.get("/api/artists", async (req, res) => {
    try {
      const artists = await storage.getArtists();
      res.json(artists);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artists" });
    }
  });

  app.get("/api/artists/:id", async (req, res) => {
    try {
      const artist = await storage.getArtist(req.params.id);
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      res.json(artist);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch artist" });
    }
  });

  // Gallery routes
  app.get("/api/gallery", async (req, res) => {
    try {
      const { artist, style } = req.query;
      
      let items;
      if (artist) {
        items = await storage.getGalleryItemsByArtist(artist as string);
      } else if (style) {
        items = await storage.getGalleryItemsByStyle(style as string);
      } else {
        items = await storage.getGalleryItems();
      }
      
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });

  // Booking routes
  app.post("/api/bookings", async (req, res) => {
    try {
      const validatedData = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data", error });
    }
  });

  // Contact routes
  app.post("/api/contacts", async (req, res) => {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validatedData);
      res.status(201).json(contact);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data", error });
    }
  });

  // Instagram feed (optional; requires env vars)
  app.get("/api/instagram", async (req, res) => {
    try {
      const handle = ((req.query.handle as string) || "berserk_tattoos").trim();
      const key = handle.toUpperCase().replace(/[^A-Z0-9]+/g, "_");
      const userId = process.env[`INSTAGRAM_${key}_USER_ID`] || process.env.INSTAGRAM_USER_ID;
      const accessToken = process.env[`INSTAGRAM_${key}_ACCESS_TOKEN`] || process.env.INSTAGRAM_ACCESS_TOKEN;
      const limit = parseInt((req.query.limit as string) || process.env.INSTAGRAM_LIMIT || "8", 10);

      if (!userId || !accessToken) {
        return res.json([]);
      }

      const cacheKey = `${handle}:${limit}`;
      const cached = igCache.get(cacheKey);
      const now = Date.now();
      if (cached && now - cached.ts < IG_TTL_MS) {
        return res.json(cached.data);
      }

      const params = new URLSearchParams({
        fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
        access_token: accessToken,
        limit: String(limit),
      });

      const url = `https://graph.instagram.com/${userId}/media?${params.toString()}`;
      const igRes = await fetch(url);
      if (!igRes.ok) {
        const text = await igRes.text();
        return res.status(502).json({ message: "Failed to fetch Instagram feed", detail: text });
      }

      const data = await igRes.json();
      const items = (data.data || []).map((m: any) => {
        const mediaUrl = m.media_type === 'VIDEO'
          ? (m.thumbnail_url || m.media_url || '')
          : (m.media_url || m.thumbnail_url || '');
        return {
          id: m.id,
          caption: m.caption || "",
          mediaType: m.media_type,
          mediaUrl,
          permalink: m.permalink,
          timestamp: m.timestamp,
        };
      });
      igCache.set(cacheKey, { ts: now, data: items });
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Instagram feed error" });
    }
  });

  // Admin: Ingest Instagram posts into gallery for an artist (ephemeral; memory only)
  app.post("/api/admin/ingest-instagram", async (req, res) => {
    try {
      const adminSecret = process.env.ADMIN_SECRET;
      const auth = req.headers.authorization || "";
      if (!adminSecret || auth !== `Bearer ${adminSecret}`) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const { handle, limit = 12, artistId } = req.body || {};
      if (!handle) return res.status(400).json({ message: "Missing handle" });

      // Pull tokens (per-handle or fallback)
      const key = String(handle).toUpperCase().replace(/[^A-Z0-9]+/g, "_");
      const userId = process.env[`INSTAGRAM_${key}_USER_ID`] || process.env.INSTAGRAM_USER_ID;
      const accessToken = process.env[`INSTAGRAM_${key}_ACCESS_TOKEN`] || process.env.INSTAGRAM_ACCESS_TOKEN;
      if (!userId || !accessToken) return res.status(400).json({ message: "Instagram tokens not configured" });

      // Resolve artist id
      let resolvedArtistId: string | undefined = artistId;
      if (!resolvedArtistId) {
        // Known mapping for convenience
        const HANDLE_TO_NAME: Record<string, string> = {
          "AMZKELSO": "Amelia Kelso",
          "BEN_WHITERAVEN": "Ben White Raven",
          "MONIQUEMOORE666": "Monique Moore",
        };
        const name = HANDLE_TO_NAME[key];
        if (name) {
          const artists = await storage.getArtists();
          resolvedArtistId = artists.find((a) => a.name === name)?.id;
        }
      }
      if (!resolvedArtistId) return res.status(400).json({ message: "Unable to resolve artistId" });

      const params = new URLSearchParams({
        fields: "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp",
        access_token: accessToken,
        limit: String(limit),
      });
      const url = `https://graph.instagram.com/${userId}/media?${params.toString()}`;
      const igRes = await fetch(url);
      if (!igRes.ok) {
        const text = await igRes.text();
        return res.status(502).json({ message: "Failed to fetch Instagram feed", detail: text });
      }
      const data = await igRes.json();
      const posts = (data.data || []) as any[];

      let created = 0;
      for (const m of posts) {
        const mediaUrl = m.media_type === 'VIDEO' ? (m.thumbnail_url || m.media_url) : (m.media_url || m.thumbnail_url);
        if (!mediaUrl) continue;
        const title = (m.caption || "Instagram Post").slice(0, 60);
        const description = m.caption ? String(m.caption).slice(0, 300) : null;
        await storage.createGalleryItem({
          title,
          style: "Instagram",
          artistId: resolvedArtistId,
          imageUrl: mediaUrl,
          description,
        });
        created++;
      }

      res.json({ created });
    } catch (error) {
      res.status(500).json({ message: "Ingest error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
