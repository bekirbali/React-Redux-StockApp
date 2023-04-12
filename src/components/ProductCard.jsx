import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Delete, Edit } from "@mui/icons-material";
import { btnStyle, flex } from "../styles/globalStyles";
import useStockCall from "../hooks/useStockCall";

const ProductCard = ({ product, handleOpen, setInfo }) => {
  const { deleteStockData } = useStockCall();

  const handleEdit = () => {
    handleOpen();
  };

  return (
    <Card
      sx={{
        marginTop: 2,
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product?.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.address}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ p: 1, objectFit: "contain", height: "130px" }}
        image={product?.image}
        title="product"
      />
      <Typography variant="body2" color="text.secondary">
        Phone: {product?.phone}
      </Typography>
      <CardActions sx={flex}>
        <Button size="small">
          <Delete
            sx={btnStyle}
            onClick={() => deleteStockData("products", product.id)}
          />
        </Button>
        <Button size="small">
          <Edit sx={btnStyle} onClick={handleEdit} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
