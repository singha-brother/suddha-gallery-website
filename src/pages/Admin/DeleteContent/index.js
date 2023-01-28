import "./index.scss"
import { useParams, useNavigate } from "react-router-dom"
import { db, storage } from "../../../firebase.config"
import { deleteDoc, doc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage"
import { toast } from "react-toastify"
import { useState } from "react"
import Loading from "../../../components/Atoms/Loading"
import { useDataContext } from "../../../context/DataContext"

const DeleteContent = () => {
  const { data } = useDataContext()
  const { imageId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const deleteContent = async e => {
    e.preventDefault()
    setLoading(true)
    //  find the image url
    const imageData = data.find(item => item.id === imageId)

    const { imgUrl } = imageData
    // to delete the picture from firebase cloud
    // find the regex pattern from url
    const urlId = imgUrl.match(/(?<=2F).+?(?=\?alt)/)[0]

    // delete the data from firestore database
    const docRef = doc(db, "gallery", imageId)
    deleteDoc(docRef)
      .then(() => {
        // delete the data from firestore storage
        const imgRef = ref(storage, "images/" + urlId)
        deleteObject(imgRef)
          .then(() => {
            toast.success("Deleted!")
            setLoading(false)
            navigate("/admin", { replace: true })
          })
          .catch(err => {
            setLoading(false)
            toast.error("Something went wrong! Not deleted")
            navigate("/admin", { replace: true })
          })
      })
      .catch(err => {
        toast.error("Something went wrong! Not deleted")
      })
  }

  return (
    <main className="container">
      {loading && <Loading />}
      <div className="modal">
        <h2>Are You Sure To Delete?</h2>
        <div className="btn-group">
          <button className="btn-delete" onClick={deleteContent}>
            Delete
          </button>
          <button
            className="btn-cancel"
            onClick={() => navigate("/admin", { replace: true })}
          >
            Cancel
          </button>
        </div>
      </div>
    </main>
  )
}

export default DeleteContent
