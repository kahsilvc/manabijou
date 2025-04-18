import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';

describe('Footer Component', () => {
  it('renderiza o logo da loja', () => {
    render(
      <ChakraProvider>
        <Footer />
      </ChakraProvider>
    );
    
    const logoElement = screen.getByText('MANA BIJOU');
    expect(logoElement).toBeInTheDocument();
  });

  it('renderiza a seção de navegação', () => {
    render(
      <ChakraProvider>
        <Footer />
      </ChakraProvider>
    );
    
    const navHeading = screen.getByText('Navegação');
    expect(navHeading).toBeInTheDocument();
    
    const inicioLink = screen.getByText('Início');
    const produtosLink = screen.getByText('Produtos');
    const contatoLink = screen.getByText('Contato');
    
    expect(inicioLink).toBeInTheDocument();
    expect(produtosLink).toBeInTheDocument();
    expect(contatoLink).toBeInTheDocument();
  });

  it('renderiza a seção de contato', () => {
    render(
      <ChakraProvider>
        <Footer />
      </ChakraProvider>
    );
    
    const contactHeading = screen.getByText('Contato');
    expect(contactHeading).toBeInTheDocument();
    
    const whatsappText = screen.getByText('WhatsApp:');
    const emailText = screen.getByText('Email:');
    
    expect(whatsappText).toBeInTheDocument();
    expect(emailText).toBeInTheDocument();
  });

  it('renderiza a seção de newsletter', () => {
    render(
      <ChakraProvider>
        <Footer />
      </ChakraProvider>
    );
    
    const newsletterHeading = screen.getByText('Newsletter');
    expect(newsletterHeading).toBeInTheDocument();
    
    const emailInput = screen.getByPlaceholderText('E-mail');
    const submitButton = screen.getByText('Enviar');
    
    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('renderiza o copyright', () => {
    render(
      <ChakraProvider>
        <Footer />
      </ChakraProvider>
    );
    
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(`© ${currentYear} Mana Bijou. Todos os direitos reservados.`);
    expect(copyrightText).toBeInTheDocument();
  });
});
