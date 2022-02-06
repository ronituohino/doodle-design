import Home from "./components/home/Home"
import Products from "./components/products/Products"
import TopBar from "./components/top_bar/TopBar"
import Admin from "./components/admin/Admin"

import { Routes, Route, Navigate } from "react-router-dom"
import Account from "./components/account/Account"
import ProductPage from "./components/product_page/ProductPage"
import AccountRegister from "./components/account/AccountRegister"
import AccountLogin from "./components/account/AccountLogin"
import Checkout from "./components/checkout/Checkout"
import Footer from "./components/footer/Footer"

import { Container } from "@mui/material"

const App = () => {
  return (
    <Routes>
      <Route path="/:language/admin" element={<Admin />} />

      <Route element={<TopBar />} />
      <Route path="/" element={<Container sx={{ mt: 12 }} />}>
        <Route
          path=":language/product/:category/:id"
          element={<ProductPage />}
        />
        <Route
          path=":language/product/:category"
          element={<Products />}
        />
        <Route
          path=":language/account/register"
          element={<AccountRegister />}
        />
        <Route
          path=":language/account/login"
          element={<AccountLogin />}
        />
        <Route path=":language/account" element={<Account />} />
        <Route path=":language/checkout/" element={<Checkout />} />
        <Route path=":language/home" element={<Home />} />

        <Route index element={<Navigate to="/en/home" />} />
      </Route>
      <Route element={<Footer />} />
    </Routes>
  )
}

export default App
