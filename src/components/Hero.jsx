function Hero() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-600 via-rose-600 to-fuchsia-600 text-white p-10 shadow-xl">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_30%,white,transparent_30%),radial-gradient(circle_at_40%_80%,white,transparent_30%)]" />
      <div className="relative">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">Choose Reusable. Period.</h1>
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-6">
          Explore menstrual cups, period underwear, and reusable pads. Save money, reduce waste, and feel comfortable every cycle.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="/catalog" className="px-5 py-3 rounded-lg bg-white text-pink-700 font-semibold hover:opacity-90">Browse Catalog</a>
          <a href="/articles" className="px-5 py-3 rounded-lg bg-white/20 backdrop-blur border border-white/40 text-white font-semibold hover:bg-white/30">Learn the Basics</a>
        </div>
      </div>
    </section>
  )
}

export default Hero