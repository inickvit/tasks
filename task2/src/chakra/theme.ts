import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#ff3c00',
    },
  },
  fonts: {
    body: 'Open Sans, Sans Serif',
  },
  styles: {
    global: () => {
      body: {
        bg: 'gray.200'
      }
    }
  },
  components: {
 
  }
})
