import "./index.scss"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {
  LazyLoadImage,
  trackWindowScroll,
} from "react-lazy-load-image-component"

const ImageCard = props => {
  const navigate = useNavigate()

  const { id, category, title, imgUrl, size, isAdmin } = props

  if (isAdmin) {
    return (
      <div className="image-card">
        <Link to={`/admin/image/${id}`}>
          <LazyLoadImage
            src={imgUrl}
            alt={title}
            // scrollPosition={scrollPosition}
            className="image"
            effect="blur"
          />
        </Link>

        <div className="btn-group">
          <button
            className="btn-edit"
            onClick={() => {
              navigate(`/admin/edit/${id}`)
            }}
          >
            Edit
          </button>
          <button
            className="btn-delete"
            onClick={() => {
              navigate(`/admin/delete/${id}`)
            }}
          >
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="image-card">
      <Link to={`/image/${id}`}>
        <LazyLoadImage
          src={imgUrl}
          alt={title}
          // scrollPosition={scrollPosition}
          className="image"
          effect="blur"
        />

        <div className="info">
          <p className="title">{title}</p>
          <p className="size">{size}</p>
          <p className="category">{category}</p>
        </div>
      </Link>
    </div>
  )
}

export default trackWindowScroll(ImageCard)
