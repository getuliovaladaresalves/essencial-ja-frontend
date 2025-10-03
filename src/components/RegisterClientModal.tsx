import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUserPlus,
  faSpinner,
  faTimes,
  faCheck,
  faUser,
  faEnvelope,
  faLock,
  faPhone,
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/contexts/ModalContext';

interface RegisterClientModalProps {
  onClose: () => void;
}

const RegisterClientModal: React.FC<RegisterClientModalProps> = ({ onClose }) => {
  const { showModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    endereco: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro quando usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório';
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório';
    if (!formData.senha) newErrors.senha = 'Senha é obrigatória';
    if (formData.senha.length < 6) newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    if (formData.senha !== formData.confirmarSenha) newErrors.confirmarSenha = 'Senhas não coincidem';
    if (!formData.telefone.trim()) newErrors.telefone = 'Telefone é obrigatório';
    if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://essencial-ja-backend.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha,
          telefone: formData.telefone,
          endereco: formData.endereco
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('✅ Cadastro realizado com sucesso!');
        onClose();
        // Redirecionar para login
        showModal('login', { flow: 'client' });
      } else {
        const errorData = await response.json();
        alert(`❌ Erro no cadastro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      alert('❌ Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
              Cadastro de Cliente
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
            </button>
          </div>
          <p className="text-muted-foreground mt-2">
            Crie sua conta para contratar serviços essenciais
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome Completo *
            </label>
            <Input
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange('nome', e.target.value)}
              placeholder="Seu nome completo"
              className={errors.nome ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.nome && <p className="text-sm text-destructive mt-1">{errors.nome}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              E-mail *
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="seu@email.com"
              className={errors.email ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Senha *
            </label>
            <Input
              type="password"
              value={formData.senha}
              onChange={(e) => handleInputChange('senha', e.target.value)}
              placeholder="Mínimo 6 caracteres"
              className={errors.senha ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.senha && <p className="text-sm text-destructive mt-1">{errors.senha}</p>}
          </div>

          {/* Confirmar Senha */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirmar Senha *
            </label>
            <Input
              type="password"
              value={formData.confirmarSenha}
              onChange={(e) => handleInputChange('confirmarSenha', e.target.value)}
              placeholder="Confirme sua senha"
              className={errors.confirmarSenha ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.confirmarSenha && <p className="text-sm text-destructive mt-1">{errors.confirmarSenha}</p>}
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Telefone *
            </label>
            <Input
              type="tel"
              value={formData.telefone}
              onChange={(e) => handleInputChange('telefone', e.target.value)}
              placeholder="(11) 99999-9999"
              className={errors.telefone ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.telefone && <p className="text-sm text-destructive mt-1">{errors.telefone}</p>}
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Endereço *
            </label>
            <Input
              type="text"
              value={formData.endereco}
              onChange={(e) => handleInputChange('endereco', e.target.value)}
              placeholder="Rua, número, bairro, cidade"
              className={errors.endereco ? 'border-destructive' : ''}
              disabled={isLoading}
            />
            {errors.endereco && <p className="text-sm text-destructive mt-1">{errors.endereco}</p>}
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Criar Conta
                </>
              )}
            </Button>
          </div>

          {/* Link para login */}
          <div className="text-center pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  showModal('login', { flow: 'client' });
                }}
                className="text-primary hover:text-primary-hover transition-colors font-medium"
                disabled={isLoading}
              >
                Fazer login
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterClientModal;
