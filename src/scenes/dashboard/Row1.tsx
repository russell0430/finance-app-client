import DashboardBox from "@/components/DashboardBox"
import { useGetKpisQuery } from "@/state/api"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  Line,
  Legend,
  LineChart,
  Bar,
  BarChart,
} from "recharts"
import React, { useMemo } from "react"
import { useTheme } from "@mui/material"
import BoxHeader from "@/components/BoxHeader"

const Row1 = () => {
  const { data } = useGetKpisQuery()
  const { palette } = useTheme()

  const revenueExpenses = useMemo(
    () =>
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
        expenses: expenses,
      })),
    [data]
  )

  const revenueProfit = useMemo(
    () =>
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
        profit: (revenue - expenses).toFixed(2),
      })),
    [data]
  )

  const revenue = useMemo(
    () =>
      data &&
      data[0].monthlyData.map(({ month, revenue }) => ({
        name: month.substring(0, 3),
        revenue: revenue,
      })),
    [data]
  )

  return (
    <>
      <DashboardBox gridArea="a">
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer height="100%" width="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{ top: 50, right: 25, left: -10, bottom: 70 }}
          >
            <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                ></stop>
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                ></stop>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                ></stop>
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                ></stop>
              </linearGradient>
            </defs>
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              tickLine={false}
              style={{ fontSize: "10px" }}
              axisLine={{ strokeWidth: "0" }}
              domain={[8000, 23000]}
            />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main}
              dot={true}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            ></Area>
            <Area
              type="monotone"
              dataKey="expenses"
              stroke={palette.primary.main}
              dot={true}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            ></Area>
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      {/* Box b */}
      <DashboardBox gridArea="b">
        <BoxHeader
          title="Profit and Revenue"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />
        <ResponsiveContainer height="100%" width="100%">
          <LineChart
            width={500}
            height={400}
            data={revenueProfit}
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
            <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="profit"
              stroke={palette.tertiary[500]}
            ></Line>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke={palette.primary.main[500]}
            ></Line>
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
        <BoxHeader
          title="Revenue Month by Month"
          subtitle="this is a subtitle for the bar chart"
          sideText="+4%"
        />
        <ResponsiveContainer>
          <BarChart
            margin={{ top: 17, right: 15, left: -5, bottom: 58 }}
            data={revenue}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Legend />
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.8}
                ></stop>
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                ></stop>
              </linearGradient>
            </defs>
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row1
