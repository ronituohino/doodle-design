import { useState, useEffect } from "react"

import { Switch, Route } from "react-router-dom"

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
              <Switch>
                <Route path="/:language/admin/products/statistics">
                  <Typography>Stats</Typography>
                </Route>

                <Route path="/:language/admin/products/manage">
                  <ProductManage />
                </Route>

                <Route path="/:language/admin/products/categories">
                  <ProductCategories />
                </Route>

                <Route path="/:language/admin/products/campaigns">
                  <Typography>Campaigns</Typography>
                </Route>
              </Switch>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default Admin
