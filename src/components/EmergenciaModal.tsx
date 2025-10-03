/**
 * Componente de Modal de Emergência para seleção de categoria.
 */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWrench, // Encanador
  faBolt,    // Eletricista
  faKey,     // Chaveiro
  faCar      // Borracharia
} from '@fortawesome/free-solid-svg-icons';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface EmergenciaModalProps {
  onClose: () => void;
  onSelectCategory: (category: string) => void;
}

const categories = [
  {
    name: 'Encanador',
    icon: faWrench,
    description: 'Vazamentos, entupimentos e reparos urgentes',
  },
  {
    name: 'Eletricista',
    icon: faBolt,
    description: 'Falhas elétricas e reparos urgentes',
  },
  {
    name: 'Chaveiro',
    icon: faKey,
    description: 'Fechaduras, chaves perdidas e abertura de portas',
  },
  {
    name: 'Borracharia',
    icon: faCar,
    description: 'Pneus furados e reparos automotivos urgentes',
  },
];

const EmergenciaModal: React.FC<EmergenciaModalProps> = ({ onClose, onSelectCategory }) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-destructive flex items-center gap-2">
            🚨 SOS EMERGÊNCIA
          </DialogTitle>
          <DialogDescription>
            Qual tipo de emergência você está enfrentando?
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onSelectCategory(category.name)}
              className="flex items-center gap-4 p-4 border border-border rounded-lg text-left hover:bg-muted/50 transition-colors group"
            >
              <FontAwesomeIcon icon={category.icon} className="text-primary text-3xl flex-shrink-0 group-hover:text-primary-hover transition-colors" />
              <div>
                <h3 className="font-semibold text-foreground">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>
            </button>
          ))}
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

export default EmergenciaModal;
