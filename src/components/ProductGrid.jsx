import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ProductCard({ p }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden hover:shadow-md transition-shadow">
      {p.image ? (
        <img src={p.image} alt={p.name} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-pink-50 grid place-items-center text-pink-400">No image</div>
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-pink-900">{p.name}</h3>
          <span className="text-pink-700 font-bold">${p.price?.toFixed?.(2) ?? p.price}</span>
        </div>
        <p className="text-sm text-pink-900/70 line-clamp-2 min-h-[2.5rem]">{p.description}</p>
        {p.sizes?.length > 0 && (
          <p className="mt-2 text-xs text-pink-900/60">Sizes: {p.sizes.join(', ')}</p>
        )}
      </div>
    </div>
  )
}

function ProductGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/products`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-pink-900/70">Loading catalog...</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </div>
  )
}

export default ProductGrid
