import { useState } from "react"
import { ClickAwayListener } from "@mui/material"
import { animated } from "react-spring"

const SearchBar = ({ searchProps, closeSearchBar }) => {
  const [searchWord, setSearchWord] = useState("")

  return (
    <>
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
