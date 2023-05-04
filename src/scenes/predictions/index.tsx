import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import { useGetKpisQuery } from "@/state/api"
import { Box, Button, Typography, useTheme } from "@mui/material"
import React, { useMemo, useState } from "react"
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Label,
  ResponsiveContainer,
} from "recharts"

import regression, { DataPoint } from "regression"
const Predictions = () => {
  const { palette } = useTheme()
  const [isPredictions, setIsPredictions] = useState(false)
  const { data: kpiData } = useGetKpisQuery()

  const formattedData = useMemo(() => {
    if (!kpiData) return []
    const monthData = kpiData[0].monthlyData
    const formatted: DataPoint[] = monthData.map(({ revenue }, idx) => {
      return [idx, revenue]
    })
    const regressionLine = regression.linear(formatted)

    return monthData.map(({ month, revenue }, idx) => ({
      name: month,
      "Actual Revenue": revenue,
      "Regression Line": regressionLine.points[idx][1],
      "Predicted Revenue": regressionLine.predict(idx + 12)[1],
    }))
  }, [kpiData])
  return (
    <DashboardBox width="100%" height="100%" p="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="0.3rem">
        <Box>
          <Typography variant="h3">Revenue and Preditions</Typography>
          <Typography variant="h6">
            charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,.4)",
          }}
        >
          Show Prediction Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          width={500}
          height={400}
          data={formattedData}
          margin={{ top: 20, right: 75, left: 20, bottom: 80 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={palette.grey[800]}
            vertical={false}
          ></CartesianGrid>
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="Month" offset={-5} position="insideBottom"></Label>
          </XAxis>
          <YAxis
            domain={[12000, 26000]}
            style={{ fontSize: "10px" }}
            axisLine={{ strokeWidth: "0" }}
            tickFormatter={(v) => `$${v}`}
          >
            <Label
              value="Revenue in USD"
              angle={-90}
              position="insideBottom"
            ></Label>
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          ></Line>
          <Line
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              type="monotone"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
              dot={false}
            ></Line>
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  )
}

export default Predictions
