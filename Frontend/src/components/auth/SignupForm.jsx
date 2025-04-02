import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

const SignupForm = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signup(username, email, password)
    if (!result.success) alert(result.message)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label>Username (min 10 chars):</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength={10}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label>Password (min 6 chars):</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
        Sign Up
      </button>
    </form>
  )
}

export default SignupForm