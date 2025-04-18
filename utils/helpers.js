// Função auxiliar para criar slugs a partir de strings
export const createSlug = (text) => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w-]+/g, '') // Remove caracteres não alfanuméricos
    .replace(/--+/g, '-'); // Substitui múltiplos hífens por um único
};

// Formatar preço para exibição
export const formatPrice = (price) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(price);
};

// Calcular preço com desconto PIX (3% de desconto)
export const calculatePixPrice = (price) => {
  return price * 0.97;
};

// Gerar código aleatório para pedidos
export const generateOrderCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

// Validar CEP
export const validateCEP = (cep) => {
  const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
  return cepRegex.test(cep);
};

// Validar email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar telefone
export const validatePhone = (phone) => {
  const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/;
  return phoneRegex.test(phone);
};
