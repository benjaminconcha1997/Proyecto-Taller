import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Inicio" },
  { to: "/talleres", label: "Talleres" },
  { to: "/productos", label: "Productos" },
  { to: "/contacto", label: "Contacto" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-terracotta font-medium"
      : "text-ink hover:text-terracotta transition-colors";

  return (
    <header className="bg-white border-b border-border/40 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-ink">
          Taller de la Puerta Roja
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
          <Link
            to="/admin"
            className="px-4 py-2 rounded-xl bg-terracotta text-white hover:bg-terracotta-dark transition-colors"
          >
            Admin
          </Link>
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
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="px-4 py-2 rounded-xl bg-terracotta text-white text-center hover:bg-terracotta-dark transition-colors"
          >
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}

export default Header;