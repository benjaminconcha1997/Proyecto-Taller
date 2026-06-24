import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inventario" });
  }
});

export default router;