import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { modal } from "../../styles/globalStyles";
import { Button, TextField } from "@mui/material";
import useStockCall from "../../hooks/useStockCall";

const BrandsModal = ({ handleClose, open, info, setInfo }) => {
  const { postStockData, putStockData } = useStockCall();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info.id) {
      putStockData("brands", info);
    } else {
      postStockData("brands", info);
    }
    handleClose();
    setInfo({ image: "", name: "" });
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
              label="Brand Name"
              name="name"
              id="name"
              type="text"
              variant="outlined"
              value={info?.name || ""}
              onChange={handleChange}
            />
            <TextField
              label="Image Url"
              name="image"
              id="image"
              type="url"
              variant="outlined"
              value={info?.image || ""}
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

export default BrandsModal;
