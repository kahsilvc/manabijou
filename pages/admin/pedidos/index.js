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
  Select,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import AdminLayout from '../../../components/AdminLayout';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const toast = useToast();
  const router = useRouter();

  // Simulação de dados para demonstração
  useEffect(() => {
    // Em produção, isso seria substituído por chamadas de API reais
    const mockOrders = [
      { 
        id: '1001', 
        customer: { name: 'Maria Silva', email: 'maria@email.com', phone: '(11) 98765-4321' },
        totalPrice: 149.90,
        shippingPrice: 15.00,
        status: 'Pendente',
        paymentMethod: 'PIX',
        shippingMethod: 'Correios',
        isPaid: false,
        isDelivered: false,
        createdAt: '2025-04-17',
        items: [
          { product: { name: 'Brinco Pérola' }, quantity: 2, price: 39.90 },
          { product: { name: 'Colar Coração' }, quantity: 1, price: 49.90 }
        ]
      },
      { 
        id: '1002', 
        customer: { name: 'João Santos', email: 'joao@email.com', phone: '(11) 91234-5678' },
        totalPrice: 89.80,
        shippingPrice: 25.00,
        status: 'Pago',
        paymentMethod: 'Cartão de Crédito',
        shippingMethod: 'Uber Flash',
        isPaid: true,
        isDelivered: false,
        createdAt: '2025-04-16',
        items: [
          { product: { name: 'Pulseira Trevo' }, quantity: 2, price: 45.90 }
        ]
      },
      { 
        id: '1003', 
        customer: { name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 99876-5432' },
        totalPrice: 129.70,
        shippingPrice: 15.00,
        status: 'Enviado',
        paymentMethod: 'PIX',
        shippingMethod: 'Correios',
        isPaid: true,
        isDelivered: false,
        createdAt: '2025-04-15',
        items: [
          { product: { name: 'Anel Ajustável' }, quantity: 1, price: 42.90 },
          { product: { name: 'Brinco Pérola' }, quantity: 1, price: 39.90 },
          { product: { name: 'Pulseira Trevo' }, quantity: 1, price: 45.90 }
        ]
      },
      { 
        id: '1004', 
        customer: { name: 'Carlos Mendes', email: 'carlos@email.com', phone: '(11) 97654-3210' },
        totalPrice: 99.80,
        shippingPrice: 25.00,
        status: 'Entregue',
        paymentMethod: 'Cartão de Crédito',
        shippingMethod: 'Uber Flash',
        isPaid: true,
        isDelivered: true,
        createdAt: '2025-04-14',
        items: [
          { product: { name: 'Colar Coração' }, quantity: 2, price: 49.90 }
        ]
      },
    ];
    
    setOrders(mockOrders);
    setIsLoading(false);
  }, []);

  // Filtrar pedidos com base no termo de pesquisa e status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.includes(searchTerm) || 
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter ? order.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  // Agrupar pedidos por status para as abas
  const pendingOrders = orders.filter(order => order.status === 'Pendente');
  const paidOrders = orders.filter(order => order.status === 'Pago');
  const shippedOrders = orders.filter(order => order.status === 'Enviado');
  const deliveredOrders = orders.filter(order => order.status === 'Entregue');

  // Função para atualizar status do pedido
  const handleUpdateStatus = (orderId, newStatus) => {
    // Em produção, isso seria uma chamada de API real
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const updatedOrder = { ...order, status: newStatus };
        
        // Atualizar flags com base no status
        if (newStatus === 'Pago') {
          updatedOrder.isPaid = true;
          updatedOrder.paidAt = new Date().toISOString();
        } else if (newStatus === 'Enviado') {
          updatedOrder.isPaid = true;
        } else if (newStatus === 'Entregue') {
          updatedOrder.isPaid = true;
          updatedOrder.isDelivered = true;
          updatedOrder.deliveredAt = new Date().toISOString();
        }
        
        return updatedOrder;
      }
      return order;
    }));
    
    toast({
      title: 'Status atualizado',
      description: `O pedido #${orderId} foi atualizado para "${newStatus}".`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  // Renderizar tabela de pedidos
  const renderOrdersTable = (ordersList) => {
    if (ordersList.length === 0) {
      return (
        <Box p={4} borderWidth="1px" borderRadius="lg" textAlign="center">
          <Text>Nenhum pedido encontrado.</Text>
        </Box>
      );
    }

    return (
      <Box overflowX="auto">
        <Table variant="simple" borderWidth="1px" borderRadius="lg">
          <Thead bg="gray.50">
            <Tr>
              <Th>Pedido</Th>
              <Th>Cliente</Th>
              <Th>Data</Th>
              <Th>Total</Th>
              <Th>Pagamento</Th>
              <Th>Entrega</Th>
              <Th>Status</Th>
              <Th width="200px">Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            {ordersList.map((order) => (
              <Tr key={order.id}>
                <Td fontWeight="medium">#{order.id}</Td>
                <Td>{order.customer.name}</Td>
                <Td>{order.createdAt}</Td>
                <Td fontWeight="bold">R${order.totalPrice.toFixed(2)}</Td>
                <Td>{order.paymentMethod}</Td>
                <Td>{order.shippingMethod}</Td>
                <Td>
                  <Badge 
                    colorScheme={
                      order.status === 'Entregue' ? 'green' :
                      order.status === 'Enviado' ? 'blue' :
                      order.status === 'Pago' ? 'purple' :
                      'yellow'
                    }
                    p={1}
                  >
                    {order.status}
                  </Badge>
                </Td>
                <Td>
                  <Stack direction="row" spacing={2}>
                    <Link href={`/admin/pedidos/${order.id}`} passHref>
                      <Button size="sm" colorScheme="blue">
                        Detalhes
                      </Button>
                    </Link>
                    <Select 
                      size="sm" 
                      width="120px"
                      placeholder="Atualizar"
                      onChange={(e) => {
                        if (e.target.value) {
                          handleUpdateStatus(order.id, e.target.value);
                        }
                      }}
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Pago">Pago</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Entregue">Entregue</option>
                      <option value="Cancelado">Cancelado</option>
                    </Select>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <AdminLayout title="Gerenciar Pedidos">
      <Box p={4}>
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="lg">
            Gerenciar Pedidos
          </Heading>
        </Flex>

        {/* Filtros */}
        <Flex mb={6} direction={{ base: 'column', md: 'row' }} gap={4}>
          <InputGroup flex="1">
            <InputLeftElement pointerEvents="none">
              🔍
            </InputLeftElement>
            <Input
              placeholder="Buscar por ID, cliente ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          
          <Select 
            placeholder="Todos os status" 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            maxW={{ base: 'full', md: '200px' }}
          >
            <option value="Pendente">Pendente</option>
            <option value="Pago">Pago</option>
            <option value="Enviado">Enviado</option>
            <option value="Entregue">Entregue</option>
            <option value="Cancelado">Cancelado</option>
          </Select>
        </Flex>

        {/* Abas de pedidos por status */}
        {isLoading ? (
          <Text>Carregando pedidos...</Text>
        ) : searchTerm || statusFilter ? (
          // Mostrar resultados filtrados
          renderOrdersTable(filteredOrders)
        ) : (
          // Mostrar abas quando não há filtros ativos
          <Tabs colorScheme="pink" variant="enclosed">
            <TabList>
              <Tab>Todos ({orders.length})</Tab>
              <Tab>Pendentes ({pendingOrders.length})</Tab>
              <Tab>Pagos ({paidOrders.length})</Tab>
              <Tab>Enviados ({shippedOrders.length})</Tab>
              <Tab>Entregues ({deliveredOrders.length})</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p={0} pt={4}>
                {renderOrdersTable(orders)}
              </TabPanel>
              <TabPanel p={0} pt={4}>
                {renderOrdersTable(pendingOrders)}
              </TabPanel>
              <TabPanel p={0} pt={4}>
                {renderOrdersTable(paidOrders)}
              </TabPanel>
              <TabPanel p={0} pt={4}>
                {renderOrdersTable(shippedOrders)}
              </TabPanel>
              <TabPanel p={0} pt={4}>
                {renderOrdersTable(deliveredOrders)}
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </Box>
    </AdminLayout>
  );
};

export default OrdersPage;
