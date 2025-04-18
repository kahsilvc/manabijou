import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, forneça um nome para o produto'],
    trim: true,
    maxlength: [100, 'Nome não pode ter mais de 100 caracteres']
  },
  description: {
    type: String,
    required: [true, 'Por favor, forneça uma descrição para o produto'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Por favor, forneça um preço para o produto'],
    min: [0, 'Preço não pode ser negativo']
  },
  pixPrice: {
    type: Number,
    required: [true, 'Por favor, forneça um preço com desconto PIX']
  },
  images: {
    type: [String],
    required: [true, 'Por favor, forneça pelo menos uma imagem']
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Por favor, selecione uma categoria']
  },
  material: {
    type: String,
    required: [true, 'Por favor, selecione o material'],
    enum: ['Prata 925', 'Aço Inoxidável']
  },
  stock: {
    type: Number,
    required: [true, 'Por favor, forneça a quantidade em estoque'],
    min: [0, 'Estoque não pode ser negativo'],
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
