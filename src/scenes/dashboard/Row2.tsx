import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetKpisQuery, useGetProductsQuery } from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material"
import React, { useMemo } from "react"
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  Pie,
  Cell,
  PieChart,
  ScatterChart,
  ZAxis,
  Scatter,
} from "recharts"

const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
]

const Row2 = () => {
  const { data: productData } = useGetProductsQuery()
  const { data: operationalData } = useGetKpisQuery()
  const { palette } = useTheme()
  const operationalExpenses = useMemo(
    () =>
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => ({
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non Operational Expenses": nonOperationalExpenses,
        })
      ),
    [operationalData]
  )
  const productExpensesData = useMemo(
    () =>
      productData &&
      productData.map(({ _id, price, expense }) => ({
        id: _id,
        price,
        expense,
      })),
    [productData]
  )

  const pieColors = [palette.primary[800], palette.primary[300]]
  return (
    <>
      <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer height="100%" width="100%">
          <LineChart
            data={operationalExpenses}
            margin={{ top: 20, right: 0, left: -10, bottom: 70 }}
          >
            <CartesianGrid
              stroke={palette.grey[800]}
              vertical={false}
            ></CartesianGrid>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              yAxisId="left"
              style={{ fontSize: "10px" }}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              yAxisId="right"
              orientation="right"
              style={{ fontSize: "10px" }}
              axisLine={false}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.tertiary[500]}
            ></Line>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.primary.main[500]}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <BoxHeader title="Compaigns and Targets" sideText="+4%" />
        <FlexBetween>
          <PieChart
            width={110}
            height={100}
            margin={{ top: 0, right: -10, left: 10, bottom: 0 }}
          >
            <Pie
              stroke="none"
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={2}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              83
            </Typography>
            <Typography variant="h6">
              Finance goals of the campaign that is desired
            </Typography>
          </Box>
          <Box flexBasis="40%">
            <Typography variant="h5">Losses in Revenue</Typography>
            <Typography variant="h6">Losses are down 25%</Typography>
            <Typography mt="0.4rem" variant="h5">
              Profit Margins
            </Typography>
            <Typography variant="h6">
              Margins are up by 30% from last month.
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="f">
        <BoxHeader
          title="Product Prices vs Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 25, bottom: 70, left: -10 }}>
            <CartesianGrid />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `${v}`} />
            <Scatter
              name="Product Expenses Ratio"
              data={productExpensesData}
              fill={palette.tertiary[500]}
            ></Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2
