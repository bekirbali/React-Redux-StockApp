import axios from "axios";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/Toastify";

const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = "https://12216.fullstack.clarusway.com/";
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );
      dispatch(loginSuccess(data));
      navigate("/stock");
      toastSuccessNotify("Logged in successfully");
      console.log(data, "data");
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Couldn't logged in");
      console.log(error);
    }
  };
  const register = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );
      dispatch(registerSuccess(data));
      navigate("/stock");
      toastSuccessNotify("Registered successfully");
      console.log(data);
      return data;
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Couldn't registered");
      console.log(error, "error");
    }
  };
  const logout = async (userInfo) => {
    try {
      axios.post(`${BASE_URL}account/auth/logout/`);
      dispatch(logoutSuccess());
      navigate("/");
      toastSuccessNotify("Logged out successfully");
      console.log("logged out");
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Couldn't logged out");
      console.log(error);
    }
  };
  return { login, register, logout };
};

export default useAuthCall;
