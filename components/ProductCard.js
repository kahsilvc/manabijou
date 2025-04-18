import { Box, Image, Text, Badge, Button, Flex, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  // Valores padrão caso o produto não tenha todas as propriedades
  const {
    id = '',
    name = '',
    price = 0,
    pixPrice = 0,
    image = '',
    category = '',
    stock = 0
  } = product || {};

  // Calcular a porcentagem de desconto
  const discountPercentage = price > 0 ? Math.round(((price - pixPrice) / price) * 100) : 0;

  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      boxShadow="md"
      bg="white"
      className="product-card"
      transition="transform 0.3s"
      _hover={{ transform: 'translateY(-5px)' }}
    >
      {/* Imagem do produto */}
      <Box position="relative">
        <Link href={`/produto/${id}`} passHref>
          <Box as="a" display="block">
            {image ? (
              <Image
                src={image}
                alt={name}
                width="100%"
                height="200px"
                objectFit="cover"
                fallbackSrc="https://via.placeholder.com/300x300?text=Mana+Bijou"
              />
            ) : (
              <Box
                height="200px"
                bg="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="gray.500"
              >
                Imagem não disponível
              </Box>
            )}
          </Box>
        </Link>

        {/* Badge de categoria */}
        {category && (
          <Badge
            position="absolute"
            top="0"
            right="0"
            bg="brand.500"
            color="white"
            px={2}
            py={1}
            borderBottomLeftRadius="md"
          >
            {category}
          </Badge>
        )}
      </Box>

      {/* Informações do produto */}
      <Box p={4}>
        <Link href={`/produto/${id}`} passHref>
          <Box as="a" display="block">
            <Text
              fontWeight="bold"
              fontSize="md"
              mb={2}
              noOfLines={2}
              height="48px"
            >
              {name}
            </Text>
          </Box>
        </Link>

        {/* Preços */}
        <Flex direction="column" mb={3}>
          <Flex align="center" mb={1}>
            <Text fontSize="lg" fontWeight="bold">
              R${price.toFixed(2)}
            </Text>
            {discountPercentage > 0 && (
              <Badge ml={2} colorScheme="green">
                {discountPercentage}% OFF
              </Badge>
            )}
          </Flex>
          <Text fontSize="md" color="brand.500" fontWeight="bold" className="price-with-pix">
            R${pixPrice.toFixed(2)} com Pix
          </Text>
        </Flex>

        {/* Informação de estoque */}
        <Text fontSize="sm" color="gray.600" mb={4} className="stock-info">
          {stock > 0 ? `Restam ${stock} em estoque!` : 'Produto esgotado'}
        </Text>

        {/* Botão de compra */}
        <Button
          width="full"
          colorScheme="pink"
          bg="brand.500"
          _hover={{ bg: 'brand.600' }}
          isDisabled={stock <= 0}
        >
          {stock > 0 ? 'Comprar' : 'Indisponível'}
        </Button>
      </Box>
    </Box>
  );
};

export default ProductCard;
