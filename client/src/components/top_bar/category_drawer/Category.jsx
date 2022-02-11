import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material"
import { useRouting } from "../../../hooks/useRouting"

const Category = ({ closeMenu, category, label, icon }) => {
  const { openLink, categoryLink } = useRouting()

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          openLink(categoryLink(category))
          closeMenu()
        }}
      >
        <ListItemIcon>
          <Icon>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  )
}

export default Category
