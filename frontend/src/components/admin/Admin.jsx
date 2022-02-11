import { useState, useEffect } from "react"

import { Routes, Route } from "react-router-dom"

import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"

import { Box, Typography, Divider } from "@mui/material"

import AdminDrawer from "./AdminDrawer"

import ProductManage from "./products/manage/ProductManage"
import ProductCategories from "./products/categories/ProductCategories"

const Admin = () => {
  const { data } = useAccount()
  const { openLink, homeLink } = useRouting()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    if (data && data.me) {
      if (
        !(
          data.me.accountType === "Admin" ||
          data.me.accountType === "Support"
        )
      ) {
        console.error("Not an admin account")
        openLink(homeLink())
      } else {
        setIsAdmin(true)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <>
      {isAdmin && (
        <>
          <Box sx={{ display: "flex" }}>
            <AdminDrawer />

            <Divider orientation="vertical" flexItem />

            <Box
              sx={{
                width: "100%",
                backgroundColor: "common.white",
              }}
            >
              <Routes>
                <Route
                  path="/:language/admin/products/statistics"
                  element={<Typography>Stats</Typography>}
                />
                <Route
                  path="/:language/admin/products/manage"
                  element={<ProductManage />}
                />
                <Route
                  path="/:language/admin/products/categories"
                  element={<ProductCategories />}
                />
                <Route
                  path="/:language/admin/products/campaigns"
                  element={<Typography>Campaigns</Typography>}
                />
              </Routes>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default Admin
