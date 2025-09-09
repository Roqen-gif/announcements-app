import { Request, Response } from "express";
import * as service from "../services/categories.service";

export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllCategories();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

export const getOne = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const data = await service.getCategoryById(id);
    if (!data) return res.status(404).json({ message: "Not Found" });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching category" });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const newCategory = await service.createCategory({ name });
    res.status(201).json(newCategory);
  } catch (error: any) {
    console.error(error);
    if (error.message.includes("required")) {
      return res.status(400).json({ message: error.message });
    }
    if (error.code === "P2002") { // Prisma: unique constraint failed
      return res.status(400).json({ message: "Category name already exists" });
    }
    res.status(500).json({ message: "Error creating category" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;
    const updated = await service.updateCategory(id, name);
    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating category" });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    await service.deleteCategory(id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting category" });
  }
};
