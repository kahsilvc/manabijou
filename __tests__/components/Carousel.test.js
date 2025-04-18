import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from '../../components/Carousel';
import { ChakraProvider } from '@chakra-ui/react';

describe('Carousel Component', () => {
  const mockItems = [
    {
      id: 1,
      image: '/images/banner1.jpg',
      alt: 'Banner 1',
      content: 'Conteúdo do Banner 1'
    },
    {
      id: 2,
      image: '/images/banner2.jpg',
      alt: 'Banner 2',
      content: 'Conteúdo do Banner 2'
    },
    {
      id: 3,
      image: '/images/banner3.jpg',
      alt: 'Banner 3',
      content: 'Conteúdo do Banner 3'
    }
  ];

  it('renderiza o primeiro slide por padrão', () => {
    render(
      <ChakraProvider>
        <Carousel items={mockItems} autoPlay={false} />
      </ChakraProvider>
    );
    
    const firstSlideContent = screen.getByText('Conteúdo do Banner 1');
    expect(firstSlideContent).toBeInTheDocument();
  });

  it('renderiza os indicadores de slide corretamente', () => {
    render(
      <ChakraProvider>
        <Carousel items={mockItems} autoPlay={false} />
      </ChakraProvider>
    );
    
    // Deve haver 3 indicadores (um para cada slide)
    const indicators = screen.getAllByRole('button');
    expect(indicators.length).toBe(5); // 3 indicadores + 2 botões de navegação
  });

  it('renderiza os botões de navegação', () => {
    render(
      <ChakraProvider>
        <Carousel items={mockItems} autoPlay={false} />
      </ChakraProvider>
    );
    
    const prevButton = screen.getByText('←');
    const nextButton = screen.getByText('→');
    
    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('não renderiza nada quando não há itens', () => {
    const { container } = render(
      <ChakraProvider>
        <Carousel items={[]} autoPlay={false} />
      </ChakraProvider>
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('renderiza um placeholder quando não há imagem', () => {
    const itemsWithoutImage = [
      {
        id: 1,
        alt: 'Sem imagem',
        content: 'Conteúdo sem imagem'
      }
    ];
    
    render(
      <ChakraProvider>
        <Carousel items={itemsWithoutImage} autoPlay={false} />
      </ChakraProvider>
    );
    
    const placeholderText = screen.getByText('Sem imagem');
    expect(placeholderText).toBeInTheDocument();
  });
});
