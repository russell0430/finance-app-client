import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type {
  GetKpiResponse,
  GetProductResponse,
  GetTransactionResponse,
} from "./types"
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: "main",
  tagTypes: ["Kpis", "Products", "Transactions"],
  endpoints: (build) => ({
    getKpis: build.query<GetKpiResponse[], void>({
      query: () => "kpi/kpis",
      providesTags: ["Kpis"],
    }),
    getProducts: build.query<GetProductResponse[], void>({
      query: () => "product/products",
      providesTags: ["Products"],
    }),
    getTransactions: build.query<GetTransactionResponse[], void>({
      query: () => "/transaction/transactions",
      providesTags: ["Transactions"],
    }),
  }),
})
export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } =
  api
