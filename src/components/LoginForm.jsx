import { LoadingButton } from "@mui/lab";
import { Box, TextField } from "@mui/material";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { object, string } from "yup";

export let loginSchema = object({
  email: string().email().required("email is required"),
  password: string()
    .required("password is required")
    .min(4, "password must at least 4 char")
    .max(25, "password can be max 25 char")
    .matches(/\d+/, "password must contains a number")
    .matches(/[a-z]/, "contains a small letter")
    .matches(/[A-Z]/, "must contain a capital letter")
    .matches(/[*%+-,?!€'!{}<>|.#$&]/, "must contain special char"),
});

const LoginForm = ({ values, handleChange, handleBlur, errors, touched }) => {
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
            label="Email"
            name="email"
            id="email"
            type="email"
            variant="outlined"
            value={values?.email || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            label="Password"
            name="password"
            id="password"
            type="password"
            variant="outlined"
            value={values?.password || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
          />
          <LoadingButton variant="contained" type="submit" loading={loading}>
            Submit
          </LoadingButton>
        </Box>
      </Form>
    </div>
  );
};
export default LoginForm;
