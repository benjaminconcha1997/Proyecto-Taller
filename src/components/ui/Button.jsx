import { Link } from "react-router-dom";

// variant: "primary" | "secondary"
// Si recibe `to`, renderiza un Link de React Router; si no, un <button>.
function Button({ children, variant = "primary", to, onClick, type = "button", className = "" }) {
  const base =
    "inline-block px-5 py-2.5 rounded-lg font-medium transition-colors text-center";

  const variants = {
    primary: "bg-brick-500 text-white hover:bg-brick-600",
    secondary: "bg-clay-100 text-clay-800 hover:bg-clay-200 border border-clay-300",
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