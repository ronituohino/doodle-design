import { Radio, Paper } from "@mui/material"
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
    <Paper
      elevation={8}
      onClick={() => formik.setFieldValue(field, value)}
      sx={{
        display: "flex",
        flexBasis: "100%",
        mb: 1,
        backgroundColor: "rgba(16.3, 16.3, 16.3, 1)",
      }}
    >
      <Radio
        id={field}
        name={field}
        checked={checked}
        value={value}
        disableRipple
        className={classes.root}
        sx={{ alignSelf: "flex-start", top: 12.5, left: 7.5 }}
      />

      {childrenWithProps}
    </Paper>
  )
}

export default FormikRadioField
