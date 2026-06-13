function SectionTitle({ title, subtitle, centered = false }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="text-2xl md:text-3xl font-bold text-clay-900">{title}</h2>
      {subtitle && <p className="mt-2 text-clay-600">{subtitle}</p>}
    </div>
  );
}

export default SectionTitle;