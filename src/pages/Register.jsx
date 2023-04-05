import { Avatar, Container, Grid, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import image from "../assets/result.svg";

const Register = () => {
  const navigate = useNavigate();
  const { currentUser, error } = useSelector((state) => state?.authReducer);
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
