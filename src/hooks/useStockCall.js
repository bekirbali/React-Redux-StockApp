import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  getProCatBrandSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/Toastify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
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
      toastErrorNotify("Getting data failed");
      console.log(error);
    }
  };

  const postStockData = async (url, info) => {
    // const BASE_URL = "https://12216.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      await instance.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url.slice(0, url.length - 1)} posted successfully`);
      getStockData(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Posting data failed");
      console.log(error);
    }
  };

  const putStockData = async (url, info) => {
    // const BASE_URL = "https://12216.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      // await axios.delete(`${BASE_URL}stock/${url}/${id}/`, {
      //   headers: { Authorization: `Token ${token}` },
      // });
      await instance.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(
        `${url.slice(0, url.length - 1)} updated successfully`
      );
      getStockData(url);
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Updating data failed");
      console.log(error);
    }
  };

  const getProCatBrand = async () => {
    dispatch(fetchStart());
    try {
      const [products, categories, brands] = await Promise.all([
        instance.get("stock/products/"),
        instance.get("stock/categories/"),
        instance.get("stock/brands/"),
      ]);
      dispatch(
        getProCatBrandSuccess([products?.data, categories?.data, brands?.data])
      );
    } catch (error) {
      dispatch(fetchFail());
      toastErrorNotify("Getting data failed");
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
      toastErrorNotify("Deleting data failed");
      console.log(error);
    }
  };

  return {
    getStockData,
    postStockData,
    deleteStockData,
    putStockData,
    getProCatBrand,
  };
};

export default useStockCall;
