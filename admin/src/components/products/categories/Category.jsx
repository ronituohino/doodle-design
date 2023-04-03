import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Icon,
  IconButton,
} from "@mui/material";

const Category = ({ category, openEditDialog, openDeleteDialog }) => {
  return (
    <ListItem>
      <ListItemIcon>
        <Icon>{category.icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={category.label.en} />
      <ListItemIcon>
        <IconButton onClick={() => openEditDialog(category)}>
          <Icon>edit</Icon>
        </IconButton>
      </ListItemIcon>

      <ListItemIcon>
        <IconButton onClick={() => openDeleteDialog(category)}>
          <Icon>delete</Icon>
        </IconButton>
      </ListItemIcon>
    </ListItem>
  );
};

export default Category;
