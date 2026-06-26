import "dotenv/config";
import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";
import workshopsRouter from "./routes/workshops.js";
import productsRouter from "./routes/products.js";
import inventoryRouter from "./routes/inventory.js";
import invoicesRouter from "./routes/invoices.js";
import expensesRouter from "./routes/expenses.js";

const app = express();
const PORT = process.env.PORT || 3000;

// En producción, FRONTEND_URL limita quién puede consumir la API.
// Si no está definida (desarrollo local), se permite cualquier origen.
const corsOptions = process.env.FRONTEND_URL
  ? { origin: process.env.FRONTEND_URL }
  : {};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API Taller de la Puerta Roja funcionando" });
});

app.use("/api/auth", authRouter);
app.use("/api/workshops", workshopsRouter);
app.use("/api/products", productsRouter);
app.use("/api/inventory", inventoryRouter);
app.use("/api/invoices", invoicesRouter);
app.use("/api/expenses", expensesRouter);

// 0.0.0.0 es necesario para que Railway exponga el servicio.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});