import { useState } from 'react'
import propTypes from 'prop-types'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e, setFn) => {
    setFn(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (login(username, password) === true) {
      setUsername('')
      setPassword('')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={(e) => handleChange(e, setUsername)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={(e) => handleChange(e, setPassword)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm

LoginForm.propTypes = {
  login: propTypes.func.isRequired,
}
