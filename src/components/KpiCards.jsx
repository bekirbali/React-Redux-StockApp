import {
  MonetizationOnOutlined,
  PaymentsOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
import { amber, deepPurple, pink } from "@mui/material/colors";
import { useSelector } from "react-redux";

const KpiCards = () => {
  const { sales } = useSelector((state) => state.stockReducer);

  const totalSales = sales
    ?.map((item) => Number(item.price_total))
    .reduce((sum, item) => sum + item, 0);

  const data = [
    {
      id: 1,
      icon: <MonetizationOnOutlined sx={{ fontSize: "2.5rem" }} />,
      title: "sales",
      value: `${totalSales}`,
      color: deepPurple[600],
      bgColor: deepPurple[100],
    },
    {
      id: 2,
      icon: <ShoppingCart sx={{ fontSize: "2.5rem" }} />,
      title: "profit",
      value: "$30000",
      color: pink[600],
      bgColor: pink[100],
    },
    {
      id: 3,
      icon: <PaymentsOutlined sx={{ fontSize: "2.5rem" }} />,
      title: "purchases",
      value: "$20000",
      color: amber[600],
      bgColor: amber[100],
    },
  ];

  return (
    <Grid container justifyContent={"center"} spacing={3}>
      {data.map((item) => {
        return (
          <Grid
            key={item.id}
            item
            sm={12}
            md={6}
            lg={4}
            sx={{ minWidth: "250px" }}
          >
            <Paper elevation={3}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <Avatar
                  sx={{
                    bgcolor: item.bgColor,
                    color: item.color,
                    width: 60,
                    height: 60,
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="button">{item.title}</Typography>
                  <Typography variant="h4">{item.value}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default KpiCards;
