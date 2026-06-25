import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/workshops - público
router.get("/", async (req, res) => {
  try {
    const workshops = await prisma.workshop.findMany();
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener talleres" });
  }
});

// POST /api/workshops - solo admin
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, description, teacher, day, schedule, availableSlots, price, image, status } = req.body;
    const workshop = await prisma.workshop.create({
      data: {
        title,
        description,
        teacher,
        day,
        schedule,
        availableSlots: Number(availableSlots),
        price: Number(price),
        image,
        status,
      },
    });
    res.status(201).json(workshop);
  } catch (error) {
    res.status(500).json({ error: "Error al crear taller" });
  }
});

// PUT /api/workshops/:id - solo admin
router.put("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, teacher, day, schedule, availableSlots, price, image, status } = req.body;
    const workshop = await prisma.workshop.update({
      where: { id: Number(id) },
      data: {
        title,
        description,
        teacher,
        day,
        schedule,
        availableSlots: Number(availableSlots),
        price: Number(price),
        image,
        status,
      },
    });
    res.json(workshop);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar taller" });
  }
});

// DELETE /api/workshops/:id - solo admin
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.workshop.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar taller" });
  }
});

export default router;