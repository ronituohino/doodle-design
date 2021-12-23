import { useFormik } from "formik"
import * as yup from "yup"

import {
  Box,
  Container,
  Typography,
  MenuItem,
  Button,
  TextField,
} from "@mui/material"

import { useQuery } from "@apollo/client"
import { GET_ITEM } from "../../graphql/queries"
import { useParams } from "react-router"
import { useLanguage } from "../../hooks/useLanguage"
import { formatPrice } from "../../utils/price"
import { useShoppingCart } from "../../hooks/useShoppingCart"

import hash from "object-hash"

const ItemPage = () => {
  const { id } = useParams()
  const { language } = useLanguage()
  const { data } = useQuery(GET_ITEM, {
    variables: { id, language, currency: "EUR" },
  })

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
        }}
      >
        <Box sx={{ flexBasis: "50%" }}>
          <ItemPictures />
        </Box>

        <Box sx={{ flexBasis: "50%", marginLeft: 4 }}>
          {data ? (
            <ItemInformation item={data.getItemById} />
          ) : (
            <p>loading...</p>
          )}
        </Box>

        <Box>
          <ItemExtras />
        </Box>
      </Container>
    </>
  )
}

// eslint-disable-next-line
const ItemPictures = ({ item }) => {
  return (
    <>
      <Box>
        <img
          component="img"
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          alt="name"
          style={{
            width: "350px",
            height: "350px",
            borderRadius: 16,
          }}
        />
      </Box>
    </>
  )
}

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
    <>
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
    </>
  )
}

// Description, ratings, etc
// eslint-disable-next-line
const ItemExtras = ({ item }) => {
  return (
    <>
      <Typography>Desc</Typography>
    </>
  )
}

export default ItemPage
