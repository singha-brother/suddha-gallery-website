import Navbar from "../../components/Navbar"
import ImageList from "../../components/ImageList"
import { MdAddCircleOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import FloatingIcon from "../../components/Atoms/FloatingIcon"

const Admin = () => {
  const navigate = useNavigate()
  return (
    <>
      <Navbar />
      <ImageList isAdmin={true} />
      <FloatingIcon
        icon={<MdAddCircleOutline size={30} />}
        text="Add content"
        onClick={() => navigate("/admin/add-content")}
      />
    </>
  )
}

export default Admin
