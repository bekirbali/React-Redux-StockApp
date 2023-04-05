import "./App.scss";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey, blueGrey } from "@mui/material/colors";
import { Provider } from "react-redux";
import store from "./app/store";
import { ToastContainer } from "react-toastify";
import MainRouter from "./router/AppRouter";

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: grey["900"],
      },
      secondary: {
        main: blueGrey["900"],
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <MainRouter />
        </Provider>
        <ToastContainer />
      </ThemeProvider>
    </>
  );
};

export default App;
