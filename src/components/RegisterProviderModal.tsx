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
  faMapMarkerAlt,
  faFileText,
  faClock,
  faDollarSign,
  faCertificate,
  faStar,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useModal } from '@/contexts/ModalContext';
import { useCPF } from '@/lib/cpfValidator';
import { usePhone } from '@/lib/phoneValidator';

interface RegisterProviderModalProps {
  onClose: () => void;
}

const RegisterProviderModal: React.FC<RegisterProviderModalProps> = ({ onClose }) => {
  const { showModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    endereco: '',
    descricao: '',
    horarioFuncionamento: '',
    precoBase: '',
    experiencia: '',
    certificacoes: '',
    atendimento24h: false
  });

  // Hooks para validação
  const cpfHook = useCPF();
  const phoneHook = usePhone();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
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
    if (!formData.endereco.trim()) newErrors.endereco = 'Endereço é obrigatório';
    if (!formData.descricao.trim()) newErrors.descricao = 'Descrição é obrigatória';
    
    // Validar CPF
    if (!cpfHook.validate()) {
      newErrors.cpf = cpfHook.error;
    }
    
    // Validar telefone
    if (!phoneHook.validate()) {
      newErrors.telefone = phoneHook.error;
    }

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
          telefone: phoneHook.value.replace(/\D/g, ''), // Enviar telefone sem formatação
          endereco: formData.endereco,
          descricao: formData.descricao,
          horarioFuncionamento: formData.horarioFuncionamento,
          precoBase: formData.precoBase,
          experiencia: formData.experiencia,
          certificacoes: formData.certificacoes,
          atendimento24h: formData.atendimento24h,
          cpf: cpfHook.value.replace(/\D/g, '') // Enviar CPF sem formatação
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('✅ Cadastro realizado com sucesso!');
        onClose();
        // Opcional: redirecionar para login
        showModal('loginProvider', { flow: 'partner' });
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
      <div className="bg-background rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border p-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
              Cadastro de Prestador
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
            Preencha os dados para se tornar um parceiro Essencial Já
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Dados Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-primary" />
              Dados Pessoais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>

            {/* CPF */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                CPF *
              </label>
              <Input
                type="text"
                value={cpfHook.value}
                onChange={(e) => cpfHook.handleChange(e.target.value)}
                placeholder="000.000.000-00"
                className={cpfHook.error ? 'border-destructive' : ''}
                disabled={isLoading}
                maxLength={14}
              />
              {cpfHook.error && <p className="text-sm text-destructive mt-1">{cpfHook.error}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Telefone *
              </label>
              <Input
                type="tel"
                value={phoneHook.value}
                onChange={(e) => phoneHook.handleChange(e.target.value)}
                placeholder="(11) 99999-9999"
                className={phoneHook.error ? 'border-destructive' : ''}
                disabled={isLoading}
                maxLength={15}
              />
              {phoneHook.error && <p className="text-sm text-destructive mt-1">{phoneHook.error}</p>}
            </div>
          </div>

          {/* Dados Profissionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />
              Dados Profissionais
            </h3>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Endereço de Atendimento *
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

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descrição dos Serviços *
              </label>
              <Textarea
                value={formData.descricao}
                onChange={(e) => handleInputChange('descricao', e.target.value)}
                placeholder="Descreva os serviços que você oferece..."
                rows={3}
                className={errors.descricao ? 'border-destructive' : ''}
                disabled={isLoading}
              />
              {errors.descricao && <p className="text-sm text-destructive mt-1">{errors.descricao}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Horário de Funcionamento
                </label>
                <Input
                  type="text"
                  value={formData.horarioFuncionamento}
                  onChange={(e) => handleInputChange('horarioFuncionamento', e.target.value)}
                  placeholder="Ex: 8h às 18h, Seg-Sex"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preço Base (R$)
                </label>
                <Input
                  type="text"
                  value={formData.precoBase}
                  onChange={(e) => handleInputChange('precoBase', e.target.value)}
                  placeholder="Ex: 50,00"
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Experiência
              </label>
              <Textarea
                value={formData.experiencia}
                onChange={(e) => handleInputChange('experiencia', e.target.value)}
                placeholder="Conte sua experiência profissional..."
                rows={2}
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Certificações
              </label>
              <Textarea
                value={formData.certificacoes}
                onChange={(e) => handleInputChange('certificacoes', e.target.value)}
                placeholder="Liste suas certificações e qualificações..."
                rows={2}
                disabled={isLoading}
              />
            </div>

            {/* Checkbox para atendimento 24h */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="atendimento24h"
                checked={formData.atendimento24h}
                onChange={(e) => handleInputChange('atendimento24h', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
                disabled={isLoading}
              />
              <label htmlFor="atendimento24h" className="text-sm font-medium text-foreground">
                Ofereço atendimento 24 horas
              </label>
            </div>
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
                  Cadastrar como Parceiro
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
                  showModal('loginProvider', { flow: 'partner' });
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

export default RegisterProviderModal;
