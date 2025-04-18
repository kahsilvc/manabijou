// /pages/api/payment/pix.js
import connectDB from '../../../lib/dbConnect';
import Order from '../../../models/Order';
import { generateOrderCode } from '../../../utils/helpers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  await connectDB();

  try {
    const { orderId } = req.body;

    // Buscar o pedido
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }

    // Verificar se o pedido já foi pago
    if (order.isPaid) {
      return res.status(400).json({ success: false, message: 'Este pedido já foi pago' });
    }

    // Gerar código PIX (simulado)
    const pixCode = generateOrderCode();
    
    // Atualizar informações de pagamento no pedido
    order.paymentResult = {
      id: pixCode,
      status: 'PENDING',
      update_time: new Date().toISOString(),
    };
    
    // Salvar pedido atualizado
    await order.save();

    // Retornar informações do PIX
    res.status(200).json({
      success: true,
      data: {
        pixCode,
        totalAmount: order.totalPrice,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
        orderId: order._id
      }
    });
  } catch (error) {
    console.error('Erro ao processar pagamento PIX:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
