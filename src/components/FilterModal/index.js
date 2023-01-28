import "./index.scss"
import { FaTimes } from "react-icons/fa"
import { getImageData } from "../../utils/getImageData"
import { useDataContext } from "../../context/DataContext"
import { usePaginationContext } from "../../context/PagintationContext"
import Loading from "../Atoms/Loading"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

const FilterModal = ({ openModal, setOpenModal }) => {
  const navigate = useNavigate()
  const { loading, data, dispatch } = useDataContext()
  const { setItemOffset, setPageNumber } = usePaginationContext()

  // show all photos
  const showAllImages = () => {
    dispatch({ type: "SHOW_ALL_IMAGES" })
    //////////
    setItemOffset(0)
    setPageNumber(0)
    /////////
    setOpenModal(false)
    navigate("/")
  }

  // filter by title (form text)
  const [inputWord, setInputWord] = useState("")
  const searchByTitle = e => {
    e.preventDefault()
    dispatch({ type: "SEARCH_BY_TITLE", payload: inputWord })
    setOpenModal(false)
    //////////
    setItemOffset(0)
    setPageNumber(0)
    /////////
    setInputWord("")
    navigate("/")
  }

  // filter by category
  const filterCategory = (type, value) => {
    dispatch({ type: "FILTER_BY_CATEGORY", payload: { type, value } })
    //////////
    setItemOffset(0)
    setPageNumber(0)
    /////////
    setOpenModal(false)
    navigate("/")
  }

  if (loading) {
    return <Loading />
  }

  if (data !== null) {
    const { totalImages, categories, sales, sizes } = getImageData(data)
    // if (data.length === 0) {
    //   return <h1>No images to show!</h1>
    // }

    return (
      <div className={`modal-container ${!openModal && "close"}`}>
        <FaTimes
          size={25}
          className="close-modal"
          onClick={() => setOpenModal(false)}
        />
        <h3 className="total">
          Total Images - <span>{totalImages}</span>
        </h3>

        {/* Show all Images */}
        <button className="btn-show-all" type="button" onClick={showAllImages}>
          Show all Images
        </button>

        {/* Search by title  */}
        <form className="form" onSubmit={searchByTitle}>
          <input
            type="text"
            placeholder="search by title"
            className="search-title"
            value={inputWord}
            onChange={e => setInputWord(e.target.value)}
          />
          <button className="btn-search" type="submit">
            Search
          </button>
        </form>
        {/* <p className="or">or</p> */}
        <h2 className="filter">Filter by the following: </h2>
        {/* by Categories */}
        <h3 className="filter-title">Categories</h3>
        <ul className="list-items">
          {categories.map((category, idx) => {
            return (
              <li
                className="list-item"
                key={idx}
                onClick={() => filterCategory("category", category[0])}
              >
                {category[0]} <span className="count">{category[1]}</span>
              </li>
            )
          })}
        </ul>
        {/*  by Sizes */}
        <h3 className="filter-title">By Sizes</h3>
        <ul className="list-items">
          {sizes.map((size, idx) => {
            return (
              <li
                className="list-item"
                key={idx}
                onClick={() => filterCategory("size", size[0])}
              >
                {size[0]} <span className="count">{size[1]}</span>
              </li>
            )
          })}
        </ul>

        {/* by Sales */}
        <h3 className="filter-title">Sales</h3>
        <ul className="list-items">
          {sales.map((sale, idx) => {
            return (
              <li
                className="list-item"
                key={idx}
                onClick={() => filterCategory("sale", sale[0])}
              >
                {sale[0]} <span className="count">{sale[1]}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return <h2>Something</h2>
}

export default FilterModal
