import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import { useMemo } from "react"
import { themeSettings } from "./theme"
import { Routes, Route, BrowserRouter } from "react-router-dom"

import Navbar from "@/scenes/navbar"
import Dashboard from "./scenes/dashboard"
import Predictions from "./scenes/predictions"

function App() {
  const theme = useMemo(() => createTheme(themeSettings), [])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" index element={<Dashboard />}></Route>
              <Route path="predictions" element={<Predictions />}></Route>
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
