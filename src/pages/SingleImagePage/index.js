import { useDataContext } from "../../context/DataContext"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import Navbar from "../../components/Navbar"
import InfoCard from "../../components/InfoCard"
import FloatingIcon from "../../components/Atoms/FloatingIcon"
import Loading from "../../components/Atoms/Loading"
import { IoChevronBackCircleOutline } from "react-icons/io5"

import "./index.scss"

const SingleImagePage = ({ isAdmin = false }) => {
  const navigate = useNavigate()
  const { imageId } = useParams()
  const { data, loading } = useDataContext()

  if (loading) {
    return <Loading />
  }

  const [imageData] = data.filter(item => item.id === imageId)
  const { title, imgUrl, category, date, size, description, sale } = imageData
  const dateStr = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  return (
    <>
      <Navbar />
      {isAdmin && (
        <button
          className="btn-edit-admin"
          onClick={() => {
            navigate(`/admin/edit/${imageId}`)
          }}
        >
          edit
        </button>
      )}
      <FloatingIcon
        icon={<IoChevronBackCircleOutline size={40} />}
        text="Go back"
        onClick={() =>
          isAdmin
            ? navigate("/admin", { replace: true })
            : navigate("/", { replace: true })
        }
      />
      <InfoCard
        title={title}
        imgUrl={imgUrl}
        category={category}
        size={size}
        dateStr={dateStr}
        sale={sale}
        description={description}
      />
    </>
  )
}

export default SingleImagePage
