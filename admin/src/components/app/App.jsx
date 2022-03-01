import { useAccount } from "../../hooks/useAccount"

import { Routes, Route, Navigate, Outlet } from "react-router-dom"

import Layout from "./Layout"

import ProductManage from "../products/manage/Manage"
import Categories from "../products/categories/Categories"
import { useRouting } from "../../hooks/useRouting"

import UserManage from "../users/manage/Manage"

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
        <Route path=":language" element={<Outlet />}>
          <Route path="products">
            <Route path="statistics" element={<></>} />
            <Route path="manage" element={<ProductManage />} />
            <Route path="categories" element={<Categories />} />
            <Route path="campaigns" element={<></>} />
          </Route>

          <Route path="users" element={<Outlet />}>
            <Route path="manage" element={<UserManage />} />
          </Route>
        </Route>
      </Route>

      <Route index element={<Navigate to={adminLink()} />} />
    </Routes>
  )
}

export default App
