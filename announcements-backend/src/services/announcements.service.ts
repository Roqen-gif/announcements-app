import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllAnnouncements = async () => {
  return prisma.announcement.findMany();
};

export const getAnnouncementById = async (id: number) => {
  return prisma.announcement.findUnique({ where: { id } });
};

export const createAnnouncement = async (title: string, content: string) => {
  return prisma.announcement.create({
    data: {
      title,
      content,
      publicationDate: new Date(),
      lastUpdate: new Date(),
      linkSlug: title, // Можна використати slugify
    },
  });
};

export const updateAnnouncement = async (
  id: number,
  title: string,
  content: string,
  publicationDate: Date,
  categories: number[]
) => {
  return prisma.announcement.update({
    where: { id },
    data: {
      title,
      content,
      publicationDate,
      lastUpdate: new Date(),
      categories: {
        set: categories.map((catId) => ({ id: catId })),
      },
    },
  });
};

export const deleteAnnouncement = async (id: number) => {
  return prisma.announcement.delete({ where: { id } });
};