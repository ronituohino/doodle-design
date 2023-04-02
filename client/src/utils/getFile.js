// Used in an img src tag to get an image from
// backend server with location information

export const getFile = (fileid, filename) => {
  return `${process.env.REACT_APP_BACKEND_URL}/images/${fileid}-${filename}`;
};
