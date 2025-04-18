// /pages/api/categories/index.js
import connectDB from '../../../lib/dbConnect';
import Category from '../../../models/Category';
import { createSlug } from '../../../utils/helpers';

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const categories = await Category.find({ active: true }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: categories });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, description, image } = req.body;
        
        // Criar slug a partir do nome
        const slug = createSlug(name);
        
        // Verificar se já existe categoria com este slug
        const existingCategory = await Category.findOne({ slug });
        if (existingCategory) {
          return res.status(400).json({ 
            success: false, 
            message: 'Já existe uma categoria com este nome' 
          });
        }
        
        const category = await Category.create({
          name,
          slug,
          description,
          image,
          active: true
        });
        
        res.status(201).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;
      
    default:
      res.status(400).json({ success: false, message: 'Método não suportado' });
      break;
  }
}
