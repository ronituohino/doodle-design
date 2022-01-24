import { useState } from "react"
import { IconButton, Menu, List, Icon } from "@mui/material"

import { useAccount } from "../../../hooks/useAccount"

import AccountPanelLoggedIn from "./AccountPanelLoggedIn"
import AccountPanelNotLoggedIn from "./AccountPanelNotLoggedIn"

const AccountPanel = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const { data } = useAccount()

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton color="inherit" onClick={openMenu}>
        <Icon>person</Icon>
      </IconButton>

      <Menu
        sx={{ marginTop: 2 }}
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
        <List>
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
