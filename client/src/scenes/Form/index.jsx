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
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { usePostSignUpMutation, usePostSignUpAdminMutation } from "state/api";
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
  interests: yup.string().required("required"),
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
  provinces: "",
  country: "",
  occupation: "",
  interests: "",
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
  const [pageType, setPageType] = useState("user");
  const isUser = pageType === "user";
  const isAdmin = pageType === "admin";
  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();
  const [triggerSignUpAdmin, resultSignUpAdmin] = usePostSignUpAdminMutation();

  const registerUser = async (values, onSubmitProps) => {
    try {
      const obj = {};
      for (let value in values) {
        obj[value] = values[value];
      }
      triggerSignUp(obj);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("The user has already registered with that email");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (resultSignUp.data) {
      toast.success("It has been successfully registered the User");
    } else if (resultSignUp.error) {
      toast.error("The user has already registered with that email");
    }
  }, [resultSignUp.data, resultSignUp.error]);

  const registerAdmin = async (values, onSubmitProps) => {
    try {
      const { name, email, password } = values;
      const data = { name, email, password };
      triggerSignUpAdmin(data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("The user has already registered with that email");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    if (resultSignUpAdmin.data) {
      toast.success("It has been successfully registered the Admin");
    } else if (resultSignUpAdmin.error) {
      toast.error("The user has already registered with that email");
    }
  }, [resultSignUpAdmin.data, resultSignUpAdmin.error]);

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
        }) => {
          return (
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
                      label="Email Admin"
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
                      label="Password Admin"
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
                      label="Password Admin"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.repassword}
                      name="repassword"
                      error={!!touched.repassword && !!errors.repassword}
                      helperText={touched.repassword && errors.repassword}
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
                      <InputLabel id="interests-label">Interests</InputLabel>
                      <Select
                        fullWidth
                        variant="filled"
                        labelId="interests-label"
                        id="interests"
                        name="interests"
                        value={values.interests}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.interests && !!errors.interests}
                        sx={{ gridColumn: "span 2" }}
                      >
                        {optionsInterests.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                    <Box sx={{ gridColumn: "span 2" }}>
                      <InputLabel id="provinces-label">Provinces</InputLabel>
                      <Select
                        fullWidth
                        variant="filled"
                        labelId="provinces-label"
                        id="provinces"
                        name="provinces"
                        value={values.provinces}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.provinces && !!errors.provinces}
                        sx={{ gridColumn: "span 2" }}
                      >
                        {optionsProvinces.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Select>
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
          );
        }}
      </Formik>
    </Box>
  );
};

export default Form;
