import "./index.scss"
import { ReactComponent as TypeLogo } from "../../assets/category.svg"
import { ReactComponent as SizeLogo } from "../../assets/size.svg"
import { FcCalendar } from "react-icons/fc"
import { GrCart } from "react-icons/gr"

const InfoCard = ({
  title,
  imgUrl,
  category,
  size,
  dateStr,
  sale,
  description,
}) => {
  return (
    <main className="main">
      <h3 className="title-text">"{title}"</h3>
      <div className="container-image">
        <section className="image">
          <img src={imgUrl} alt={title} />
        </section>
        <section className="info">
          <p className="category">
            <TypeLogo className="type-logo" />
            <span>{category}</span>
          </p>
          <p className="size">
            <SizeLogo className="size-logo" />
            <span>{size}</span>
          </p>
          <p className="date">
            <FcCalendar size={30} />
            <span>{dateStr}</span>
          </p>
          <p className="sale">
            <GrCart size={30} />
            <span>{sale}</span>
          </p>
          <div className="line"></div>
          <p className="description">{description}</p>
        </section>
      </div>
    </main>
  )
}

export default InfoCard
