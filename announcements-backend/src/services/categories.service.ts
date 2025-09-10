import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -------------------- TYPES --------------------
interface CreateCategoryData {
  name: string;
}

// -------------------- SERVICES --------------------

// Get all categories
export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: { announcements: true }, // can include announcements
  });
};

// Get category by ID
export const getCategoryById = async (id: number) => {
  return prisma.category.findUnique({
    where: { id },
    include: { announcements: true },
  });
};

// Create new category
export const createCategory = async ({ name }: CreateCategoryData) => {
  if (!name) throw new Error("Category name is required");

  return prisma.category.create({
    data: { name },
  });
};

// Update category
export const updateCategory = async (id: number, name: string) => {
  if (!name) throw new Error("Category name is required");

  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

// Delete category
export const deleteCategory = async (id: number) => {
  return prisma.category.delete({
    where: { id },
  });
};