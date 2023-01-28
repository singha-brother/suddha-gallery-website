import SingleImage from "./SingleImage"
import "./index.scss"
import { useDataContext } from "../../context/DataContext"
import Loading from "../Atoms/Loading"
import ReactPaginate from "react-paginate"
import { usePaginationContext } from "../../context/PagintationContext"
///////

const ImageList = ({ isAdmin = false }) => {
  const { loading } = useDataContext()
  const { currentItems, pageCount, handlePageClick, pageNumber } =
    usePaginationContext()

  if (loading) {
    return <Loading />
  }

  if (currentItems) {
    if (currentItems.length === 0) {
      return <h1 className="no-image-to-show">No Images to show!</h1>
    }
    return (
      <>
        <div className="image-container">
          {currentItems.map(image => (
            <SingleImage key={image.id} {...image} isAdmin={isAdmin} />
          ))}
        </div>
        <div className="pagination-container">
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            forcePage={pageNumber}
            disableInitialCallback={true}
            previousLabel="<"
            renderOnZeroPageCount={null}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item previous-item"
            previousLinkClassName="page-link"
            nextClassName="page-item next-item"
            nextLinkClassName="page-link"
            breakLinkClassName="break-item"
            breakClassName="page-item"
            containerClassName="pagination"
            activeClassName="active"
          />
        </div>
      </>
    )
  }
}

export default ImageList
