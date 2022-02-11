import { ListItem, Typography } from "@mui/material"

const ReceiptLine = ({
  leftText,
  rightText,
  variant,
  indent,
  sx,
}) => {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Typography variant={variant} sx={{ ...sx }}>
          {rightText}
        </Typography>
      }
    >
      <Typography
        variant={variant}
        sx={{
          ...sx,
          textIndent: indent,
          whiteSpace: "normal",
          wordWrap: "break-word",
        }}
      >
        {leftText}
      </Typography>
    </ListItem>
  )
}

export default ReceiptLine
