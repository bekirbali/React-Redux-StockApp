import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modal } from "../../styles/globalStyles";
import { Button, TextField } from "@mui/material";
import useStockCall from "../../hooks/useStockCall";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";

const SaleModal = ({ handleClose, open, info, setInfo }) => {
  const { postStockData, putStockData } = useStockCall();
  const { products, brands } = useSelector((state) => state.stockReducer);

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    setInfo({ ...info, [name]: Number(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putStockData("sales", info);
    } else {
      postStockData("sales", info);
    }
    handleClose();
    setInfo({ product_id: "", brand_id: "", quantity: "", price: "" });
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modal}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
            component="form"
            onSubmit={handleSubmit}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Brand</InputLabel>
              <Select
                labelId="brand"
                id="brand"
                name="brand_id"
                value={info?.brand_id}
                label="Brand"
                onChange={handleChange}
              >
                {brands?.map((brand) => {
                  return (
                    <MenuItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Product</InputLabel>
              <Select
                labelId="product"
                id="product"
                name="product_id"
                value={info?.product_id}
                label="Product"
                onChange={handleChange}
              >
                {products?.map((product) => {
                  return (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <TextField
              label="Quantity"
              name="quantity"
              id="quantity"
              type="number"
              variant="outlined"
              value={info?.quantity}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              name="price"
              id="price"
              type="number"
              variant="outlined"
              value={info?.price}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained">
              Submit Form
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SaleModal;
