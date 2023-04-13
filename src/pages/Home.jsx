import { Typography } from "@mui/material";
import KpiCards from "../components/KpiCards";
import Charts from "../components/Charts";
import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";

const Home = () => {
  const { getStockData } = useStockCall();

  useEffect(() => {
    getStockData("sales");
    getStockData("purchases");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Typography variant="h4" color="error" mb={3}>
        Dashboard
      </Typography>
      <KpiCards />
      <Charts />
    </div>
  );
};

export default Home;
