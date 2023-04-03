import { useApolloClient, useMutation } from "@apollo/client";
import { Box, Button } from "@mui/material";
import PageSubtitle from "../PageSubtitle";

import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

import { EDIT_ACCOUNT } from "../../../graphql/mutations";
import { ACCOUNT } from "../../../graphql/queries";
import { useAccount } from "../../../hooks/useAccount";

import FormikField from "../../general/formik/FormikField";

import { getText } from "../../../utils/dictionary";
import { useLanguage } from "../../../hooks/useLanguage";

const AccountSettings = () => {
  const { language } = useLanguage();
  const { data } = useAccount();
  const client = useApolloClient();

  const [editUserMutation] = useMutation(EDIT_ACCOUNT, {
    onCompleted: response => {
      client.writeQuery({
        query: ACCOUNT,
        data: { me: response.editAccountClient },
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: yup.object({
      email: yup.string().email(getText(language, "emailIncorrect")),
    }),
  });

  const passwordFormik = useFormik({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },

    validationSchema: yup.object({
      password: yup.string().min(6, getText(language, "moreThanFiveChars")),
      passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], getText(language, "passwordNoMatch")),
    }),
  });

  useEffect(() => {
    formik.validateForm();
    // eslint-disable-next-line
  }, [language]);

  useEffect(() => {
    if (data && data.me) {
      formik.setFieldValue("email", data.me.email);
    }

    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      {data && data.me && (
        <Box sx={{ padding: 2, width: "60%" }}>
          <PageSubtitle text={getText(language, "settings")} />

          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", gap: "10px" }}>
              <FormikField
                formik={formik}
                field="email"
                label={getText(language, "email")}
              />
              <Button
                color="secondary"
                onClick={() =>
                  editUserMutation({
                    variables: {
                      email: formik.values.email,
                    },
                  })
                }
                disabled={
                  !formik.isValid ||
                  data.me.email === formik.values.email ||
                  formik.values.email.length === 0
                }
                variant="contained"
                sx={{ maxWidth: "50px", maxHeight: "56px" }}
              >
                {getText(language, "update")}
              </Button>
            </Box>

            <Box sx={{ display: "flex", gap: "10px", mt: 2 }}>
              <FormikField
                formik={passwordFormik}
                field="password"
                label={getText(language, "password")}
                type="password"
              />

              <FormikField
                formik={passwordFormik}
                field="passwordConfirm"
                label={getText(language, "passwordAgain")}
                type="password"
              />

              <Button
                color="secondary"
                onClick={() =>
                  editUserMutation({
                    variables: {
                      password: passwordFormik.values.password,
                    },
                  })
                }
                disabled={
                  !passwordFormik.isValid ||
                  passwordFormik.values.password.length === 0
                }
                variant="contained"
                sx={{ maxWidth: "50px", maxHeight: "56px" }}
              >
                {getText(language, "update")}
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default AccountSettings;
