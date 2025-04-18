import { Box, Flex, Text, Input, Button, Image, HStack, Link as ChakraLink, IconButton, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');

  // Categorias de exemplo
  const categories = [
    { id: 'brincos', name: 'Brincos' },
    { id: 'colares', name: 'Colares' },
    { id: 'pulseiras', name: 'Pulseiras' },
    { id: 'braceletes', name: 'Braceletes' },
    { id: 'aneis', name: 'Anéis' },
    { id: 'aliancas', name: 'Alianças' },
    { id: 'gargantilhas', name: 'Gargantilhas' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log('Buscar por:', searchQuery);
  };

  return (
    <Box as="header" bg="white" boxShadow="sm" position="sticky" top={0} zIndex={10}>
      {/* Barra superior */}
      <Box bg="brand.500" py={2}>
        <Flex 
          maxW="container.xl" 
          mx="auto" 
          px={4} 
          justify="space-between" 
          align="center"
          color="white"
        >
          <Text fontSize="sm">Bijuterias em prata 925 e aço inoxidável</Text>
          <HStack spacing={4}>
            <ChakraLink as={Link} href="/login" fontSize="sm">
              Login
            </ChakraLink>
            <ChakraLink as={Link} href="/cadastro" fontSize="sm">
              Cadastre-se
            </ChakraLink>
          </HStack>
        </Flex>
      </Box>

      {/* Barra principal */}
      <Flex 
        maxW="container.xl" 
        mx="auto" 
        px={4} 
        py={4} 
        justify="space-between" 
        align="center"
      >
        {/* Logo */}
        <Link href="/" passHref>
          <Box as="a">
            <Box 
              width={["120px", "150px"]} 
              height={["40px", "50px"]} 
              bg="brand.500" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              color="white"
              fontWeight="bold"
              borderRadius="md"
            >
              MANA BIJOU
            </Box>
          </Box>
        </Link>

        {/* Busca - visível apenas em telas maiores */}
        <Flex 
          as="form" 
          onSubmit={handleSearch} 
          display={["none", "none", "flex"]} 
          flex={1} 
          mx={6}
        >
          <Input 
            placeholder="O que você está buscando?" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
            Buscar
          </Button>
        </Flex>

        {/* Carrinho e Menu Mobile */}
        <HStack spacing={4}>
          <Link href="/carrinho" passHref>
            <Box 
              as="a" 
              display="flex" 
              alignItems="center" 
              fontWeight="medium"
            >
              <Text display={["none", "inline"]} mr={2}>Carrinho</Text>
              <Box 
                position="relative" 
                width="24px" 
                height="24px" 
                bg="brand.500" 
                borderRadius="full" 
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                color="white"
                fontSize="xs"
              >
                0
              </Box>
              <Text ml={2} display={["none", "inline"]}>R$0,00</Text>
            </Box>
          </Link>

          {/* Menu mobile */}
          <Box display={["block", "block", "none"]}>
            <Button onClick={onOpen} variant="ghost">
              Menu
            </Button>
          </Box>
        </HStack>
      </Flex>

      {/* Barra de navegação - visível apenas em telas maiores */}
      <Box 
        bg="gray.100" 
        display={["none", "none", "block"]} 
        borderBottom="1px" 
        borderColor="gray.200"
      >
        <Flex 
          maxW="container.xl" 
          mx="auto" 
          px={4} 
          py={2} 
          justify="space-between" 
          align="center"
        >
          <Menu>
            <MenuButton as={Button} variant="ghost">
              Categorias
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <MenuItem key={category.id}>
                  <Link href={`/categoria/${category.id}`} passHref>
                    <Box as="a" w="100%">
                      {category.name}
                    </Box>
                  </Link>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>

          <HStack spacing={6}>
            <ChakraLink as={Link} href="/" fontWeight="medium">
              Início
            </ChakraLink>
            <ChakraLink as={Link} href="/produtos" fontWeight="medium">
              Produtos
            </ChakraLink>
            <ChakraLink as={Link} href="/quem-somos" fontWeight="medium">
              Quem Somos
            </ChakraLink>
            <ChakraLink as={Link} href="/contato" fontWeight="medium">
              Contato
            </ChakraLink>
          </HStack>
        </Flex>
      </Box>

      {/* Drawer para menu mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px" bg="brand.500" color="white">
            Menu
          </DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4} mt={4}>
              <Box>
                <Text fontWeight="bold" mb={2}>Categorias</Text>
                <VStack align="stretch" pl={4}>
                  {categories.map((category) => (
                    <Link key={category.id} href={`/categoria/${category.id}`} passHref>
                      <Box 
                        as="a" 
                        py={1} 
                        onClick={onClose}
                      >
                        {category.name}
                      </Box>
                    </Link>
                  ))}
                </VStack>
              </Box>
              
              <Link href="/" passHref>
                <Box as="a" py={2} onClick={onClose}>Início</Box>
              </Link>
              <Link href="/produtos" passHref>
                <Box as="a" py={2} onClick={onClose}>Produtos</Box>
              </Link>
              <Link href="/quem-somos" passHref>
                <Box as="a" py={2} onClick={onClose}>Quem Somos</Box>
              </Link>
              <Link href="/contato" passHref>
                <Box as="a" py={2} onClick={onClose}>Contato</Box>
              </Link>
              
              <Box pt={4}>
                <Text fontWeight="bold" mb={2}>Minha Conta</Text>
                <VStack align="stretch" pl={4}>
                  <Link href="/login" passHref>
                    <Box as="a" py={1} onClick={onClose}>Login</Box>
                  </Link>
                  <Link href="/cadastro" passHref>
                    <Box as="a" py={1} onClick={onClose}>Cadastre-se</Box>
                  </Link>
                </VStack>
              </Box>
              
              {/* Busca mobile */}
              <Box pt={4}>
                <Text fontWeight="bold" mb={2}>Buscar</Text>
                <Flex as="form" onSubmit={handleSearch}>
                  <Input 
                    placeholder="O que você está buscando?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    borderRightRadius={0}
                  />
                  <Button 
                    type="submit" 
                    borderLeftRadius={0} 
                    bg="brand.500" 
                    color="white"
                  >
                    Ir
                  </Button>
                </Flex>
              </Box>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Header;
