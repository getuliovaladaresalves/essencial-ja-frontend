import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faCreditCard, faCheckCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Provider {
  id: number;
  nome: string;
  categoria: string;
  foto: string;
  avaliacao: number;
  distancia: number;
  tempoChegada: string;
  preco: string;
  seloEssencial: boolean;
  aberto24h: boolean;
  parceiroPro: boolean;
  descricao?: string;
  endereco: {
    texto: string;
    urlMapaEmbed: string;
  };
}

interface ConfirmacaoModalProps {
  prestador: Provider;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmacaoModal: React.FC<ConfirmacaoModalProps> = ({ prestador, onClose, onConfirm }) => {
  const [detalhesAdicionais, setDetalhesAdicionais] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    
    // Simular processamento
    setTimeout(() => {
      setIsLoading(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-foreground mb-4">Confirmar Serviço</h2>
          
          {/* Resumo do Serviço */}
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={prestador.foto} 
                alt={prestador.nome}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-foreground">{prestador.nome}</h3>
                <p className="text-sm text-muted-foreground">{prestador.categoria}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Confirmar chamado para <strong>{prestador.nome}</strong>
            </p>
          </div>

          {/* Endereço de Atendimento */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />
              Endereço de Atendimento
            </h3>
            <div className="bg-muted/30 rounded-lg p-3">
              <p className="text-sm text-foreground">
                Rua das Flores, 123 - Centro<br />
                Belo Horizonte, MG - 30112-000
              </p>
            </div>
          </div>

          {/* Detalhes Adicionais */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Detalhes Adicionais (Opcional)
            </h3>
            <Textarea
              value={detalhesAdicionais}
              onChange={(e) => setDetalhesAdicionais(e.target.value)}
              placeholder="Descreva o problema ou adicione informações importantes..."
              className="w-full min-h-[80px] resize-none"
            />
          </div>

          {/* Pagamento */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
              <FontAwesomeIcon icon={faCreditCard} className="text-primary" />
              Pagamento
            </h3>
            <div className="bg-muted/30 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faCreditCard} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">Visa **** 1234</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{prestador.preco}</span>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4">
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
              type="button"
              onClick={handleConfirm}
              className="flex-1 bg-primary hover:bg-primary-hover"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
                  Processando...
                </>
              ) : (
                <>
                  <FontAwesomeIcon icon={faCheckCircle} className="mr-2" />
                  Confirmar e Chamar Agora
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacaoModal;
