/**
 * Utilitário para validação de endereços brasileiros
 */
import { useState } from 'react';

/**
 * Valida se o endereço está no formato correto
 */
export const validateAddress = (address: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!address || address.trim().length === 0) {
    errors.push('Endereço é obrigatório');
    return { isValid: false, errors };
  }

  const trimmedAddress = address.trim();
  
  // Comprimento mínimo
  if (trimmedAddress.length < 10) {
    errors.push('Endereço deve ter pelo menos 10 caracteres');
  }
  
  // Comprimento máximo
  if (trimmedAddress.length > 200) {
    errors.push('Endereço deve ter no máximo 200 caracteres');
  }
  
  // Deve conter pelo menos uma vírgula (separando rua, número, bairro, cidade)
  if (!trimmedAddress.includes(',')) {
    errors.push('Endereço deve conter vírgulas para separar rua, número, bairro e cidade');
  }
  
  // Deve conter pelo menos um número (número da casa/edifício)
  if (!/\d/.test(trimmedAddress)) {
    errors.push('Endereço deve conter pelo menos um número');
  }
  
  // Não pode conter apenas números
  if (/^\d+$/.test(trimmedAddress.replace(/[,\s]/g, ''))) {
    errors.push('Endereço não pode conter apenas números');
  }
  
  // Deve conter pelo menos uma letra
  if (!/[a-zA-Z]/.test(trimmedAddress)) {
    errors.push('Endereço deve conter pelo menos uma letra');
  }
  
  // Validação de formato básico (Rua, Número, Bairro, Cidade, Estado)
  const addressParts = trimmedAddress.split(',').map(part => part.trim());
  
  if (addressParts.length < 3) {
    errors.push('Endereço deve conter pelo menos: rua, número, bairro, cidade');
  }
  
  // Verificar se cada parte tem conteúdo
  const emptyParts = addressParts.filter(part => part.length === 0);
  if (emptyParts.length > 0) {
    errors.push('Todas as partes do endereço devem ter conteúdo (não deixe vírgulas vazias)');
  }
  
  // Validação de CEP (se presente)
  const cepMatch = trimmedAddress.match(/\b\d{5}-?\d{3}\b/);
  if (cepMatch) {
    const cep = cepMatch[0].replace(/\D/g, '');
    if (!isValidCEP(cep)) {
      errors.push('CEP inválido');
    }
  }
  
  // Validação de estado (se presente)
  const stateMatch = trimmedAddress.match(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/i);
  if (stateMatch) {
    // Estado encontrado, validar se está no final do endereço
    const stateIndex = trimmedAddress.lastIndexOf(stateMatch[0]);
    const endPart = trimmedAddress.substring(stateIndex);
    if (endPart.length > 10) {
      errors.push('Estado deve estar no final do endereço');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Valida CEP brasileiro
 */
export const isValidCEP = (cep: string): boolean => {
  const cleanCEP = cep.replace(/\D/g, '');
  
  if (cleanCEP.length !== 8) {
    return false;
  }
  
  // CEPs inválidos conhecidos
  const invalidCEPs = [
    '00000000', '11111111', '22222222', '33333333', '44444444',
    '55555555', '66666666', '77777777', '88888888', '99999999'
  ];
  
  if (invalidCEPs.includes(cleanCEP)) {
    return false;
  }
  
  return true;
};

/**
 * Formata endereço para exibição
 */
export const formatAddress = (address: string): string => {
  if (!address) return '';
  
  let formatted = address.trim();
  
  // Capitalizar primeira letra de cada palavra
  formatted = formatted.replace(/\b\w/g, (char) => char.toUpperCase());
  
  // Corrigir abreviações comuns
  const abbreviations = {
    'R ': 'Rua ',
    'Av ': 'Avenida ',
    'Al ': 'Alameda ',
    'Tv ': 'Travessa ',
    'Pc ': 'Praça ',
    'Ch ': 'Chácara ',
    'Fz ': 'Fazenda ',
    'Lt ': 'Loteamento ',
    'Qd ': 'Quadra ',
    'Lote ': 'Lote ',
    'Cj ': 'Conjunto ',
    'Res ': 'Residencial ',
    'Cond ': 'Condomínio ',
    'Vl ': 'Vila ',
    'Jd ': 'Jardim ',
    'Pq ': 'Parque ',
    'Bs ': 'Bosque ',
    'Est ': 'Estrada ',
    'Rod ': 'Rodovia ',
    'Br ': 'BR-',
    'Sp ': 'SP',
    'Rj ': 'RJ',
    'Mg ': 'MG',
    'Pr ': 'PR',
    'Rs ': 'RS',
    'Sc ': 'SC',
    'Ba ': 'BA',
    'Ce ': 'CE',
    'Pe ': 'PE',
    'Go ': 'GO',
    'Pa ': 'PA',
    'Ma ': 'MA',
    'Mt ': 'MT',
    'Ms ': 'MS',
    'Alagoas ': 'AL',
    'Se ': 'SE',
    'Pb ': 'PB',
    'Rn ': 'RN',
    'Pi ': 'PI',
    'To ': 'TO',
    'Ac ': 'AC',
    'Am ': 'AM',
    'Rr ': 'RR',
    'Ap ': 'AP',
    'Ro ': 'RO',
    'Df ': 'DF',
    'Es ': 'ES'
  };
  
  Object.entries(abbreviations).forEach(([abbr, full]) => {
    const regex = new RegExp(`\\b${abbr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'gi');
    formatted = formatted.replace(regex, full);
  });
  
  return formatted;
};

/**
 * Extrai componentes do endereço
 */
export const parseAddress = (address: string): {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
} => {
  if (!address) {
    return {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    };
  }
  
  const parts = address.split(',').map(part => part.trim());
  
  // Extrair CEP
  const cepMatch = address.match(/\b\d{5}-?\d{3}\b/);
  const cep = cepMatch ? cepMatch[0].replace(/\D/g, '') : '';
  
  // Extrair estado
  const stateMatch = address.match(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/i);
  const estado = stateMatch ? stateMatch[0].toUpperCase() : '';
  
  // Extrair número
  const numeroMatch = address.match(/\b\d+\b/);
  const numero = numeroMatch ? numeroMatch[0] : '';
  
  // Distribuir partes
  let rua = '';
  let bairro = '';
  let cidade = '';
  
  if (parts.length >= 1) {
    rua = parts[0].replace(/\b\d+\b/, '').trim();
  }
  
  if (parts.length >= 2) {
    bairro = parts[1];
  }
  
  if (parts.length >= 3) {
    cidade = parts[2].replace(/\b(AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO)\b/i, '').trim();
  }
  
  return {
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep
  };
};

/**
 * Gera sugestões de endereço baseadas em padrões comuns
 */
export const generateAddressSuggestions = (partialAddress: string): string[] => {
  if (!partialAddress || partialAddress.length < 3) {
    return [];
  }
  
  const suggestions: string[] = [];
  const lowerAddress = partialAddress.toLowerCase();
  
  // Sugestões baseadas em padrões comuns
  const commonPatterns = [
    'Rua das Flores, 123, Centro, São Paulo, SP',
    'Avenida Paulista, 1000, Bela Vista, São Paulo, SP',
    'Rua Augusta, 456, Consolação, São Paulo, SP',
    'Avenida Ipiranga, 789, República, São Paulo, SP',
    'Rua Oscar Freire, 321, Jardins, São Paulo, SP',
    'Avenida Faria Lima, 654, Itaim Bibi, São Paulo, SP',
    'Rua Haddock Lobo, 987, Cerqueira César, São Paulo, SP',
    'Avenida Rebouças, 147, Pinheiros, São Paulo, SP',
    'Rua da Consolação, 258, Centro, São Paulo, SP',
    'Avenida 9 de Julho, 369, Bela Vista, São Paulo, SP'
  ];
  
  // Filtrar sugestões baseadas no input
  commonPatterns.forEach(pattern => {
    if (pattern.toLowerCase().includes(lowerAddress)) {
      suggestions.push(pattern);
    }
  });
  
  return suggestions.slice(0, 5); // Máximo 5 sugestões
};

/**
 * Hook para gerenciar endereço com validação
 */
export const useAddress = (initialValue: string = '') => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    
    if (newValue.length === 0) {
      setErrors([]);
      setSuggestions([]);
      return;
    }
    
    const validation = validateAddress(newValue);
    setErrors(validation.errors);
    
    // Gerar sugestões se houver erros e o endereço for parcial
    if (validation.errors.length > 0 && newValue.length >= 3) {
      setSuggestions(generateAddressSuggestions(newValue));
    } else {
      setSuggestions([]);
    }
  };
  
  const validate = () => {
    const validation = validateAddress(value);
    setErrors(validation.errors);
    return validation.isValid;
  };
  
  const format = () => {
    const formatted = formatAddress(value);
    setValue(formatted);
    return formatted;
  };
  
  const parse = () => {
    return parseAddress(value);
  };
  
  return {
    value,
    errors,
    suggestions,
    isValid: errors.length === 0,
    handleChange,
    validate,
    format,
    parse
  };
};
