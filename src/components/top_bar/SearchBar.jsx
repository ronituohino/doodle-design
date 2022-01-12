import { useState } from "react"
import { TextField, InputAdornment, IconButton } from "@mui/material"

import Icon from "../general/Icon"

// Renders a search icon, which opens a search bar
// Dialog?
const SearchBar = ({ placeholder, sx }) => {
  const [searchWord, setSearchWord] = useState("")

  return (
    <>
      <TextField
        size="small"
        placeholder={placeholder}
        value={searchWord}
        onChange={(e) => setSearchWord(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton sx={{ padding: 0.3 }}>
                <Icon name="SearchIcon" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={sx}
      ></TextField>
    </>
  )
}

export default SearchBar
