import Content from "./Content"
import TopBar from "./TopBar"

import { Switch, Route } from "react-router-dom"

const App = () => {
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
