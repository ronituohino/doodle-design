import { useState } from "react"
import {
  TextField,
  InputAdornment,
  IconButton,
  Icon,
} from "@mui/material"

// Renders a search icon, which opens a search bar
// Dialog?
const SearchBar = ({ placeholder, sx }) => {
  const [searchWord, setSearchWord] = useState("")

  return (
    <TextField
      fullWidth
      size="small"
      color="secondary"
      placeholder={placeholder}
      value={searchWord}
      onChange={(e) => setSearchWord(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton sx={{ padding: 0.3 }}>
              <Icon>search</Icon>
            </IconButton>
          </InputAdornment>
        ),
      }}
      sx={sx}
    ></TextField>
  )
}

export default SearchBar
