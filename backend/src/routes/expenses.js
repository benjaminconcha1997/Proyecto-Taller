import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/expenses - solo admin (datos internos)
router.get("/", requireAuth, async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener gastos" });
  }
});

// POST /api/expenses - solo admin
router.post("/", requireAuth, async (req, res) => {
  try {
    const { concept, category, provider, date, amount } = req.body;
    const expense = await prisma.expense.create({
      data: { concept, category, provider, date, amount: Number(amount) },
    });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: "Error al crear gasto" });
  }
});

// PUT /api/expenses/:id - solo admin
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { concept, category, provider, date, amount } = req.body;
    const expense = await prisma.expense.update({
      where: { id: Number(id) },
      data: { concept, category, provider, date, amount: Number(amount) },
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar gasto" });
  }
});

// DELETE /api/expenses/:id - solo admin
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.expense.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar gasto" });
  }
});

export default router;