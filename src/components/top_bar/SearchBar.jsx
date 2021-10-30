import { useState } from "react"
import { ClickAwayListener, IconButton } from "@mui/material"
import { useSpring, animated } from "react-spring"

import SearchIcon from "@mui/icons-material/Search"

// Renders a search icon, which opens a search bar
// Dialog?
const SearchBar = ({ setSearchDisabled }) => {
  const [searchWord, setSearchWord] = useState("")

  const [searchProps, searchApi] = useSpring(() => ({
    backgroundColor: "rgba(255,255,255,0)",
  }))

  const openSearchBar = () => {
    setSearchDisabled(false)
    searchApi.start({ backgroundColor: "rgba(255,255,255,255)" })
  }

  const closeSearchBar = () => {
    setSearchDisabled(true)
    searchApi.start({ backgroundColor: "rgba(255,255,255,0)" })
  }

  return (
    <>
      <IconButton
        color="inherit"
        sx={{ margin: "4px" }}
        onClick={openSearchBar}
      >
        <SearchIcon />
      </IconButton>

      <ClickAwayListener
        mouseEvent="onMouseUp"
        onClickAway={() => {
          closeSearchBar()
          setSearchWord("")
        }}
      >
        <animated.input
          style={{
            ...searchProps,
            borderStyle: "hidden",

            width: "60%",
            height: "50%",
            position: "absolute",

            left: "20%",
            right: "20%",
            top: "25%",

            borderRadius: 16,
            justifyContent: "center",
            alignContent: "center",
          }}
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
      </ClickAwayListener>
    </>
  )
}

export default SearchBar
