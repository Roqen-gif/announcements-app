import { Request, Response } from "express";
import * as service from "../services/announcements.service";

export const getAll = async (req: Request, res: Response) => {
  const data = await service.getAllAnnouncements();
  res.json(data);
};

export const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = await service.getAnnouncementById(id);
  if (!data) return res.status(404).json({ message: "Not Found" });
  res.json(data);
};

export const create = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  const data = await service.createAnnouncement(title, content);
  res.status(201).json(data);
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { title, content, publicationDate, categories } = req.body;
  const data = await service.updateAnnouncement(id, title, content, publicationDate, categories);
  res.json(data);
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  await service.deleteAnnouncement(id);
  res.json({ message: "Deleted" });
};
