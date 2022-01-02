import { Radio, Box } from "@mui/material"
import { makeStyles } from "@material-ui/core"
import * as React from "react"

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
})

const FormikRadioField = ({ formik, field, children, value }) => {
  const checked = formik.values[field] === value
  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a typescript
    // error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { checked })
    }
    return child
  })
  const classes = useStyles()

  return (
    <Box
      sx={{
        display: "flex",
        flexBasis: "100%",
        margin: 1,
      }}
    >
      <Radio
        id={field}
        name={field}
        checked={checked}
        onClick={formik.handleChange}
        value={value}
        disableRipple
        className={classes.root}
        sx={{ alignSelf: "flex-start", top: 12.5 }}
      />

      {childrenWithProps}
    </Box>
  )
}

export default FormikRadioField
