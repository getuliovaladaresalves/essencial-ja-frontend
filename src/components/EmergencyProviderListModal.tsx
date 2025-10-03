/**
 * Componente de Modal para listar prestadores de emergência.
 */
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faStar,
  faMapMarkerAlt,
  faClock,
  faShield,
  faArrowLeft,
  faSpinner,
  faExclamationTriangle,
  faCheckCircle,
  faUser,
  faCrown
} from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  telefone?: string;
}

interface EmergencyProviderListModalProps {
  category: string;
  onClose: () => void;
  onBack: () => void;
  onSelectProvider: (provider: Provider) => void;
}

const EmergencyProviderListModal: React.FC<EmergencyProviderListModalProps> = ({
  category,
  onClose,
  onBack,
  onSelectProvider
}) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data para prestadores de emergência
  const mockEmergencyProviders: Provider[] = [
    {
      id: 1,
      nome: "João Silva - Encanador 24h",
      categoria: "Encanador",
      foto: "/api/placeholder/60/60",
      avaliacao: 4.9,
      distancia: 0.8,
      tempoChegada: "15-20 min",
      preco: "R$ 80/hora",
      seloEssencial: true,
      aberto24h: true,
      parceiroPro: true,
      descricao: "Especialista em emergências hidráulicas. Atendimento 24h para vazamentos e entupimentos.",
      telefone: "(31) 99999-1111"
    },
    {
      id: 2,
      nome: "Maria Santos - Eletricista",
      categoria: "Eletricista",
      foto: "/api/placeholder/60/60",
      avaliacao: 4.8,
      distancia: 1.2,
      tempoChegada: "20-25 min",
      preco: "R$ 120/hora",
      seloEssencial: true,
      aberto24h: true,
      parceiroPro: false,
      descricao: "Eletricista certificada com 10 anos de experiência em emergências elétricas.",
      telefone: "(31) 99999-2222"
    },
    {
      id: 3,
      nome: "Carlos Chaves - Chaveiro Express",
      categoria: "Chaveiro",
      foto: "/api/placeholder/60/60",
      avaliacao: 4.7,
      distancia: 0.5,
      tempoChegada: "10-15 min",
      preco: "R$ 60/serviço",
      seloEssencial: true,
      aberto24h: true,
      parceiroPro: true,
      descricao: "Chaveiro especializado em abertura de portas e fechaduras. Atendimento 24h.",
      telefone: "(31) 99999-3333"
    },
    {
      id: 4,
      nome: "Auto Pneus 24h",
      categoria: "Borracharia",
      foto: "/api/placeholder/60/60",
      avaliacao: 4.6,
      distancia: 2.1,
      tempoChegada: "25-30 min",
      preco: "R$ 40/pneu",
      seloEssencial: true,
      aberto24h: true,
      parceiroPro: false,
      descricao: "Borracharia móvel 24h. Atendimento em qualquer local da cidade.",
      telefone: "(31) 99999-4444"
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    const loadProviders = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simular delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Filtrar prestadores pela categoria selecionada
        const filteredProviders = mockEmergencyProviders.filter(
          provider => provider.categoria === category
        );
        
        setProviders(filteredProviders);
      } catch (err) {
        setError('Erro ao carregar prestadores de emergência');
      } finally {
        setLoading(false);
      }
    };

    loadProviders();
  }, [category]);

  const handleCallProvider = (provider: Provider) => {
    if (provider.telefone) {
      window.open(`tel:${provider.telefone}`, '_self');
    }
  };

  const handleSelectProvider = (provider: Provider) => {
    onSelectProvider(provider);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-destructive flex items-center gap-2">
            🚨 SOS EMERGÊNCIA - {category}
          </DialogTitle>
          <DialogDescription>
            Prestadores de {category} disponíveis para emergência 24h
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Botão Voltar */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Voltar
            </Button>
            <div className="text-sm text-muted-foreground">
              {providers.length} prestador(es) encontrado(s)
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-12">
              <FontAwesomeIcon icon={faSpinner} className="text-4xl text-primary animate-spin" />
              <span className="ml-3 text-lg">Buscando prestadores de emergência...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-destructive mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Erro ao carregar</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Tentar Novamente
              </Button>
            </div>
          )}

          {/* Providers List */}
          {!loading && !error && (
            <>
              {providers.length > 0 ? (
                <div className="space-y-4">
                  {providers.map((provider) => (
                    <div
                      key={provider.id}
                      className="border border-destructive/20 rounded-lg bg-destructive/5 p-4 hover:bg-destructive/10 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          {/* Avatar */}
                          <div className="relative">
                            <img
                              src={provider.foto}
                              alt={provider.nome}
                              className="w-16 h-16 rounded-full object-cover border-2 border-destructive/30"
                            />
                            {provider.parceiroPro && (
                              <div className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs px-1 rounded-full">
                                PRO
                              </div>
                            )}
                          </div>

                          {/* Info */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-bold text-lg text-foreground">{provider.nome}</h3>
                              {provider.seloEssencial && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                                  <FontAwesomeIcon icon={faShield} className="mr-1" />
                                  Selo Essencial
                                </span>
                              )}
                              {provider.aberto24h && (
                                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                                  <FontAwesomeIcon icon={faClock} className="mr-1" />
                                  24h
                                </span>
                              )}
                            </div>

                            <p className="text-muted-foreground mb-3">{provider.descricao}</p>

                            {/* Stats */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                                <span className="font-medium">{provider.avaliacao}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faMapMarkerAlt} />
                                <span>{provider.distancia} km</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <FontAwesomeIcon icon={faClock} />
                                <span>{provider.tempoChegada}</span>
                              </div>
                            </div>

                            <div className="text-lg font-bold text-primary">{provider.preco}</div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 ml-4">
                          <Button
                            onClick={() => handleCallProvider(provider)}
                            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faPhone} />
                            Ligar Agora
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => handleSelectProvider(provider)}
                            className="flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faUser} />
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhum prestador disponível
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Não há prestadores de {category} disponíveis para emergência no momento.
                  </p>
                  <Button onClick={onBack}>
                    Escolher outra categoria
                  </Button>
                </div>
              )}
            </>
          )}

          {/* Emergency Tips */}
          {!loading && !error && providers.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <FontAwesomeIcon icon={faCheckCircle} />
                Dicas de Emergência
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Mantenha a calma e descreva claramente o problema</li>
                <li>• Informe sua localização exata ao prestador</li>
                <li>• Se possível, desligue a energia/água antes da chegada</li>
                <li>• Tenha documentos e chaves em mãos</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmergencyProviderListModal;
