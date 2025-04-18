import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor, forneça um nome'],
    trim: true,
    maxlength: [50, 'Nome não pode ter mais de 50 caracteres']
  },
  email: {
    type: String,
    required: [true, 'Por favor, forneça um email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor, forneça um email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'Por favor, forneça uma senha'],
    minlength: [6, 'Senha deve ter pelo menos 6 caracteres'],
    select: false
  },
  phone: {
    type: String,
    required: [true, 'Por favor, forneça um telefone']
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  addresses: [
    {
      street: {
        type: String,
        required: [true, 'Por favor, forneça o endereço']
      },
      number: {
        type: String,
        required: [true, 'Por favor, forneça o número']
      },
      complement: {
        type: String
      },
      neighborhood: {
        type: String,
        required: [true, 'Por favor, forneça o bairro']
      },
      city: {
        type: String,
        required: [true, 'Por favor, forneça a cidade']
      },
      state: {
        type: String,
        required: [true, 'Por favor, forneça o estado']
      },
      zipCode: {
        type: String,
        required: [true, 'Por favor, forneça o CEP']
      },
      isDefault: {
        type: Boolean,
        default: false
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
