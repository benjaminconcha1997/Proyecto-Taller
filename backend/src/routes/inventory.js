import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET /api/inventory - listar todos
router.get("/", async (req, res) => {
  try {
    const items = await prisma.inventoryItem.findMany();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener inventario" });
  }
});

// POST /api/inventory - crear item
router.post("/", async (req, res) => {
  try {
    const { name, category, quantity, unit, minStock, unitPrice } = req.body;
    const item = await prisma.inventoryItem.create({
      data: {
        name,
        category,
        quantity: Number(quantity),
        unit,
        minStock: Number(minStock),
        unitPrice: Number(unitPrice),
      },
    });
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: "Error al crear item" });
  }
});

// PUT /api/inventory/:id - editar item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, quantity, unit, minStock, unitPrice } = req.body;
    const item = await prisma.inventoryItem.update({
      where: { id: Number(id) },
      data: {
        name,
        category,
        quantity: Number(quantity),
        unit,
        minStock: Number(minStock),
        unitPrice: Number(unitPrice),
      },
    });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar item" });
  }
});

// DELETE /api/inventory/:id - eliminar item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.inventoryItem.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar item" });
  }
});

export default router;