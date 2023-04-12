import { Button, Grid, Typography } from "@mui/material";
// import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchFail, fetchStart, getSuccess } from "../features/stockSlice";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import { flex } from "../styles/globalStyles";
import FirmModal from "../components/modals/FirmModal";

const Firms = () => {
  // const { token } = useSelector((state) => state.authReducer);
  // const dispatch = useDispatch();
  // const url = "firms";
  // const getFirms = async () => {
  //   const BASE_URL = "https://12216.fullstack.clarusway.com/";
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axios(`${BASE_URL}stock/firms/`, {
  //       headers: { Authorization: `Token ${token}` },
  //     });
  //     dispatch(getSuccess({ data, url }));
  //     console.log(data);
  //   } catch (error) {
  //     dispatch(fetchFail());
  //     console.log(error);
  //   }
  // };

  const { getStockData } = useStockCall();
  const { firms } = useSelector((state) => state.stockReducer);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    name: "",
    phone: "",
    address: "",
    image: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    return (
      setOpen(false),
      setInfo({
        name: "",
        phone: "",
        address: "",
        image: "",
      })
    );
  };

  useEffect(() => {
    // getFirms();
    getStockData("firms");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Typography variant="h4" color="error" mb={3}>
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Firm
      </Button>
      <FirmModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Grid container sx={(flex, { gap: 2 })}>
        {firms?.map((firm) => {
          return (
            <Grid item key={firm.id}>
              <FirmCard firm={firm} handleOpen={handleOpen} setInfo={setInfo} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Firms;
