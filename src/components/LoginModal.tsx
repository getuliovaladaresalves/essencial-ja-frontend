import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignInAlt,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: any) => void;
  onOpenCadastro: () => void;
}

const LoginModal = ({ isOpen, onClose, onLoginSuccess, onOpenCadastro }: LoginModalProps) => {
  // Estado isolado do formulário
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Chamada à API
      const response = await fetch('https://essencial-ja-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Salvar token no localStorage
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Chamar callback de sucesso
        onLoginSuccess(data.user);
        
        // Limpar formulário
        setEmail('');
        setSenha('');
        
        alert('✅ Login realizado com sucesso!\n\nBem-vindo de volta!');
      } else {
        const errorData = await response.json();
        alert(`❌ Erro no login: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      alert('❌ Erro de conexão. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    // Limpar formulário ao fechar
    setEmail('');
    setSenha('');
    setIsLoading(false);
    onClose();
  };

  const handleOpenCadastro = () => {
    handleClose();
    onOpenCadastro();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FontAwesomeIcon icon={faSignInAlt} className="text-primary" />
            Entrar na Conta
          </DialogTitle>
          <DialogDescription>
            Digite suas credenciais para acessar sua conta de prestador.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                E-mail *
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Senha *
              </label>
              <Input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Sua senha"
                required
                className="w-full"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Links adicionais */}
          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-hover transition-colors"
              disabled={isLoading}
            >
              Esqueci minha senha
            </button>
            <div className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={handleOpenCadastro}
                className="text-primary hover:text-primary-hover transition-colors font-medium"
                disabled={isLoading}
              >
                Cadastre-se aqui
              </button>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
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
                  A processar...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                  Entrar
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
