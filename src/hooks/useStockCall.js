import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/Toastify";
import axios from "axios";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);
  const { instance } = useAxios();
  const getStockData = async (url) => {
    // const BASE_URL = "https://12216.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      // const { data } = await axios(`${BASE_URL}stock/${url}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      const { data } = await instance.get(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const deleteStockData = async (url, id) => {
    // const BASE_URL = "https://12216.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      await instance.delete(`stock/${url}/${id}`);
      toastSuccessNotify(
        `${url.slice(0, url.length - 1)} deleted successfully`
      );
      getStockData(url);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { getStockData, deleteStockData };
};

export default useStockCall;