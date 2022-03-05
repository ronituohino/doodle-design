import { unstable_createMuiStrictModeTheme } from "@mui/material/styles"

const theme = unstable_createMuiStrictModeTheme({
  palette: {
    primary: {
      main: "#def2ff",
    },
    secondary: {
      main: "#ffa59e",
    },
  },
  typography: {
    fontFamily: ['"Segoe UI"'].join(","),
  },
})

export default theme
