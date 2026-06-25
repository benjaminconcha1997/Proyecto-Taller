// Devuelve el header Authorization con el token guardado, si existe.
// Se usa en las peticiones que requieren sesión de admin.
export function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}