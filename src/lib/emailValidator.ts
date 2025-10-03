/**
 * Utilitário para validação de e-mail
 */
import { useState } from 'react';

/**
 * Remove espaços em branco do e-mail
 */
export const cleanEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

/**
 * Valida se o e-mail é válido
 */
export const isValidEmail = (email: string): boolean => {
  const cleaned = cleanEmail(email);
  
  // Regex para validação de e-mail
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Verifica se o e-mail está vazio
  if (!cleaned) {
    return false;
  }
  
  // Verifica se o e-mail é muito longo
  if (cleaned.length > 254) {
    return false;
  }
  
  // Verifica se o e-mail tem formato válido
  if (!emailRegex.test(cleaned)) {
    return false;
  }
  
  // Verifica se não começa ou termina com ponto
  if (cleaned.startsWith('.') || cleaned.endsWith('.')) {
    return false;
  }
  
  // Verifica se não tem pontos consecutivos
  if (cleaned.includes('..')) {
    return false;
  }
  
  // Verifica se o domínio tem pelo menos um ponto
  const domain = cleaned.split('@')[1];
  if (!domain || !domain.includes('.')) {
    return false;
  }
  
  // Verifica se o domínio não começa ou termina com ponto
  if (domain.startsWith('.') || domain.endsWith('.')) {
    return false;
  }
  
  // Verifica se o domínio não tem pontos consecutivos
  if (domain.includes('..')) {
    return false;
  }
  
  return true;
};

/**
 * Valida e formata e-mail em uma única função
 */
export const validateAndFormatEmail = (email: string): { isValid: boolean; formatted: string; error?: string } => {
  const cleaned = cleanEmail(email);
  
  if (!cleaned) {
    return { isValid: false, formatted: '', error: 'E-mail é obrigatório' };
  }
  
  if (cleaned.length > 254) {
    return { isValid: false, formatted: cleaned, error: 'E-mail muito longo' };
  }
  
  if (!isValidEmail(cleaned)) {
    return { isValid: false, formatted: cleaned, error: 'E-mail inválido' };
  }
  
  return { isValid: true, formatted: cleaned };
};

/**
 * Hook para gerenciar e-mail com validação
 */
export const useEmail = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');
  
  const handleChange = (newValue: string) => {
    const result = validateAndFormatEmail(newValue);
    setValue(result.formatted);
    setError(result.error || '');
  };
  
  const validate = () => {
    const result = validateAndFormatEmail(value);
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
