import { Paper, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useLanguage } from "../../../hooks/useLanguage";
import Ratings from "./Ratings";
import { getText } from "../../../utils/dictionary";

// Details, ratings, etc
// eslint-disable-next-line
const Extras = ({ product }) => {
  const { language } = useLanguage();
  const [tab, setTab] = useState(0);

  return (
    <Paper elecation={4}>
      <Tabs
        selectionFollowsFocus
        value={tab}
        onChange={(event, newValue) => setTab(newValue)}
      >
        <Tab label={getText(language, "ratings")} disabled />
      </Tabs>

      <Ratings tab={tab} index={0} />
    </Paper>
  );
};

export default Extras;
