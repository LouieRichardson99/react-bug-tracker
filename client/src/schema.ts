import * as yup from "yup";

export const signupFormSchema = yup
  .object({
    fullName: yup.string().required("Full name is required"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is required"),
    organisationName: yup.string().required("Organisation name is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/,
        "Password must have at least eight characters, one upper case letter, one lower case letter, and one number"
      ),
  })
  .required();

export const loginFormSchema = yup
  .object({
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be at least 8 characters"),
  })
  .required();
