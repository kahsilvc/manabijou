import React from 'react';
import { Box, Image, Badge, Text, Button, Flex, Stack } from '@chakra-ui/react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const { id, name, price, pixPrice, image, category, stock } = product;
  const isOutOfStock = stock <= 0;

  return (
    <Box 
      borderWidth="1px" 
      borderRadius="lg" 
      overflow="hidden" 
      boxShadow="md"
      bg="white"
      transition="transform 0.3s"
      _hover={{ transform: 'translateY(-5px)' }}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      {/* Imagem do produto */}
      <Box position="relative">
        <Link href={`/produto/${id}`} passHref>
          <Box as="a">
            <Image 
              src={image || '/images/placeholder.jpg'} 
              alt={name}
              fallbackSrc="/images/placeholder.jpg"
              height="200px"
              width="100%"
              objectFit="cover"
            />
          </Box>
        </Link>
        
        {/* Badge de categoria */}
        <Badge 
          position="absolute" 
          top={2} 
          right={2} 
          colorScheme="pink" 
          bg="brand.500"
          color="white"
          borderRadius="full"
          px={2}
          py={1}
        >
          {category}
        </Badge>
      </Box>

      {/* Informações do produto */}
      <Flex direction="column" p={4} flex="1" justifyContent="space-between">
        <Box>
          <Link href={`/produto/${id}`} passHref>
            <Text 
              as="a"
              fontWeight="semibold" 
              fontSize="lg" 
              lineHeight="tight" 
              mb={2}
              noOfLines={2}
            >
              {name}
            </Text>
          </Link>

          {/* Preços */}
          <Stack spacing={1} mt={2}>
            <Text fontSize="lg" fontWeight="bold">
              R${price.toFixed(2)}
            </Text>
            <Text fontSize="md" color="brand.500" fontWeight="bold">
              R${pixPrice.toFixed(2)} com Pix
            </Text>
          </Stack>

          {/* Estoque */}
          <Text fontSize="sm" color={isOutOfStock ? "red.500" : "green.500"} mt={2}>
            {isOutOfStock ? 'Produto esgotado' : `Restam ${stock} em estoque!`}
          </Text>
        </Box>

        {/* Botão de compra */}
        <Button 
          mt={4}
          colorScheme="pink" 
          bg="brand.500"
          _hover={{ bg: 'brand.600' }}
          isDisabled={isOutOfStock}
        >
          {isOutOfStock ? 'Indisponível' : 'Comprar'}
        </Button>
      </Flex>
    </Box>
  );
};

export default ProductCard;
