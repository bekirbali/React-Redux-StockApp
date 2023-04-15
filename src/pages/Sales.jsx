import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import useStockCall from "../hooks/useStockCall";
import { useSelector } from "react-redux";
import { btnStyle } from "../styles/globalStyles";

import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";

import { Delete, Edit } from "@mui/icons-material";
import SaleModal from "../components/modals/SaleModal";

const Sales = () => {
  const { deleteStockData, getProCatBrand, getStockData } = useStockCall();
  const { sales } = useSelector((state) => state.stockReducer);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({
    product_id: "",
    brand_id: "",
    quantity: "",
    price: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    return (
      setOpen(false),
      setInfo({
        brand_id: "",
        product_id: "",
        quantity: "",
        price: "",
      })
    );
  };

  const columns = [
    {
      field: "createds",
      headerName: "Date",
      minWidth: 150,
      maxWidth: 170,
      flex: 1,
      headerAlign: "center",
      align: "center",
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
      field: "product",
      headerName: "Product",
      headerAlign: "center",
      align: "center",
      type: "number",
      minWidth: 150,
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      headerAlign: "center",
      align: "center",
      sortable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "center",
      align: "center",
      sortable: true,
      minWidth: 100,
      flex: 1,
    },
    {
      field: "price_total",
      headerName: "Amount",
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
      renderCell: ({ id, row: { product_id, brand_id, quantity, price } }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<Edit />}
            onClick={() => {
              handleOpen();
              setInfo({ id, product_id, quantity, brand_id, price });
            }}
            label="Edit"
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<Delete />}
            onClick={() => deleteStockData("products", id)}
            label="Delete"
            sx={btnStyle}
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    //! Promise All
    getProCatBrand();
    getStockData("sales");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Typography variant="h4" color="error" mb={3}>
        Sales
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Sale
      </Button>
      <SaleModal
        open={open}
        handleClose={handleClose}
        info={info}
        setInfo={setInfo}
      />

      <Box sx={{ width: "100%", marginTop: "1rem" }}>
        <DataGrid
          autoHeight
          rows={sales}
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
    </>
  );
};

export default Sales;
