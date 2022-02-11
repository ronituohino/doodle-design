import { useState, useEffect } from "react"
import { useAccount } from "../../hooks/useAccount"

import { Routes, Route, Navigate, Outlet } from "react-router-dom"

import Layout from "./Layout"
import { Typography } from "@mui/material"

import ProductManage from "../products/manage/ProductManage"
import ProductCategories from "../products/categories/ProductCategories"
import { useRouting } from "../../hooks/useRouting"

const App = () => {
  const { data } = useAccount()
  const { adminLink } = useRouting()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (data && data.me) {
      if (data.me.accountType === "Admin") {
        setIsAdmin(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <Routes>
      <Route path="/" element={<Layout isAdmin={isAdmin} />}>
        <Route path="/:language" element={<Outlet />}>
          <Route
            path="/:language/products/statistics"
            element={<Typography>Stats</Typography>}
          />
          <Route
            path="/:language/products/manage"
            element={<ProductManage />}
          />
          <Route
            path="/:language/products/categories"
            element={<ProductCategories />}
          />
          <Route
            path="/:language/products/campaigns"
            element={<Typography>Campaigns</Typography>}
          />
        </Route>
      </Route>

      <Route index element={<Navigate to={adminLink()} />} />
    </Routes>
  )
}

export default App
