import Home from "./components/home/Home"
import Products from "./components/products/Products"

import { Routes, Route, Navigate } from "react-router-dom"
import Account from "./components/account/Account"
import ProductPage from "./components/product_page/ProductPage"
import AccountRegister from "./components/account/AccountRegister"
import AccountLogin from "./components/account/AccountLogin"
import Checkout from "./components/checkout/Checkout"

import Layout from "./Layout"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
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
    </Routes>
  )
}

export default App
