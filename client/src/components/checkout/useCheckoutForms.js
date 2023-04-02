import { useEffect } from "react";

import { useFormik } from "formik";
import * as yup from "yup";
import { useLanguage } from "../../hooks/useLanguage";
import { getText } from "../../utils/dictionary";

export const useCheckoutForms = constants => {
  const { language } = useLanguage();

  // The main checkout states
  const billingFormik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
      country: "FI",
      company: "",
    },
    validationSchema: yup.object({
      firstName: yup.string().required(getText(language, "firstNameRequired")),
      lastName: yup.string().required(getText(language, "lastNameRequired")),
      address: yup.string().required(getText(language, "addressRequired")),
      city: yup.string().required(getText(language, "cityRequired")),
      zipCode: yup
        .string()
        .matches(/^[0-9]+$/, getText(language, "mustBeDigitsOnly"))
        .min(5, getText(language, "mustBeFiveDigits"))
        .max(5, getText(language, "mustBeFiveDigits"))
        .required(getText(language, "zipCodeRequired")),
      country: yup.string().required(getText(language, "countryRequired")),
      company: yup.string(),
    }),
    onSubmit: () => {},
    validateOnChange: false,
    validateOnBlur: false,
  });

  const deliveryFormik = useFormik({
    initialValues: {
      deliveryMethod: "",
      phone: "",

      // HOME_DELIVERY
      useExplicitDeliveryAddress: false,
      homeDeliveryAddress: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        zipCode: "",
        country: "FI",
      },

      // POSTI_PARCEL
      postiParcelAddress: undefined,
      searchZipCode: "",

      // STORE_PICKUP
      storePickupAddress: {
        company: "Doodle Design",
        address: "Suurselänsaarentie 102",
        city: "HELSINKI",
        zipCode: "00551",
        country: "FI",
      },
    },
    validationSchema: yup.object({
      deliveryMethod: yup
        .string()
        .required(getText(language, "firstNameRequired")),

      phone: yup
        .string()
        .matches(/^[0-9]+$/, getText(language, "mustBeDigitsOnly"))
        .min(10, getText(language, "mustBeTenDigits"))
        .max(10, getText(language, "mustBeTenDigits")),

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
                .required(getText(language, "firstNameRequired")),
              lastName: yup
                .string()
                .required(getText(language, "firstNameRequired")),
              address: yup
                .string()
                .required(getText(language, "firstNameRequired")),
              city: yup
                .string()
                .required(getText(language, "firstNameRequired")),
              zipCode: yup
                .string()
                .matches(/^[0-9]+$/, getText(language, "mustBeDigitsOnly"))
                .min(5, getText(language, "mustBeFiveDigits"))
                .max(5, getText(language, "mustBeFiveDigits"))
                .required(getText(language, "firstNameRequired")),
              country: yup
                .string()
                .required(getText(language, "firstNameRequired")),
              phone: yup
                .string()
                .matches(/^[0-9]+$/, getText(language, "mustBeDigitsOnly"))
                .min(10, getText(language, "mustBeTenDigits"))
                .max(10, getText(language, "mustBeTenDigits")),
            })
            .required("Delivery address missing"),
        }),

      // POSTI_PARCEL
      postiParcelAddress: yup.object().when("deliveryMethod", {
        is: deliveryMethod => deliveryMethod === constants.POSTI_PARCEL,
        then: yup.object().required(getText(language, "parcelAddressMissing")),
      }),

      // STORE_PICKUP
      storePickupAddress: yup.object(),
    }),
    onSubmit: values => {
      // If the user goes back to select another delivery method,
      // which doesn't allow local payment,
      // invalidate paymentFormik
      if (
        values.deliveryMethod !== constants.STORE_PICKUP &&
        paymentFormik.values.paymentMethod === constants.LOCAL_PAYMENT
      ) {
        paymentFormik.setFieldValue("paymentMethod", "");
      }
    },
  });

  const paymentFormik = useFormik({
    initialValues: {
      paymentMethod: "",

      prePayment: undefined,
      installment: undefined,
    },
    validationSchema: yup.object({
      paymentMethod: yup
        .string()
        .required(getText(language, "paymentMethodRequired")),

      prePayment: yup.string().when("paymentMethod", {
        is: paymentMethod => paymentMethod === constants.PREPAYMENT,
        then: yup.string().required(getText(language, "prePaymentRequired")),
      }),

      installment: yup.string().when("paymentMethod", {
        is: paymentMethod => paymentMethod === constants.INSTALLMENT,
        then: yup.string().required(getText(language, "installmentRequired")),
      }),
    }),
    onSubmit: () => {},
  });

  const confirmationFormik = useFormik({
    initialValues: {
      extrainfo: "",
    },

    validationSchema: yup.object({
      extrainfo: yup.string(),
    }),

    onSubmit: () => {},
  });

  useEffect(() => {
    billingFormik.validateForm();
    deliveryFormik.validateForm();
    paymentFormik.validateForm();
    confirmationFormik.validateForm();
    // eslint-disable-next-line
  }, [language]);

  return {
    billingFormik,
    deliveryFormik,
    paymentFormik,
    confirmationFormik,
  };
};
