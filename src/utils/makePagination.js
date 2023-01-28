const paginate = userArr => {
  const userPerPage = 8
  const pages = Math.ceil(userArr.length / userPerPage)
  const data = Array.from({ length: pages }, (_, idx) => {
    const start = idx * userPerPage
    return userArr.slice(start, start + userPerPage)
  })
  return data
}

export default paginate
