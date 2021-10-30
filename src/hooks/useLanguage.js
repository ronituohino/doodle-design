import { useParams, matchPath, useLocation, useHistory } from "react-router"

export const useLanguage = () => {
  let language = "en"

  const params = useParams()
  const history = useHistory()
  const location = useLocation()

  if (params.language !== undefined) {
    language = params.language
  } else {
    const match = matchPath(location.pathname, {
      path: "/:language",
      exact: false,
      strict: false,
    })

    if (match) {
      language = match.params.language
    } else {
      language = "en"
    }
  }

  const setLanguage = (language) => {
    history.push(`/${language}${location.pathname.substring(3)}`)
  }

  return { language, setLanguage }
}
