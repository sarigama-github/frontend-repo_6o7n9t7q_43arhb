import { useEffect, useMemo, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Stat({ label, value, suffix }) {
  return (
    <div className="p-4 bg-white rounded-xl border border-fuchsia-100 text-fuchsia-900">
      <div className="text-sm opacity-70">{label}</div>
      <div className="text-2xl font-bold">{value}{suffix}</div>
    </div>
  )
}

function ImpactTracker() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/impact`)
        const data = await res.json()
        setEntries(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totals = useMemo(() => {
    const pads = entries.reduce((acc, e) => acc + (e.pads_diverted || 0), 0)
    const plastic = entries.reduce((acc, e) => acc + (e.plastic_avoided_grams || 0), 0)
    const money = entries.reduce((acc, e) => acc + (e.money_saved_usd || 0), 0)
    return { pads, plastic, money }
  }, [entries])

  if (loading) return <div className="text-fuchsia-900/70">Loading impact...</div>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Pads/Tampons Avoided" value={totals.pads} />
        <Stat label="Plastic Avoided" value={(totals.plastic/1000).toFixed(2)} suffix=" kg" />
        <Stat label="Money Saved" value={`$${totals.money.toFixed(2)}`} />
      </div>

      <div className="bg-white border border-fuchsia-100 rounded-xl p-4">
        <h3 className="font-semibold text-fuchsia-900 mb-3">Recent Entries</h3>
        <ul className="divide-y divide-fuchsia-100">
          {entries.slice().reverse().map((e) => (
            <li key={e.id} className="py-3 text-sm text-fuchsia-900/80">
              <div className="flex items-center justify-between">
                <span className="font-medium">{e.date}</span>
                <span>{e.products_used?.join(', ')}</span>
                <span>{e.pads_diverted || 0} pads</span>
                <span>${(e.money_saved_usd || 0).toFixed(2)}</span>
              </div>
            </li>
          ))}
          {entries.length === 0 && (
            <li className="py-6 text-center text-fuchsia-900/60">No entries yet. Add one from the form below.</li>
          )}
        </ul>
      </div>

      <EntryForm onAdded={(e) => setEntries((prev) => [...prev, e])} />
    </div>
  )
}

function EntryForm({ onAdded }) {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [productsUsed, setProductsUsed] = useState('cup')
  const [pads, setPads] = useState(0)
  const [plastic, setPlastic] = useState(0)
  const [money, setMoney] = useState(0)
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const payload = {
        date,
        products_used: productsUsed.split(',').map((s) => s.trim()).filter(Boolean),
        pads_diverted: Number(pads),
        plastic_avoided_grams: Number(plastic),
        money_saved_usd: Number(money),
      }
      const res = await fetch(`${baseUrl}/api/impact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      onAdded({ id: data.id, ...payload })
      setPads(0); setPlastic(0); setMoney(0)
    } catch (e) {
      console.error(e)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={submit} className="bg-white border border-fuchsia-100 rounded-xl p-4 space-y-4">
      <h3 className="font-semibold text-fuchsia-900">Add Impact Entry</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="text-sm text-fuchsia-900/80">
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm text-fuchsia-900/80">
          Products Used (comma separated)
          <input type="text" value={productsUsed} onChange={(e) => setProductsUsed(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm text-fuchsia-900/80">
          Pads/Tampons Diverted
          <input type="number" value={pads} onChange={(e) => setPads(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm text-fuchsia-900/80">
          Plastic Avoided (grams)
          <input type="number" value={plastic} onChange={(e) => setPlastic(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <label className="text-sm text-fuchsia-900/80">
          Money Saved (USD)
          <input type="number" value={money} onChange={(e) => setMoney(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
      </div>
      <button disabled={submitting} className="px-4 py-2 rounded-lg bg-fuchsia-600 text-white disabled:opacity-60">
        {submitting ? 'Saving...' : 'Save Entry'}
      </button>
    </form>
  )
}

export default ImpactTracker
