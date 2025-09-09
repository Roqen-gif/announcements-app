import express from "express";
import cors from "cors";
import announcementsRoutes from "./routes/announcements.routes";
import categoriesRoutes from "./routes/categories.routes";
import { Request, Response, NextFunction } from "express";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Root route
app.get('/', (req, res) => {
  res.json({ message: "Announcements API is running", status: "OK" });
});

// Routes
app.use("/announcements", announcementsRoutes);
app.use("/categories", categoriesRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Internal Server Error",
    message: process.env.NODE_ENV === 'development' ? err.message : "Something went wrong"
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;