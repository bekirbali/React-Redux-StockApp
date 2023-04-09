import { useDispatch, useSelector } from "react-redux";
import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import axios from "axios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);
  const getStockData = async (url) => {
    const BASE_URL = "https://12216.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      const { data } = await axios(`${BASE_URL}stock/${url}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      dispatch(getSuccess({ data, url }));
      console.log(data);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  const deleteStockData = async (url, id) => {
    const BASE_URL = "https://12216.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      getStockData(url);
    } catch (error) {
      dispatch(fetchFail());
      console.log(error);
    }
  };

  return { getStockData, deleteStockData };
};

export default useStockCall;
