// /pages/api/shipping/calculate.js
import connectDB from '../../../lib/dbConnect';
import { validateCEP } from '../../../utils/helpers';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  await connectDB();

  try {
    const { 
      cep, 
      items, 
      shippingMethod 
    } = req.body;

    // Validar CEP
    if (!validateCEP(cep)) {
      return res.status(400).json({ 
        success: false, 
        message: 'CEP inválido' 
      });
    }

    // Validar itens
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'Lista de itens inválida' 
      });
    }

    // Validar método de envio
    if (!['Correios', 'Uber Flash'].includes(shippingMethod)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Método de envio inválido' 
      });
    }

    // Calcular peso total (simulado)
    const totalWeight = items.reduce((sum, item) => sum + 0.1 * item.quantity, 0);

    // Simular cálculo de frete via Super Frete
    let shippingPrice = 0;
    let deliveryTime = 0;

    if (shippingMethod === 'Correios') {
      // Simulação de cálculo para Correios
      shippingPrice = 15 + (totalWeight * 5);
      deliveryTime = 5; // 5 dias úteis
    } else if (shippingMethod === 'Uber Flash') {
      // Simulação de cálculo para Uber Flash
      shippingPrice = 25 + (totalWeight * 2);
      deliveryTime = 1; // 1 dia útil
    }

    // Retornar resultado do cálculo
    res.status(200).json({
      success: true,
      data: {
        shippingMethod,
        shippingPrice,
        deliveryTime,
        cep
      }
    });
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}
