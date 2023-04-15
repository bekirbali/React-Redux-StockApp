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

const BrandCard = ({ brand, setInfo, handleOpen }) => {
  const { deleteStockData } = useStockCall();

  const handleEdit = () => {
    handleOpen();
    setInfo(brand);
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
          {brand?.name}
        </Typography>
      </CardContent>
      <CardMedia
        sx={{ p: 1, objectFit: "contain", height: "130px" }}
        image={brand?.image}
        title="brand"
      />
      <CardActions sx={flex}>
        <Button size="small">
          <Delete
            sx={btnStyle}
            onClick={() => deleteStockData("brands", brand.id)}
          />
        </Button>
        <Button size="small">
          <Edit sx={btnStyle} onClick={handleEdit} />
        </Button>
      </CardActions>
    </Card>
  );
};

export default BrandCard;
