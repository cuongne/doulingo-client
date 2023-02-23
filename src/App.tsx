import Header from "@/pages/Header"
import AppRoutes from "@/routes"
import {
  ChakraProvider, theme
} from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import './app.scss'
export const App = () => (
  <ChakraProvider theme={theme}>
    <div className="container">
      <BrowserRouter>
        <Header />
        <AppRoutes />
      </BrowserRouter>
    </div>
  </ChakraProvider>
)
