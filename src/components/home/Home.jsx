import { useMutation } from "@apollo/client"
import { FILE_UPLOAD } from "../../graphql/queries"

const Home = () => {
  const [uploadFileMutation] = useMutation(FILE_UPLOAD)

  const onChange = (e) => {
    const file = e.target.files[0]
    console.log(file)
    uploadFileMutation({ variables: { file } })
  }
  return <input type="file" required onChange={onChange} />
}

export default Home
