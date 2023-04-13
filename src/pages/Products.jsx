import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import { btnStyle, flex } from "../styles/globalStyles";
import ProductModal from "../components/modals/ProductModal";
import ProductCard from "../components/ProductCard";

import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";

import { Delete } from "@mui/icons-material";

const Products = () => {
  const { deleteStockData, getProCatBrand } = useStockCall();
  const { products } = useSelector((state) => state.stockReducer);
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

  const columns = [
    {
      field: "id",
      headerName: "#",
      minWidth: 40,
      maxWidth: 70,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "brand",
      headerName: "Brand",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      type: "number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      headerAlign: "center",
      align: "center",
      sortable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      minWidth: 50,
      flex: 1,
      renderCell: (params) => {
        return (
          <GridActionsCellItem
            icon={<Delete />}
            onClick={() => deleteStockData("products", params.id)}
            label="Delete"
            sx={btnStyle}
          />
        );
      },
    },
  ];

  useEffect(() => {
    // getStockData("products");
    // getStockData("categories");
    // getStockData("brands");
    //! Promise All
    getProCatBrand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Typography variant="h4" color="error" mb={3}>
        Products
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Product
      </Button>
      <ProductModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          autoHeight
          rows={products}
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>

      {/* <Grid container sx={(flex, { gap: 2 })}>
        {products?.map((product) => {
          return (
            <Grid item key={product.id}>
              <ProductCard
                product={product}
                handleOpen={handleOpen}
                setInfo={setInfo}
              />
            </Grid>
          );
        })}
      </Grid> */}
    </>
  );
};

export default Products;
