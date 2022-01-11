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

import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

import BarChartIcon from "@mui/icons-material/BarChart"
import AppsIcon from "@mui/icons-material/Apps"
import CategoryIcon from "@mui/icons-material/Category"
import CampaignIcon from "@mui/icons-material/Campaign"
import CreateIcon from "@mui/icons-material/Create"

import PersonIcon from "@mui/icons-material/Person"

import LocalShippingIcon from "@mui/icons-material/LocalShipping"

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
      <List>
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
              <KeyboardReturnIcon />
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
              <AppsIcon />
            </ListItemIcon>
            <ListItemText primary="Items" />
            {itemTabOpen ? <ExpandLess /> : <ExpandMore />}
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
                  <BarChartIcon />
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
                  <CreateIcon />
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
                  <CategoryIcon />
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
                  <CampaignIcon />
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
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
            {userTabOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={userTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CreateIcon />
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
              <LocalShippingIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {orderTabOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>

        <Collapse in={orderTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <CreateIcon />
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
