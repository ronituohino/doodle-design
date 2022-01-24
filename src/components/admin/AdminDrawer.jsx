import { useState } from "react"

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  List,
  ListSubheader,
  Icon,
} from "@mui/material"

import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"

const AdminDrawer = () => {
  const {
    openLink,
    homeLink,
    itemStatisticsLink,
    itemManageLink,
    itemCategoriesLink,
    itemCampaignsLink,
  } = useRouting()
  const { data } = useAccount()

  const [itemTabOpen, setItemTabOpen] = useState(false)
  const [userTabOpen, setUserTabOpen] = useState(false)
  const [orderTabOpen, setOrderTabOpen] = useState(false)

  return (
    <>
      <List sx={{ backgroundColor: "common.white" }}>
        {data && data.me && (
          <ListSubheader>
            {data.me.username} ({data.me.accountType})
          </ListSubheader>
        )}

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              openLink(homeLink())
            }}
          >
            <ListItemIcon>
              <Icon>keyboard_return</Icon>
            </ListItemIcon>
            <ListItemText primary="Return" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const newOpen = !itemTabOpen
              setItemTabOpen(newOpen)
            }}
          >
            <ListItemIcon>
              <Icon>apps</Icon>
            </ListItemIcon>
            <ListItemText primary="Items" />
            {itemTabOpen ? (
              <Icon>expand_less</Icon>
            ) : (
              <Icon>expand_more</Icon>
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={itemTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  openLink(itemStatisticsLink())
                }}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Icon>bar_chart</Icon>
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  openLink(itemManageLink())
                }}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Icon>edit</Icon>
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  openLink(itemCategoriesLink())
                }}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Icon>category</Icon>
                </ListItemIcon>
                <ListItemText primary="Categories" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  openLink(itemCampaignsLink())
                }}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <Icon>campaign</Icon>
                </ListItemIcon>
                <ListItemText primary="Campaigns" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const newOpen = !userTabOpen
              setUserTabOpen(newOpen)
            }}
          >
            <ListItemIcon>
              <Icon>person</Icon>
            </ListItemIcon>
            <ListItemText primary="Users" />
            {userTabOpen ? (
              <Icon>expand_less</Icon>
            ) : (
              <Icon>expand_more</Icon>
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={userTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>bar_chart</Icon>
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>edit</Icon>
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const newOpen = !orderTabOpen
              setOrderTabOpen(newOpen)
            }}
          >
            <ListItemIcon>
              <Icon name="LocalShippingIcon" />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {orderTabOpen ? (
              <Icon>expand_less</Icon>
            ) : (
              <Icon>expand_more</Icon>
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={orderTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>bar_chart</Icon>
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>edit</Icon>
                </ListItemIcon>
                <ListItemText primary="Manage" />
              </ListItemButton>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </>
  )
}

export default AdminDrawer
