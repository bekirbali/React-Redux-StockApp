import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import { flex } from "../styles/globalStyles";
import BrandCard from "../components/BrandCard";

const Firms = () => {
  const { getStockData } = useStockCall();
  const { brands } = useSelector((state) => state.stockReducer);

  useEffect(() => {
    getStockData("brands");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Typography variant="h4" color="error" mb={3}>
        Brands
      </Typography>
      <Button variant="contained">New Brand</Button>
      <Grid container sx={(flex, { gap: 2 })}>
        {brands?.map((brand) => {
          return (
            <Grid item key={brand.id}>
              <BrandCard brand={brand} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Firms;
