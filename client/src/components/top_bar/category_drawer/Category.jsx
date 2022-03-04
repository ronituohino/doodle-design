import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Icon,
} from "@mui/material"
import { useRouting } from "../../../hooks/useRouting"

const Category = ({ closeMenu, category, language }) => {
  const { openLink, categoryLink } = useRouting()

  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          openLink(categoryLink(category.urlPath))
          closeMenu()
        }}
      >
        <ListItemIcon>
          <Icon>{category.icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={category.label[language]} />
      </ListItemButton>
    </ListItem>
  )
}

export default Category
