import React from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  VStack,
  HStack,
  Avatar,
  useColorModeValue,
  Link as ChakraLink,
  Image
} from '@chakra-ui/react';
import Link from 'next/link';
import Head from 'next/head';

const AdminLayout = ({ children, title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMobile, setIsMobile] = React.useState(false);

  // Verificar se é dispositivo móvel
  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Links do menu administrativo
  const menuItems = [
    { name: 'Dashboard', href: '/admin' },
    { name: 'Produtos', href: '/admin/produtos' },
    { name: 'Categorias', href: '/admin/categorias' },
    { name: 'Pedidos', href: '/admin/pedidos' },
    { name: 'Configurações', href: '/admin/configuracoes' },
  ];

  const bgSidebar = useColorModeValue('brand.500', 'brand.700');
  const colorSidebar = useColorModeValue('white', 'white');
  const bgContent = useColorModeValue('gray.50', 'gray.900');

  return (
    <>
      <Head>
        <title>{title ? `${title} - Mana Bijou Admin` : 'Painel Administrativo - Mana Bijou'}</title>
      </Head>

      <Flex h="100vh" flexDirection="column">
        {/* Barra superior */}
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px={4}
          bg={useColorModeValue('white', 'gray.800')}
          borderBottomWidth="1px"
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          h="16"
        >
          <Flex align="center">
            {isMobile && (
              <IconButton
                aria-label="Abrir menu"
                variant="outline"
                onClick={onOpen}
                mr={2}
              >
                ☰
              </IconButton>
            )}
            <Link href="/admin" passHref>
              <Box as="a">
                <Image 
                  src="/images/logo.png" 
                  alt="Mana Bijou Admin" 
                  width="120px" 
                  height="auto"
                />
              </Box>
            </Link>
          </Flex>

          <HStack spacing={3}>
            <Link href="/" passHref>
              <Button size="sm" variant="outline">
                Ver Loja
              </Button>
            </Link>
            <Avatar size="sm" name="Admin" bg="brand.500" />
          </HStack>
        </Flex>

        <Flex flex="1" overflow="hidden">
          {/* Sidebar - visível apenas em desktop */}
          {!isMobile && (
            <Box
              as="nav"
              w="64"
              bg={bgSidebar}
              color={colorSidebar}
              borderRightWidth="1px"
              borderColor={useColorModeValue('gray.200', 'gray.700')}
              py={8}
              className="admin-sidebar"
            >
              <VStack spacing={1} align="stretch" px={4}>
                {menuItems.map((item) => (
                  <Link key={item.href} href={item.href} passHref>
                    <Box
                      as="a"
                      py={3}
                      px={4}
                      borderRadius="md"
                      fontWeight="medium"
                      _hover={{ bg: 'rgba(255, 255, 255, 0.2)' }}
                    >
                      {item.name}
                    </Box>
                  </Link>
                ))}
              </VStack>
            </Box>
          )}

          {/* Conteúdo principal */}
          <Box flex="1" overflow="auto" bg={bgContent}>
            {children}
          </Box>
        </Flex>
      </Flex>

      {/* Drawer para menu mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="brand.500" color="white">Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={1} align="stretch" mt={4}>
              {menuItems.map((item) => (
                <Link key={item.href} href={item.href} passHref>
                  <Box
                    as="a"
                    py={3}
                    px={4}
                    borderRadius="md"
                    fontWeight="medium"
                    _hover={{ bg: 'gray.100' }}
                    onClick={onClose}
                  >
                    {item.name}
                  </Box>
                </Link>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default AdminLayout;
