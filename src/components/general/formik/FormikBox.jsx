import { getInnerFieldFromObject } from "../../../utils/utils"
import BetterPaper from "../BetterPaper"

const FormikBox = ({
  formik,
  field,
  label,
  children,
  sx,
  innerSx,
}) => {
  const error = getInnerFieldFromObject(formik.errors, field)

  const boxColor = error ? "crimson" : "lightgray"
  const boxColorBold = error ? "crimson" : "gray"

  return (
    <BetterPaper
      label={label}
      boxColor={boxColor}
      labelColor={boxColorBold}
      helper={error}
      sx={sx}
      innerSx={innerSx}
    >
      {children}
    </BetterPaper>
  )
}

export default FormikBox
