import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { user, dispatch } = useAuthContext()

  const register = async (email, name, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/registration', {
      method: 'POST',
      headers: { Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json'},
      body: JSON.stringify({ email, name, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      setIsLoading(false)
    }
  }

  return { register, isLoading, error }
}