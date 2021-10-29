import Home from "./components/home/Home"
import Content from "./components/content/Content"
import TopBar from "./components/top_bar/TopBar"

import { Switch, Route, Redirect } from "react-router-dom"
import Account from "./components/account/Account"

import { useQuery } from "@apollo/client"
import { LANGUAGE } from "./queries/queries"

const App = () => {
  const { data } = useQuery(LANGUAGE)

  return (
    <>
      <TopBar />
      <Switch>
        <Route path="/:language/product/:category">
          <Content />
        </Route>

        <Route path="/:language/account">
          <Account />
        </Route>

        <Route path="/:language">
          <Home />
        </Route>

        <Route path="/">
          <Redirect to={`/${data.language}`} />
        </Route>
      </Switch>
    </>
  )
}

export default App
