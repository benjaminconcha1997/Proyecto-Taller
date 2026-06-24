function PageHero({ title, subtitle, image }) {
  return (
    <section className="relative bg-ink">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/70" />
        </>
      )}

      <div className="relative max-w-4xl mx-auto px-4 py-24 md:py-28 text-center flex flex-col items-center gap-6">
        <h1 className="text-4xl md:text-6xl font-medium text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

export default PageHero;