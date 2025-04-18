import { render, screen } from '@testing-library/react';
import AdminLayout from '../../components/AdminLayout';
import { ChakraProvider } from '@chakra-ui/react';

// Mock do useRouter
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/admin',
      pathname: '/admin',
      query: '',
      asPath: '/admin',
    };
  },
}));

// Mock do useDisclosure
jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');
  return {
    __esModule: true,
    ...originalModule,
    useDisclosure: () => ({
      isOpen: false,
      onOpen: jest.fn(),
      onClose: jest.fn()
    })
  };
});

// Mock do window.innerWidth para simular desktop
Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1200
});

// Mock do addEventListener para o evento resize
window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

describe('AdminLayout Component', () => {
  it('renderiza o título da página corretamente', () => {
    render(
      <ChakraProvider>
        <AdminLayout title="Teste de Título">
          <div>Conteúdo de teste</div>
        </AdminLayout>
      </ChakraProvider>
    );
    
    // Verificar se o título está no documento
    expect(document.title).toBe('Teste de Título - Mana Bijou Admin');
  });

  it('renderiza o logo do painel administrativo', () => {
    render(
      <ChakraProvider>
        <AdminLayout>
          <div>Conteúdo de teste</div>
        </AdminLayout>
      </ChakraProvider>
    );
    
    const logoElement = screen.getByText('Mana Bijou Admin');
    expect(logoElement).toBeInTheDocument();
  });

  it('renderiza os links de navegação do menu', () => {
    render(
      <ChakraProvider>
        <AdminLayout>
          <div>Conteúdo de teste</div>
        </AdminLayout>
      </ChakraProvider>
    );
    
    const dashboardLink = screen.getByText('Dashboard');
    const produtosLink = screen.getByText('Produtos');
    const categoriasLink = screen.getByText('Categorias');
    const pedidosLink = screen.getByText('Pedidos');
    
    expect(dashboardLink).toBeInTheDocument();
    expect(produtosLink).toBeInTheDocument();
    expect(categoriasLink).toBeInTheDocument();
    expect(pedidosLink).toBeInTheDocument();
  });

  it('renderiza o botão para visualizar a loja', () => {
    render(
      <ChakraProvider>
        <AdminLayout>
          <div>Conteúdo de teste</div>
        </AdminLayout>
      </ChakraProvider>
    );
    
    const verLojaButton = screen.getByText('Ver Loja');
    expect(verLojaButton).toBeInTheDocument();
  });

  it('renderiza o conteúdo filho corretamente', () => {
    render(
      <ChakraProvider>
        <AdminLayout>
          <div data-testid="conteudo-teste">Conteúdo de teste</div>
        </AdminLayout>
      </ChakraProvider>
    );
    
    const conteudo = screen.getByTestId('conteudo-teste');
    expect(conteudo).toBeInTheDocument();
    expect(conteudo).toHaveTextContent('Conteúdo de teste');
  });
});
