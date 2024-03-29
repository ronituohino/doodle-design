import { useState } from "react";

import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Collapse,
  List,
  ListSubheader,
  Icon,
} from "@mui/material";

import { useRouting } from "../../hooks/useRouting";
import { useAccount } from "../../hooks/useAccount";

const AdminDrawer = () => {
  const {
    openLink,
    productStatisticsLink,
    productManageLink,
    productCategoriesLink,
    productCampaignsLink,
    userManageLink,
  } = useRouting();
  const { data, logOut } = useAccount();

  const [productTabOpen, setItemTabOpen] = useState(false);
  const [userTabOpen, setUserTabOpen] = useState(false);
  const [orderTabOpen, setOrderTabOpen] = useState(false);

  return (
    <>
      <List sx={{ backgroundColor: "common.white", height: "100%" }}>
        {data && data.me && (
          <ListSubheader>
            {data.me.username} ({data.me.accountType})
          </ListSubheader>
        )}

        <ListItem disablePadding>
          <ListItemButton onClick={logOut}>
            <ListItemIcon>
              <Icon>logout</Icon>
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={() => {
              const newOpen = !productTabOpen;
              setItemTabOpen(newOpen);
            }}
          >
            <ListItemIcon>
              <Icon>apps</Icon>
            </ListItemIcon>
            <ListItemText primary="Products" />
            {productTabOpen ? (
              <Icon>expand_less</Icon>
            ) : (
              <Icon>expand_more</Icon>
            )}
          </ListItemButton>
        </ListItem>

        <Collapse in={productTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton
                disabled
                onClick={() => {
                  openLink(productStatisticsLink());
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
                  openLink(productManageLink());
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
                  openLink(productCategoriesLink());
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
                disabled
                onClick={() => {
                  openLink(productCampaignsLink());
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
              const newOpen = !userTabOpen;
              setUserTabOpen(newOpen);
            }}
          >
            <ListItemIcon>
              <Icon>person</Icon>
            </ListItemIcon>
            <ListItemText primary="Accounts" />
            {userTabOpen ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
          </ListItemButton>
        </ListItem>

        <Collapse in={userTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton disabled onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>bar_chart</Icon>
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  openLink(userManageLink());
                }}
                sx={{ pl: 4 }}
              >
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
              const newOpen = !orderTabOpen;
              setOrderTabOpen(newOpen);
            }}
          >
            <ListItemIcon>
              <Icon>local_shipping</Icon>
            </ListItemIcon>
            <ListItemText primary="Orders" />
            {orderTabOpen ? <Icon>expand_less</Icon> : <Icon>expand_more</Icon>}
          </ListItemButton>
        </ListItem>

        <Collapse in={orderTabOpen}>
          <List>
            <ListItem disablePadding>
              <ListItemButton disabled onClick={() => {}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>bar_chart</Icon>
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton disabled onClick={() => {}} sx={{ pl: 4 }}>
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
  );
};

export default AdminDrawer;
