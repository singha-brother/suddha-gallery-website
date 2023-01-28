import { auth } from "../firebase.config"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAdminContext } from "../context/AdminContext"
import { toast } from "react-toastify"

const useLogin = () => {
  const navigate = useNavigate()
  const { dispatch } = useAdminContext()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const login = (email, password) => {
    setLoading(true)
    setError(null)
    signInWithEmailAndPassword(auth, email, password)
      .then(res => {
        navigate("/admin")
        dispatch({ type: "LOGIN", payload: email })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
        toast.error(error)
      })
  }

  return { error, loading, login }
}

export { useLogin }
