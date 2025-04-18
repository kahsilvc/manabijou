import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    name: {
      type: String,
      required: [true, 'Por favor, forneça o nome do cliente']
    },
    email: {
      type: String,
      required: [true, 'Por favor, forneça o email do cliente']
    },
    phone: {
      type: String,
      required: [true, 'Por favor, forneça o telefone do cliente']
    }
  },
  shippingAddress: {
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
    }
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantidade deve ser pelo menos 1']
      },
      price: {
        type: Number,
        required: true
      },
      image: {
        type: String,
        required: true
      }
    }
  ],
  paymentMethod: {
    type: String,
    required: [true, 'Por favor, selecione um método de pagamento'],
    enum: ['PIX', 'Cartão de Crédito']
  },
  paymentResult: {
    id: String,
    status: String,
    update_time: String,
    email_address: String
  },
  shippingMethod: {
    type: String,
    required: [true, 'Por favor, selecione um método de entrega'],
    enum: ['Correios', 'Uber Flash']
  },
  shippingPrice: {
    type: Number,
    required: [true, 'Por favor, forneça o valor do frete'],
    default: 0.0
  },
  totalPrice: {
    type: Number,
    required: [true, 'Por favor, forneça o valor total'],
    default: 0.0
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false
  },
  paidAt: {
    type: Date
  },
  isDelivered: {
    type: Boolean,
    required: true,
    default: false
  },
  deliveredAt: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['Pendente', 'Pago', 'Enviado', 'Entregue', 'Cancelado'],
    default: 'Pendente'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
