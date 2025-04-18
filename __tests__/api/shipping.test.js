import { createMocks } from 'node-mocks-http';
import shippingCalculateHandler from '../../pages/api/shipping/calculate';
import { validateCEP } from '../../utils/helpers';

// Mock do MongoDB
jest.mock('../../lib/dbConnect', () => jest.fn());

// Mock da função validateCEP
jest.mock('../../utils/helpers', () => ({
  validateCEP: jest.fn()
}));

describe('API de Cálculo de Frete', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/shipping/calculate', () => {
    it('deve calcular o frete para Correios corretamente', async () => {
      const mockRequestData = {
        cep: '12345-678',
        items: [
          { id: '1', quantity: 2 },
          { id: '2', quantity: 1 }
        ],
        shippingMethod: 'Correios'
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockRequestData
      });
      
      validateCEP.mockReturnValueOnce(true);
      
      await shippingCalculateHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      
      expect(responseData.success).toBe(true);
      expect(responseData.data.shippingMethod).toBe('Correios');
      expect(typeof responseData.data.shippingPrice).toBe('number');
      expect(responseData.data.deliveryTime).toBe(5);
      expect(responseData.data.cep).toBe('12345-678');
    });

    it('deve calcular o frete para Uber Flash corretamente', async () => {
      const mockRequestData = {
        cep: '12345-678',
        items: [
          { id: '1', quantity: 2 },
          { id: '2', quantity: 1 }
        ],
        shippingMethod: 'Uber Flash'
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockRequestData
      });
      
      validateCEP.mockReturnValueOnce(true);
      
      await shippingCalculateHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      const responseData = JSON.parse(res._getData());
      
      expect(responseData.success).toBe(true);
      expect(responseData.data.shippingMethod).toBe('Uber Flash');
      expect(typeof responseData.data.shippingPrice).toBe('number');
      expect(responseData.data.deliveryTime).toBe(1);
      expect(responseData.data.cep).toBe('12345-678');
    });

    it('deve retornar erro para CEP inválido', async () => {
      const mockRequestData = {
        cep: 'cep-invalido',
        items: [
          { id: '1', quantity: 2 }
        ],
        shippingMethod: 'Correios'
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockRequestData
      });
      
      validateCEP.mockReturnValueOnce(false);
      
      await shippingCalculateHandler(req, res);
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'CEP inválido'
      });
    });

    it('deve retornar erro para método de envio inválido', async () => {
      const mockRequestData = {
        cep: '12345-678',
        items: [
          { id: '1', quantity: 2 }
        ],
        shippingMethod: 'Método Inválido'
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockRequestData
      });
      
      validateCEP.mockReturnValueOnce(true);
      
      await shippingCalculateHandler(req, res);
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Método de envio inválido'
      });
    });

    it('deve retornar erro para lista de itens vazia', async () => {
      const mockRequestData = {
        cep: '12345-678',
        items: [],
        shippingMethod: 'Correios'
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockRequestData
      });
      
      validateCEP.mockReturnValueOnce(true);
      
      await shippingCalculateHandler(req, res);
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Lista de itens inválida'
      });
    });
  });
});
