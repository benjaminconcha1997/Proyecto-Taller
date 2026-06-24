import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/workshops
router.get("/", async (req, res) => {
  try {
    const workshops = await prisma.workshop.findMany();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener talleres" });
  }
});

export default router;