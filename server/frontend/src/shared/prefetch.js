export const prefetch = (src) => {
  return new Promise((resolve, reject) => {
    const picture = new Image()
    console.log(src)
    picture.onload = () => {
      resolve(picture)
    }
    picture.onerror = (error) => {
      reject(error)
    }
    picture.src = src
  })
}