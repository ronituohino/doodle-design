// Used in an img src tag to get an image from
// backend server with location information

export const getFile = (fileid, filename) => {
  return `${process.env.REACT_APP_BACKEND_URL}/images/${fileid}-${filename}`
}

export const getFileAsJSFile = async (fileid, filename) => {
  const file = await fetch(
    `${process.env.REACT_APP_BACKEND_URL}/images/${fileid}-${filename}`
  )
    .then((r) => r.blob())
    .then(
      (blobFile) =>
        new File([blobFile], filename, { type: "image/png" })
    )
  return file
}
