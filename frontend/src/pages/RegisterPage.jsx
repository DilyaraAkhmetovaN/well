import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', fullName: '' })
  const [error, setError] = useState('')

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      await register(form)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Register failed')
    }
  }

  return (
    <div className="card">
      <h2>Регистрация</h2>
      <form onSubmit={submit}>
        <input placeholder="Имя" onChange={e => setForm({ ...form, fullName: e.target.value })} required />
        <input placeholder="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Пароль" type="password" minLength="6" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Создать аккаунт</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
