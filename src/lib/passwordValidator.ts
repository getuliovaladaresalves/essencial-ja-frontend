/**
 * Utilitário para validação de senha
 */
import { useState } from 'react';

/**
 * Valida se a senha atende aos critérios de segurança
 */
export const validatePassword = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Comprimento mínimo
  if (password.length < 8) {
    errors.push('A senha deve ter pelo menos 8 caracteres');
  }
  
  // Comprimento máximo
  if (password.length > 128) {
    errors.push('A senha deve ter no máximo 128 caracteres');
  }
  
  // Pelo menos uma letra minúscula
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  
  // Pelo menos uma letra maiúscula
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  
  // Pelo menos um número
  if (!/\d/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }
  
  // Pelo menos um caractere especial
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial (!@#$%^&*()_+-=[]{}|;:,.<>?)');
  }
  
  // Não pode conter espaços
  if (/\s/.test(password)) {
    errors.push('A senha não pode conter espaços');
  }
  
  // Não pode ser uma senha comum
  const commonPasswords = [
    '123456', 'password', '123456789', '12345678', '12345',
    '1234567', '1234567890', 'qwerty', 'abc123', '111111',
    '123123', 'admin', 'letmein', 'welcome', 'monkey',
    '1234', 'dragon', 'master', 'hello', 'freedom',
    'whatever', 'qazwsx', 'trustno1', '654321', 'jordan',
    'harley', 'password123', '123qwe', 'welcome123'
  ];
  
  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('Esta senha é muito comum. Escolha uma senha mais segura');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida se as senhas coincidem
 */
export const validatePasswordMatch = (password: string, confirmPassword: string): { isValid: boolean; error?: string } => {
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: 'As senhas não coincidem'
    };
  }
  
  return { isValid: true };
};

/**
 * Calcula a força da senha
 */
export const getPasswordStrength = (password: string): { strength: 'weak' | 'medium' | 'strong' | 'very-strong'; score: number } => {
  let score = 0;
  
  // Comprimento
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;
  
  // Tipos de caracteres
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 1;
  
  // Determinar força
  if (score < 3) return { strength: 'weak', score };
  if (score < 5) return { strength: 'medium', score };
  if (score < 7) return { strength: 'strong', score };
  return { strength: 'very-strong', score };
};

/**
 * Hook para gerenciar senha com validação
 */
export const usePassword = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [strength, setStrength] = useState<{ strength: 'weak' | 'medium' | 'strong' | 'very-strong'; score: number }>({ strength: 'weak', score: 0 });
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    if (newValue.length === 0) {
      setErrors([]);
      setStrength({ strength: 'weak', score: 0 });
      return;
    }
    
    const validation = validatePassword(newValue);
    setErrors(validation.errors);
    setStrength(getPasswordStrength(newValue));
  };
  
  const validate = () => {
    const validation = validatePassword(value);
    setErrors(validation.errors);
    return validation.isValid;
  };
  
  return {
    value,
    errors,
    strength,
    isValid: errors.length === 0,
    handleChange,
    validate
  };
};

/**
 * Hook para gerenciar confirmação de senha
 */
export const usePasswordConfirm = (password: string, initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string>('');
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    if (newValue.length === 0) {
      setError('');
      return;
    }
    
    const validation = validatePasswordMatch(password, newValue);
    setError(validation.error || '');
  };
  
  const validate = () => {
    const validation = validatePasswordMatch(password, value);
    setError(validation.error || '');
    return validation.isValid;
  };
  
  return {
    value,
    error,
    isValid: error === '',
    handleChange,
    validate
  };
};
