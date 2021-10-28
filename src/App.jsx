import Content from "./Content"
import TopBar from "./TopBar"

import { Switch, Route } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { GET_ITEMS } from "./queries/queries"

const App = () => {
  const { data } = useQuery(GET_ITEMS, {
    variables: { language: "FI" },
  })

  console.log(data)

  return (
    <>
      <Switch>
        <Route path="/">
          <TopBar />
          <Content />
        </Route>
      </Switch>
    </>
  )
}

export default App
