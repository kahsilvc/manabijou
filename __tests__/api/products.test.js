import { createMocks } from 'node-mocks-http';
import productsHandler from '../../pages/api/products/index';
import productHandler from '../../pages/api/products/[id]';

// Mock do MongoDB
jest.mock('../../lib/dbConnect', () => jest.fn());

// Mock do modelo Product
jest.mock('../../models/Product', () => ({
  find: jest.fn(),
  countDocuments: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
  populate: jest.fn()
}));

describe('API de Produtos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/products', () => {
    it('deve retornar todos os produtos com paginação', async () => {
      const mockProducts = [
        { id: '1', name: 'Brinco Pérola', price: 39.90, category: { id: '1', name: 'Brincos' } },
        { id: '2', name: 'Colar Coração', price: 49.90, category: { id: '2', name: 'Colares' } }
      ];
      
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          page: '1',
          limit: '10'
        }
      });
      
      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockProducts)
      };
      
      require('../../models/Product').find.mockReturnValue(mockFind);
      require('../../models/Product').countDocuments.mockResolvedValueOnce(2);
      
      await productsHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockProducts,
        pagination: {
          total: 2,
          page: 1,
          pages: 1
        }
      });
    });

    it('deve filtrar produtos por categoria', async () => {
      const mockProducts = [
        { id: '1', name: 'Brinco Pérola', price: 39.90, category: { id: '1', name: 'Brincos' } }
      ];
      
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          category: '1',
          page: '1',
          limit: '10'
        }
      });
      
      const mockFind = {
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        populate: jest.fn().mockResolvedValue(mockProducts)
      };
      
      require('../../models/Product').find.mockReturnValue(mockFind);
      require('../../models/Product').countDocuments.mockResolvedValueOnce(1);
      
      await productsHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockProducts,
        pagination: {
          total: 1,
          page: 1,
          pages: 1
        }
      });
      
      // Verificar se o filtro foi aplicado corretamente
      expect(require('../../models/Product').find).toHaveBeenCalledWith({ category: '1' });
    });
  });

  describe('POST /api/products', () => {
    it('deve criar um novo produto', async () => {
      const mockProduct = {
        name: 'Novo Produto',
        description: 'Descrição do produto',
        price: 59.90,
        pixPrice: 58.10,
        images: ['/images/produto.jpg'],
        category: '1',
        material: 'Prata 925',
        stock: 10,
        featured: true
      };
      
      const mockCreatedProduct = {
        ...mockProduct,
        id: '123'
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockProduct
      });
      
      require('../../models/Product').create.mockResolvedValueOnce(mockCreatedProduct);
      
      await productsHandler(req, res);
      
      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockCreatedProduct
      });
    });
  });

  describe('GET /api/products/[id]', () => {
    it('deve retornar um produto específico', async () => {
      const mockProduct = {
        id: '123',
        name: 'Brinco Pérola',
        price: 39.90,
        category: { id: '1', name: 'Brincos' }
      };
      
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '123'
        }
      });
      
      const mockFindById = {
        populate: jest.fn().mockResolvedValue(mockProduct)
      };
      
      require('../../models/Product').findById.mockReturnValue(mockFindById);
      
      await productHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockProduct
      });
    });

    it('deve retornar 404 se o produto não existir', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '999'
        }
      });
      
      const mockFindById = {
        populate: jest.fn().mockResolvedValue(null)
      };
      
      require('../../models/Product').findById.mockReturnValue(mockFindById);
      
      await productHandler(req, res);
      
      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Produto não encontrado'
      });
    });
  });

  describe('PUT /api/products/[id]', () => {
    it('deve atualizar um produto existente', async () => {
      const mockUpdateData = {
        name: 'Produto Atualizado',
        description: 'Nova descrição',
        price: 69.90,
        pixPrice: 67.80,
        stock: 15
      };
      
      const mockUpdatedProduct = {
        id: '123',
        ...mockUpdateData
      };
      
      const { req, res } = createMocks({
        method: 'PUT',
        query: {
          id: '123'
        },
        body: mockUpdateData
      });
      
      require('../../models/Product').findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedProduct);
      
      await productHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockUpdatedProduct
      });
    });
  });

  describe('DELETE /api/products/[id]', () => {
    it('deve excluir um produto existente', async () => {
      const mockDeletedProduct = {
        id: '123',
        name: 'Produto Excluído'
      };
      
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: '123'
        }
      });
      
      require('../../models/Product').findByIdAndDelete.mockResolvedValueOnce(mockDeletedProduct);
      
      await productHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: {}
      });
    });

    it('deve retornar 404 se o produto a ser excluído não existir', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: '999'
        }
      });
      
      require('../../models/Product').findByIdAndDelete.mockResolvedValueOnce(null);
      
      await productHandler(req, res);
      
      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Produto não encontrado'
      });
    });
  });
});
