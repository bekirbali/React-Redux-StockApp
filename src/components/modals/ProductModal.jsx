import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modal } from "../../styles/globalStyles";
import { Button, TextField } from "@mui/material";
import useStockCall from "../../hooks/useStockCall";

const ProductModal = ({ handleClose, open, info, setInfo }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };
  const { postStockData, putStockData } = useStockCall();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putStockData("products", info);
    } else {
      postStockData("products", info);
    }
    handleClose();
    setInfo({ name: "", phone: "", address: "", image: "" });
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
            <TextField
              label="Firm Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info?.name}
              onChange={handleChange}
            />
            <TextField
              label="Phone"
              name="phone"
              id="phone"
              type="tel"
              variant="outlined"
              value={info?.phone}
              onChange={handleChange}
            />
            <TextField
              label="Address"
              name="address"
              id="address"
              type="text"
              variant="outlined"
              value={info?.address}
              onChange={handleChange}
            />
            <TextField
              label="Image"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info?.image}
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

export default ProductModal;
