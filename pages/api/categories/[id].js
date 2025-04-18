// /pages/api/categories/[id].js
import connectDB from '../../../lib/dbConnect';
import Category from '../../../models/Category';
import { createSlug } from '../../../utils/helpers';

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const category = await Category.findById(id);
        
        if (!category) {
          return res.status(404).json({ success: false, message: 'Categoria não encontrada' });
        }
        
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const { name, description, image, active } = req.body;
        
        // Se o nome foi alterado, criar novo slug
        let updateData = { description, image, active };
        
        if (name) {
          const slug = createSlug(name);
          
          // Verificar se já existe outra categoria com este slug
          const existingCategory = await Category.findOne({ slug, _id: { $ne: id } });
          if (existingCategory) {
            return res.status(400).json({ 
              success: false, 
              message: 'Já existe outra categoria com este nome' 
            });
          }
          
          updateData = { ...updateData, name, slug };
        }
        
        const category = await Category.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        );
        
        if (!category) {
          return res.status(404).json({ success: false, message: 'Categoria não encontrada' });
        }
        
        res.status(200).json({ success: true, data: category });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        
        if (!deletedCategory) {
          return res.status(404).json({ success: false, message: 'Categoria não encontrada' });
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
