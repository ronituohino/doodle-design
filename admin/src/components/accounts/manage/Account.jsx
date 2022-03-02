import {
  ListItem,
  Box,
  Button,
  Divider,
  Typography,
  ListItemText,
} from "@mui/material"

const Account = ({ account, openModifyDialog, openDeleteDialog }) => {
  return (
    <>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText>
          <Typography>{account.email}</Typography>
          <Typography>{account.accountType}</Typography>
        </ListItemText>
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={() => {
              openModifyDialog(account)
            }}
            variant="contained"
          >
            Modify
          </Button>
          <Button
            onClick={() => {
              openDeleteDialog(account)
            }}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </ListItem>
    </>
  )
}

export default Account
