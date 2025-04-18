import { useState, useEffect } from 'react';
import { 
  Box, 
  Flex, 
  Heading, 
  Text, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText,
  Icon,
  Button,
  useColorModeValue
} from '@chakra-ui/react';
import Link from 'next/link';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    recentOrders: []
  });

  // Simulação de dados para demonstração
  useEffect(() => {
    // Em produção, isso seria substituído por chamadas de API reais
    setStats({
      totalProducts: 24,
      totalCategories: 6,
      totalOrders: 8,
      recentOrders: [
        { id: '1', customer: 'Maria Silva', total: 149.90, status: 'Pendente', date: '2025-04-17' },
        { id: '2', customer: 'João Santos', total: 89.80, status: 'Pago', date: '2025-04-16' },
        { id: '3', customer: 'Ana Oliveira', total: 129.70, status: 'Enviado', date: '2025-04-15' }
      ]
    });
  }, []);

  const bgCard = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <AdminLayout title="Painel Administrativo">
      <Box p={4}>
        <Heading as="h1" size="lg" mb={6}>
          Painel Administrativo
        </Heading>

        {/* Cards de estatísticas */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <Stat
            px={4}
            py={5}
            bg={bgCard}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="sm" fontWeight="medium">Produtos</StatLabel>
            <StatNumber fontSize="3xl">{stats.totalProducts}</StatNumber>
            <StatHelpText>
              <Link href="/admin/produtos" passHref>
                <Button size="sm" colorScheme="pink" mt={2}>
                  Gerenciar
                </Button>
              </Link>
            </StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={5}
            bg={bgCard}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="sm" fontWeight="medium">Categorias</StatLabel>
            <StatNumber fontSize="3xl">{stats.totalCategories}</StatNumber>
            <StatHelpText>
              <Link href="/admin/categorias" passHref>
                <Button size="sm" colorScheme="pink" mt={2}>
                  Gerenciar
                </Button>
              </Link>
            </StatHelpText>
          </Stat>

          <Stat
            px={4}
            py={5}
            bg={bgCard}
            borderRadius="lg"
            boxShadow="sm"
            borderWidth="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="sm" fontWeight="medium">Pedidos</StatLabel>
            <StatNumber fontSize="3xl">{stats.totalOrders}</StatNumber>
            <StatHelpText>
              <Link href="/admin/pedidos" passHref>
                <Button size="sm" colorScheme="pink" mt={2}>
                  Gerenciar
                </Button>
              </Link>
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* Ações rápidas */}
        <Box
          mb={8}
          p={5}
          bg={bgCard}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Heading as="h2" size="md" mb={4}>
            Ações Rápidas
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
            <Link href="/admin/produtos/novo" passHref>
              <Button colorScheme="pink" size="md" width="full">
                Novo Produto
              </Button>
            </Link>
            <Link href="/admin/categorias/nova" passHref>
              <Button colorScheme="pink" size="md" width="full">
                Nova Categoria
              </Button>
            </Link>
            <Link href="/admin/pedidos" passHref>
              <Button colorScheme="pink" size="md" width="full">
                Ver Pedidos
              </Button>
            </Link>
            <Link href="/" passHref>
              <Button colorScheme="gray" size="md" width="full">
                Ver Loja
              </Button>
            </Link>
          </SimpleGrid>
        </Box>

        {/* Pedidos recentes */}
        <Box
          p={5}
          bg={bgCard}
          borderRadius="lg"
          boxShadow="sm"
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex justify="space-between" align="center" mb={4}>
            <Heading as="h2" size="md">
              Pedidos Recentes
            </Heading>
            <Link href="/admin/pedidos" passHref>
              <Button size="sm" variant="outline" colorScheme="pink">
                Ver Todos
              </Button>
            </Link>
          </Flex>

          {stats.recentOrders.length > 0 ? (
            <Box overflowX="auto">
              <Box as="table" width="full" borderWidth="1px" borderRadius="md">
                <Box as="thead" bg="gray.50">
                  <Box as="tr">
                    <Box as="th" px={4} py={2} textAlign="left">Pedido</Box>
                    <Box as="th" px={4} py={2} textAlign="left">Cliente</Box>
                    <Box as="th" px={4} py={2} textAlign="left">Data</Box>
                    <Box as="th" px={4} py={2} textAlign="left">Total</Box>
                    <Box as="th" px={4} py={2} textAlign="left">Status</Box>
                    <Box as="th" px={4} py={2} textAlign="left">Ação</Box>
                  </Box>
                </Box>
                <Box as="tbody">
                  {stats.recentOrders.map((order) => (
                    <Box as="tr" key={order.id}>
                      <Box as="td" px={4} py={3} borderTopWidth="1px">#{order.id}</Box>
                      <Box as="td" px={4} py={3} borderTopWidth="1px">{order.customer}</Box>
                      <Box as="td" px={4} py={3} borderTopWidth="1px">{order.date}</Box>
                      <Box as="td" px={4} py={3} borderTopWidth="1px">R${order.total.toFixed(2)}</Box>
                      <Box as="td" px={4} py={3} borderTopWidth="1px">
                        <Box
                          px={2}
                          py={1}
                          borderRadius="md"
                          bg={
                            order.status === 'Pago' ? 'green.100' :
                            order.status === 'Enviado' ? 'blue.100' :
                            'yellow.100'
                          }
                          color={
                            order.status === 'Pago' ? 'green.800' :
                            order.status === 'Enviado' ? 'blue.800' :
                            'yellow.800'
                          }
                          display="inline-block"
                          fontSize="sm"
                        >
                          {order.status}
                        </Box>
                      </Box>
                      <Box as="td" px={4} py={3} borderTopWidth="1px">
                        <Link href={`/admin/pedidos/${order.id}`} passHref>
                          <Button size="sm" colorScheme="pink" variant="outline">
                            Detalhes
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          ) : (
            <Text>Nenhum pedido recente.</Text>
          )}
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
