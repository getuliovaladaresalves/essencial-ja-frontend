/**
 * Utilitário para validação de telefone
 */
import { useState } from 'react';

/**
 * Remove caracteres não numéricos do telefone
 */
export const cleanPhone = (phone: string): string => {
  return phone.replace(/\D/g, '');
};

/**
 * Formata telefone no padrão (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export const formatPhone = (phone: string): string => {
  const cleaned = cleanPhone(phone);
  
  if (cleaned.length === 0) {
    return '';
  } else if (cleaned.length <= 2) {
    return `(${cleaned}`;
  } else if (cleaned.length <= 6) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
  } else if (cleaned.length <= 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  } else {
    // Telefone celular (11 dígitos)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7, 11)}`;
  }
};

/**
 * Valida se o telefone é válido
 */
export const isValidPhone = (phone: string): boolean => {
  const cleaned = cleanPhone(phone);
  
  // Telefone fixo: 10 dígitos (XX) XXXX-XXXX
  // Telefone celular: 11 dígitos (XX) XXXXX-XXXX
  if (cleaned.length !== 10 && cleaned.length !== 11) {
    return false;
  }
  
  // Verifica se o DDD é válido (11 a 99)
  const ddd = parseInt(cleaned.slice(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }
  
  // Verifica se o primeiro dígito do número é válido
  const firstDigit = parseInt(cleaned.slice(2, 3));
  if (cleaned.length === 10) {
    // Telefone fixo: primeiro dígito deve ser 2, 3, 4 ou 5
    if (![2, 3, 4, 5].includes(firstDigit)) {
      return false;
    }
  } else {
    // Telefone celular: primeiro dígito deve ser 9
    if (firstDigit !== 9) {
      return false;
    }
  }
  
  return true;
};

/**
 * Valida e formata telefone em uma única função
 */
export const validateAndFormatPhone = (phone: string): { isValid: boolean; formatted: string; error?: string } => {
  const cleaned = cleanPhone(phone);
  
  if (cleaned.length === 0) {
    return { isValid: false, formatted: '', error: 'Telefone é obrigatório' };
  }
  
  if (cleaned.length < 10) {
    return { isValid: false, formatted: formatPhone(cleaned), error: 'Telefone deve ter 10 ou 11 dígitos' };
  }
  
  if (cleaned.length > 11) {
    return { isValid: false, formatted: formatPhone(cleaned.slice(0, 11)), error: 'Telefone deve ter no máximo 11 dígitos' };
  }
  
  if (!isValidPhone(cleaned)) {
    return { isValid: false, formatted: formatPhone(cleaned), error: 'Telefone inválido' };
  }
  
  return { isValid: true, formatted: formatPhone(cleaned) };
};

/**
 * Hook para gerenciar telefone com validação
 */
export const usePhone = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');
  
  const handleChange = (newValue: string) => {
    const result = validateAndFormatPhone(newValue);
    setValue(result.formatted);
    setError(result.error || '');
  };
  
  const validate = () => {
    const result = validateAndFormatPhone(value);
    setError(result.error || '');
    return result.isValid;
  };
  
  return {
    value,
    error,
    isValid: error === '',
    handleChange,
    validate,
    setValue
  };
};
