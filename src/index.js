import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { AdminContextProvider } from "./context/AdminContext"
import { DataContextProvider } from "./context/DataContext"
import { PaginationContextProvider } from "./context/PagintationContext"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <AdminContextProvider>
      <DataContextProvider>
        <PaginationContextProvider>
          <App />
        </PaginationContextProvider>
      </DataContextProvider>
    </AdminContextProvider>
  </React.StrictMode>
)
