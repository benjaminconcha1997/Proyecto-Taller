import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener gastos" });
  }
});

export default router;