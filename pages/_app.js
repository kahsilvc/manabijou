import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '../styles/globals.css';

// Tema personalizado com a cor rosa iogurte (#F4A4DD)
const theme = extendTheme({
  colors: {
    brand: {
      100: '#FFF0F8',
      200: '#FFE1F2',
      300: '#FFD1EC',
      400: '#FFC2E6',
      500: '#F4A4DD', // Cor principal
      600: '#E494CD',
      700: '#D484BD',
      800: '#C474AD',
      900: '#B4649D',
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
        primary: {
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: 'brand.600',
          },
        },
      },
      defaultProps: {
        variant: 'primary',
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
