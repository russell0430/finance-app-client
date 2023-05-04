export type ExpenseByCategory = {
  salaries: number
  supplies: number
  services: number
}

export type Day = {
  id: string
  date: string
  revenue: number
  expenses: number
}
export type Month = {
  id: string
  month: string
  revenue: number
  expenses: number
  nonOperationalExpenses: number
  operationalExpenses: number
}

export interface GetKpiResponse {
  id: string
  _id: string
  __v: number
  totalProfit: number
  totalRevenue: number
  totalExpenses: number
  expensesByCategory: ExpenseByCategory
  monthlyData: Month[]
  daliyData: Day[]
  createdAt: string
  updatedAt: string
}

export interface GetProductResponse {
  id: string
  _id: string
  __v: number
  price: number
  expense: number
  transactions: string[]
  createdAt: string
  updatedAt: string
}

export interface GetTransactionResponse {
  id: string
  _id: string
  __v: number
  buyer: string
  amount: number
  productIds: string[]
  createdAt: string
  updatedAt: string
}
