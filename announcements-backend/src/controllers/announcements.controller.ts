import { Request, Response } from "express";
import * as service from "../services/announcements.service";

// -------------------- GET ALL --------------------
export const getAll = async (req: Request, res: Response) => {
  try {
    const data = await service.getAllAnnouncements();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching announcements" });
  }
};

// -------------------- GET ONE --------------------
export const getOne = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const data = await service.getAnnouncementById(id);
    if (!data) return res.status(404).json({ message: "Not Found" });

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching announcement" });
  }
};

// -------------------- CREATE --------------------
export const create = async (req: Request, res: Response) => {
  try {
    console.log("req.body:", req.body); // лог для дебагу

    const { title, content, categories } = req.body;

    // Виклик сервісу з об’єктом
    const newAnnouncement = await service.createAnnouncement({
      title,
      content,
      categories,
    });

    res.status(201).json(newAnnouncement);
  } catch (error: any) {
    console.error(error);

    if (error.message.includes("Title is required")) {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Error creating announcement" });
  }
};

// -------------------- UPDATE --------------------
export const update = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const { title, content, publicationDate, categories } = req.body;

    const updated = await service.updateAnnouncement(id, {
      title,
      content,
      publicationDate,
      categories,
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating announcement" });
  }
};

export const updateCategories = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { categories } = req.body; // масив ID категорій

    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    const updatedAnnouncement = await service.updateAnnouncement(id, { categories });

    res.json(updatedAnnouncement);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating categories" });
  }
};


// -------------------- DELETE --------------------
export const remove = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) return res.status(400).json({ message: "Invalid ID" });

    await service.deleteAnnouncement(id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting announcement" });
  }
};
