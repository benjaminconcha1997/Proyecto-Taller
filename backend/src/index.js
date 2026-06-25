import "dotenv/config"; // carga las variables de .env (debe ir primero)
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

app.use(cors());
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

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});