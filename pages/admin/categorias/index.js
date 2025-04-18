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
  IconButton,
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
  Stack
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const router = useRouter();
  const cancelRef = React.useRef();

  // Simulação de dados para demonstração
  useEffect(() => {
    // Em produção, isso seria substituído por chamadas de API reais
    const mockCategories = [
      { id: '1', name: 'Brincos', slug: 'brincos', active: true, createdAt: '2025-04-10' },
      { id: '2', name: 'Colares', slug: 'colares', active: true, createdAt: '2025-04-10' },
      { id: '3', name: 'Pulseiras', slug: 'pulseiras', active: true, createdAt: '2025-04-11' },
      { id: '4', name: 'Braceletes', slug: 'braceletes', active: true, createdAt: '2025-04-12' },
      { id: '5', name: 'Anéis', slug: 'aneis', active: true, createdAt: '2025-04-13' },
      { id: '6', name: 'Alianças', slug: 'aliancas', active: true, createdAt: '2025-04-14' },
      { id: '7', name: 'Gargantilhas', slug: 'gargantilhas', active: true, createdAt: '2025-04-15' },
    ];
    
    setCategories(mockCategories);
    setIsLoading(false);
  }, []);

  // Filtrar categorias com base no termo de pesquisa
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para confirmar exclusão
  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    onOpen();
  };

  // Função para excluir categoria
  const handleDeleteConfirm = () => {
    // Em produção, isso seria uma chamada de API real
    setCategories(categories.filter(c => c.id !== categoryToDelete.id));
    
    toast({
      title: 'Categoria excluída',
      description: `A categoria "${categoryToDelete.name}" foi excluída com sucesso.`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    onClose();
    setCategoryToDelete(null);
  };

  return (
    <AdminLayout title="Gerenciar Categorias">
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="lg">
            Gerenciar Categorias
          </Heading>
          <Link href="/admin/categorias/nova" passHref>
            <Button colorScheme="pink" size="md">
              Nova Categoria
            </Button>
          </Link>
        </Flex>

        {/* Barra de pesquisa */}
        <Box mb={6}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              🔍
            </InputLeftElement>
            <Input
              placeholder="Buscar categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Box>

        {/* Tabela de categorias */}
        {isLoading ? (
          <Text>Carregando categorias...</Text>
        ) : filteredCategories.length > 0 ? (
          <Box overflowX="auto">
            <Table variant="simple" borderWidth="1px" borderRadius="lg">
              <Thead bg="gray.50">
                <Tr>
                  <Th>Nome</Th>
                  <Th>Slug</Th>
                  <Th>Status</Th>
                  <Th>Data de Criação</Th>
                  <Th width="150px">Ações</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredCategories.map((category) => (
                  <Tr key={category.id}>
                    <Td fontWeight="medium">{category.name}</Td>
                    <Td>{category.slug}</Td>
                    <Td>
                      <Box
                        px={2}
                        py={1}
                        borderRadius="md"
                        bg={category.active ? 'green.100' : 'red.100'}
                        color={category.active ? 'green.800' : 'red.800'}
                        display="inline-block"
                        fontSize="sm"
                      >
                        {category.active ? 'Ativo' : 'Inativo'}
                      </Box>
                    </Td>
                    <Td>{category.createdAt}</Td>
                    <Td>
                      <Stack direction="row" spacing={2}>
                        <Link href={`/admin/categorias/editar/${category.id}`} passHref>
                          <Button size="sm" colorScheme="blue">
                            Editar
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => handleDeleteClick(category)}
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
            <Text>Nenhuma categoria encontrada.</Text>
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
              Excluir Categoria
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir a categoria "{categoryToDelete?.name}"?
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

export default CategoriesPage;
