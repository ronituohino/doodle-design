import { useFormik } from "formik"
import * as yup from "yup"

export const useCheckoutForms = (constants) => {
  // The main checkout states
  const billingFormik = useFormik({
    initialValues: {
      firstName: "Jeremy",
      lastName: "Jenking",
      address: "Tampereenkatu 12",
      city: "TAMPERE",
      zipCode: "05001",
      country: "FI",
      company: "",
      phone: "0504802233",
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      lastName: yup.string().required("Last name is required"),
      address: yup.string().required("Address is required"),
      city: yup.string().required("City is required"),
      zipCode: yup
        .string()
        .matches(/^[0-9]+$/, "Must be digits only")
        .min(5, "Must be 5 digits")
        .max(5, "Must be 5 digits")
        .required("Postal code is required"),
      country: yup.string().required("Country is required"),
      company: yup.string(),
      phone: yup
        .string()
        .matches(/^[0-9]+$/, "Must be digits only")
        .min(10, "Must be 10 digits")
        .max(10, "Must be 10 digits"),
    }),
    onSubmit: () => {},
    validateOnChange: false,
    validateOnBlur: false,
  })

  const deliveryFormik = useFormik({
    initialValues: {
      deliveryMethod: "",

      // HOME_DELIVERY
      useExplicitDeliveryAddress: false,
      homeDeliveryAddress: {
        firstName: "lol",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        country: "FI",
        phone: "",
      },

      // POSTI_PARCEL
      postiParcelAddress: undefined,
      searchZipCode: "",

      // STORE_PICKUP
      storePickupAddress: {
        extra: "Fred's Computers!",
        address: "Joukolankatu 12",
        city: "HELSINKI",
        zipCode: "00510",
        country: "FI",
      },
    },
    validationSchema: yup.object({
      deliveryMethod: yup
        .string()
        .required("Delivery method is required"),

      // HOME_DELIVERY
      useExplicitDeliveryAddress: yup.boolean(),
      homeDeliveryAddress: yup
        .object()
        .when(["deliveryMethod", "useExplicitDeliveryAddress"], {
          is: (deliveryMethod, useExplicitDeliveryAddress) =>
            deliveryMethod === constants.HOME_DELIVERY &&
            useExplicitDeliveryAddress,
          then: yup
            .object({
              firstName: yup
                .string()
                .required("First name is required"),
              lastName: yup
                .string()
                .required("Last name is required"),
              address: yup.string().required("Address is required"),
              city: yup.string().required("City is required"),
              zipCode: yup
                .string()
                .matches(/^[0-9]+$/, "Must be digits only")
                .min(5, "Must be 5 digits")
                .max(5, "Must be 5 digits")
                .required("Zip code is required"),
              country: yup.string().required("Country is required"),
              phone: yup
                .string()
                .matches(/^[0-9]+$/, "Must be digits only")
                .min(10, "Must be 10 digits")
                .max(10, "Must be 10 digits"),
            })
            .required("Delivery address missing"),
        }),

      // POSTI_PARCEL
      postiParcelAddress: yup.object().when("deliveryMethod", {
        is: (deliveryMethod) =>
          deliveryMethod === constants.POSTI_PARCEL,
        then: yup.object().required("Please select parcel address"),
      }),

      // STORE_PICKUP
      storePickupAddress: yup.object(),
    }),
    onSubmit: (values) => {
      // If the user goes back to select another delivery method,
      // which doesn't allow local payment,
      // invalidate paymentFormik
      if (
        values.deliveryMethod !== constants.STORE_PICKUP &&
        paymentFormik.values.paymentMethod === constants.LOCAL_PAYMENT
      ) {
        paymentFormik.setFieldValue("paymentMethod", "")
      }
    },
  })

  const paymentFormik = useFormik({
    initialValues: {
      paymentMethod: "",

      prePayment: undefined,
      installment: undefined,
    },
    validationSchema: yup.object({
      paymentMethod: yup
        .string()
        .required("Payment method is required"),

      prePayment: yup.string().when("paymentMethod", {
        is: (paymentMethod) => paymentMethod === constants.PREPAYMENT,
        then: yup
          .string()
          .required("Prepayment provider is required"),
      }),

      installment: yup.string().when("paymentMethod", {
        is: (paymentMethod) =>
          paymentMethod === constants.INSTALLMENT,
        then: yup
          .string()
          .required("Installment provider is required"),
      }),
    }),
    onSubmit: () => {},
  })

  const confirmationFormik = useFormik({
    initialValues: {
      extrainfo: "",
    },

    validationSchema: yup.object({
      extrainfo: yup.string(),
    }),

    onSubmit: () => {},
  })

  return {
    billingFormik,
    deliveryFormik,
    paymentFormik,
    confirmationFormik,
  }
}
