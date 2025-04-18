import { render, screen } from '@testing-library/react';
import Header from '../../components/Header';
import { ChakraProvider } from '@chakra-ui/react';

// Mock do useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
    };
  },
}));

describe('Header Component', () => {
  it('renderiza o logo da loja', () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );
    
    const logoElement = screen.getByText('MANA BIJOU');
    expect(logoElement).toBeInTheDocument();
  });

  it('renderiza o campo de busca', () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );
    
    const searchInput = screen.getByPlaceholderText('O que você está buscando?');
    expect(searchInput).toBeInTheDocument();
  });

  it('renderiza os links de navegação', () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );
    
    const inicioLink = screen.getByText('Início');
    const produtosLink = screen.getByText('Produtos');
    
    expect(inicioLink).toBeInTheDocument();
    expect(produtosLink).toBeInTheDocument();
  });

  it('renderiza o link do carrinho', () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );
    
    const carrinhoLink = screen.getByText('Carrinho');
    expect(carrinhoLink).toBeInTheDocument();
  });
});
