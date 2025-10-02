import { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCar,
  faKey,
  faWrench,
  faBolt,
  faStar,
  faLocationDot,
  faClock,
  faShield,
  faCrown,
  faPhone,
  faTimes,
  faJugDetergent,
  faShirt,
  faMapMarkerAlt,
  faUser,
  faEnvelope,
  faBuilding,
  faCheck,
  faLock,
  faSignInAlt,
  faExclamationTriangle,
  faFire,
  faWrench,
  faUserPlus,
  faShoppingCart,
  faHeart,
  faBell,
  faCog,
  faSignOutAlt,
  faBars,
} from '@fortawesome/free-solid-svg-icons';

// Importação das imagens geradas
import provider1 from '@/assets/provider-1.jpg';
import provider2 from '@/assets/provider-2.jpg';
import provider3 from '@/assets/provider-3.jpg';
import provider4 from '@/assets/provider-4.jpg';
import provider5 from '@/assets/provider-5.jpg';

// Importação dos componentes de UI
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Interface para o tipo de Prestador
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

// Mock data conforme especificado
const mockData: Provider[] = [
  {
    id: 1,
    nome: 'Borracharia Silva (Destaque)',
    categoria: 'borracharia',
    foto: provider1,
    avaliacao: 4.9,
    distancia: 1.2,
    tempoChegada: '25-40 min',
    preco: 'A partir de R$ 120',
    seloEssencial: true,
    aberto24h: true,
    parceiroPro: true,
    descricao: 'Conserto de pneu, alinhamento e balanceamento.',
    endereco: {
      texto: 'Av. Principal, 1234 - Centro, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 2,
    nome: 'Chaveiro Central 24h',
    categoria: 'chaveiro',
    foto: provider2,
    avaliacao: 4.8,
    distancia: 2.5,
    tempoChegada: '15-30 min',
    preco: 'A partir de R$ 90',
    seloEssencial: true,
    aberto24h: true,
    parceiroPro: false,
    descricao: 'Abertura de portas e chaves codificadas.',
    endereco: {
      texto: 'Rua das Flores, 567 - Savassi, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 3,
    nome: 'Luz & Cia Eletricistas',
    categoria: 'eletricista',
    foto: provider3,
    avaliacao: 4.7,
    distancia: 3.1,
    tempoChegada: 'Agendamento',
    preco: 'Orçamento rápido',
    seloEssencial: true,
    aberto24h: false,
    parceiroPro: false,
    descricao: 'Reparos elétricos residenciais e comerciais.',
    endereco: {
      texto: 'Av. Contorno, 890 - Funcionários, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 4,
    nome: 'Disk Gás da Vizinhança',
    categoria: 'gas',
    foto: provider4,
    avaliacao: 4.9,
    distancia: 0.8,
    tempoChegada: 'Até 50 min',
    preco: 'Preço da região',
    seloEssencial: false,
    aberto24h: false,
    parceiroPro: false,
    descricao: 'Entrega de botijão de gás e galão de água.',
    endereco: {
      texto: 'Rua da Paz, 123 - São Pedro, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 5,
    nome: 'Hidráulica Jato',
    categoria: 'encanador',
    foto: provider5,
    avaliacao: 4.6,
    distancia: 4.0,
    tempoChegada: '40-60 min',
    preco: 'A partir de R$ 180',
    seloEssencial: false,
    aberto24h: true,
    parceiroPro: false,
    descricao: 'Reparo de vazamentos e desentupimento.',
    endereco: {
      texto: 'Av. Afonso Pena, 456 - Centro, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 6,
    nome: 'Auto Elétrica Carga Rápida',
    categoria: 'eletricista',
    foto: provider1,
    avaliacao: 5.0,
    distancia: 1.5,
    tempoChegada: '30-45 min',
    preco: 'A partir de R$ 150',
    seloEssencial: true,
    aberto24h: true,
    parceiroPro: true,
    descricao: 'Especialista em sistemas elétricos automotivos.',
    endereco: {
      texto: 'Rua do Comércio, 789 - Lourdes, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 7,
    nome: 'Borrachari de Getulio',
    categoria: 'borracharia',
    foto: provider2,
    avaliacao: 4.8,
    distancia: 2.3,
    tempoChegada: '20-35 min',
    preco: 'A partir de R$ 100',
    seloEssencial: true,
    aberto24h: true,
    parceiroPro: true,
    descricao: 'Especialista em conserto de pneus, alinhamento, balanceamento e serviços automotivos. Atendimento 24h com qualidade garantida.',
    endereco: {
      texto: 'Av. Getúlio Vargas, 1500 - Centro, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
];

// Categorias rápidas
const quickCategories = [
  { id: 'borracharia', name: 'Borracharia', icon: faCar },
  { id: 'chaveiro', name: 'Chaveiro', icon: faKey },
  { id: 'encanador', name: 'Encanador', icon: faWrench },
  { id: 'eletricista', name: 'Eletricista', icon: faBolt },
  { id: 'gas', name: 'Água/Gás', icon: faJugDetergent },
  { id: 'lavanderia', name: 'Lavanderia', icon: faShirt },
];

const Index = () => {
  // Estado da aplicação
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    recomendados: false,
    aberto24h: false,
    seloEssencial: false,
  });
  const [sortBy, setSortBy] = useState<'relevance' | 'rating' | 'distance'>('relevance');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  
  // Estado do modal de cadastro
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [cadastroData, setCadastroData] = useState({
    nome: '',
    email: '',
    telefone: '',
    categoria: '',
    endereco: '',
    descricao: '',
    horarioFuncionamento: '',
    precoBase: '',
    experiencia: '',
    certificacoes: '',
  });

  // Estado do modal de login
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    senha: '',
  });

  // Estado do modal de emergência
  const [isEmergenciaOpen, setIsEmergenciaOpen] = useState(false);
  const [categoriaEmergencia, setCategoriaEmergencia] = useState<string | null>(null);

  // Estados de usuário
  const [userType, setUserType] = useState<'guest' | 'customer' | 'provider'>('guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    tipo: 'customer' as 'customer' | 'provider',
    avatar: '',
  });

  // Estados para modais de usuário final
  const [isCustomerCadastroOpen, setIsCustomerCadastroOpen] = useState(false);
  const [isCustomerLoginOpen, setIsCustomerLoginOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
  });

  // Estado para cabeçalho mobile
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para cabeçalho mobile com throttling
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          setIsScrolled(scrollTop > 80);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lógica de filtro e ordenação
  const filteredAndSortedProviders = useMemo(() => {
    let result = [...mockData];

    // Aplicar busca
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtro de categoria
    if (selectedCategory) {
      result = result.filter((p) => p.categoria === selectedCategory);
    }

    // Aplicar filtros
    if (filters.recomendados) {
      result = result.filter((p) => p.avaliacao >= 4.8);
    }
    if (filters.aberto24h) {
      result = result.filter((p) => p.aberto24h);
    }
    if (filters.seloEssencial) {
      result = result.filter((p) => p.seloEssencial);
    }

    // Aplicar ordenação
    if (sortBy === 'rating') {
      result.sort((a, b) => b.avaliacao - a.avaliacao);
    } else if (sortBy === 'distance') {
      result.sort((a, b) => a.distancia - b.distancia);
    }

    return result;
  }, [searchTerm, selectedCategory, filters, sortBy]);

  const handleFilterToggle = (filterName: keyof typeof filters) => {
    setFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const handleSOSClick = () => {
    setIsEmergenciaOpen(true);
  };

  // Lógica para prestadores de emergência
  const emergenciaProviders = useMemo(() => {
    if (!categoriaEmergencia) return [];
    return mockData.filter(provider => 
      provider.categoria === categoriaEmergencia && 
      (provider.aberto24h || provider.seloEssencial)
    );
  }, [categoriaEmergencia]);

  // Categorias de emergência
  const categoriasEmergencia = [
    { id: 'borracharia', name: 'Borracharia', icon: faCar, description: 'Pneu furado, conserto urgente' },
    { id: 'chaveiro', name: 'Chaveiro', icon: faKey, description: 'Fechado fora de casa, chave perdida' },
    { id: 'eletricista', name: 'Eletricista', icon: faBolt, description: 'Falta de energia, problemas elétricos' },
    { id: 'encanador', name: 'Encanador', icon: faWrench, description: 'Vazamento, entupimento urgente' },
  ];

  // Funções para o formulário de cadastro
  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log('Dados do cadastro:', cadastroData);
    alert('✅ Cadastro realizado com sucesso!\n\nEm breve nossa equipe entrará em contato para finalizar o processo.');
    setIsCadastroOpen(false);
    // Limpar formulário
    setCadastroData({
      nome: '',
      email: '',
      telefone: '',
      categoria: '',
      endereco: '',
      descricao: '',
      horarioFuncionamento: '',
      precoBase: '',
      experiencia: '',
      certificacoes: '',
    });
  };

  const handleCadastroChange = (field: string, value: string) => {
    setCadastroData(prev => ({ ...prev, [field]: value }));
  };

  // Funções para o formulário de login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para autenticação
    console.log('Dados do login:', loginData);
    alert('✅ Login realizado com sucesso!\n\nBem-vindo de volta!');
    setIsLoginOpen(false);
    // Limpar formulário
    setLoginData({
      email: '',
      senha: '',
    });
  };

  const handleLoginChange = (field: string, value: string) => {
    setLoginData(prev => ({ ...prev, [field]: value }));
  };

  // Funções para usuários finais
  const handleCustomerCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Cadastro de cliente:', customerData);
    alert('✅ Cadastro realizado com sucesso!\n\nBem-vindo ao Essenciais Já!');
    setIsCustomerCadastroOpen(false);
    setIsLoggedIn(true);
    setUserType('customer');
    setUserData({
      nome: customerData.nome,
      email: customerData.email,
      tipo: 'customer',
      avatar: '',
    });
    setCustomerData({ nome: '', email: '', telefone: '', endereco: '' });
  };

  const handleCustomerLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login de cliente:', customerData);
    alert('✅ Login realizado com sucesso!\n\nBem-vindo de volta!');
    setIsCustomerLoginOpen(false);
    setIsLoggedIn(true);
    setUserType('customer');
    setUserData({
      nome: customerData.nome,
      email: customerData.email,
      tipo: 'customer',
      avatar: '',
    });
  };

  const handleCustomerChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType('guest');
    setUserData({ nome: '', email: '', tipo: 'customer', avatar: '' });
  };

  // Componente do Card de Prestador
  const ProviderCard = ({ provider, isSelected }: { provider: Provider; isSelected: boolean }) => (
    <div
      onClick={() => setSelectedProvider(provider)}
      className={`bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer border-2 ${
        isSelected ? 'border-primary' : 'border-transparent'
      } ${provider.parceiroPro ? 'relative ring-2 ring-yellow-400/20 bg-gradient-to-br from-yellow-50/30 to-orange-50/30 shadow-lg shadow-yellow-400/10' : ''}`}
    >
      
      {/* Container Principal com Flexbox */}
      <div className="flex items-start space-x-4 p-4">
        {/* Coluna da Imagem */}
        <div className="flex-shrink-0">
          <img
            src={provider.foto}
            alt={`Foto de ${provider.nome}`}
            className="w-20 h-20 rounded-lg object-cover shadow-sm"
            loading="lazy"
          />
        </div>

        {/* Coluna do Conteúdo */}
        <div className="flex-1 min-w-0">
          {/* Seção Superior - Nome */}
          <div className="flex items-start justify-between gap-3">
            <h3 className={`font-bold text-lg leading-tight line-clamp-2 ${
              provider.parceiroPro 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600' 
                : 'text-card-foreground'
            }`}>
              {provider.nome}
              {provider.parceiroPro && (
                <span className="ml-2 text-xs bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-0.5 rounded-full font-bold">
                  PRO
                </span>
              )}
            </h3>
          </div>

          {/* Selos e Badges - Posicionamento separado */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {provider.seloEssencial && (
              <div className="flex items-center bg-success/10 text-success px-2 py-1 rounded-full shrink-0">
                <FontAwesomeIcon icon={faShield} className="text-xs mr-1" />
                <span className="text-xs font-bold whitespace-nowrap">Selo Essencial</span>
              </div>
            )}
            {provider.aberto24h && (
              <div className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full shrink-0">
                <FontAwesomeIcon icon={faClock} className="text-xs mr-1" />
                <span className="text-xs font-bold whitespace-nowrap">24h</span>
              </div>
            )}
          </div>

          {/* Seção Média - Descrição */}
          {provider.descricao && (
            <p className="text-sm text-muted-foreground leading-relaxed mt-1 line-clamp-2">
              {provider.descricao}
            </p>
          )}

          {/* Avaliação e Distância */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faStar} className="text-accent text-sm" />
              <span className="font-semibold text-card-foreground text-sm">{provider.avaliacao}</span>
              <span className="text-muted-foreground text-sm">
                ({provider.distancia} km)
              </span>
            </div>
          </div>

          {/* Seção Inferior - Tempo de Chegada e Preço */}
          <div className="flex items-center gap-3 mt-3 pt-2 border-t border-border/50">
            <span className="font-semibold text-success text-sm">{provider.tempoChegada}</span>
            <span className="text-muted-foreground text-sm">|</span>
            <span className="text-card-foreground font-medium text-sm">{provider.preco}</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Modal de Cadastro de Prestador
  const CadastroModal = () => (
    <Dialog open={isCadastroOpen} onOpenChange={setIsCadastroOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FontAwesomeIcon icon={faUser} className="text-primary" />
            Cadastre-se como Prestador
          </DialogTitle>
          <DialogDescription>
            Preencha o formulário abaixo para se tornar um prestador de serviços em nossa plataforma.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleCadastroSubmit} className="space-y-6">
          {/* Informações Pessoais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-primary" />
              Informações Pessoais
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nome Completo *
                </label>
                <Input
                  type="text"
                  value={cadastroData.nome}
                  onChange={(e) => handleCadastroChange('nome', e.target.value)}
                  placeholder="Seu nome completo"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  E-mail *
                </label>
                <Input
                  type="email"
                  value={cadastroData.email}
                  onChange={(e) => handleCadastroChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Telefone/WhatsApp *
                </label>
                <Input
                  type="tel"
                  value={cadastroData.telefone}
                  onChange={(e) => handleCadastroChange('telefone', e.target.value)}
                  placeholder="(31) 99999-9999"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categoria de Serviço *
                </label>
                <Select value={cadastroData.categoria} onValueChange={(value) => handleCadastroChange('categoria', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione sua categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="borracharia">Borracharia</SelectItem>
                    <SelectItem value="chaveiro">Chaveiro</SelectItem>
                    <SelectItem value="eletricista">Eletricista</SelectItem>
                    <SelectItem value="encanador">Encanador</SelectItem>
                    <SelectItem value="gas">Água/Gás</SelectItem>
                    <SelectItem value="lavanderia">Lavanderia</SelectItem>
                    <SelectItem value="outros">Outros</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Informações Profissionais */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faBuilding} className="text-primary" />
              Informações Profissionais
            </h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Endereço de Atendimento *
              </label>
              <Input
                type="text"
                value={cadastroData.endereco}
                onChange={(e) => handleCadastroChange('endereco', e.target.value)}
                placeholder="Rua, número, bairro, cidade - UF"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Descrição dos Serviços *
              </label>
              <Textarea
                value={cadastroData.descricao}
                onChange={(e) => handleCadastroChange('descricao', e.target.value)}
                placeholder="Descreva os serviços que você oferece..."
                className="min-h-[100px]"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Horário de Funcionamento *
                </label>
                <Input
                  type="text"
                  value={cadastroData.horarioFuncionamento}
                  onChange={(e) => handleCadastroChange('horarioFuncionamento', e.target.value)}
                  placeholder="Ex: 8h às 18h, Seg-Sex"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preço Base (opcional)
                </label>
                <Input
                  type="text"
                  value={cadastroData.precoBase}
                  onChange={(e) => handleCadastroChange('precoBase', e.target.value)}
                  placeholder="Ex: A partir de R$ 50"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Experiência Profissional
              </label>
              <Textarea
                value={cadastroData.experiencia}
                onChange={(e) => handleCadastroChange('experiencia', e.target.value)}
                placeholder="Conte-nos sobre sua experiência na área..."
                className="min-h-[80px]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Certificações e Qualificações
              </label>
              <Textarea
                value={cadastroData.certificacoes}
                onChange={(e) => handleCadastroChange('certificacoes', e.target.value)}
                placeholder="Mencione certificações, cursos, especializações..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCadastroOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover"
            >
              <FontAwesomeIcon icon={faCheck} className="mr-2" />
              Cadastrar-se
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // Modal de Login
  const LoginModal = () => (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
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
        
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                E-mail *
              </label>
              <Input
                type="email"
                value={loginData.email}
                onChange={(e) => handleLoginChange('email', e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Senha *
              </label>
              <Input
                type="password"
                value={loginData.senha}
                onChange={(e) => handleLoginChange('senha', e.target.value)}
                placeholder="Sua senha"
                required
                className="w-full"
              />
            </div>
          </div>

          {/* Links adicionais */}
          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-hover transition-colors"
            >
              Esqueci minha senha
            </button>
            <div className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsLoginOpen(false);
                  setIsCadastroOpen(true);
                }}
                className="text-primary hover:text-primary-hover transition-colors font-medium"
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
              onClick={() => setIsLoginOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Entrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // Modal de Emergência
  const EmergenciaModal = () => (
    <Dialog open={isEmergenciaOpen} onOpenChange={setIsEmergenciaOpen}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-destructive">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-destructive" />
            🚨 SOS EMERGÊNCIA
          </DialogTitle>
          <DialogDescription>
            Selecione o tipo de serviço de emergência que você precisa. Mostraremos os prestadores disponíveis 24h.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Seleção de Categoria */}
          {!categoriaEmergencia && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Qual tipo de emergência você está enfrentando?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoriasEmergencia.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setCategoriaEmergencia(categoria.id)}
                    className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <FontAwesomeIcon 
                        icon={categoria.icon} 
                        className="text-2xl text-primary group-hover:text-primary-hover transition-colors" 
                      />
                      <div>
                        <h4 className="font-semibold text-foreground">{categoria.name}</h4>
                        <p className="text-sm text-muted-foreground">{categoria.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Lista de Prestadores de Emergência */}
          {categoriaEmergencia && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Prestadores de Emergência Disponíveis
                </h3>
                <button
                  onClick={() => setCategoriaEmergencia(null)}
                  className="text-sm text-primary hover:text-primary-hover transition-colors"
                >
                  ← Voltar à seleção
                </button>
              </div>

              {emergenciaProviders.length > 0 ? (
                <div className="space-y-3">
                  {emergenciaProviders.map((provider) => (
                    <div
                      key={provider.id}
                      className="p-4 border border-destructive/20 rounded-lg bg-destructive/5 hover:bg-destructive/10 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedProvider(provider);
                        setIsEmergenciaOpen(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={provider.foto}
                            alt={provider.nome}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-semibold text-foreground">{provider.nome}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
                              <span>{provider.avaliacao}</span>
                              <span>•</span>
                              <span>{provider.distancia} km</span>
                              <span>•</span>
                              <span>{provider.tempoChegada}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-foreground">{provider.preco}</div>
                          <div className="flex items-center gap-1 text-xs">
                            {provider.aberto24h && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">
                                24h
                              </span>
                            )}
                            {provider.seloEssencial && (
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                                Essencial
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-muted-foreground mb-4" />
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Nenhum prestador disponível
                  </h4>
                  <p className="text-muted-foreground">
                    Não há prestadores de {categoriasEmergencia.find(c => c.id === categoriaEmergencia)?.name} 
                    disponíveis para emergência no momento.
                  </p>
                  <button
                    onClick={() => setCategoriaEmergencia(null)}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Escolher outra categoria
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Botão de Fechar */}
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => {
                setIsEmergenciaOpen(false);
                setCategoriaEmergencia(null);
              }}
              variant="outline"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  // Modal de Cadastro de Cliente
  const CustomerCadastroModal = () => (
    <Dialog open={isCustomerCadastroOpen} onOpenChange={setIsCustomerCadastroOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FontAwesomeIcon icon={faUserPlus} className="text-primary" />
            Criar Conta
          </DialogTitle>
          <DialogDescription>
            Cadastre-se para contratar serviços e ter acesso a recursos exclusivos.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleCustomerCadastroSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Nome Completo *
            </label>
            <Input
              type="text"
              value={customerData.nome}
              onChange={(e) => handleCustomerChange('nome', e.target.value)}
              placeholder="Seu nome completo"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              E-mail *
            </label>
            <Input
              type="email"
              value={customerData.email}
              onChange={(e) => handleCustomerChange('email', e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Telefone *
            </label>
            <Input
              type="tel"
              value={customerData.telefone}
              onChange={(e) => handleCustomerChange('telefone', e.target.value)}
              placeholder="(31) 99999-9999"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Endereço *
            </label>
            <Input
              type="text"
              value={customerData.endereco}
              onChange={(e) => handleCustomerChange('endereco', e.target.value)}
              placeholder="Rua, número, bairro, cidade"
              required
            />
          </div>

          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsCustomerCadastroOpen(false);
                  setIsCustomerLoginOpen(true);
                }}
                className="text-primary hover:text-primary-hover transition-colors font-medium"
              >
                Entrar aqui
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCustomerCadastroOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover"
            >
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Criar Conta
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // Modal de Login de Cliente
  const CustomerLoginModal = () => (
    <Dialog open={isCustomerLoginOpen} onOpenChange={setIsCustomerLoginOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FontAwesomeIcon icon={faSignInAlt} className="text-primary" />
            Entrar
          </DialogTitle>
          <DialogDescription>
            Acesse sua conta para contratar serviços e acompanhar pedidos.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleCustomerLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              E-mail *
            </label>
            <Input
              type="email"
              value={customerData.email}
              onChange={(e) => handleCustomerChange('email', e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Senha *
            </label>
            <Input
              type="password"
              value={customerData.telefone}
              onChange={(e) => handleCustomerChange('telefone', e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>

          <div className="text-center space-y-2">
            <button
              type="button"
              className="text-sm text-primary hover:text-primary-hover transition-colors"
            >
              Esqueci minha senha
            </button>
            <div className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={() => {
                  setIsCustomerLoginOpen(false);
                  setIsCustomerCadastroOpen(true);
                }}
                className="text-primary hover:text-primary-hover transition-colors font-medium"
              >
                Cadastre-se aqui
              </button>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCustomerLoginOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-hover"
            >
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              Entrar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // Modal de Detalhes do Prestador
  const ProviderModal = ({ provider }: { provider: Provider }) => (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={() => setSelectedProvider(null)}
    >
      <div
        className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header do Modal */}
        <div className="relative">
          <img
            src={provider.foto}
            alt={provider.nome}
            className="w-full h-64 object-cover rounded-t-2xl"
          />
          <button
            onClick={() => setSelectedProvider(null)}
            className="absolute top-4 right-4 bg-card text-card-foreground rounded-full w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          {provider.parceiroPro && (
            <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold flex items-center gap-2">
              <FontAwesomeIcon icon={faCrown} />
              PARCEIRO PRO
            </div>
          )}
        </div>

        {/* Conteúdo do Modal */}
        <div className="p-6 space-y-6">
          <div>
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-2xl font-bold text-card-foreground">{provider.nome}</h2>
              {provider.seloEssencial && (
                <div className="flex items-center bg-success/10 text-success px-3 py-2 rounded-full shrink-0">
                  <FontAwesomeIcon icon={faShield} className="mr-2" />
                  <span className="font-bold">Selo Essencial</span>
                </div>
              )}
            </div>
            <p className="text-muted-foreground mt-2">{provider.descricao}</p>
          </div>

          {/* Avaliação e Distância */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faStar} className="text-accent text-xl" />
              <div>
                <div className="font-bold text-xl text-card-foreground">{provider.avaliacao}</div>
                <div className="text-muted-foreground text-xs">Avaliação</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-primary text-xl" />
              <div>
                <div className="font-bold text-xl text-card-foreground">{provider.distancia} km</div>
                <div className="text-muted-foreground text-xs">Distância</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-success text-xl" />
              <div>
                <div className="font-bold text-card-foreground">{provider.tempoChegada}</div>
                <div className="text-muted-foreground text-xs">Chegada</div>
              </div>
            </div>
          </div>

          {/* Informações Adicionais */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary mt-1" />
              <div>
                <div className="font-semibold text-card-foreground">Endereço</div>
                <div className="text-muted-foreground text-sm">{provider.endereco.texto}</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faClock} className="text-primary mt-1" />
              <div>
                <div className="font-semibold text-card-foreground">Disponibilidade</div>
                <div className="text-muted-foreground text-sm">
                  {provider.aberto24h ? 'Aberto 24 horas' : 'Horário comercial'}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FontAwesomeIcon icon={faStar} className="text-accent mt-1" />
              <div>
                <div className="font-semibold text-card-foreground">Preço</div>
                <div className="text-success font-bold">{provider.preco}</div>
              </div>
            </div>
          </div>

          {/* Mapa Interativo */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faLocationDot} className="text-primary" />
              <span className="font-semibold text-card-foreground">Localização no Mapa</span>
            </div>
            <iframe
              src={provider.endereco.urlMapaEmbed}
              className="w-full h-48 rounded-lg border-0 shadow-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa de localização - ${provider.nome}`}
            />
          </div>

          {/* Botão de Ação */}
          <button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-4 rounded-lg font-bold text-lg transition-colors">
            Contratar Serviço
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Layout Desktop */}
      <div className="hidden md:flex h-screen flex-col">
        {/* Header Desktop */}
        <header className="bg-card shadow-lg z-20 border-b border-border">
          {/* Área de Registro Moderna */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <FontAwesomeIcon icon={faShield} className="text-primary" />
                  <span>Plataforma confiável de serviços essenciais</span>
                </div>
              </div>
              
              {/* Navegação de Usuário */}
              <div className="flex items-center gap-4">
                {!isLoggedIn ? (
                  <>
                    <button 
                      onClick={() => setIsCustomerLoginOpen(true)}
                      className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                    >
                      Entrar
                    </button>
                    <button 
                      onClick={() => setIsCustomerCadastroOpen(true)}
                      className="px-4 py-1.5 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary-hover transition-colors font-medium"
                    >
                      Criar Conta
                    </button>
                    <div className="h-4 w-px bg-border"></div>
                    <button 
                      onClick={() => setIsLoginOpen(true)}
                      className="text-sm text-primary hover:text-primary-hover transition-colors font-medium"
                    >
                      Sou Prestador
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faUser} className="text-primary-foreground text-sm" />
                      </div>
                      <span className="text-sm font-medium text-foreground">{userData.nome}</span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Barra Principal */}
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-8">
                <h1 className="text-3xl font-bold text-primary">Essenciais Já</h1>
                
                {/* Barra de busca Desktop */}
                <div className="relative w-[400px]">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Buscar por serviço ou nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-2 rounded-full border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <FontAwesomeIcon icon={faLocationDot} className="text-lg" />
                    <span className="text-sm">Belo Horizonte</span>
                  </div>
                  <button 
                    onClick={handleSOSClick}
                    className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive rounded-full hover:bg-destructive/20 transition-colors font-medium"
                  >
                    <FontAwesomeIcon icon={faPhone} className="text-sm" />
                    <span className="text-sm">Emergência</span>
                  </button>
                </div>
              </div>
              
              {/* Menu de Usuário Logado */}
              {isLoggedIn && (
                <div className="flex items-center gap-4">
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Favoritos">
                    <FontAwesomeIcon icon={faHeart} className="text-lg" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Carrinho">
                    <FontAwesomeIcon icon={faShoppingCart} className="text-lg" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Notificações">
                    <FontAwesomeIcon icon={faBell} className="text-lg" />
                  </button>
                  <button className="p-2 text-muted-foreground hover:text-foreground transition-colors" title="Configurações">
                    <FontAwesomeIcon icon={faCog} className="text-lg" />
                  </button>
                </div>
              )}
            </div>
          </div>

        </header>

        {/* Conteúdo Principal Desktop */}
        <div className="flex-1 flex overflow-hidden">
          {/* Coluna Esquerda - Lista */}
          <div className="w-[450px] flex flex-col border-r border-border bg-card">
            {/* Info e Controles */}
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Serviços em Belo Horizonte</h2>
              <p className="text-muted-foreground mt-1">
                {filteredAndSortedProviders.length} opções encontradas
              </p>

              {/* Controles de Filtro e Ordenação */}
              <div className="flex items-center space-x-2 mt-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="border border-border rounded-full py-2 px-4 bg-background text-foreground hover:bg-gray-100 cursor-pointer text-sm transition-colors"
                >
                  <option value="relevance">Ordenar por: Relevância</option>
                  <option value="rating">Ordenar por: Avaliação</option>
                  <option value="distance">Ordenar por: Distância</option>
                </select>

                <button
                  onClick={() => handleFilterToggle('aberto24h')}
                  className={`border rounded-full py-2 px-4 text-sm font-medium transition-colors ${
                    filters.aberto24h
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:bg-gray-100'
                  }`}
                >
                  Aberto 24h
                </button>

                <button
                  onClick={() => handleFilterToggle('seloEssencial')}
                  className={`border rounded-full py-2 px-4 text-sm font-medium transition-colors ${
                    filters.seloEssencial
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border hover:bg-gray-100'
                  }`}
                >
                  Selo Essencial
                </button>
              </div>
            </div>

            {/* Lista de Prestadores */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {filteredAndSortedProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isSelected={selectedProvider?.id === provider.id}
                />
              ))}
              {filteredAndSortedProviders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhum prestador encontrado
                </div>
              )}
            </div>
          </div>

          {/* Coluna Direita - Mapa */}
          <div className="flex-1 relative bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29998.69460136275!2d-43.95421226953124!3d-19.93282249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa699dd3de625af%3A0x4301a88496677417!2sPra%C3%A7a%20da%20Liberdade!5e0!3m2!1spt-BR!2sbr!4v1696035650742!5m2!1spt-BR!2sbr"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute inset-0 pointer-events-none">
              {filteredAndSortedProviders.slice(0, 5).map((provider, index) => (
                <div
                  key={provider.id}
                  className="absolute text-4xl text-destructive pointer-events-auto cursor-pointer hover:scale-125 transition-transform drop-shadow-lg"
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${30 + index * 12}%`,
                    transform: 'translate(-50%, -100%)',
                  }}
                  onClick={() => setSelectedProvider(provider)}
                >
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Layout Mobile */}
      <div className="md:hidden min-h-screen pb-24">
        {/* Header Mobile Moderno */}
        <header className={`sticky top-0 z-20 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background shadow-lg border-b border-border py-2' 
            : 'bg-gradient-to-r from-primary/10 to-secondary/10 shadow-lg border-b border-border py-0'
        }`}>
          {/* Versão Normal do Header */}
          {!isScrolled && (
            <>
              {/* Área de Registro Mobile */}
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-primary/10 px-4 py-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <FontAwesomeIcon icon={faShield} className="text-primary" />
                    <span>Serviços essenciais</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {!isLoggedIn ? (
                      <>
                        <button 
                          onClick={() => setIsCustomerLoginOpen(true)}
                          className="text-sm text-foreground hover:text-primary transition-colors font-medium"
                        >
                          Entrar
                        </button>
                        <button 
                          onClick={() => setIsCustomerCadastroOpen(true)}
                          className="px-3 py-1.5 bg-primary text-primary-foreground text-sm rounded-full hover:bg-primary-hover transition-colors font-medium"
                        >
                          Criar Conta
                        </button>
                        <button 
                          onClick={() => setIsLoginOpen(true)}
                          className="text-xs text-primary hover:text-primary-hover transition-colors"
                        >
                          Prestador
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <FontAwesomeIcon icon={faUser} className="text-primary-foreground text-xs" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{userData.nome}</span>
                        <button 
                          onClick={handleLogout}
                          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Versão Compacta do Header (quando scrolled) */}
          {isScrolled && (
            <div className="px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold text-primary">Essenciais Já</h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                    <span className="text-sm">BH</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {!isLoggedIn ? (
                    <>
                      <button 
                        onClick={() => setIsCustomerLoginOpen(true)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                        title="Entrar"
                      >
                        <FontAwesomeIcon icon={faSignInAlt} className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setIsCustomerCadastroOpen(true)}
                        className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary-hover transition-colors"
                        title="Criar Conta"
                      >
                        <FontAwesomeIcon icon={faUserPlus} className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setIsLoginOpen(true)}
                        className="p-2 text-primary hover:text-primary-hover transition-colors"
                        title="Sou Prestador"
                      >
                        <FontAwesomeIcon icon={faBuilding} className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center overflow-hidden">
                        <FontAwesomeIcon icon={faUser} className="text-primary-foreground text-sm w-4 h-4" />
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Sair"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  <button 
                    onClick={handleSOSClick}
                    className="p-2 bg-destructive/10 text-destructive rounded-full hover:bg-destructive/20 transition-colors"
                    title="Emergência"
                  >
                    <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Conteúdo Principal do Header - Só aparece quando não scrolled */}
          {!isScrolled && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h1 className="text-2xl font-bold text-primary">Essenciais Já</h1>
              <button 
                onClick={handleSOSClick}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} className="text-sm" />
                <span className="text-sm font-medium">Emergência</span>
              </button>
            </div>
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <FontAwesomeIcon icon={faLocationDot} className="text-sm" />
                <span className="text-sm">Belo Horizonte</span>
              </div>
            </div>
          )}
        </header>

        <main className="p-4 space-y-6">
          {/* Barra de busca Mobile */}
          <div className="relative">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="O que você precisa agora?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-border rounded-xl bg-card text-card-foreground focus:outline-none focus:border-primary transition-all"
            />
          </div>

          {/* Categorias Rápidas */}
          <div>
            <div className="grid grid-cols-3 gap-3">
              {quickCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === category.id ? null : category.id)
                  }
                  className={`flex flex-col items-center p-3 rounded-xl transition-all ${
                    selectedCategory === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-primary/10 text-primary'
                  }`}
                >
                  <FontAwesomeIcon icon={category.icon} className="text-2xl" />
                  <span className="text-xs mt-2 font-semibold text-center leading-tight">
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Lista de prestadores */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-4">
              Disponíveis perto de você
            </h2>
            <div className="space-y-4">
              {filteredAndSortedProviders.map((provider) => (
                <ProviderCard
                  key={provider.id}
                  provider={provider}
                  isSelected={selectedProvider?.id === provider.id}
                />
              ))}
              {filteredAndSortedProviders.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  Nenhum prestador encontrado
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Rodapé fixo com botão de emergência */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-20">
          <button
            onClick={handleSOSClick}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-4 rounded-xl font-bold text-lg shadow-emergency transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <FontAwesomeIcon icon={faPhone} className="text-xl" />
            SOS EMERGÊNCIA
          </button>
        </div>
      </div>

      {/* Modal de Detalhes */}
      {selectedProvider && <ProviderModal provider={selectedProvider} />}
      
      {/* Modal de Cadastro */}
      <CadastroModal />
      
      {/* Modal de Login */}
      <LoginModal />
      
      {/* Modal de Emergência */}
      <EmergenciaModal />
      
      {/* Modal de Cadastro de Cliente */}
      <CustomerCadastroModal />
      
      {/* Modal de Login de Cliente */}
      <CustomerLoginModal />
    </div>
  );
};

export default Index;
