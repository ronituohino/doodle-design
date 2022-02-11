import { useState } from "react"
import { Box, IconButton, Menu, List, Icon } from "@mui/material"

import { useAccount } from "../../../hooks/useAccount"

import AccountPanelLoggedIn from "./AccountPanelLoggedIn"
import AccountPanelNotLoggedIn from "./AccountPanelNotLoggedIn"
import { useRouting } from "../../../hooks/useRouting"

const AccountPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { inCheckout } = useRouting()
  const { data } = useAccount()

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  const disableAccountButton = inCheckout()

  return (
    <>
      <Box sx={{ alignSelf: "center" }}>
        <IconButton
          disabled={disableAccountButton}
          color="inherit"
          onClick={openMenu}
        >
          <Icon>person</Icon>
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <List disablePadding>
          {data && data.me && (
            <AccountPanelLoggedIn closeMenu={closeMenu} />
          )}

          {(!data || !data.me) && (
            <AccountPanelNotLoggedIn closeMenu={closeMenu} />
          )}
        </List>
      </Menu>
    </>
  )
}

export default AccountPanel
