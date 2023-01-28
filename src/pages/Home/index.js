import Navbar from "../../components/Navbar"
import ImageList from "../../components/ImageList"
import { useEffect } from "react"

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <>
      <Navbar />
      <ImageList />
    </>
  )
}

export default Home
