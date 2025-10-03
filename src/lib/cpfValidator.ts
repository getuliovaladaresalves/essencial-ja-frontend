/**
 * Utilitário para validação de CPF
 */
import { useState } from 'react';

/**
 * Remove caracteres não numéricos do CPF
 */
export const cleanCPF = (cpf: string): string => {
  return cpf.replace(/\D/g, '');
};

/**
 * Formata CPF no padrão XXX.XXX.XXX-XX
 */
export const formatCPF = (cpf: string): string => {
  const cleaned = cleanCPF(cpf);
  
  if (cleaned.length <= 3) {
    return cleaned;
  } else if (cleaned.length <= 6) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3)}`;
  } else if (cleaned.length <= 9) {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6)}`;
  } else {
    return `${cleaned.slice(0, 3)}.${cleaned.slice(3, 6)}.${cleaned.slice(6, 9)}-${cleaned.slice(9, 11)}`;
  }
};

/**
 * Valida se o CPF é válido
 */
export const isValidCPF = (cpf: string): boolean => {
  const cleaned = cleanCPF(cpf);
  
  // Verifica se tem 11 dígitos
  if (cleaned.length !== 11) {
    return false;
  }
  
  // Verifica se todos os dígitos são iguais (CPF inválido)
  if (/^(\d)\1{10}$/.test(cleaned)) {
    return false;
  }
  
  // Calcula o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned.charAt(i)) * (10 - i);
  }
  let remainder = sum % 11;
  let firstDigit = remainder < 2 ? 0 : 11 - remainder;
  
  // Verifica o primeiro dígito
  if (parseInt(cleaned.charAt(9)) !== firstDigit) {
    return false;
  }
  
  // Calcula o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned.charAt(i)) * (11 - i);
  }
  remainder = sum % 11;
  let secondDigit = remainder < 2 ? 0 : 11 - remainder;
  
  // Verifica o segundo dígito
  if (parseInt(cleaned.charAt(10)) !== secondDigit) {
    return false;
  }
  
  return true;
};

/**
 * Valida e formata CPF em uma única função
 */
export const validateAndFormatCPF = (cpf: string): { isValid: boolean; formatted: string; error?: string } => {
  const cleaned = cleanCPF(cpf);
  
  if (cleaned.length === 0) {
    return { isValid: false, formatted: '', error: 'CPF é obrigatório' };
  }
  
  if (cleaned.length < 11) {
    return { isValid: false, formatted: formatCPF(cleaned), error: 'CPF deve ter 11 dígitos' };
  }
  
  if (cleaned.length > 11) {
    return { isValid: false, formatted: formatCPF(cleaned.slice(0, 11)), error: 'CPF deve ter 11 dígitos' };
  }
  
  if (!isValidCPF(cleaned)) {
    return { isValid: false, formatted: formatCPF(cleaned), error: 'CPF inválido' };
  }
  
  return { isValid: true, formatted: formatCPF(cleaned) };
};

/**
 * Hook para gerenciar CPF com validação
 */

export const useCPF = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');
  
  const handleChange = (newValue: string) => {
    const result = validateAndFormatCPF(newValue);
    setValue(result.formatted);
    setError(result.error || '');
  };
  
  const validate = () => {
    const result = validateAndFormatCPF(value);
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
