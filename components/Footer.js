import { Box, Container, Flex, Text, Link as ChakraLink, SimpleGrid, Input, Button, VStack, HStack, Icon } from '@chakra-ui/react';
import Link from 'next/link';

const Footer = () => {
  // Links de navegação
  const navLinks = [
    { name: 'Início', href: '/' },
    { name: 'Produtos', href: '/produtos' },
    { name: 'Quem Somos', href: '/quem-somos' },
    { name: 'Perguntas Frequentes', href: '/perguntas-frequentes' },
    { name: 'Material das Peças', href: '/material-das-pecas' },
    { name: 'Contato', href: '/contato' },
    { name: 'Garantia', href: '/garantia' },
  ];

  // Informações de contato
  const contactInfo = [
    { type: 'WhatsApp', value: '(XX) XXXXX-XXXX' },
    { type: 'Email', value: 'contato@manabijou.com.br' },
    { type: 'Endereço', value: 'Brasil' },
  ];

  return (
    <Box as="footer" bg="gray.800" color="white" py={10}>
      <Container maxW="container.xl">
        <SimpleGrid columns={[1, 2, 4]} spacing={8} mb={10}>
          {/* Logo e Sobre */}
          <Box>
            <Box 
              width="150px" 
              height="50px" 
              bg="brand.500" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              fontWeight="bold"
              borderRadius="md"
              mb={4}
            >
              MANA BIJOU
            </Box>
            <Text fontSize="sm" mb={4}>
              Bijuterias em prata 925 e aço inoxidável. Brincos, colares, pulseiras, braceletes, anéis, alianças e gargantilhas.
            </Text>
          </Box>

          {/* Links de Navegação */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Navegação
            </Text>
            <VStack align="flex-start" spacing={2}>
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <ChakraLink fontSize="sm" _hover={{ color: 'brand.500' }}>
                    {link.name}
                  </ChakraLink>
                </Link>
              ))}
            </VStack>
          </Box>

          {/* Contato */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Contato
            </Text>
            <VStack align="flex-start" spacing={3}>
              {contactInfo.map((info) => (
                <HStack key={info.type} spacing={2}>
                  <Text fontSize="sm" fontWeight="medium">
                    {info.type}:
                  </Text>
                  <Text fontSize="sm">
                    {info.value}
                  </Text>
                </HStack>
              ))}
            </VStack>
          </Box>

          {/* Newsletter */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Newsletter
            </Text>
            <Text fontSize="sm" mb={3}>
              Quer receber nossas ofertas? Cadastre-se e comece a recebê-las!
            </Text>
            <Flex>
              <Input 
                placeholder="E-mail" 
                size="md" 
                bg="white" 
                color="gray.800"
                borderRightRadius={0}
                _focus={{ borderColor: 'brand.500' }}
              />
              <Button 
                bg="brand.500" 
                color="white" 
                borderLeftRadius={0}
                _hover={{ bg: 'brand.600' }}
              >
                Enviar
              </Button>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* Redes Sociais */}
        <Flex 
          justify="center" 
          align="center" 
          borderTop="1px" 
          borderColor="gray.700" 
          pt={6}
        >
          <HStack spacing={4}>
            <Box 
              as="a" 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              width="40px"
              height="40px"
              borderRadius="full"
              bg="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.1)' }}
            >
              <Text>IG</Text>
            </Box>
            <Box 
              as="a" 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              width="40px"
              height="40px"
              borderRadius="full"
              bg="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.1)' }}
            >
              <Text>FB</Text>
            </Box>
            <Box 
              as="a" 
              href="https://wa.me/5500000000000" 
              target="_blank" 
              rel="noopener noreferrer"
              width="40px"
              height="40px"
              borderRadius="full"
              bg="brand.500"
              display="flex"
              alignItems="center"
              justifyContent="center"
              transition="transform 0.3s"
              _hover={{ transform: 'scale(1.1)' }}
            >
              <Text>WA</Text>
            </Box>
          </HStack>
        </Flex>

        {/* Copyright */}
        <Text fontSize="sm" textAlign="center" mt={6}>
          © {new Date().getFullYear()} Mana Bijou. Todos os direitos reservados.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
