import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface LocationSelectorProps {
  className?: string;
}

const LocationSelector = ({ className = '' }: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Belo Horizonte, MG');

  const locations = [
    'Belo Horizonte, MG',
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Salvador, BA',
    'Brasília, DF',
    'Fortaleza, CE',
    'Manaus, AM',
    'Curitiba, PR',
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Botão do Seletor */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm text-gray-700 hover:text-gray-900"
      >
        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />
        <span className="hidden md:inline">{selectedLocation}</span>
        <span className="md:hidden">Localização</span>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
              Selecione sua localização
            </div>
            {locations.map((location) => (
              <button
                key={location}
                onClick={() => handleLocationSelect(location)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedLocation === location
                    ? 'bg-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {location}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay para fechar o dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LocationSelector;
