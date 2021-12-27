import Home from "./components/home/Home"
import Content from "./components/content/Content"
import TopBar from "./components/top_bar/TopBar"

import { Switch, Route, Redirect } from "react-router-dom"
import Account from "./components/account/Account"
import ItemPage from "./components/item_page/ItemPage"
import AccountRegister from "./components/account/AccountRegister"
import AccountLogin from "./components/account/AccountLogin"
import Cart from "./components/checkout/cart/Cart"
import Address from "./components/checkout/address/Address"
import { useAccount } from "./hooks/useAccount"
import { useRouting } from "./hooks/useRouting"

const App = () => {
  const { loggedIn } = useAccount()
  const isLoggedIn = loggedIn()

  const { loginLink } = useRouting()

  return (
    <>
      <TopBar />
      <Switch>
        <Route path="/:language/product/:category/:id">
          <ItemPage />
        </Route>

        <Route path="/:language/product/:category">
          <Content />
        </Route>

        <Route path="/:language/account/register">
          <AccountRegister />
        </Route>

        <Route path="/:language/account/login">
          <AccountLogin />
        </Route>

        <Route path="/:language/account">
          <Account />
        </Route>

        <Route path="/:language/checkout/cart">
          <Cart />
        </Route>

        <Route path="/:language/checkout/address">
          {isLoggedIn ? <Address /> : <Redirect to={loginLink()} />}
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
