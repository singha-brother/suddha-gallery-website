import "./index.scss"
import logo from "../../assets/logo.svg"
import FilterModal from "../FilterModal"
import { GoSearch } from "react-icons/go"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useAdminContext } from "../../context/AdminContext"

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false)
  const { isAdmin, email } = useAdminContext()

  return (
    <>
      <div className="navbar">
        <Link to={isAdmin && email ? "/admin" : "/"} className="logo">
          <img src={logo} alt="logo" className="nav-logo" />
        </Link>
        <div className="search-box" onClick={() => setOpenModal(true)}>
          <GoSearch size={20} className="icon" />
          <div>
            <p className="upper-txt">Search or filter</p>
            <p className="lower-txt">from Gallery</p>
          </div>
        </div>
      </div>
      <FilterModal setOpenModal={setOpenModal} openModal={openModal} />
    </>
  )
}

export default Navbar
