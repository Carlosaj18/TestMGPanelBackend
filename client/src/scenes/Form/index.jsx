import { useEffect, useState } from "react";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  useTheme,
  Typography,
} from "@mui/material";
import { Formik, Field } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { usePostSignUpMutation } from "state/api";
import toast from "react-hot-toast";

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const optionsInterests = [
  { value: "Transporte", label: "Transporte" },
  { value: "Almacenamiento", label: "Almacenamiento" },
  { value: "Asesoria", label: "Asesoria" },
];

const optionsProvinces = [
  { value: "Panama", label: "Panama" },
  { value: "Panama Oeste", label: "Panama Oeste" },
  { value: "Bocas del Toro", label: "Bocas del Toro" },
  { value: "Chiriqui", label: "Chiriqui" },
  { value: "Darien", label: "Darien" },
  { value: "Veraguas", label: "Veraguas" },
  { value: "Los Santos", label: "Los Santos" },
  { value: "Cocle", label: "Cocle" },
  { value: "Herrera", label: "Herrera" },
];

const registerUserSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
  phoneNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  city: yup.string().required("required"),
  provinces: yup.string().required("required"),
  country: yup.string().required("required"),
  occupation: yup.string().required("required"),
  selectOption1: yup.string().required("Interests are required"),
  selectOption2: yup.string().required("Provinces are required"),
});

const registerAdminSchema = yup.object().shape({
  name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});

const initialValuesUser = {
  name: "",
  email: "",
  password: "",
  repassword: "",
  phoneNumber: "",
  city: "",
  country: "",
  occupation: "",
  selectOption1: "",
  selectOption2: "",
};

const initialValuesAdmin = {
  name: "",
  email: "",
  password: "",
  repassword: "",
};

const Form = () => {
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();
  const [pageType, setPageType] = useState("user");
  const isUser = pageType === "user";
  const isAdmin = pageType === "admin";

  const registerUser = async (values, onSubmitProps) => {
    console.log("🚀 ~ file: index.jsx:100 ~ registerUser ~ values:", values);
  };

  const registerAdmin = async (values, onSubmitProps) => {
    console.log("🚀 ~ file: index.jsx:128 ~ registerAdmin ~ values:", values);
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isUser) await registerUser(values, onSubmitProps);
    if (isAdmin) await registerAdmin(values, onSubmitProps);
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={isUser ? initialValuesUser : initialValuesAdmin}
        validationSchema={isUser ? registerUserSchema : registerAdminSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          resetForm,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isAdmin ? (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name Admin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.nameAdmin}
                    name="nameAdmin"
                    error={!!touched.nameAdmin && !!errors.nameAdmin}
                    helperText={touched.nameAdmin && errors.nameAdmin}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email Admin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.emailAdmin}
                    name="emailAdmin"
                    error={!!touched.emailAdmin && !!errors.emailAdmin}
                    helperText={touched.emailAdmin && errors.emailAdmin}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password Admin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.passwordAdmin}
                    name="passwordAdmin"
                    error={!!touched.passwordAdmin && !!errors.passwordAdmin}
                    helperText={touched.passwordAdmin && errors.passwordAdmin}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password Admin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.repasswordAdmin}
                    name="repasswordAdmin"
                    error={
                      !!touched.repasswordAdmin && !!errors.repasswordAdmin
                    }
                    helperText={
                      touched.repasswordAdmin && errors.repasswordAdmin
                    }
                    sx={{ gridColumn: "span 2" }}
                  />
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                    name="name"
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.repassword}
                    name="repassword"
                    error={!!touched.repassword && !!errors.repassword}
                    helperText={touched.repassword && errors.repassword}
                    sx={{ gridColumn: "span 2" }}
                  />

                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phoneNumber}
                    name="phoneNumber"
                    error={!!touched.phoneNumber && !!errors.phoneNumber}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="City"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.city}
                    name="city"
                    error={!!touched.city && !!errors.city}
                    helperText={touched.city && errors.city}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Country"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.country}
                    name="country"
                    error={!!touched.country && !!errors.country}
                    helperText={touched.country && errors.country}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Occupation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.occupation}
                    name="occupation"
                    error={!!touched.occupation && !!errors.occupation}
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Box sx={{ gridColumn: "span 2" }}>
                    <InputLabel id="selectOption-label">Interests</InputLabel>
                    <Field
                      as={Select}
                      fullWidth
                      variant="filled"
                      labelId="selectOption1-label"
                      id="selectOption1"
                      name="selectOption1"
                      value={values.selectOption1}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.selectOption1 && !!errors.selectOption1}
                      helperText={touched.selectOption1 && errors.selectOption1}
                      sx={{ gridColumn: "span 2" }}
                    >
                      {optionsInterests.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                  <Box sx={{ gridColumn: "span 2" }}>
                    <InputLabel id="selectOption-label">Provinces</InputLabel>
                    <Field
                      as={Select}
                      fullWidth
                      variant="filled"
                      labelId="selectOption2-label"
                      id="selectOption2"
                      name="selectOption2"
                      value={values.selectOption2}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={!!touched.selectOption2 && !!errors.selectOption2}
                      helperText={touched.selectOption2 && errors.selectOption2}
                      sx={{ gridColumn: "span 2" }}
                    >
                      {optionsProvinces.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </Box>
                </>
              )}
            </Box>
            {/* BUTTONS */}
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                {isUser ? "Create New User" : "Create New Admin"}
              </Button>
              <Box>
                <Typography
                  onClick={() => {
                    setPageType(isUser ? "admin" : "user");
                    resetForm();
                  }}
                  sx={{
                    textDecoration: "underline",
                    color: theme.palette.primary,
                    "&:hover": {
                      cursor: "pointer",
                      color: theme.palette.light,
                    },
                  }}
                >
                  {isUser
                    ? "Click to create New Admin!"
                    : "Click to create New User!"}
                </Typography>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
