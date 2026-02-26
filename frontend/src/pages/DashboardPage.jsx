import { useEffect, useState } from 'react'
import api from '../api/client'

const initialForm = { moodScore: 5, note: '', entryDate: new Date().toISOString().split('T')[0] }

export default function DashboardPage() {
  const [items, setItems] = useState([])
  const [q, setQ] = useState('')
  const [sortBy, setSortBy] = useState('entryDate')
  const [direction, setDirection] = useState('DESC')
  const [form, setForm] = useState(initialForm)
  const [editId, setEditId] = useState(null)
  const [message, setMessage] = useState('')

  const load = async () => {
    const { data } = await api.get('/moods', { params: { q, sortBy, direction, size: 20 } })
    setItems(data.content)
  }

  useEffect(() => { load() }, [q, sortBy, direction])

  const submit = async e => {
    e.preventDefault()
    if (editId) {
      await api.put(`/moods/${editId}`, form)
      setMessage('Запись обновлена')
    } else {
      await api.post('/moods', form)
      setMessage('Запись добавлена')
    }
    setEditId(null)
    setForm(initialForm)
    load()
  }

  const remove = async id => {
    await api.delete(`/moods/${id}`)
    setMessage('Запись удалена')
    load()
  }

  const startEdit = row => {
    setEditId(row.id)
    setForm({ moodScore: row.moodScore, note: row.note || '', entryDate: row.entryDate })
  }

  return (
    <div className="layout">
      <section className="card">
        <h2>{editId ? 'Редактировать запись' : 'Добавить запись настроения'}</h2>
        <form onSubmit={submit}>
          <label>Оценка (1-10)</label>
          <input type="number" min="1" max="10" value={form.moodScore} onChange={e => setForm({ ...form, moodScore: Number(e.target.value) })} required />
          <label>Дата</label>
          <input type="date" value={form.entryDate} onChange={e => setForm({ ...form, entryDate: e.target.value })} required />
          <label>Комментарий</label>
          <textarea value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} />
          <button type="submit">{editId ? 'Сохранить' : 'Добавить'}</button>
        </form>
        {message && <p className="ok">{message}</p>}
      </section>
      <section className="card">
        <h2>История</h2>
        <div className="toolbar">
          <input placeholder="Поиск по заметке" value={q} onChange={e => setQ(e.target.value)} />
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="entryDate">Дата</option>
            <option value="moodScore">Оценка</option>
          </select>
          <select value={direction} onChange={e => setDirection(e.target.value)}>
            <option value="DESC">DESC</option>
            <option value="ASC">ASC</option>
          </select>
        </div>
        <table>
          <thead><tr><th>Дата</th><th>Оценка</th><th>Комментарий</th><th></th></tr></thead>
          <tbody>
            {items.map(row => (
              <tr key={row.id}>
                <td>{row.entryDate}</td>
                <td>{row.moodScore}</td>
                <td>{row.note}</td>
                <td className="actions">
                  <button onClick={() => startEdit(row)}>Edit</button>
                  <button onClick={() => remove(row.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
