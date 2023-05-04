import BoxHeader from "@/components/BoxHeader"
import DashboardBox from "@/components/DashboardBox"
import FlexBetween from "@/components/FlexBetween"
import {
  useGetTransactionsQuery,
  useGetProductsQuery,
  useGetKpisQuery,
} from "@/state/api"
import { Box, Typography, useTheme } from "@mui/material"
import { DataGrid, GridCellParams } from "@mui/x-data-grid"

import React, { useMemo } from "react"
import { Cell, Pie, PieChart } from "recharts"

const Row3 = () => {
  const { palette } = useTheme()
  const { data: kpiData } = useGetKpisQuery()
  const { data: productData } = useGetProductsQuery()
  const { data: transactionData } = useGetTransactionsQuery()

  const productColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "expenses",
      headerName: "Expenses",
      flex: 0,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ]

  const transactionColumns = [
    { field: "_id", headerName: "id", flex: 1 },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      headerName: "count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as string[]).length,
    },
  ]

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses

      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]: [string, number]) => [
          { name: key, value },
          { name: `${key} of Total`, value: totalExpenses - value },
        ]
      )
    } else return []
  }, [kpiData])

  const pieColors = [palette.primary[800], palette.primary[500]]
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Product"
          subtitle={`${productData?.length || 0} product(s)`}
          sideText={""}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="65%"
          sx={{
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            columns={productColumns}
            rows={productData || []}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="List of Product"
          subtitle={`${productData?.length || 0} product(s)`}
          sideText={`${transactionData?.length || 0} latest transaction(s)`}
        />
        <Box
          mt="1rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": { color: palette.grey[300], border: "none" },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader title="Expense Breakdown By Category" sideText="+4%" />
        <FlexBetween gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData.map((data, idx) => (
            <Box key={`${data[0].name}-${idx}`}>
              <PieChart width={110} height={100}>
                <Pie
                  data={data}
                  stroke="none"
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={pieColors[idx]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explaination Data"
          sideText="+4%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
        >
          <Box
            height="15px"
            bgcolor={palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          This is a message for you to read,it shows the conclusion. And it
          should be long enough to fulfill the rest content of the box.
          Obviously I just can not :)
        </Typography>
      </DashboardBox>
    </>
  )
}

export default Row3
