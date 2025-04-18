// /pages/api/products/[id].js
import connectDB from '../../../lib/dbConnect';
import Product from '../../../models/Product';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const product = await Product.findById(id).populate('category', 'name');
        
        if (!product) {
          return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
        
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
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
        
        const product = await Product.findByIdAndUpdate(
          id,
          { 
            name, 
            description, 
            price, 
            pixPrice, 
            images, 
            category,
            material,
            stock,
            featured
          },
          { new: true, runValidators: true }
        );
        
        if (!product) {
          return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
        
        res.status(200).json({ success: true, data: product });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        
        if (!deletedProduct) {
          return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }
        
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Método não suportado' });
      break;
  }
}
