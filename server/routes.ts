import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/creators", async (_req, res) => {
    try {
      const creators = await storage.getAllCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creators" });
    }
  });

  app.get("/api/creators/featured", async (_req, res) => {
    try {
      const creators = await storage.getFeaturedCreators();
      res.json(creators);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured creators" });
    }
  });

  app.get("/api/creators/:slug", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      res.json(creator);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch creator" });
    }
  });

  app.get("/api/creators/:slug/tiers", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      const tiersList = await storage.getTiersByCreatorId(creator.id);
      res.json(tiersList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tiers" });
    }
  });

  app.get("/api/creators/:slug/posts", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      const postsList = await storage.getPostsByCreatorId(creator.id);
      res.json(postsList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch posts" });
    }
  });

  app.get("/api/creators/:slug/products", async (req, res) => {
    try {
      const creator = await storage.getCreatorBySlug(req.params.slug);
      if (!creator) {
        return res.status(404).json({ message: "Creator not found" });
      }
      const productsList = await storage.getProductsByCreatorId(creator.id);
      res.json(productsList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  return httpServer;
}
