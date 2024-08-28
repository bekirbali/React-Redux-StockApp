import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.authReducer);

  const instance = axios.create({
    // baseURL: "https://12216.fullstack.clarusway.com/",
    baseURL: "http://127.0.0.1:8000/",
    headers: { Authorization: `Token ${token}` },
  });

  return { instance };
};

export default useAxios;
