import { useState, useEffect } from "react"

import { Switch, Route } from "react-router-dom"

import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"

import { Box, Typography, Divider } from "@mui/material"

import AdminDrawer from "./AdminDrawer"

import ItemManage from "./items/manage/ItemManage"
import ItemCategories from "./items/categories/ItemCategories"

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
        console.log("Not an admin account")
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
            <Box sx={{ width: "20%" }}>
              <AdminDrawer />
            </Box>

            <Divider orientation="vertical" flexItem />

            <Box
              sx={{ width: "80%", backgroundColor: "common.white" }}
            >
              <Switch>
                <Route path="/:language/admin/items/statistics">
                  <Typography>Stats</Typography>
                </Route>

                <Route path="/:language/admin/items/manage">
                  <ItemManage />
                </Route>

                <Route path="/:language/admin/items/categories">
                  <ItemCategories />
                </Route>

                <Route path="/:language/admin/items/campaigns">
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
