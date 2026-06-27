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

// Lista de orígenes autorizados a consumir la API.
// Se incluye FRONTEND_URL (si está definida) más los dominios propios.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  "https://trioceramica.cl",
  "https://www.trioceramica.cl",
].filter(Boolean);

// En desarrollo local (sin FRONTEND_URL ni dominios), se permite cualquier origen.
const corsOptions =
  allowedOrigins.length > 0
    ? {
        origin: (origin, callback) => {
          // Permite peticiones sin origin (Postman, curl) y los orígenes de la lista.
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Origen no permitido por CORS: " + origin));
          }
        },
      }
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