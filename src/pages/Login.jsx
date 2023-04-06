import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import image from "../assets/result.svg";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { object, string } from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import useAuthCall from "../hooks/useAuthCall";

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, error, loading } = useSelector(
    (state) => state?.authReducer
  );
  const { login } = useAuthCall();

  let loginSchema = object({
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
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            STOCK APP
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              login(values);
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ values, handleChange, handleBlur, errors, touched }) => {
              return (
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
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      loading={loading}
                    >
                      Submit
                    </LoadingButton>
                  </Box>
                </Form>
              );
            }}
          </Formik>

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/register">Don't you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={image} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
