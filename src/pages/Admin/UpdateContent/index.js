import FloatingIcon from "../../../components/Atoms/FloatingIcon"
import { useParams } from "react-router-dom"
import { useDataContext } from "../../../context/DataContext"
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase.config"
import { toast } from "react-toastify"
import Loading from "../../../components/Atoms/Loading"

const UpdateContent = () => {
  const navigate = useNavigate()
  const { data } = useDataContext()
  const { imageId } = useParams()
  const [imageData] = data.filter(item => item.id === imageId)

  const [userInput, setUserInput] = useState(imageData)
  const [loading, setLoading] = useState(false)
  const { title, category, width, height, date, description, sale } = userInput

  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const dataToUpdate = {
      ...userInput,
      category: userInput.category.toLowerCase(),
      size: `${userInput.width}" x ${userInput.height}"`,
    }
    const docRef = doc(db, "gallery", imageId)
    updateDoc(docRef, dataToUpdate)
      .then(() => {
        toast.success("Document updated successfully")
        navigate("/admin")
        setLoading(false)
      })
      .catch(err => {
        toast.error("Something went wrong! Try Again!")
        setLoading("false")
      })
  }

  const changeHandler = e => {
    const { name, value } = e.target
    setUserInput(prev => ({ ...prev, [name]: value }))
  }

  return (
    <main className="main">
      {loading && <Loading />}
      <FloatingIcon
        icon={<IoChevronBackCircleOutline size={40} />}
        text="Go back"
        onClick={() => navigate("/admin", { replace: true })}
      />

      {/* {loading && <Loading />} */}

      <form className="form" onSubmit={submitHandler}>
        <h2>Add Your Art To the Gallery</h2>
        {/* Title */}
        <label className="title">
          title
          <input
            type="text"
            name="title"
            required
            value={title}
            onChange={e => changeHandler(e)}
          />
        </label>

        {/* Category */}
        <label className="category">
          category
          <input
            type="text"
            name="category"
            required
            value={category}
            onChange={e => changeHandler(e)}
          />
        </label>

        {/* Size */}
        <label className="size">
          size
          <div className="input-group">
            <input
              type="number"
              name="width"
              placeholder="width"
              required
              value={width}
              onChange={e => changeHandler(e)}
            />
            <span> " x </span>
            <input
              type="number"
              name="height"
              placeholder="height"
              required
              value={height}
              onChange={e => changeHandler(e)}
            />
            <span> " </span>
          </div>
        </label>

        {/* Sale */}
        <label className="sale">
          sale
          <select name="sale" value={sale} onChange={e => changeHandler(e)}>
            <option value="for sale">For Sale</option>
            <option value="sold out">Sold Out</option>
            <option value="not for sale">Not For Sale</option>
          </select>
        </label>

        {/* Date */}
        <label className="date">
          date
          <input
            type="date"
            name="date"
            required
            value={date}
            onChange={e => changeHandler(e)}
          />
        </label>

        {/* Description */}
        <label>
          Description
          <textarea
            name="description"
            className="description"
            value={description}
            onChange={e => changeHandler(e)}
          ></textarea>
        </label>

        {/* File Upload */}
        {/* <input type="file" required onChange={e => changeHandler(e)} /> */}

        {/* Button Submit */}
        <button type="submit" className="btn-submit">
          Update the Content
        </button>
      </form>
    </main>
  )
}

export default UpdateContent
