import {
  useParams,
  matchPath,
  useLocation,
  useNavigate,
} from "react-router"

export const useLanguage = () => {
  let language = "en"

  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  if (params.language !== undefined) {
    language = params.language
  } else {
    const match = matchPath(
      {
        path: "/:language",
        exact: false,
        strict: false,
      },
      location.pathname
    )

    if (match) {
      language = match.params.language
    } else {
      language = "en"
    }
  }

  const setLanguage = (language) => {
    navigate(`/${language}${location.pathname.substring(3)}`)
  }

  return { language, setLanguage }
}
