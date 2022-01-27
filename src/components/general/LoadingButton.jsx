import { CircularProgress } from "@mui/material"
import { LoadingButton as LB } from "@mui/lab"

const LoadingButton = ({
  text,
  onClick,
  color,
  variant,
  disabled,
  loading,
  sx,
  ...props
}) => {
  return (
    <LB
      loading={loading}
      loadingIndicator={
        <CircularProgress color="inherit" size={16} />
      }
      disabled={disabled}
      color={color}
      variant={variant}
      fullWidth
      onClick={onClick}
      sx={sx}
      {...props}
    >
      {text}
    </LB>
  )
}

export default LoadingButton
