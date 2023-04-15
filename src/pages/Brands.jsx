import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import { flex } from "../styles/globalStyles";
import BrandCard from "../components/BrandCard";
import BrandsModal from "../components/modals/BrandsModal";

const Firms = () => {
  const { getStockData } = useStockCall();
  const { brands } = useSelector((state) => state.stockReducer);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    category_id: "",
    brand_id: "",
    name: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    return (
      setOpen(false),
      setInfo({
        category_id: "",
        brand_id: "",
        name: "",
      })
    );
  };

  useEffect(() => {
    getStockData("brands");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Typography variant="h4" color="error" mb={3}>
        Brands
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Brand
      </Button>
      <BrandsModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />
      <Grid container sx={(flex, { gap: 2 })}>
        {brands?.map((brand) => {
          return (
            <Grid item key={brand.id}>
              <BrandCard
                brand={brand}
                setInfo={setInfo}
                handleOpen={handleOpen}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Firms;
