import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const submit = async e => {
    e.preventDefault()
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="card">
      <h2>Вход</h2>
      <form onSubmit={submit}>
        <input placeholder="Email" type="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input placeholder="Пароль" type="password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Войти</button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Нет аккаунта? <Link to="/register">Регистрация</Link></p>
    </div>
  )
}
