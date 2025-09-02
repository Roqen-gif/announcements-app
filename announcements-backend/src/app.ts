import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import announcementsRoutes from "./routes/announcements.routes";
import { Request, Response, NextFunction } from "express";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/announcements", announcementsRoutes);

app.get('/', (req, res) => {
  res.send("API is running");
});

// Обробка помилок (опціонально)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ error: err.message });
});

export default app;