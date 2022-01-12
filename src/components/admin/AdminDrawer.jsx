import { useState } from "react"

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  List,
  ListSubheader,
} from "@mui/material"

import { useRouting } from "../../hooks/useRouting"
import { useAccount } from "../../hooks/useAccount"

import Icon from "../general/Icon"

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
              <Icon name="KeyboardReturnIcon" />
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
              <Icon name="AppsIcon" />
            </ListItemIcon>
            <ListItemText primary="Items" />
            {itemTabOpen ? (
              <Icon name="ExpandLess" />
            ) : (
              <Icon name="ExpandMore" />
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
                  <Icon name="BarChartIcon" />
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
                  <Icon name="CreateIcon" />
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
                  <Icon name="CategoryIcon" />
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
                  <Icon name="CampaignIcon" />
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
              <Icon name="PersonIcon" />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {userTabOpen ? (
              <Icon name="ExpandLess" />
            ) : (
              <Icon name="ExpandMore" />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={userTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon name="BarChartIcon" />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon name="CreateIcon" />
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
              <Icon name="ExpandLess" />
            ) : (
              <Icon name="ExpandMore" />
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={orderTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon name="BarChartIcon" />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon name="CreateIcon" />
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
