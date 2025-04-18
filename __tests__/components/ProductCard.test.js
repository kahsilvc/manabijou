import { render, screen } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';
import { ChakraProvider } from '@chakra-ui/react';

describe('ProductCard Component', () => {
  const mockProduct = {
    id: '1',
    name: 'Brinco Pérola',
    price: 39.90,
    pixPrice: 38.70,
    image: '/images/product1.jpg',
    category: 'Brincos',
    stock: 5
  };

  it('renderiza o nome do produto corretamente', () => {
    render(
      <ChakraProvider>
        <ProductCard product={mockProduct} />
      </ChakraProvider>
    );
    
    const productName = screen.getByText('Brinco Pérola');
    expect(productName).toBeInTheDocument();
  });

  it('renderiza o preço normal e o preço com desconto PIX', () => {
    render(
      <ChakraProvider>
        <ProductCard product={mockProduct} />
      </ChakraProvider>
    );
    
    const normalPrice = screen.getByText('R$39.90');
    const pixPrice = screen.getByText('R$38.70 com Pix');
    
    expect(normalPrice).toBeInTheDocument();
    expect(pixPrice).toBeInTheDocument();
  });

  it('renderiza a informação de estoque', () => {
    render(
      <ChakraProvider>
        <ProductCard product={mockProduct} />
      </ChakraProvider>
    );
    
    const stockInfo = screen.getByText('Restam 5 em estoque!');
    expect(stockInfo).toBeInTheDocument();
  });

  it('renderiza o botão de compra habilitado quando há estoque', () => {
    render(
      <ChakraProvider>
        <ProductCard product={mockProduct} />
      </ChakraProvider>
    );
    
    const buyButton = screen.getByText('Comprar');
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).not.toBeDisabled();
  });

  it('renderiza o botão de compra desabilitado quando não há estoque', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 };
    
    render(
      <ChakraProvider>
        <ProductCard product={outOfStockProduct} />
      </ChakraProvider>
    );
    
    const buyButton = screen.getByText('Indisponível');
    expect(buyButton).toBeInTheDocument();
    expect(buyButton).toBeDisabled();
  });

  it('renderiza a categoria do produto', () => {
    render(
      <ChakraProvider>
        <ProductCard product={mockProduct} />
      </ChakraProvider>
    );
    
    const category = screen.getByText('Brincos');
    expect(category).toBeInTheDocument();
  });
});
