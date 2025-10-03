import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock, faPhone, faTimes, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

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

interface TrackingViewProps {
  prestador: Provider;
  onCancel: () => void;
}

const TrackingView: React.FC<TrackingViewProps> = ({ prestador, onCancel }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src={prestador.foto} 
              alt={prestador.nome}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-foreground">{prestador.nome}</h2>
              <p className="text-sm text-muted-foreground">{prestador.categoria}</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Status de Chegada */}
      <div className="bg-success/10 border-b border-success/20 p-4">
        <div className="flex items-center gap-2 text-success">
          <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />
          <span className="font-semibold text-lg">
            {prestador.nome} está a caminho!
          </span>
        </div>
        <p className="text-success/80 mt-1">
          Chegada estimada em 25-40 min
        </p>
      </div>

      {/* Mapa Simulado */}
      <div className="flex-1 bg-muted/30 p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Mapa estático com rota simulada */}
          <div className="relative h-64 bg-gradient-to-br from-blue-100 to-green-100">
            {/* Ponto de origem */}
            <div className="absolute top-4 left-4 bg-primary text-primary-foreground p-2 rounded-full shadow-lg">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
            </div>
            
            {/* Rota simulada */}
            <div className="absolute top-1/2 left-1/4 w-1/2 h-1 border-2 border-dashed border-primary opacity-60"></div>
            <div className="absolute top-1/2 left-1/4 w-1/2 h-1 border-2 border-dashed border-primary opacity-40 transform rotate-12"></div>
            
            {/* Ponto de destino */}
            <div className="absolute bottom-4 right-4 bg-destructive text-destructive-foreground p-2 rounded-full shadow-lg">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4" />
            </div>
            
            {/* Veículo em movimento */}
            <div className="absolute top-1/2 left-1/3 bg-primary text-primary-foreground p-1 rounded-full shadow-lg animate-pulse">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3" />
            </div>
          </div>
          
          {/* Informações do mapa */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground mb-2">Rota em Tempo Real</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Seu local atual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <span>Destino do serviço</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span>{prestador.nome} em trânsito</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informações do Prestador */}
      <div className="bg-card border-t border-border p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-foreground">Informações do Prestador</h3>
            <p className="text-sm text-muted-foreground">Contato direto disponível</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
            <span>ETA: 25-40 min</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
            Ligar para {prestador.nome}
          </button>
          <button 
            onClick={onCancel}
            className="px-6 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors"
          >
            Cancelar Chamado
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackingView;
