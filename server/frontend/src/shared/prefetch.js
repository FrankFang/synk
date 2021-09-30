export const prefetch = (src) => {
  return new Promise((resolve, reject) => {
    const picture = new Image()
    picture.src = src
    picture.onload = () => {
      resolve(picture)
    }
    picture.onerror = (error) => {
      reject(error)
    }
  })
}