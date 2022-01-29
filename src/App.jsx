import Home from "./components/home/Home"
import Products from "./components/products/Products"
import TopBar from "./components/top_bar/TopBar"
import Admin from "./components/admin/Admin"

import { Switch, Route, Redirect } from "react-router-dom"
import Account from "./components/account/Account"
import ProductPage from "./components/product_page/ProductPage"
import AccountRegister from "./components/account/AccountRegister"
import AccountLogin from "./components/account/AccountLogin"
import Checkout from "./components/checkout/Checkout"
import Footer from "./components/footer/Footer"

import { Container, Box } from "@mui/material"

const App = () => {
  return (
    <Switch>
      <Route path="/:language/admin">
        <Admin />
      </Route>

      <Route path="/">
        <TopBar />
        <Container maxWidth="md" sx={{ height: "100%" }}>
          <Box sx={{ p: 2, height: "100%", backgroundColor: "blue" }}>
            <Switch>
              <Route path="/:language/product/:category/:id">
                <ProductPage />
              </Route>

              <Route path="/:language/product/:category">
                <Products />
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

              <Route path="/:language/checkout/">
                <Checkout />
              </Route>

              <Route path="/:language/home">
                <Home />
              </Route>

              <Route path="/">
                <Redirect to="/en/home" />
              </Route>
            </Switch>
          </Box>
        </Container>
        <Footer />
      </Route>
    </Switch>
  )
}

export default App
