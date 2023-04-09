import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const { token } = useSelector((state) => state.authReducer);

  const instance = axios.create({
    baseURL: "https://12216.fullstack.clarusway.com/",
    headers: { Authorization: `Token ${token}` },
  });

  return { instance };
};

export default useAxios;
