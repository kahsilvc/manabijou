import React from 'react';
import { Box, Container, Flex, Text, Input, Button, Grid, Link as ChakraLink, VStack, HStack, Divider, useColorModeValue, Image } from '@chakra-ui/react';
import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box as="footer" bg="gray.100" color="gray.700" py={10}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
          {/* Logo e informações */}
          <Box>
            <Link href="/" passHref>
              <Box as="a" mb={4}>
                <Image 
                  src="/images/logo.png" 
                  alt="Mana Bijou" 
                  width="150px" 
                  height="auto"
                />
              </Box>
            </Link>
            <Text fontSize="sm" mb={4}>
              Bijuterias em prata 925 e aço inoxidável de alta qualidade. Brincos, colares, pulseiras e muito mais.
            </Text>
            <HStack spacing={4} mt={4}>
              <Box 
                as="a" 
                href="https://instagram.com/manabijou" 
                target="_blank" 
                rel="noopener noreferrer"
                width="32px"
                height="32px"
                borderRadius="full"
                bg="brand.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                IG
              </Box>
              <Box 
                as="a" 
                href="https://facebook.com/manabijou" 
                target="_blank" 
                rel="noopener noreferrer"
                width="32px"
                height="32px"
                borderRadius="full"
                bg="brand.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                FB
              </Box>
              <Box 
                as="a" 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                width="32px"
                height="32px"
                borderRadius="full"
                bg="brand.500"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="white"
              >
                WA
              </Box>
            </HStack>
          </Box>

          {/* Navegação */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Navegação
            </Text>
            <VStack align="flex-start" spacing={2}>
              <ChakraLink as={Link} href="/">
                Início
              </ChakraLink>
              <ChakraLink as={Link} href="/produtos">
                Produtos
              </ChakraLink>
              <ChakraLink as={Link} href="/quem-somos">
                Quem Somos
              </ChakraLink>
              <ChakraLink as={Link} href="/contato">
                Contato
              </ChakraLink>
              <ChakraLink as={Link} href="/politica-de-privacidade">
                Política de Privacidade
              </ChakraLink>
              <ChakraLink as={Link} href="/termos-de-uso">
                Termos de Uso
              </ChakraLink>
            </VStack>
          </Box>

          {/* Contato */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Contato
            </Text>
            <VStack align="flex-start" spacing={3}>
              <Box>
                <Text fontWeight="medium">WhatsApp:</Text>
                <Text>(11) 99999-9999</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Email:</Text>
                <Text>contato@manabijou.com.br</Text>
              </Box>
              <Box>
                <Text fontWeight="medium">Horário de Atendimento:</Text>
                <Text>Segunda a Sexta: 9h às 18h</Text>
              </Box>
            </VStack>
          </Box>

          {/* Newsletter */}
          <Box>
            <Text fontWeight="bold" fontSize="lg" mb={4}>
              Newsletter
            </Text>
            <Text mb={4}>
              Cadastre-se para receber novidades, lançamentos e ofertas exclusivas.
            </Text>
            <Flex as="form">
              <Input 
                placeholder="E-mail" 
                borderRightRadius={0}
                borderColor="gray.300"
                _focus={{ borderColor: 'brand.500' }}
              />
              <Button 
                type="submit" 
                borderLeftRadius={0} 
                bg="brand.500" 
                color="white"
                _hover={{ bg: 'brand.600' }}
              >
                Enviar
              </Button>
            </Flex>
          </Box>
        </Grid>

        <Divider my={8} borderColor="gray.300" />

        {/* Copyright */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          justify="space-between" 
          align={{ base: "center", md: "center" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Text fontSize="sm">
            © {currentYear} Mana Bijou. Todos os direitos reservados.
          </Text>
          <Text fontSize="sm" mt={{ base: 2, md: 0 }}>
            Desenvolvido com ❤️ por Manus
          </Text>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
