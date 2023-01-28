import "./index.scss"
import { BsChevronRight, BsFillEyeFill } from "react-icons/bs"
import { useState } from "react"
import { useLogin } from "../../hooks/useLogin"
import Loading from "../../components/Atoms/Loading"
import Navbar from "../../components/Navbar"

const AdminPage = () => {
  const { loading, login } = useLogin()
  const [showPassword, setShowPassword] = useState(false)
  const [user, setUser] = useState({ email: "", password: "" })

  const { email, password } = user

  const changeHandler = e => {
    const { name, value } = e.target
    setUser(prev => ({ ...prev, [name]: value }))
  }
  const submitHandler = e => {
    e.preventDefault()
    const { email, password } = user
    login(email, password)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <main className="form-container">
        <form className="form-input">
          <div className="input-group">
            <input
              type="email"
              name="email"
              className="input"
              value={email}
              onChange={e => changeHandler(e)}
              placeholder="email"
            />
          </div>
          <div className="input-group">
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={e => changeHandler(e)}
              placeholder="password"
            />
            <BsFillEyeFill
              className="show-pwd"
              size={20}
              onClick={() => setShowPassword(prev => !prev)}
            />
          </div>
          <button className="form-btn" onClick={submitHandler}>
            Sign Up
            <BsChevronRight size={20} />
          </button>
        </form>
      </main>
    </>
  )
}

export default AdminPage
