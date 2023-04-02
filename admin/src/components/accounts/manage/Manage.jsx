import { useState } from "react";
import { Box } from "@mui/material";

import CategorySubtitle from "../../general/CategorySubtitle";
import SearchBar from "../../general/SearchBar";

import { useDebounce } from "use-debounce";
import AccountList from "./AccountList";

const Manage = () => {
  const [searchWord, setSearchWord] = useState("");
  const [debouncedSearchWord] = useDebounce(searchWord, 300);

  return (
    <>
      <CategorySubtitle text="Manage" />

      <Box
        sx={{
          padding: 2,
          display: "flex",
          gap: "10px",
        }}
      >
        <SearchBar
          placeholder="Filter with email"
          searchWord={searchWord}
          setSearchWord={setSearchWord}
        />
      </Box>

      <Box>
        <AccountList userSearchFilter={debouncedSearchWord} />
      </Box>
    </>
  );
};

export default Manage;
