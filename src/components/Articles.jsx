import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function ArticleCard({ a }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-rose-100 overflow-hidden">
      {a.cover_image ? (
        <img src={a.cover_image} alt={a.title} className="w-full h-40 object-cover" />
      ) : (
        <div className="w-full h-40 bg-rose-50 grid place-items-center text-rose-400">No cover</div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-rose-900">{a.title}</h3>
        <p className="text-sm text-rose-900/70 line-clamp-2 min-h-[2.5rem]">{a.excerpt}</p>
        {Array.isArray(a.tags) && a.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {a.tags.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">{t}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

function Articles() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/articles`)
        const data = await res.json().catch(() => null)
        if (!res.ok || !Array.isArray(data)) {
          setError('Could not load articles.')
          setItems([])
        } else {
          setItems(data)
        }
      } catch (e) {
        console.error(e)
        setError('Could not load articles.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <div className="text-rose-900/70">Loading articles...</div>
  if (error) return <div className="text-rose-900/70">{error}</div>

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((a) => (
        <ArticleCard key={a.id || a._id || Math.random()} a={a} />
      ))}
      {items.length === 0 && !error && (
        <div className="text-rose-900/70">No articles yet.</div>
      )}
    </div>
  )
}

export default Articles
