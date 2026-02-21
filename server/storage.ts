import { eq } from "drizzle-orm";
import { db } from "./db";
import {
  users, creators, tiers, posts,
  type User, type InsertUser,
  type Creator, type InsertCreator,
  type Tier, type InsertTier,
  type Post, type InsertPost,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllCreators(): Promise<Creator[]>;
  getFeaturedCreators(): Promise<Creator[]>;
  getCreatorBySlug(slug: string): Promise<Creator | undefined>;
  createCreator(creator: InsertCreator): Promise<Creator>;
  getTiersByCreatorId(creatorId: string): Promise<Tier[]>;
  createTier(tier: InsertTier): Promise<Tier>;
  getPostsByCreatorId(creatorId: string): Promise<Post[]>;
  createPost(post: InsertPost): Promise<Post>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getAllCreators(): Promise<Creator[]> {
    return db.select().from(creators);
  }

  async getFeaturedCreators(): Promise<Creator[]> {
    return db.select().from(creators).where(eq(creators.isVerified, true));
  }

  async getCreatorBySlug(slug: string): Promise<Creator | undefined> {
    const [creator] = await db.select().from(creators).where(eq(creators.slug, slug));
    return creator;
  }

  async createCreator(creator: InsertCreator): Promise<Creator> {
    const [result] = await db.insert(creators).values(creator).returning();
    return result;
  }

  async getTiersByCreatorId(creatorId: string): Promise<Tier[]> {
    return db.select().from(tiers).where(eq(tiers.creatorId, creatorId));
  }

  async createTier(tier: InsertTier): Promise<Tier> {
    const [result] = await db.insert(tiers).values(tier).returning();
    return result;
  }

  async getPostsByCreatorId(creatorId: string): Promise<Post[]> {
    return db.select().from(posts).where(eq(posts.creatorId, creatorId));
  }

  async createPost(post: InsertPost): Promise<Post> {
    const [result] = await db.insert(posts).values(post).returning();
    return result;
  }
}

export const storage = new DatabaseStorage();
