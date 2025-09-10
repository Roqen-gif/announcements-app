import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -------------------- TYPES --------------------
interface CreateAnnouncementData {
  title: string;
  content?: string;
  publishedDate?: string;
  categories?: number[];
}

interface UpdateAnnouncementData {
  title?: string;
  content?: string;
  publishedDate?: string;
  categories?: number[];
}

// -------------------- HELPERS --------------------

// Generate clean slug
const generateSlug = (title: string) => {
  return title
    .trim()                     // remove spaces at start/end
    .replace(/\s+/g, "-")       // spaces → hyphens
    .replace(/[^\w\-]+/g, "")   // remove special characters
    .toLowerCase();
};

// -------------------- SERVICES --------------------

// Get all announcements with categories
export const getAllAnnouncements = async () => {
  return prisma.announcement.findMany({
    include: { categories: true },
  });
};

// Get announcement by ID
export const getAnnouncementById = async (id: number) => {
  return prisma.announcement.findUnique({
    where: { id },
    include: { categories: true },
  });
};

// Create new announcement
export const createAnnouncement = async ({
  title,
  content = "",
  publishedDate,
  categories = [],
}: CreateAnnouncementData) => {
  if (!title) {
    throw new Error("Title is required to create an announcement");
  }

  if (!categories || categories.length === 0) {
    throw new Error("At least one category is required to create an announcement");
  }

  const linkSlug = generateSlug(title);
  
  // Set publication date
  const publicationDate = publishedDate ? new Date(publishedDate) : new Date();

  const categoryConnections = Array.isArray(categories)
    ? categories.map((catId) => ({ id: catId }))
    : [];

  return prisma.announcement.create({
    data: {
      title,
      content,
      publicationDate,
      lastUpdate: new Date(),
      linkSlug,
      categories: {
        connect: categoryConnections,
      },
    },
    include: { categories: true }, // <-- load categories
  });
};

// Update announcement
export const updateAnnouncement = async (
  id: number,
  { title, content, publishedDate, categories }: UpdateAnnouncementData
) => {
  // Check if categories are provided and not empty array
  if (categories && categories.length === 0) {
    throw new Error("At least one category is required to update an announcement");
  }

  const data: any = {
    lastUpdate: new Date(),
  };

  if (title) {
    data.title = title;
    data.linkSlug = generateSlug(title);
  }
  if (content !== undefined) data.content = content;
  if (publishedDate) data.publicationDate = new Date(publishedDate);
  if (categories) {
    data.categories = {
      set: categories.length > 0 ? categories.map((catId) => ({ id: catId })) : [],
    };
  }

  return prisma.announcement.update({
    where: { id },
    data,
    include: { categories: true }, // <-- load categories
  });
};

// Delete announcement
export const deleteAnnouncement = async (id: number) => {
  return prisma.announcement.delete({
    where: { id },
  });
};
