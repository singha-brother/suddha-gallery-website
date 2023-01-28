import { createContext, useContext, useReducer } from "react"

const AdminContext = createContext()
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAdmin: true, email: action.payload }
    case "LOGOUT":
      return { ...state, isAdmin: false, email: null }
    default:
      return state
  }
}

const AdminContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAdmin: false,
    email: null,
  })

  return (
    <AdminContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

const useAdminContext = () => {
  return useContext(AdminContext)
}

export { AdminContextProvider, useAdminContext }
