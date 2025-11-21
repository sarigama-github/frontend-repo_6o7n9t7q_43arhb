import { Link, NavLink, Outlet } from 'react-router-dom'

function Layout() {
  const navLink = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-pink-600 text-white' : 'text-white/80 hover:text-white hover:bg-white/10'
    }`

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-pink-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-pink-700/80 border-b border-white/20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white text-pink-700 grid place-items-center font-black">R</div>
              <span className="text-white font-semibold">Reusables</span>
            </Link>
            <nav className="flex items-center gap-2">
              <NavLink to="/catalog" className={navLink}>Catalog</NavLink>
              <NavLink to="/articles" className={navLink}>Learn</NavLink>
              <NavLink to="/impact" className={navLink}>Impact</NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-10">
        <Outlet />
      </main>

      <footer className="border-t border-pink-200/60 py-6 bg-white/70">
        <div className="max-w-6xl mx-auto px-4 text-sm text-pink-900/70 flex flex-wrap items-center justify-between gap-2">
          <p>Reusable Menstrual Products • Better for you and the planet</p>
          <p>© {new Date().getFullYear()} Reusables</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout