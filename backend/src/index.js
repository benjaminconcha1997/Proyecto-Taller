import express from "express";
import cors from "cors";

import workshopsRouter from "./routes/workshops.js";
import productsRouter from "./routes/products.js";
import inventoryRouter from "./routes/inventory.js";
import invoicesRouter from "./routes/invoices.js";
import expensesRouter from "./routes/expenses.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // permite que el frontend (otro puerto) consuma la API
app.use(express.json()); // parsea body JSON en POST/PUT

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "API Taller de la Puerta Roja funcionando" });
});

// Rutas de la API
app.use("/api/workshops", workshopsRouter);
app.use("/api/products", productsRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/expenses", expensesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});