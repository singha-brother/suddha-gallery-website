import { createContext, useContext, useEffect, useReducer } from "react"
import { db } from "../firebase.config"
import { collection, onSnapshot } from "firebase/firestore"

const DataContext = createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true }
    case "FETCH_DATA":
      return {
        ...state,
        data: action.payload,
        loading: false,
        showImages: action.payload,
      }
    case "SHOW_ALL_IMAGES":
      return {
        ...state,
        showImages: state.data,
      }

    case "SEARCH_BY_TITLE":
      const filterbyTitleImages = state.data.filter(item =>
        item.title.includes(action.payload)
      )

      return {
        ...state,
        showImages: filterbyTitleImages,
      }

    case "FILTER_BY_CATEGORY":
      const { type, value } = action.payload
      const filterByCategoryImages = state.data.filter(
        item => item[type] === value
      )
      return {
        ...state,
        showImages: filterByCategoryImages,
      }

    default:
      return state
  }
}

const DataContextProvider = ({ children }) => {
  const initialState = {
    data: null,
    loading: null,
    showImages: null,
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    dispatch({ type: "SET_LOADING" })
    console.log("data is fetching from server")
    let dbRef = collection(db, "gallery")
    const onSub = onSnapshot(dbRef, snapshot => {
      let results = []
      snapshot.docs.forEach(doc => {
        results.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      dispatch({ type: "FETCH_DATA", payload: results })
    })
    return () => onSub
  }, [])
  return (
    <DataContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

const useDataContext = () => {
  return useContext(DataContext)
}

export { DataContextProvider, useDataContext }
