import { unstable_createMuiStrictModeTheme } from "@mui/material/styles"

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#272727",
    },
    secondary: {
      main: "#1a1a1a",
    },
    text: {
      primary: "fff",
    },
  },
})

export default theme
