import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/invoices - solo admin (datos internos del taller)
router.get("/", requireAuth, async (req, res) => {
  try {
    const invoices = await prisma.invoice.findMany();
    res.json(invoices);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener facturas" });
  }
});

// POST /api/invoices - solo admin
router.post("/", requireAuth, async (req, res) => {
  try {
    const { number, client, concept, date, amount, status } = req.body;
    const invoice = await prisma.invoice.create({
      data: {
        number,
        client,
        concept,
        date,
        amount: Number(amount),
        status,
      },
    });
    res.status(201).json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Error al crear factura" });
  }
});

// PUT /api/invoices/:id - solo admin
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { number, client, concept, date, amount, status } = req.body;
    const invoice = await prisma.invoice.update({
      where: { id: Number(id) },
      data: {
        number,
        client,
        concept,
        date,
        amount: Number(amount),
        status,
      },
    });
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar factura" });
  }
});

// DELETE /api/invoices/:id - solo admin
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.invoice.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar factura" });
  }
});

export default router;