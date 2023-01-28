const getImageData = imageData => {
  const totalImages = imageData.length
  let categories = {}
  let sales = {}
  let sizes = {}

  imageData.forEach(item => {
    if (categories[item.category]) {
      categories[item.category] += 1
    } else {
      categories[item.category] = 1
    }

    if (sales[item.sale]) {
      sales[item.sale] += 1
    } else {
      sales[item.sale] = 1
    }

    if (sizes[item.size]) {
      sizes[item.size] += 1
    } else {
      sizes[item.size] = 1
    }
  })

  categories = Object.entries(categories)
  sales = Object.entries(sales)
  sizes = Object.entries(sizes)

  return { totalImages, categories, sales, sizes }
}

export { getImageData }
