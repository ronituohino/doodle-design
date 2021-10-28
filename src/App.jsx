import Content from "./Content"
import TopBar from "./TopBar"

import { Switch, Route } from "react-router-dom"
import { useQuery } from "@apollo/client"
import { IS_LOGGED_IN } from "./queries/queries"

const App = () => {
  const { data } = useQuery(IS_LOGGED_IN)

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
