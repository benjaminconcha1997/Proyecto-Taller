function SectionTitle({ title, subtitle, centered = false }) {
  return (
    <div className={centered ? "text-center" : ""}>
      <h2 className="text-3xl md:text-4xl font-medium text-ink">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-lg text-stone max-w-2xl mx-auto">{subtitle}</p>
      )}
    </div>
  );
}

export default SectionTitle;