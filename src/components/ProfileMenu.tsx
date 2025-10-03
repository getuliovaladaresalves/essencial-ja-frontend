import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserCircle, 
  faChevronDown, 
  faShoppingBag, 
  faUser, 
  faRightFromBracket 
} from '@fortawesome/free-solid-svg-icons';

interface ProfileMenuProps {
  isLoggedIn: boolean;
  userData: {
    nome: string;
    email: string;
    tipo: 'customer' | 'provider';
    avatar: string;
  };
  onLogout: () => void;
  className?: string;
}

const ProfileMenu = ({ isLoggedIn, userData, onLogout, className = '' }: ProfileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fechar menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      {/* Botão do Perfil */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faUserCircle} className="text-primary-foreground text-lg" />
        </div>
        <div className="hidden md:block text-left">
          <div className="text-sm font-medium text-gray-900">{userData.nome}</div>
          <div className="text-xs text-gray-500">{userData.tipo === 'provider' ? 'Prestador' : 'Cliente'}</div>
        </div>
        <FontAwesomeIcon 
          icon={faChevronDown} 
          className={`text-xs text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-2">
            {/* Header do Menu */}
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="text-sm font-medium text-gray-900">{userData.nome}</div>
              <div className="text-xs text-gray-500">{userData.email}</div>
            </div>

            {/* Itens do Menu */}
            <div className="py-1">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faShoppingBag} className="text-gray-400" />
                Meus Pedidos
              </button>
              
              <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                Meus Dados
              </button>
            </div>

            {/* Separador */}
            <div className="border-t border-gray-100 my-1"></div>

            {/* Botão Sair */}
            <button 
              onClick={() => {
                onLogout();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faRightFromBracket} className="text-red-500" />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
