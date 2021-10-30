import Home from "./components/home/Home"
import Content from "./components/content/Content"
import TopBar from "./components/top_bar/TopBar"

import { Switch, Route, Redirect } from "react-router-dom"
import Account from "./components/account/Account"

const App = () => {
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

        <Route path="/:language/home">
          <Home />
        </Route>

        <Route path="/">
          <Redirect to="/en/home" />
        </Route>
      </Switch>
    </>
  )
}

export default App
