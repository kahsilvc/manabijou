import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    brand: {
      100: '#FDE9F6',
      200: '#FBD3ED',
      300: '#F9BEE4',
      400: '#F7A8DB',
      500: '#F4A4DD', // Cor principal - rosa iogurte
      600: '#E083C4',
      700: '#CC62AB',
      800: '#B84192',
      900: '#A42079',
    },
  },
  fonts: {
    heading: 'Poppins, sans-serif',
    body: 'Poppins, sans-serif',
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: 'md',
      },
      variants: {
        solid: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
        outline: {
          borderColor: 'brand.500',
          color: 'brand.500',
          _hover: {
            bg: 'brand.100',
          },
        },
      },
    },
  },
});

export default theme;
