import React from 'react';
import { Box, Container, Flex, Heading, Text, Image, Button, Grid, Badge, SimpleGrid } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

// Componentes que serão criados posteriormente
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import Carousel from '../components/Carousel';

export default function Home() {
  // Dados de exemplo para o carrossel
  const carouselItems = [
    {
      id: 1,
      image: '/images/banner1.jpg',
      alt: 'Mana Bijou - Bijuterias em prata 925 e aço inoxidável',
    },
    {
      id: 2,
      image: '/images/banner2.jpg',
      alt: 'Coleção de brincos e colares',
    },
  ];

  // Dados de exemplo para produtos em destaque
  const featuredProducts = [
    {
      id: 1,
      name: 'Brinco Pérola',
      price: 39.90,
      pixPrice: 38.70,
      image: '/images/product1.jpg',
      category: 'Brincos',
      stock: 5,
    },
    {
      id: 2,
      name: 'Colar Coração',
      price: 49.90,
      pixPrice: 48.40,
      image: '/images/product2.jpg',
      category: 'Colares',
      stock: 3,
    },
    {
      id: 3,
      name: 'Pulseira Trevo',
      price: 45.90,
      pixPrice: 44.52,
      image: '/images/product3.jpg',
      category: 'Pulseiras',
      stock: 4,
    },
    {
      id: 4,
      name: 'Anel Ajustável',
      price: 42.90,
      pixPrice: 41.61,
      image: '/images/product4.jpg',
      category: 'Anéis',
      stock: 6,
    },
  ];

  // Categorias de produtos
  const categories = [
    { id: 1, name: 'Brincos', image: '/images/category-brincos.jpg' },
    { id: 2, name: 'Colares', image: '/images/category-colares.jpg' },
    { id: 3, name: 'Pulseiras', image: '/images/category-pulseiras.jpg' },
    { id: 4, name: 'Anéis', image: '/images/category-aneis.jpg' },
    { id: 5, name: 'Gargantilhas', image: '/images/category-gargantilhas.jpg' },
    { id: 6, name: 'Alianças', image: '/images/category-aliancas.jpg' },
  ];

  return (
    <>
      <Head>
        <title>Mana Bijou - Bijuterias em Prata 925 e Aço Inoxidável</title>
        <meta name="description" content="Loja online de bijuterias em prata 925 e aço inoxidável. Brincos, colares, pulseiras, anéis e muito mais." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Box as="main">
        {/* Carrossel */}
        <Box mb={8}>
          {/* Placeholder para o componente Carousel */}
          <Box 
            height={["200px", "300px", "400px"]} 
            bg="brand.500" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            color="white"
            fontSize="xl"
          >
            Carrossel de Imagens (será implementado)
          </Box>
        </Box>

        {/* Categorias */}
        <Container maxW="container.xl" mb={12}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Categorias
          </Heading>
          <SimpleGrid columns={[2, 3, 6]} spacing={4}>
            {categories.map((category) => (
              <Link href={`/categoria/${category.id}`} key={category.id}>
                <Box 
                  borderRadius="lg" 
                  overflow="hidden" 
                  bg="brand.100"
                  textAlign="center"
                  transition="transform 0.3s"
                  _hover={{ transform: 'translateY(-5px)' }}
                >
                  <Box 
                    height="120px" 
                    bg="brand.200" 
                    display="flex" 
                    alignItems="center" 
                    justifyContent="center"
                  >
                    {category.name}
                  </Box>
                  <Box p={3}>
                    <Text fontWeight="bold">{category.name}</Text>
                  </Box>
                </Box>
              </Link>
            ))}
          </SimpleGrid>
        </Container>

        {/* Produtos em Destaque */}
        <Container maxW="container.xl" mb={12}>
          <Heading as="h2" size="xl" mb={6} textAlign="center">
            Destaques
          </Heading>
          <SimpleGrid columns={[1, 2, 4]} spacing={6}>
            {featuredProducts.map((product) => (
              <Box 
                key={product.id}
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                bg="white"
                className="product-card"
              >
                <Box height="200px" bg="gray.100" position="relative">
                  <Text 
                    position="absolute" 
                    top="0" 
                    right="0" 
                    bg="brand.500" 
                    color="white" 
                    px={2} 
                    py={1}
                    borderBottomLeftRadius="md"
                  >
                    {product.category}
                  </Text>
                </Box>
                <Box p={4}>
                  <Heading as="h3" size="md" mb={2}>
                    {product.name}
                  </Heading>
                  <Text fontSize="lg" fontWeight="bold" mb={1}>
                    R${product.price.toFixed(2)}
                  </Text>
                  <Text fontSize="md" color="brand.500" fontWeight="bold" mb={2}>
                    R${product.pixPrice.toFixed(2)} com Pix
                  </Text>
                  <Text fontSize="sm" color="gray.600" mb={4}>
                    {product.stock > 0 
                      ? `Restam ${product.stock} em estoque!` 
                      : 'Produto esgotado'}
                  </Text>
                  <Button width="full" colorScheme="pink" bg="brand.500">
                    Comprar
                  </Button>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        </Container>

        {/* Newsletter */}
        <Box bg="brand.100" py={12} mb={12}>
          <Container maxW="container.xl">
            <Flex direction={["column", "row"]} align="center" justify="center">
              <Box textAlign={["center", "left"]} mb={[6, 0]} mr={[0, 8]}>
                <Heading as="h3" size="lg" mb={2}>
                  Newsletter
                </Heading>
                <Text>Quer receber nossas ofertas? Cadastre-se e comece a recebê-las!</Text>
              </Box>
              <Flex>
                <Box 
                  as="input" 
                  placeholder="E-mail" 
                  p={2} 
                  borderRadius="md" 
                  border="1px solid" 
                  borderColor="gray.300"
                  mr={2}
                />
                <Button>Enviar</Button>
              </Flex>
            </Flex>
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
