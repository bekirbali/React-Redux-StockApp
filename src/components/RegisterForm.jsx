import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { object, string } from "yup";

export let registerSchema = object({
  username: string()
    .required("username is required")
    .min(4, "username must at least 4 char"),
  first_name: string().required().min(2, "name must at least 2 char"),
  last_name: string().required().min(2, "name must at least 2 char"),
  email: string().email().required("email is required"),
  password: string()
    .required("password is required")
    .min(8, "password must at least 8 char")
    .max(25, "password can be max 25 char")
    .matches(/\d+/, "password must contains a number")
    .matches(/[a-z]/, "contains a small letter")
    .matches(/[A-Z]/, "must contain a capital letter")
    .matches(/[*%+-,?!€'!{}<>|.#$&]/, "must contain special char"),
});

const RegisterForm = ({
  values,
  handleBlur,
  handleChange,
  errors,
  touched,
}) => {
  const { loading } = useSelector((state) => state.authReducer);
  return (
    <div>
      <Form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          <TextField
            label="Username"
            name="username"
            id="username"
            type="text"
            variant="outlined"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.username && errors.username}
            error={touched.username && Boolean(errors.username)}
          />
          <TextField
            label="First Name"
            name="first_name"
            id="firstName"
            type="text"
            variant="outlined"
            value={values.first_name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.first_name && errors.first_name}
            error={touched.first_name && Boolean(errors.first_name)}
          />
          <TextField
            label="Last Name"
            name="last_name"
            id="lastName"
            type="text"
            variant="outlined"
            value={values.last_name}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.last_name && errors.last_name}
            error={touched.last_name && Boolean(errors.last_name)}
          />
          <TextField
            label="Email"
            name="email"
            id="email"
            type="email"
            variant="outlined"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.email && errors.email}
            error={touched.email && Boolean(errors.email)}
          />
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={touched.password && errors.password}
            error={touched.password && Boolean(errors.password)}
          />
          <LoadingButton variant="contained" type="submit" loading={loading}>
            Register
          </LoadingButton>
        </Box>
      </Form>
    </div>
  );
};
export default RegisterForm;
