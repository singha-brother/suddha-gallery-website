import { useState } from "react"
import { IoChevronBackCircleOutline } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import "./index.scss"
import FloatingIcon from "../../../components/Atoms/FloatingIcon"
import Loading from "../../../components/Atoms/Loading"
import { db, storage } from "../../../firebase.config"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { v4 as uuidv4 } from "uuid"
import { toast } from "react-toastify"

const AddContent = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [userInput, setUserInput] = useState({
    title: "",
    category: "watercolor on paper",
    width: "",
    height: "",
    date: "",
    description: "",
    sale: "for sale",
  })

  const { title, category, width, height, date, description, sale } = userInput

  const submitHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const dataToUpload = {
      ...userInput,
      category: userInput.category.toLowerCase(),
      size: `${userInput.width}" x ${userInput.height}"`,
    }

    const { imageFile } = dataToUpload
    delete dataToUpload.imageFile

    const fileName = `${uuidv4()}-${imageFile.name}`
    const storageRef = ref(storage, "images/" + fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on(
      "state_changed",
      snapshot => {},
      err => {
        setLoading(false)
        toast.error("Image cannont be uploaded!")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          const dbRef = collection(db, "gallery")
          addDoc(dbRef, {
            ...dataToUpload,
            imgUrl: url,
            timestamp: serverTimestamp(),
          })
          toast.success("Upload Completed!")
          setUserInput({
            title: "",
            category: "watercolor on paper",
            width: "",
            height: "",
            date: "",
            description: "",
            sale: "for sale",
          })
          setLoading(false)
          navigate("/admin")
        })
      }
    )
  }

  const changeHandler = e => {
    const { name, value } = e.target
    if (e.target.files) {
      setUserInput(prev => ({ ...prev, imageFile: e.target.files[0] }))
    } else {
      setUserInput(prev => ({ ...prev, [name]: value }))
    }
  }

  return (
    <main className="main">
      <FloatingIcon
        icon={<IoChevronBackCircleOutline size={40} />}
        text="Go back"
        onClick={() => navigate("/admin", { replace: true })}
      />

      {loading && <Loading />}

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
        <input type="file" required onChange={e => changeHandler(e)} />

        {/* Button Submit */}
        <button type="submit" className="btn-submit">
          Add To Gallery
        </button>
      </form>
    </main>
  )
}

export default AddContent
