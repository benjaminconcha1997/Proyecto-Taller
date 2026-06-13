function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-white rounded-xl border border-clay-200 shadow-sm overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;