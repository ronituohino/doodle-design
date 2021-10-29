import Home from "./components/home/Home"
import Content from "./components/content/Content"
import TopBar from "./components/top_bar/TopBar"

import { Switch, Route } from "react-router-dom"

const App = () => {
  return (
    <>
      <TopBar />
      <Switch>
        <Route path="/product/:category">
          <Content />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  )
}

export default App
