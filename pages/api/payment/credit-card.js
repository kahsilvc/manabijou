// /pages/api/payment/credit-card.js
import connectDB from '../../../lib/dbConnect';
import Order from '../../../models/Order';
import { generateOrderCode } from '../../../utils/helpers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  await connectDB();

  try {
    const { 
      orderId, 
      cardNumber, 
      cardHolder, 
      expiryDate, 
      cvv 
    } = req.body;

    // Validar dados do cartão (simplificado para demonstração)
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      return res.status(400).json({ 
        success: false, 
        message: 'Dados do cartão incompletos' 
      });
    }

    // Buscar o pedido
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Pedido não encontrado' });
    }

    // Verificar se o pedido já foi pago
    if (order.isPaid) {
      return res.status(400).json({ success: false, message: 'Este pedido já foi pago' });
    }

    // Simular processamento de pagamento
    const transactionId = generateOrderCode();
    
    // Atualizar informações de pagamento no pedido
    order.paymentResult = {
      id: transactionId,
      status: 'COMPLETED',
      update_time: new Date().toISOString(),
    };
    
    // Marcar pedido como pago
    order.isPaid = true;
    order.paidAt = new Date();
    order.status = 'Pago';
    
    // Salvar pedido atualizado
    await order.save();

    // Retornar confirmação de pagamento
    res.status(200).json({
      success: true,
      data: {
        transactionId,
        status: 'COMPLETED',
        orderId: order._id
      }
    });
  } catch (error) {
    console.error('Erro ao processar pagamento com cartão:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
