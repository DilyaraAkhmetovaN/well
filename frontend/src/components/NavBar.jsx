import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const { user, logout } = useAuth()
  return (
    <header className="nav">
      <h1>Wellness</h1>
      <nav>
        {user && <Link to="/dashboard">Dashboard</Link>}
        {user && <Link to="/reset-password">Reset Password</Link>}
        {!user && <Link to="/login">Login</Link>}
        {!user && <Link to="/register">Register</Link>}
        {user && <button onClick={logout}>Logout</button>}
      </nav>
    </header>
  )
}
