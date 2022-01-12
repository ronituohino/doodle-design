import { unstable_createMuiStrictModeTheme } from "@mui/material/styles"

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9CDCF0",
    },
    secondary: {
      main: "#C586C0",
    },
    background: {
      default: "#1a1a1a",
    },
  },
})

export default theme
