import Header from "@/pages/Header"
import AppRoutes from "@/routes"
import {
  ChakraProvider, extendTheme
} from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import './app.scss'
export const App = () => {
  const PopoverCustomStyle = {
    // The styles all PopoverCustoms have in common
    baseStyle: {
      content: {
        bg: "gray.100",
        fontSize: "md",
      },
    },
    // Two sizes: sm and md
    sizes: {
      sm: {
        content: {
          fontSize: "sm",
        },
      },
      md: {
        content: {
          fontSize: "md",
        },
      },
    },
  };

  // Add this style config to your theme object
  const theme = extendTheme({
    components: {
      PopoverCustom: PopoverCustomStyle,
    },
  });
  return (

    <ChakraProvider theme={theme}>
      <div className="container">
        <BrowserRouter>
          <Header />
          <AppRoutes />
        </BrowserRouter>
      </div>
    </ChakraProvider>
  )
}
