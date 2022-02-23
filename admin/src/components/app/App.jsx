import { useAccount } from "../../hooks/useAccount"

import { Routes, Route, Navigate, Outlet } from "react-router-dom"

import Layout from "./Layout"

import Manage from "../products/manage/Manage"
import Categories from "../products/categories/Categories"
import { useRouting } from "../../hooks/useRouting"

const App = () => {
  const { data } = useAccount()
  const { adminLink } = useRouting()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            isAdmin={
              data && data.me && data.me.accountType === "Admin"
            }
          />
        }
      >
        <Route path="/:language" element={<Outlet />}>
          <Route
            path="/:language/products/statistics"
            element={<></>}
          />
          <Route
            path="/:language/products/manage"
            element={<Manage />}
          />
          <Route
            path="/:language/products/categories"
            element={<Categories />}
          />
          <Route
            path="/:language/products/campaigns"
            element={<></>}
          />
        </Route>
      </Route>

      <Route index element={<Navigate to={adminLink()} />} />
    </Routes>
  )
}

export default App
