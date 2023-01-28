import { createContext, useContext, useEffect, useState } from "react"
import { useDataContext } from "./DataContext"

const PaginationContext = createContext()

const PaginationContextProvider = ({ children }) => {
  const { showImages } = useDataContext()
  const itemsPerPage = 10
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const [pageNumber, setPageNumber] = useState(0)

  useEffect(() => {
    if (showImages) {
      const endOffset = itemOffset + itemsPerPage
      setCurrentItems(showImages.slice(itemOffset, endOffset))
      setPageCount(Math.ceil(showImages.length / itemsPerPage))
    }
  }, [itemOffset, itemsPerPage, showImages])

  const handlePageClick = e => {
    const newOffset = (e.selected * itemsPerPage) % showImages.length
    setItemOffset(newOffset)
    setPageNumber(e.selected)
  }

  return (
    <PaginationContext.Provider
      value={{
        currentItems,
        pageCount,
        handlePageClick,
        pageNumber,
        setPageNumber,
        setItemOffset,
      }}
    >
      {children}
    </PaginationContext.Provider>
  )
}

const usePaginationContext = () => {
  return useContext(PaginationContext)
}

export { PaginationContextProvider, usePaginationContext }
