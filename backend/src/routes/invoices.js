import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas" });
  }
});

export default router;