import { Avatar, Container, Grid, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import image from "../assets/result.svg";
import { Form, Formik } from "formik";
import { object, string } from "yup";
import { LoadingButton } from "@mui/lab";
import useAuthCall from "../hooks/useAuthCall";

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state?.authReducer);
  const { loading } = useSelector((state) => state.authReducer);
  const { register } = useAuthCall();

  let registerSchema = object({
    username: string()
      .required("username is required")
      .min(4, "username must at least 4 char"),
    first_name: string().required().min(2, "name must at least 2 char"),
    last_name: string().required().min(2, "name must at least 2 char"),
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
    <Container>
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sc={{ height: "100vh", p: 2 }}
      >
        <Grid item xs={12}>
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
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>
          <Formik
            initialValues={{
              username: "",
              password: "",
              password2: "",
              first_name: "",
              last_name: "",
              email: "",
            }}
            validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              register(values);
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({ values, handleBlur, handleChange, errors, touched }) => {
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
                    <TextField
                      label="Password Again"
                      name="password2"
                      id="password2"
                      type="password"
                      variant="outlined"
                      value={values.password2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.password && errors.password}
                      error={touched.password && Boolean(errors.password)}
                    />
                    <LoadingButton
                      variant="contained"
                      type="submit"
                      loading={loading}
                    >
                      Register
                    </LoadingButton>
                  </Box>
                </Form>
              );
            }}
          </Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link to="/">Do you already have an account?</Link>
          </Box>
        </Grid>
        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={image} alt="" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;
