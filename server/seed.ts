import { db } from "./db";
import { creators, tiers, posts } from "@shared/schema";
import { log } from "./index";

export async function seedDatabase() {
  const existingCreators = await db.select().from(creators);
  if (existingCreators.length > 0) {
    log("Database already seeded, skipping", "seed");
    return;
  }

  log("Seeding database...", "seed");

  const creatorData = [
    {
      name: "Luna Artistry",
      slug: "luna-artistry",
      tagline: "Digital illustrator creating vibrant fantasy worlds and character designs",
      description: "Hey there! I'm Luna, a freelance digital artist specializing in fantasy illustration and character design. I've been creating art professionally for over 8 years, working with game studios, publishers, and indie creators.\n\nThrough Patreon, I share my creative process, tutorials, and exclusive artwork with my amazing community. Every month, patrons get access to high-resolution art files, time-lapse videos, brushes, and behind-the-scenes content.\n\nYour support helps me continue creating the art I love while building educational resources for aspiring artists. Thank you for being part of this journey!",
      category: "Art & Illustration",
      avatarUrl: "/images/creator-1.png",
      coverUrl: "/images/cover-1.png",
      patronCount: 2847,
      postCount: 156,
      isVerified: true,
      socialLinks: { twitter: "https://twitter.com", instagram: "https://instagram.com", website: "https://example.com" },
    },
    {
      name: "Echo Sound Studio",
      slug: "echo-sound-studio",
      tagline: "Independent musician crafting ambient and electronic soundscapes",
      description: "Welcome to Echo Sound Studio! I'm a producer and multi-instrumentalist creating ambient, electronic, and experimental music from my home studio.\n\nOn Patreon, I share exclusive tracks, sample packs, production tutorials, and live studio sessions. Members get early access to all releases and can vote on upcoming projects.\n\nMusic has always been my passion, and your support allows me to keep creating without compromise. Every patron is a vital part of this creative ecosystem.",
      category: "Music",
      avatarUrl: "/images/creator-2.png",
      coverUrl: "/images/cover-2.png",
      patronCount: 1523,
      postCount: 89,
      isVerified: true,
      socialLinks: { twitter: "https://twitter.com", youtube: "https://youtube.com" },
    },
    {
      name: "The Daily Curious",
      slug: "the-daily-curious",
      tagline: "Weekly podcast exploring fascinating stories from science, history, and culture",
      description: "The Daily Curious is a weekly podcast that dives deep into the most fascinating stories from science, history, technology, and culture. Each episode features in-depth research, expert interviews, and engaging storytelling.\n\nAs a patron, you get ad-free episodes, bonus content, early access, and the ability to suggest topics. Higher tiers include access to our private community and monthly Q&A sessions.\n\nWe've been podcasting for 4 years and have published over 200 episodes. Your support helps us invest in better equipment, research, and guest speakers.",
      category: "Podcasts",
      avatarUrl: "/images/creator-3.png",
      coverUrl: "/images/cover-3.png",
      patronCount: 4192,
      postCount: 234,
      isVerified: true,
      socialLinks: { twitter: "https://twitter.com", youtube: "https://youtube.com", instagram: "https://instagram.com" },
    },
    {
      name: "PixelForge Games",
      slug: "pixelforge-games",
      tagline: "Indie game developer building retro-inspired pixel art adventures",
      description: "PixelForge Games is a solo indie game studio creating retro-inspired pixel art games with modern gameplay mechanics. Currently working on 'Starlight Wanderer', an open-world exploration RPG.\n\nPatrons get exclusive development updates, playable demos, concept art, and the opportunity to influence game design decisions. Higher tier members receive their names in the game credits and access to private playtesting.\n\nGame development is a long road, and your support keeps me going through the ups and downs. Together we're building something special.",
      category: "Gaming",
      avatarUrl: "/images/creator-4.png",
      coverUrl: "/images/cover-1.png",
      patronCount: 892,
      postCount: 67,
      isVerified: true,
      socialLinks: { twitter: "https://twitter.com", youtube: "https://youtube.com", website: "https://example.com" },
    },
    {
      name: "Wordcraft Weekly",
      slug: "wordcraft-weekly",
      tagline: "Fiction writer and writing coach sharing stories, craft essays, and workshops",
      description: "Hello! I'm a published fiction writer and writing coach with two novels and dozens of short stories under my belt. Wordcraft Weekly is my creative home where I share original fiction, craft essays, writing prompts, and workshops.\n\nEvery week, patrons receive new stories, in-depth craft analysis of great literature, and practical writing advice. Higher tiers include manuscript feedback, live workshops, and one-on-one coaching sessions.\n\nWriting is a solitary craft, but this community makes it feel collaborative and joyful. Thank you for supporting independent literature!",
      category: "Writing",
      avatarUrl: "/images/creator-5.png",
      coverUrl: "/images/cover-2.png",
      patronCount: 1205,
      postCount: 178,
      isVerified: true,
      socialLinks: { twitter: "https://twitter.com", website: "https://example.com" },
    },
    {
      name: "Creative Spark Academy",
      slug: "creative-spark-academy",
      tagline: "Art education platform with tutorials, courses, and creative challenges",
      description: "Creative Spark Academy is an online art education platform offering tutorials, courses, and creative challenges for artists of all levels. From beginner fundamentals to advanced techniques, we cover digital art, traditional media, and creative theory.\n\nPatrons get access to our full library of video tutorials, monthly art challenges with feedback, downloadable resources, and a supportive learning community.\n\nOur mission is to make high-quality art education accessible and fun. Your support helps us create more content and reach more aspiring artists.",
      category: "Education",
      avatarUrl: "/images/creator-6.png",
      coverUrl: "/images/cover-3.png",
      patronCount: 3456,
      postCount: 312,
      isVerified: false,
      socialLinks: { youtube: "https://youtube.com", instagram: "https://instagram.com" },
    },
  ];

  const insertedCreators = await db.insert(creators).values(creatorData).returning();

  const tierData = insertedCreators.flatMap((creator) => [
    {
      creatorId: creator.id,
      name: "Supporter",
      price: 3,
      description: "Show your support and get access to patron-only updates and community.",
      benefits: ["Patron-only updates", "Community access", "Early announcements", "Name on supporters list"],
      isPopular: false,
    },
    {
      creatorId: creator.id,
      name: "Premium",
      price: 10,
      description: "Get full access to exclusive content and behind-the-scenes material.",
      benefits: ["Everything in Supporter", "Exclusive content library", "Behind-the-scenes access", "Monthly Q&A sessions", "Downloadable resources"],
      isPopular: true,
    },
    {
      creatorId: creator.id,
      name: "VIP",
      price: 25,
      description: "The ultimate experience with personalized perks and direct creator access.",
      benefits: ["Everything in Premium", "Direct creator access", "Personalized shout-outs", "Vote on upcoming content", "Exclusive merchandise discounts", "Credits in projects"],
      isPopular: false,
    },
  ]);

  await db.insert(tiers).values(tierData);

  const postData = insertedCreators.flatMap((creator) => [
    {
      creatorId: creator.id,
      title: `Welcome to ${creator.name}!`,
      content: `Thank you so much for joining us here on Patreon! This is the beginning of something truly special. I've been working hard to bring you exclusive content, behind-the-scenes looks, and much more. Whether you're a new patron or have been following my work for a while, I'm grateful for your support. Stay tuned for exciting updates, and don't hesitate to reach out with your thoughts and suggestions. Let's build this community together!`,
      isPublic: true,
      likeCount: Math.floor(Math.random() * 150) + 50,
      commentCount: Math.floor(Math.random() * 30) + 5,
    },
    {
      creatorId: creator.id,
      title: "Behind the scenes: My creative process",
      content: `Ever wondered how I approach my work? In this exclusive post, I'm pulling back the curtain on my creative process. From initial inspiration to final polish, every step is a journey of discovery. I'll share the tools I use, the challenges I face, and the moments of breakthrough that make it all worthwhile. This is the kind of content I'm most excited to share with my patrons.`,
      isPublic: false,
      minTierPrice: 3,
      likeCount: Math.floor(Math.random() * 80) + 20,
      commentCount: Math.floor(Math.random() * 20) + 3,
    },
    {
      creatorId: creator.id,
      title: "Monthly update: What's coming next",
      content: `It's time for the monthly roundup! This past month has been incredible - I've been working on some exciting new projects that I can't wait to share with you. Here's a quick preview of what's coming: new content series, collaboration announcements, community events, and some surprises that I think you'll really love. Your support makes all of this possible, and I'm so grateful for each and every one of you.`,
      isPublic: true,
      likeCount: Math.floor(Math.random() * 100) + 30,
      commentCount: Math.floor(Math.random() * 25) + 8,
    },
    {
      creatorId: creator.id,
      title: "Exclusive workshop recording",
      content: `This month's exclusive workshop is now available! We covered advanced techniques, answered your questions, and had an amazing time together. The full recording is available for Premium and VIP members. Topics covered include workflow optimization, creative inspiration techniques, and practical tips you can apply immediately to your own work.`,
      isPublic: false,
      minTierPrice: 10,
      likeCount: Math.floor(Math.random() * 60) + 15,
      commentCount: Math.floor(Math.random() * 15) + 2,
    },
  ]);

  await db.insert(posts).values(postData);

  log("Database seeded successfully!", "seed");
}
