import { Box } from "@mui/material"

import PageSubtitle from "../PageSubtitle"
import { getText } from "../../../utils/dictionary"
import { useLanguage } from "../../../hooks/useLanguage"

const AccountOverview = () => {
  const { language } = useLanguage()
  return (
    <Box sx={{ padding: 2 }}>
      <PageSubtitle text={getText(language, "overview")} />
    </Box>
  )
}

export default AccountOverview
