import Home from "./components/home/Home"
import Content from "./components/content/Content"
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
    <>
      <Switch>
        <Route path="/:language/admin">
          <Admin />
        </Route>

        <Route path="/">
          <Container maxWidth="lg" sx={{ height: "100%" }}>
            <Box
              sx={{
                backgroundColor: "white",
                height: "100%",
                mt: -1,
              }}
            >
              <TopBar />

              <Box sx={{ p: 2, height: "100%" }}>
                <Switch>
                  <Route path="/:language/product/:category/:id">
                    <ProductPage />
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

              <Footer />
            </Box>
          </Container>
        </Route>
      </Switch>
    </>
  )
}

export default App
