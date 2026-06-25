import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/products - público
router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

// POST /api/products - solo admin
router.post("/", requireAuth, async (req, res) => {
  try {
    const { name, description, price, stock, category, image, featured, status } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        image,
        featured: Boolean(featured),
        status,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al crear producto" });
  }
});

// PUT /api/products/:id - solo admin
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category, image, featured, status } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        category,
        image,
        featured: Boolean(featured),
        status,
      },
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar producto" });
  }
});

// DELETE /api/products/:id - solo admin
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar producto" });
  }
});

export default router;