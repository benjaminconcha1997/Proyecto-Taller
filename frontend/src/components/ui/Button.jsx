import { Link } from "react-router-dom";

// variant: "primary" (terracota) | "secondary" (clay/marrón) | "light" (blanco)
function Button({ children, variant = "primary", to, onClick, type = "button", className = "" }) {
  const base =
    "inline-block px-7 py-3 rounded-xl font-medium transition-colors text-center";

  const variants = {
    primary: "bg-terracotta text-white hover:bg-terracotta-dark",
    secondary: "bg-clay text-white hover:bg-clay-dark",
    light: "bg-white text-ink hover:bg-cream",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export default Button;