// /pages/api/products/index.js
import connectDB from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        // Parâmetros de consulta opcionais
        const { category, featured, limit = 12, page = 1 } = req.query;
        
        // Construir filtro
        const filter = {};
        if (category) filter.category = category;
        if (featured === 'true') filter.featured = true;
        
        // Calcular paginação
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Buscar produtos com paginação
        const products = await Product.find(filter)
          .sort({ createdAt: -1 })
          .limit(parseInt(limit))
          .skip(skip)
          .populate('category', 'name');
        
        // Contar total de produtos para paginação
        const total = await Product.countDocuments(filter);
        
        res.status(200).json({ 
          success: true, 
          data: products,
          pagination: {
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit))
          }
        });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const { 
          name, 
          description, 
          price, 
          pixPrice, 
          images, 
          category,
          material,
          stock,
          featured
        } = req.body;
        
        const product = await Product.create({
          name,
          description,
          price,
          pixPrice,
          images,
          category,
          material,
          stock,
          featured: featured || false
        });
        
        res.status(201).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Método não suportado' });
      break;
  }
}
