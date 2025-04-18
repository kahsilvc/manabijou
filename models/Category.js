import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, forneça um nome para a categoria'],
    trim: true,
    maxlength: [50, 'Nome não pode ter mais de 50 caracteres'],
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  image: {
    type: String,
    required: [true, 'Por favor, forneça uma imagem para a categoria']
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
