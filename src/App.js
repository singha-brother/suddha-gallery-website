import "./App.scss"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import AdminLogin from "./pages/AdminLogin"
import Admin from "./pages/Admin"
import AddContent from "./pages/Admin/AddContent"
import UpdateContent from "./pages/Admin/UpdateContent"
import DeleteContent from "./pages/Admin/DeleteContent"
import ProtectedRoute from "./components/ProtectedRoute"
import SingleImagePage from "./pages/SingleImagePage"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add-content" element={<AddContent />} />
            <Route path="/admin/edit/:imageId" element={<UpdateContent />} />
            <Route path="/admin/delete/:imageId" element={<DeleteContent />} />
            <Route
              path="/admin/image/:imageId"
              element={<SingleImagePage isAdmin={true} />}
            />
          </Route>
          <Route path="/image/:imageId" element={<SingleImagePage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  )
}

export default App
