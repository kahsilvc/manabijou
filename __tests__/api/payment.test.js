import { createMocks } from 'node-mocks-http';
import pixHandler from '../../pages/api/payment/pix';
import creditCardHandler from '../../pages/api/payment/credit-card';
import { generateOrderCode } from '../../utils/helpers';

// Mock do MongoDB
jest.mock('../../lib/dbConnect', () => jest.fn());

// Mock do modelo Order
jest.mock('../../models/Order', () => ({
  findById: jest.fn(),
  save: jest.fn()
}));

// Mock da função generateOrderCode
jest.mock('../../utils/helpers', () => ({
  generateOrderCode: jest.fn()
}));

describe('API de Pagamentos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/payment/pix', () => {
    it('deve gerar um código PIX para um pedido válido', async () => {
      const mockOrder = {
        _id: '123',
        totalPrice: 149.90,
        isPaid: false,
        paymentResult: {},
        save: jest.fn().mockResolvedValueOnce(true)
      };
      
      const mockPixCode = 'PIX123456';
      
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          orderId: '123'
        }
      });
      
      require('../../models/Order').findById.mockResolvedValueOnce(mockOrder);
      generateOrderCode.mockReturnValueOnce(mockPixCode);
      
      await pixHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      
      expect(responseData.success).toBe(true);
      expect(responseData.data.pixCode).toBe(mockPixCode);
      expect(responseData.data.totalAmount).toBe(149.90);
      expect(responseData.data.orderId).toBe('123');
      
      // Verificar se o pedido foi atualizado corretamente
      expect(mockOrder.paymentResult.id).toBe(mockPixCode);
      expect(mockOrder.paymentResult.status).toBe('PENDING');
      expect(mockOrder.save).toHaveBeenCalled();
    });

    it('deve retornar erro se o pedido não for encontrado', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          orderId: '999'
        }
      });
      
      require('../../models/Order').findById.mockResolvedValueOnce(null);
      
      await pixHandler(req, res);
      
      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Pedido não encontrado'
      });
    });

    it('deve retornar erro se o pedido já estiver pago', async () => {
      const mockOrder = {
        _id: '123',
        totalPrice: 149.90,
        isPaid: true
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          orderId: '123'
        }
      });
      
      require('../../models/Order').findById.mockResolvedValueOnce(mockOrder);
      
      await pixHandler(req, res);
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Este pedido já foi pago'
      });
    });
  });

  describe('POST /api/payment/credit-card', () => {
    it('deve processar pagamento com cartão de crédito para um pedido válido', async () => {
      const mockOrder = {
        _id: '123',
        totalPrice: 149.90,
        isPaid: false,
        isDelivered: false,
        status: 'Pendente',
        paymentResult: {},
        save: jest.fn().mockResolvedValueOnce(true)
      };
      
      const mockTransactionId = 'TRANS123456';
      
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          orderId: '123',
          cardNumber: '4111111111111111',
          cardHolder: 'NOME TESTE',
          expiryDate: '12/25',
          cvv: '123'
        }
      });
      
      require('../../models/Order').findById.mockResolvedValueOnce(mockOrder);
      generateOrderCode.mockReturnValueOnce(mockTransactionId);
      
      await creditCardHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      
      expect(responseData.success).toBe(true);
      expect(responseData.data.transactionId).toBe(mockTransactionId);
      expect(responseData.data.status).toBe('COMPLETED');
      expect(responseData.data.orderId).toBe('123');
      
      // Verificar se o pedido foi atualizado corretamente
      expect(mockOrder.paymentResult.id).toBe(mockTransactionId);
      expect(mockOrder.paymentResult.status).toBe('COMPLETED');
      expect(mockOrder.isPaid).toBe(true);
      expect(mockOrder.status).toBe('Pago');
      expect(mockOrder.save).toHaveBeenCalled();
    });

    it('deve retornar erro se os dados do cartão estiverem incompletos', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          orderId: '123',
          cardNumber: '4111111111111111',
          // Faltando dados do cartão
        }
      });
      
      await creditCardHandler(req, res);
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Dados do cartão incompletos'
      });
    });

    it('deve retornar erro se o pedido não for encontrado', async () => {
      const { req, res } = createMocks({
        method: 'POST',
        body: {
          orderId: '999',
          cardNumber: '4111111111111111',
          cardHolder: 'NOME TESTE',
          expiryDate: '12/25',
          cvv: '123'
        }
      });
      
      require('../../models/Order').findById.mockResolvedValueOnce(null);
      
      await creditCardHandler(req, res);
      
      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Pedido não encontrado'
      });
    });
  });
});
