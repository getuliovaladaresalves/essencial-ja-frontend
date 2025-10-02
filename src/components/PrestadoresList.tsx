import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faShield, faCrown, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { usePrestadores } from '../hooks/usePrestadores';
import { Prestador } from '../services/api';

interface PrestadoresListProps {
  onPrestadorClick: (prestador: Prestador) => void;
}

export const PrestadoresList: React.FC<PrestadoresListProps> = ({ onPrestadorClick }) => {
  const { prestadores, loading, error, total } = usePrestadores();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-muted-foreground">Carregando prestadores...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faShield} className="text-2xl text-destructive" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Erro ao carregar prestadores</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    );
  }

  if (prestadores.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-2xl text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum prestador encontrado</h3>
        <p className="text-muted-foreground">Tente ajustar os filtros ou verifique sua conexão.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Prestadores Disponíveis ({total})
        </h2>
        <div className="text-sm text-muted-foreground">
          Dados carregados da API
        </div>
      </div>

      <div className="grid gap-4">
        {prestadores.map((prestador) => (
          <div
            key={prestador.id}
            onClick={() => onPrestadorClick(prestador)}
            className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all cursor-pointer hover:shadow-lg"
          >
            <div className="flex items-start gap-4">
              <img
                src={prestador.fotoUrl || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'}
                alt={prestador.user.nome}
                className="w-16 h-16 rounded-full object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold text-foreground">{prestador.user.nome}</h3>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 text-sm" />
                    <span className="text-sm text-muted-foreground">4.8</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-3">
                  {prestador.descricao || 'Prestador de serviços especializados'}
                </p>

                <div className="flex flex-wrap gap-2 mb-3">
                  {prestador.servicos.map((servico) => (
                    <span
                      key={servico.id}
                      className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                    >
                      {servico.nome}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faClock} />
                    <span>Disponível</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faShield} />
                    <span>Verificado</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-1 text-primary">
                  <FontAwesomeIcon icon={faCrown} className="text-sm" />
                  <span className="text-xs font-semibold">PRO</span>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors">
                  Contratar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
