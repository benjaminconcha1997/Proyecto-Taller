import jwt from "jsonwebtoken";

// Middleware que protege rutas: exige un token JWT válido en el header
// Authorization: "Bearer <token>". Si falta o es inválido, rechaza.
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: "No autorizado: falta el token" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // queda disponible para la ruta si lo necesita
    next();
  } catch (error) {
    return res.status(401).json({ error: "No autorizado: token inválido" });
  }
}