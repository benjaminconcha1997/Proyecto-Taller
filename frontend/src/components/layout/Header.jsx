import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import LoginModal from "../auth/LoginModal.jsx";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/talleres", label: "Talleres" },
  { to: "/productos", label: "Productos" },
  { to: "/contacto", label: "Contacto" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-terracotta font-medium"
      : "text-ink hover:text-terracotta transition-colors";

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/");
  }

  return (
    <header className="bg-white border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-ink">
          Trio Ceramica
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}

          {isAdmin ? (
            <>
              {/* Panel Admin ahora es un link simple, como los demás */}
              <NavLink to="/admin" className={linkClass}>
                Panel Admin
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="text-ink hover:text-terracotta transition-colors"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            // Iniciar sesión ahora es el botón con fondo terracota
            <button
              type="button"
              onClick={() => setShowLogin(true)}
              className="px-4 py-2 rounded-xl bg-terracotta text-white hover:bg-terracotta-dark transition-colors"
            >
              Iniciar sesión
            </button>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden text-ink"
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden border-t border-border/40 px-4 py-3 flex flex-col gap-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          {isAdmin ? (
            <>
              <NavLink
                to="/admin"
                className={linkClass}
                onClick={() => setMenuOpen(false)}
              >
                Panel Admin
              </NavLink>
              <button
                type="button"
                onClick={handleLogout}
                className="text-ink hover:text-terracotta transition-colors text-left"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setShowLogin(true);
                setMenuOpen(false);
              }}
              className="px-4 py-2 rounded-xl bg-terracotta text-white text-center hover:bg-terracotta-dark transition-colors"
            >
              Iniciar sesión
            </button>
          )}
        </nav>
      )}

      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </header>
  );
}

export default Header;