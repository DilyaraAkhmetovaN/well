import { useState } from 'react'
import api from '../api/client'
import { useAuth } from '../context/AuthContext'

export default function ResetPasswordPage() {
  const { user } = useAuth()
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const submit = async e => {
    e.preventDefault()
    try {
      await api.post('/auth/reset-password', { email: user.email, newPassword })
      setMessage('Пароль обновлён')
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка')
      setMessage('')
    }
  }

  return (
    <div className="card">
      <h2>Сброс пароля</h2>
      <form onSubmit={submit}>
        <input type="password" placeholder="Новый пароль" minLength="6" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
        <button type="submit">Обновить</button>
      </form>
      {message && <p className="ok">{message}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}
