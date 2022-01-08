import { useMutation, useQuery } from "@apollo/client"
import { FILE_UPLOAD } from "../../graphql/mutations"
import { GET_FILE_DETAILS } from "../../graphql/queries"
import { filePath } from "../../utils/filePath"

const Home = () => {
  const { data } = useQuery(GET_FILE_DETAILS, {
    variables: { id: "61d9c62bacd576fe82723fb3" },
  })
  const [uploadFileMutation] = useMutation(FILE_UPLOAD)

  const onChange = (e) => {
    const file = e.target.files[0]
    uploadFileMutation({ variables: { file } })
  }

  return (
    <>
      <input type="file" required onChange={onChange} />
      {data && data.getFileById && (
        <img src={filePath(data.getFileById.location)} />
      )}
    </>
  )
}

export default Home
