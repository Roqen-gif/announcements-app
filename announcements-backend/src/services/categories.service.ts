import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// -------------------- TYPES --------------------
interface CreateCategoryData {
  name: string;
}

// -------------------- SERVICES --------------------

// Отримати всі категорії
export const getAllCategories = async () => {
  return prisma.category.findMany({
    include: { announcements: true }, // можна включити анонси
  });
};

// Отримати категорію за ID
export const getCategoryById = async (id: number) => {
  return prisma.category.findUnique({
    where: { id },
    include: { announcements: true },
  });
};

// Створити нову категорію
export const createCategory = async ({ name }: CreateCategoryData) => {
  if (!name) throw new Error("Category name is required");

  return prisma.category.create({
    data: { name },
  });
};

// Оновити категорію
export const updateCategory = async (id: number, name: string) => {
  if (!name) throw new Error("Category name is required");

  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

// Видалити категорію
export const deleteCategory = async (id: number) => {
  return prisma.category.delete({
    where: { id },
  });
};