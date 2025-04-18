import React from 'react';
import { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Badge,
  Select
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout.jsx';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [productToDelete, setProductToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const cancelRef = React.useRef();

  // Simulação de dados para demonstração
  useEffect(() => {
    // Em produção, isso seria substituído por chamadas de API reais
    const mockCategories = [
      { id: '1', name: 'Brincos' },
      { id: '2', name: 'Colares' },
      { id: '3', name: 'Pulseiras' },
      { id: '4', name: 'Braceletes' },
      { id: '5', name: 'Anéis' },
      { id: '6', name: 'Alianças' },
      { id: '7', name: 'Gargantilhas' },
    ];
    
    const mockProducts = [
      { 
        id: '1', 
        name: 'Brinco Pérola', 
        price: 39.90, 
        pixPrice: 38.70, 
        stock: 5, 
        category: { id: '1', name: 'Brincos' },
        material: 'Prata 925',
        featured: true,
        createdAt: '2025-04-10'
      },
      { 
        id: '2', 
        name: 'Colar Coração', 
        price: 49.90, 
        pixPrice: 48.40, 
        stock: 3, 
        category: { id: '2', name: 'Colares' },
        material: 'Aço Inoxidável',
        featured: false,
        createdAt: '2025-04-11'
      },
      { 
        id: '3', 
        name: 'Pulseira Trevo', 
        price: 45.90, 
        pixPrice: 44.52, 
        stock: 4, 
        category: { id: '3', name: 'Pulseiras' },
        material: 'Prata 925',
        featured: true,
        createdAt: '2025-04-12'
      },
      { 
        id: '4', 
        name: 'Anel Ajustável', 
        price: 42.90, 
        pixPrice: 41.61, 
        stock: 6, 
        category: { id: '5', name: 'Anéis' },
        material: 'Aço Inoxidável',
        featured: false,
        createdAt: '2025-04-13'
      },
    ];
    
    setCategories(mockCategories);
    setProducts(mockProducts);
    setIsLoading(false);
  }, []);

  // Filtrar produtos com base no termo de pesquisa e categoria
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? product.category.id === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  // Função para confirmar exclusão
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    onOpen();
  };

  // Função para excluir produto
  const handleDeleteConfirm = () => {
    // Em produção, isso seria uma chamada de API real
    setProducts(products.filter(p => p.id !== productToDelete.id));
    
    toast({
      title: 'Produto excluído',
      description: `O produto "${productToDelete.name}" foi excluído com sucesso.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    onClose();
    setProductToDelete(null);
  };

  return (
    <AdminLayout title="Gerenciar Produtos">
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="lg">
            Gerenciar Produtos
          </Heading>
          <Link href="/admin/produtos/novo" passHref>
            <Button colorScheme="pink" size="md">
              Novo Produto
            </Button>
          </Link>
        </Flex>

        {/* Filtros */}
        <Flex mb={6} direction={{ base: 'column', md: 'row' }} gap={4}>
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none">
              🔍
            </InputLeftElement>
            <Input
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          
          <Select 
            placeholder="Todas as categorias" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            maxW={{ base: 'full', md: '200px' }}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </Select>
        </Flex>

        {/* Tabela de produtos */}
        {isLoading ? (
          <Text>Carregando produtos...</Text>
        ) : filteredProducts.length > 0 ? (
          <Box overflowX="auto">
            <Table variant="simple" borderWidth="1px" borderRadius="lg">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Produto</Th>
                  <Th>Categoria</Th>
                  <Th>Preço</Th>
                  <Th>Preço PIX</Th>
                  <Th>Estoque</Th>
                  <Th>Material</Th>
                  <Th>Destaque</Th>
                  <Th width="150px">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredProducts.map((product) => (
                  <Tr key={product.id}>
                    <Td fontWeight="medium">{product.name}</Td>
                    <Td>
                      <Badge colorScheme="pink" variant="subtle">
                        {product.category.name}
                      </Badge>
                    </Td>
                    <Td>R${product.price.toFixed(2)}</Td>
                    <Td color="brand.500" fontWeight="bold">R${product.pixPrice.toFixed(2)}</Td>
                    <Td>
                      <Badge 
                        colorScheme={product.stock > 0 ? 'green' : 'red'}
                      >
                        {product.stock} un
                      </Badge>
                    </Td>
                    <Td>{product.material}</Td>
                    <Td>{product.featured ? 'Sim' : 'Não'}</Td>
                    <Td>
                      <Stack direction="row" spacing={2}>
                        <Link href={`/admin/produtos/editar/${product.id}`} passHref>
                          <Button size="sm" colorScheme="blue">
                            Editar
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteClick(product)}
                        >
                          Excluir
                        </Button>
                      </Stack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        ) : (
          <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
            <Text>Nenhum produto encontrado.</Text>
          </Box>
        )}
      </Box>

      {/* Diálogo de confirmação de exclusão */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Excluir Produto
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir o produto "{productToDelete?.name}"?
              Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </AdminLayout>
  );
};

export default ProductsPage;
