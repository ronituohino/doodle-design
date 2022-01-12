import {
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
} from "@mui/material"

import { useLanguage } from "../../hooks/useLanguage"
import { useShoppingCart } from "../../hooks/useShoppingCart"
import * as yup from "yup"
import { useFormik } from "formik"
import { formatPrice } from "../../utils/price"

import hash from "object-hash"

const ItemInformation = ({ item }) => {
  const { language } = useLanguage()
  const { addItemToCart } = useShoppingCart()

  const getInitialObject = (item) => {
    var newInitial = new Object()

    item.customization.forEach((c) => {
      newInitial[c.label] = ""
    })

    return newInitial
  }

  const getValidationSchema = (item) => {
    var newValidation = new Object()

    item.customization.forEach((c) => {
      newValidation[c.label] = yup
        .string()
        .required(`Please select: ${c.label}`)
    })

    return yup.object(newValidation)
  }

  const formik = useFormik({
    initialValues: getInitialObject(item),
    validationSchema: getValidationSchema(item),
    onSubmit: (values) => {
      // Pack customization into item
      const customizationKeys = Object.keys(values)
      var customizationOptions = []

      customizationKeys.forEach((key) => {
        var customization = new Object()
        customization.label = key
        customization.option = values[key]
        customizationOptions.push(customization)
      })

      // Add a hash: items with same _id might appear in lists
      const selectedItem = {
        ...item,
        customization: customizationOptions,
      }

      selectedItem.hash = hash(selectedItem)
      addItemToCart(selectedItem)
    },
  })

  const selectStyle = {
    marginBottom: 2,
    minWidth: "200px",
  }

  return (
    <Paper elevation={4} sx={{ width: "40%", padding: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          letterSpacing: 0.5,
        }}
      >
        {item.name}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          letterSpacing: 0.5,
        }}
      >
        {formatPrice(item.price, language, "EUR")}
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {item.customization.map((c) => {
          return (
            <TextField
              select
              key={c.label}
              id={c.label}
              name={c.label}
              label={c.label}
              value={formik.values[c.label]}
              onChange={formik.handleChange}
              error={
                formik.touched[c.label] &&
                Boolean(formik.errors[c.label])
              }
              helperText={
                formik.touched[c.label] && formik.errors[c.label]
              }
              sx={selectStyle}
            >
              {c.options.map((o) => {
                return (
                  <MenuItem key={o.toLowerCase()} value={o}>
                    {o}
                  </MenuItem>
                )
              })}
            </TextField>
          )
        })}

        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Add to shopping cart
        </Button>
      </form>
    </Paper>
  )
}

export default ItemInformation
