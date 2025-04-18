import { createMocks } from 'node-mocks-http';
import categoriesHandler from '../../pages/api/categories/index';
import categoryHandler from '../../pages/api/categories/[id]';

// Mock do MongoDB
jest.mock('../../lib/dbConnect', () => jest.fn());

// Mock do modelo Category
jest.mock('../../models/Category', () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  findById: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

// Mock da função createSlug
jest.mock('../../utils/helpers', () => ({
  createSlug: jest.fn((text) => text.toLowerCase().replace(/\s+/g, '-'))
}));

describe('API de Categorias', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/categories', () => {
    it('deve retornar todas as categorias ativas', async () => {
      const mockCategories = [
        { id: '1', name: 'Brincos', slug: 'brincos', active: true },
        { id: '2', name: 'Colares', slug: 'colares', active: true }
      ];
      
      const { req, res } = createMocks({
        method: 'GET'
      });
      
      require('../../models/Category').find.mockResolvedValueOnce(mockCategories);
      
      await categoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockCategories
      });
    });
  });

  describe('POST /api/categories', () => {
    it('deve criar uma nova categoria', async () => {
      const mockCategory = {
        name: 'Nova Categoria',
        description: 'Descrição da categoria',
        image: '/images/categoria.jpg'
      };
      
      const mockCreatedCategory = {
        ...mockCategory,
        id: '123',
        slug: 'nova-categoria',
        active: true
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockCategory
      });
      
      require('../../models/Category').findOne.mockResolvedValueOnce(null);
      require('../../models/Category').create.mockResolvedValueOnce(mockCreatedCategory);
      
      await categoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(201);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockCreatedCategory
      });
    });

    it('deve retornar erro se a categoria já existir', async () => {
      const mockCategory = {
        name: 'Categoria Existente',
        description: 'Descrição da categoria',
        image: '/images/categoria.jpg'
      };
      
      const { req, res } = createMocks({
        method: 'POST',
        body: mockCategory
      });
      
      require('../../models/Category').findOne.mockResolvedValueOnce({ id: '123', name: 'Categoria Existente' });
      
      await categoriesHandler(req, res);
      
      expect(res._getStatusCode()).toBe(400);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Já existe uma categoria com este nome'
      });
    });
  });

  describe('GET /api/categories/[id]', () => {
    it('deve retornar uma categoria específica', async () => {
      const mockCategory = {
        id: '123',
        name: 'Brincos',
        slug: 'brincos',
        active: true
      };
      
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '123'
        }
      });
      
      require('../../models/Category').findById.mockResolvedValueOnce(mockCategory);
      
      await categoryHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockCategory
      });
    });

    it('deve retornar 404 se a categoria não existir', async () => {
      const { req, res } = createMocks({
        method: 'GET',
        query: {
          id: '999'
        }
      });
      
      require('../../models/Category').findById.mockResolvedValueOnce(null);
      
      await categoryHandler(req, res);
      
      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Categoria não encontrada'
      });
    });
  });

  describe('PUT /api/categories/[id]', () => {
    it('deve atualizar uma categoria existente', async () => {
      const mockUpdateData = {
        name: 'Categoria Atualizada',
        description: 'Nova descrição',
        image: '/images/nova-imagem.jpg',
        active: true
      };
      
      const mockUpdatedCategory = {
        id: '123',
        ...mockUpdateData,
        slug: 'categoria-atualizada'
      };
      
      const { req, res } = createMocks({
        method: 'PUT',
        query: {
          id: '123'
        },
        body: mockUpdateData
      });
      
      require('../../models/Category').findOne.mockResolvedValueOnce(null);
      require('../../models/Category').findByIdAndUpdate.mockResolvedValueOnce(mockUpdatedCategory);
      
      await categoryHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: mockUpdatedCategory
      });
    });
  });

  describe('DELETE /api/categories/[id]', () => {
    it('deve excluir uma categoria existente', async () => {
      const mockDeletedCategory = {
        id: '123',
        name: 'Categoria Excluída'
      };
      
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: '123'
        }
      });
      
      require('../../models/Category').findByIdAndDelete.mockResolvedValueOnce(mockDeletedCategory);
      
      await categoryHandler(req, res);
      
      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual({
        success: true,
        data: {}
      });
    });

    it('deve retornar 404 se a categoria a ser excluída não existir', async () => {
      const { req, res } = createMocks({
        method: 'DELETE',
        query: {
          id: '999'
        }
      });
      
      require('../../models/Category').findByIdAndDelete.mockResolvedValueOnce(null);
      
      await categoryHandler(req, res);
      
      expect(res._getStatusCode()).toBe(404);
      expect(JSON.parse(res._getData())).toEqual({
        success: false,
        message: 'Categoria não encontrada'
      });
    });
  });
});
