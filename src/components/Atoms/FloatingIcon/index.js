import "./index.scss"

const FloatingIcon = ({ icon, text, onClick }) => {
  return (
    <div className="icon-container" onClick={onClick}>
      {/* Icon */}
      {icon}
      <span>
        {/* text */}
        {text}
      </span>
    </div>
  )
}

export default FloatingIcon
