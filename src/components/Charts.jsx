import { Grid } from "@mui/material";
import { Card, Title, LineChart } from "@tremor/react";
import { useSelector } from "react-redux";

const dataFormatter = (number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stockReducer);
  const salesData = sales?.map((item) => {
    return {
      date: item.createds,
      sale: Number(item.price_total),
    };
  });
  const purchasesData = purchases?.map((item) => {
    return {
      date: item.created,
      purchases: Number(item.price_total),
    };
  });
  return (
    <Grid container justifyContent="center" spacing={2} mt={3}>
      <Grid item xs={12} sm={12} md={6}>
        <Card className="mt-6">
          <Title>Total Sales</Title>
          <LineChart
            className="mt-6"
            data={salesData}
            index="date"
            categories={["sale"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
          />
        </Card>
      </Grid>
      <Grid item xs={12} sm={12} md={6}>
        <Card className="mt-6">
          <Title>Total Purchases</Title>
          <LineChart
            className="mt-6"
            data={purchasesData}
            index="date"
            categories={["purchases"]}
            colors={["blue"]}
            valueFormatter={dataFormatter}
          />
        </Card>
      </Grid>
    </Grid>
  );
};

export default Charts;
