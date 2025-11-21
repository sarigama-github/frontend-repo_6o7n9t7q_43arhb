import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Articles from './components/Articles'
import ImpactTracker from './components/ImpactTracker'

function Home() {
  return (
    <div className="space-y-10">
      <Hero />
      <section>
        <h2 className="text-xl font-semibold text-pink-900 mb-3">Popular Products</h2>
        <ProductGrid />
      </section>
      <section>
        <h2 className="text-xl font-semibold text-pink-900 mb-3">Learn the Basics</h2>
        <Articles />
      </section>
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalog" element={<ProductGrid />} />
        <Route path="articles" element={<Articles />} />
        <Route path="impact" element={<ImpactTracker />} />
      </Route>
    </Routes>
  )
}

export default App
