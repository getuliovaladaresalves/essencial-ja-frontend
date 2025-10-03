import { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModal } from '@/contexts/ModalContext';
import Logo from '@/components/Logo';
import LocationSelector from '@/components/LocationSelector';
import ProfileMenu from '@/components/ProfileMenu';
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
  faCreditCard,
  faCheckCircle,
  faUser,
  faEnvelope,
  faBuilding,
  faCheck,
  faLock,
  faSignInAlt,
  faExclamationTriangle,
  faFire,
  faUserPlus,
  faShoppingCart,
  faHeart,
  faBell,
  faCog,
  faSignOutAlt,
  faBars,
  faRightFromBracket,
  faSpinner,
  faUserCircle,
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
      texto: 'Rua Padre Eustáquio, 2208 - Padre Eustáquio, Belo Horizonte - MG',
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
      texto: 'Rua Rosinha Sigaud, 716 - Alto Caiçaras, Belo Horizonte - MG',
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
      texto: 'Avenida Alameda da Serra, 1369 - Vila da Serra, Nova Lima - MG',
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
      texto: 'Rua Manhuaçu, 43 - Santa Inês, Belo Horizonte - MG',
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
      texto: 'Rua José Félix Martins, 1860 - Mantiqueira, Belo Horizonte - MG',
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
      texto: 'Avenida Alfredo Camaratem, 533 - São Luiz, Belo Horizonte - MG',
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
      texto: 'Avenida Afonso Pena, 2122 - Savassi, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 8,
    nome: 'Lavanderia Express 24h',
    categoria: 'lavanderia',
    foto: provider3,
    avaliacao: 4.7,
    distancia: 1.8,
    tempoChegada: '2-4 horas',
    preco: 'A partir de R$ 25',
    seloEssencial: false,
    aberto24h: true,
    parceiroPro: false,
    descricao: 'Lavagem e secagem expressa. Roupas prontas em até 4 horas.',
    endereco: {
      texto: 'Avenida Amazonas, 4746 - Nova Suíça, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 9,
    nome: 'Chaveiro Master 24h',
    categoria: 'chaveiro',
    foto: provider4,
    avaliacao: 4.9,
    distancia: 0.9,
    tempoChegada: '10-20 min',
    preco: 'A partir de R$ 80',
    seloEssencial: true,
    aberto24h: true,
    parceiroPro: true,
    descricao: 'Especialista em abertura de portas, chaves codificadas e duplicatas.',
    endereco: {
      texto: 'Avenida Abílio Machado, 1830 - Jardim Inconfidência, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 10,
    nome: 'Eletro Fix - Eletricista',
    categoria: 'eletricista',
    foto: provider5,
    avaliacao: 4.8,
    distancia: 2.7,
    tempoChegada: '30-50 min',
    preco: 'A partir de R$ 120',
    seloEssencial: true,
    aberto24h: false,
    parceiroPro: false,
    descricao: 'Instalações elétricas, reparos e manutenção. Profissional certificado.',
    endereco: {
      texto: 'Avenida do Contorno, 9841 - Contorno, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 11,
    nome: 'Desentupidora Rápida',
    categoria: 'encanador',
    foto: provider1,
    avaliacao: 4.6,
    distancia: 3.2,
    tempoChegada: '45-60 min',
    preco: 'A partir de R$ 200',
    seloEssencial: true,
    aberto24h: true,
    parceiroPro: false,
    descricao: 'Desentupimento de esgotos, pias e vasos sanitários. Atendimento 24h.',
    endereco: {
      texto: 'Rua da Bahia, 546 - Mercado Central, Centro, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 12,
    nome: 'Gás & Água Express',
    categoria: 'gas',
    foto: provider2,
    avaliacao: 4.5,
    distancia: 1.1,
    tempoChegada: '30-45 min',
    preco: 'Preço de mercado',
    seloEssencial: false,
    aberto24h: false,
    parceiroPro: false,
    descricao: 'Entrega de botijão de gás e galão de água. Atendimento rápido.',
    endereco: {
      texto: 'Avenida Cristiano Machado, 4000 - Minas Shopping, União, Belo Horizonte - MG',
      urlMapaEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.218323681949!2d-43.93982838508587!3d-19.91524398661036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6999e0d0e8389%3A0x155b3833b0e8b6b5!2sPra%C3%A7a%20Sete%20de%20Setembro!5e0!3m2!1spt-BR!2sbr!4v1696185611335!5m2!1spt-BR!2sbr'
    },
  },
  {
    id: 13,
    nome: 'Borracharia do João',
    categoria: 'borracharia',
    foto: provider3,
    avaliacao: 4.4,
    distancia: 4.5,
    tempoChegada: '35-50 min',
    preco: 'A partir de R$ 90',
    seloEssencial: false,
    aberto24h: false,
    parceiroPro: false,
    descricao: 'Conserto de pneus, alinhamento e balanceamento. Preços acessíveis.',
    endereco: {
      texto: 'Rodovia BR-356, 3049 - BH Shopping, Belvedere, Belo Horizonte - MG',
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
  // Hook do contexto de modais
  const { showModal } = useModal();

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
  
  // Estado para emergência
  const [categoriaEmergencia, setCategoriaEmergencia] = useState<string | null>(null);

  // Dados dos formulários
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
    senha: '',
    confirmarSenha: '',
    atendimento24h: false,
  });

  // Estados de usuário
  const [userType, setUserType] = useState<'guest' | 'customer' | 'provider'>('guest');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    nome: '',
    email: '',
    tipo: 'customer' as 'customer' | 'provider',
    avatar: '',
  });

  // Estados de carregamento
  const [isLoading, setIsLoading] = useState(false);

  // Estado do menu de perfil
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Dados do formulário de cliente
  const [customerData, setCustomerData] = useState({
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    senha: '',
    confirmarSenha: '',
  });

  // Estados para fluxo de contratação
  const [fluxoEtapa, setFluxoEtapa] = useState<'nenhum' | 'confirmacao' | 'aguardando' | 'rastreamento'>('nenhum');
  const [prestadorContratado, setPrestadorContratado] = useState<Provider | null>(null);
  const [detalhesAdicionais, setDetalhesAdicionais] = useState('');

  // Estados para interatividade
  const [hoveredProvider, setHoveredProvider] = useState<number | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Simulação do processamento
  useEffect(() => {
    if (fluxoEtapa === 'aguardando') {
      const timer = setTimeout(() => {
        setFluxoEtapa('rastreamento');
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [fluxoEtapa]);

  // Persistência de sessão - verificar token no localStorage ao carregar
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Se existe token, considerar usuário logado
      setIsLoggedIn(true);
      setUserType('customer');
      // Recuperar dados do usuário do localStorage se disponível
      const savedUserData = localStorage.getItem('userData');
      if (savedUserData) {
        try {
          setUserData(JSON.parse(savedUserData));
        } catch (error) {
          console.error('Erro ao recuperar dados do usuário:', error);
        }
      }
    }
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
    // Aplicar filtros combinados
    if (filters.aberto24h && filters.seloEssencial) {
      result = result.filter((p) => p.aberto24h && p.seloEssencial);
    } else if (filters.aberto24h) {
      result = result.filter((p) => p.aberto24h);
    } else if (filters.seloEssencial) {
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
    showModal('emergency');
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
  const handleCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de senha
    if (cadastroData.senha !== cadastroData.confirmarSenha) {
      alert('❌ As senhas não coincidem. Tente novamente.');
      return;
    }
    
    if (cadastroData.senha.length < 6) {
      alert('❌ A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Chamada à API
      const response = await fetch('https://essencial-ja-backend.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: cadastroData.nome,
          email: cadastroData.email,
          senha: cadastroData.senha,
          telefone: cadastroData.telefone,
          categoria: cadastroData.categoria,
          endereco: cadastroData.endereco,
          descricao: cadastroData.descricao,
          horarioFuncionamento: cadastroData.horarioFuncionamento,
          precoBase: cadastroData.precoBase,
          experiencia: cadastroData.experiencia,
          certificacoes: cadastroData.certificacoes,
          atendimento24h: cadastroData.atendimento24h,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Salvar token no localStorage
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Atualizar estado
        setIsLoggedIn(true);
        setUserType('provider');
        setUserData(data.user);
        
        alert('✅ Cadastro realizado com sucesso!\n\nBem-vindo ao Essencial Já!');
        showModal(null);
        
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
          senha: '',
          confirmarSenha: '',
          atendimento24h: false,
        });
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

  const handleCadastroChange = (field: string, value: string | boolean) => {
    setCadastroData(prev => ({ ...prev, [field]: value }));
  };

  // Função para lidar com sucesso do login
  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUserType('provider');
    setUserData(userData);
    showModal(null);
  };

  // Funções para usuários finais
  const handleCustomerCadastroSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de senha
    if (customerData.senha !== customerData.confirmarSenha) {
      alert('❌ As senhas não coincidem. Tente novamente.');
      return;
    }
    
    if (customerData.senha.length < 6) {
      alert('❌ A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simular chamada à API
      const response = await fetch('https://essencial-ja-backend.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      nome: customerData.nome,
      email: customerData.email,
          senha: customerData.senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Salvar token no localStorage
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Atualizar estado
    setIsLoggedIn(true);
    setUserType('customer');
        setUserData(data.user);
        
        alert('✅ Cadastro realizado com sucesso!\n\nBem-vindo ao Essencial Já!');
        showModal(null);
        setCustomerData({ nome: '', email: '', telefone: '', endereco: '', senha: '', confirmarSenha: '' });
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

  const handleCustomerLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simular chamada à API
      const response = await fetch('https://essencial-ja-backend.vercel.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      email: customerData.email,
          senha: customerData.senha,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Salvar token no localStorage
        localStorage.setItem('authToken', data.access_token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Atualizar estado
        setIsLoggedIn(true);
        setUserType('customer');
        setUserData(data.user);
        
        alert('✅ Login realizado com sucesso!\n\nBem-vindo de volta!');
        showModal(null);
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

  const handleCustomerChange = (field: string, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    // Remover token do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Redefinir estado de autenticação
    setIsLoggedIn(false);
    setUserType('guest');
    setUserData({ nome: '', email: '', tipo: 'customer', avatar: '' });
  };

  // Componente do Card de Prestador
  const ProviderCard = ({ provider, isSelected }: { provider: Provider; isSelected: boolean }) => (
    <div
      onClick={() => {
        setScrollPosition(window.scrollY);
        setSelectedProvider(provider);
      }}
      onMouseEnter={() => setHoveredProvider(provider.id)}
      onMouseLeave={() => setHoveredProvider(null)}
      className={`bg-card rounded-xl shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden cursor-pointer border-2 ${
        isSelected ? 'border-primary' : 'border-transparent'
      } ${
        hoveredProvider === provider.id ? 'ring-2 ring-primary shadow-lg' : ''
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
  const CadastroModal = ({ onClose, onOpenLogin }: { onClose: () => void; onOpenLogin: () => void }) => (
    <Dialog open={true} onOpenChange={onClose}>
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

          {/* Informações de Acesso */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FontAwesomeIcon icon={faLock} className="text-primary" />
              Informações de Acesso
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                  Senha *
              </label>
              <Input
                  type="password"
                  value={cadastroData.senha}
                  onChange={(e) => handleCadastroChange('senha', e.target.value)}
                  placeholder="Sua senha"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                  Confirmar Senha *
              </label>
              <Input
                type="password"
                  value={cadastroData.confirmarSenha}
                  onChange={(e) => handleCadastroChange('confirmarSenha', e.target.value)}
                  placeholder="Confirme sua senha"
                required
              />
            </div>
          </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="atendimento24h"
                checked={cadastroData.atendimento24h}
                onChange={(e) => handleCadastroChange('atendimento24h', e.target.checked)}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
              />
              <label htmlFor="atendimento24h" className="text-sm font-medium text-foreground">
                Ofereço atendimento 24 horas
              </label>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => showModal(null)}
              className="flex-1"
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
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
                  Cadastrar-se
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );


  // Modal de Emergência
  const EmergenciaModal = ({ onClose }: { onClose: () => void }) => (
    <Dialog open={true} onOpenChange={onClose}>
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
                        showModal(null);
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
                showModal(null);
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
  const CustomerCadastroModal = ({ onClose, onOpenLogin }: { onClose: () => void; onOpenLogin: () => void }) => (
    <Dialog open={true} onOpenChange={onClose}>
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
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Senha *
            </label>
            <Input
              type="password"
              value={customerData.senha}
              onChange={(e) => handleCustomerChange('senha', e.target.value)}
              placeholder="Sua senha"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Confirmar Senha *
            </label>
            <Input
              type="password"
              value={customerData.confirmarSenha}
              onChange={(e) => handleCustomerChange('confirmarSenha', e.target.value)}
              placeholder="Confirme sua senha"
              required
            />
          </div>

          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              Já tem uma conta?{' '}
              <button
                type="button"
                onClick={onOpenLogin}
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
                  A processar...
                </>
              ) : (
                <>
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Criar Conta
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

  // Modal de Login de Cliente
  const CustomerLoginModal = ({ onClose, onOpenCadastro }: { onClose: () => void; onOpenCadastro: () => void }) => (
    <Dialog open={true} onOpenChange={onClose}>
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
              value={customerData.senha}
              onChange={(e) => handleCustomerChange('senha', e.target.value)}
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
                onClick={onOpenCadastro}
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

  // Modal de Detalhes do Prestador
  const ProviderModal = ({ provider }: { provider: Provider }) => (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={() => {
        setSelectedProvider(null);
        setTimeout(() => {
          window.scrollTo(0, scrollPosition);
        }, 100);
      }}
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
            onClick={() => {
              setSelectedProvider(null);
              setTimeout(() => {
                window.scrollTo(0, scrollPosition);
              }, 100);
            }}
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
          <button 
            onClick={() => {
              setPrestadorContratado(selectedProvider);
              setFluxoEtapa('confirmacao');
              setSelectedProvider(null);
            }}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-4 rounded-lg font-bold text-lg transition-colors"
          >
            Contratar Serviço
          </button>
        </div>
      </div>
    </div>
  );

  // Modal de Confirmação do Fluxo
  const ModalConfirmacao = () => {
    if (!prestadorContratado) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Confirmar Serviço</h2>
            
            {/* Resumo do Serviço */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={prestadorContratado.foto} 
                  alt={prestadorContratado.nome}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-foreground">{prestadorContratado.nome}</h3>
                  <p className="text-sm text-muted-foreground">{prestadorContratado.categoria}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Confirmar chamado para <strong>{prestadorContratado.nome}</strong>
              </p>
            </div>

            {/* Campo de Detalhes */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Adicionar detalhes (opcional)
              </label>
              <textarea
                value={detalhesAdicionais}
                onChange={(e) => setDetalhesAdicionais(e.target.value)}
                placeholder="Descreva o problema ou serviço necessário..."
                className="w-full p-3 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                rows={3}
              />
            </div>

            {/* Seção de Pagamento */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-foreground mb-2">Pagamento</h4>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCreditCard} className="text-primary" />
                <span className="text-sm text-muted-foreground">Pagamento com Visa **** 1234</span>
              </div>
            </div>

            {/* Botões */}
            <div className="flex gap-3">
              <button
                onClick={() => setFluxoEtapa('nenhum')}
                className="flex-1 px-4 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => setFluxoEtapa('aguardando')}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors font-semibold"
              >
                Confirmar e Chamar Agora
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Tela de Aguardando
  const TelaAguardando = () => {

    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-foreground mb-2">A confirmar o seu pedido...</h2>
          <p className="text-muted-foreground">Por favor, aguarde um momento</p>
        </div>
      </div>
    );
  };

  // Tela de Rastreamento
  const TelaRastreamento = () => {
    if (!prestadorContratado) return null;

    return (
      <div className="fixed inset-0 bg-background z-50 flex flex-col">
        {/* Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center gap-3">
            <img 
              src={prestadorContratado.foto} 
              alt={prestadorContratado.nome}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="font-bold text-foreground">{prestadorContratado.nome}</h2>
              <p className="text-sm text-muted-foreground">A caminho</p>
            </div>
          </div>
        </div>

        {/* Mapa Simulado */}
        <div className="flex-1 bg-muted/30 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-primary/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-4xl text-primary" />
            </div>
            <p className="text-muted-foreground">Mapa de rastreamento em tempo real</p>
          </div>
        </div>

        {/* Status */}
        <div className="bg-success/10 border-t border-success/20 p-4">
          <div className="flex items-center gap-2 text-success">
            <FontAwesomeIcon icon={faCheckCircle} />
            <span className="font-semibold">O prestador está a caminho!</span>
          </div>
        </div>

        {/* Botão Cancelar */}
        <div className="p-4 border-t border-border">
          <button
            onClick={() => {
              setFluxoEtapa('nenhum');
              setPrestadorContratado(null);
              setDetalhesAdicionais('');
            }}
            className="w-full px-4 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-semibold"
          >
            Cancelar Chamado
          </button>
        </div>
      </div>
    );
  };

  // Renderização condicional baseada no fluxo
  if (fluxoEtapa === 'rastreamento') {
    return <TelaRastreamento />;
  }

  if (fluxoEtapa === 'aguardando') {
    return <TelaAguardando />;
  }

  return (
    <div className="min-h-screen bg-background font-poppins">
      {/* Layout Desktop */}
      <div className="hidden md:flex h-screen flex-col">
        {/* Header Desktop Refatorado */}
        <header className="bg-white shadow-md z-20 border-b border-gray-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Lado Esquerdo: Logótipo */}
              <div className="flex items-center">
                <Logo size="lg" variant="horizontal" className="text-primary" />
                </div>

              {/* Centro: Seletor de Localização */}
              <div className="flex items-center">
                <LocationSelector />
              </div>
              
              {/* Lado Direito: Ações do Utilizador */}
              <div className="flex items-center gap-4">
                {!isLoggedIn ? (
                  <>
                    {/* Link "Seja um Parceiro" - apenas desktop */}
                    <button 
                      onClick={() => showModal('registerProvider')}
                      className="hidden md:block text-sm text-primary hover:text-primary-hover transition-colors font-medium"
                    >
                      Seja um Parceiro
                    </button>
                    
                    {/* Botões de Login/Cadastro */}
                    <button 
                      onClick={() => showModal('loginClient')}
                      className="text-sm text-gray-700 hover:text-primary transition-colors font-medium"
                    >
                      Entrar
                    </button>
                    <button 
                      onClick={() => showModal('registerClient')}
                      className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-hover transition-colors font-medium"
                    >
                      Criar Conta
                    </button>
                  </>
                ) : (
                  <ProfileMenu
                    isLoggedIn={isLoggedIn}
                    userData={userData}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Conteúdo Principal Desktop */}
        <div className="flex-1 flex overflow-hidden">
          {/* Coluna Esquerda - Lista */}
          <div className="w-[450px] flex flex-col border-r border-border bg-card">
            {/* Barra de Busca */}
            <div className="p-6 border-b border-border">
              <div className="relative">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <input
                    type="text"
                    placeholder="Buscar por serviço ou nome..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background text-foreground focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              </div>
              
            {/* Info e Controles */}
            <div className="p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Serviços em Belo Horizonte</h2>
              <p className="text-muted-foreground mt-1">
                {filteredAndSortedProviders.length} opções encontradas
              </p>

              {/* Controles de Filtro e Ordenação */}
              {/* Categorias Disponíveis */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">Categorias</h3>
                <div className="grid grid-cols-2 gap-2">
                  {quickCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                      className={`flex items-center gap-2 p-3 rounded-lg text-sm font-medium transition-all ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <FontAwesomeIcon icon={category.icon} className="text-base" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtros e Ordenação */}
              <div className="mt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Filtros</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleFilterToggle('aberto24h')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filters.aberto24h
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <FontAwesomeIcon icon={faClock} className="text-sm" />
                      <span>Aberto 24h</span>
                    </button>

                    <button
                      onClick={() => handleFilterToggle('seloEssencial')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        filters.seloEssencial
                          ? 'bg-success text-success-foreground shadow-md'
                          : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
                      }`}
                    >
                      <FontAwesomeIcon icon={faShield} className="text-sm" />
                      <span>Selo Essencial</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Ordenar por</h3>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="w-full border border-border rounded-lg py-3 px-4 bg-background text-foreground hover:bg-muted cursor-pointer text-sm transition-colors focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option value="relevance">Relevância</option>
                    <option value="rating">Avaliação</option>
                    <option value="distance">Distância</option>
                  </select>
                </div>
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
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum serviço encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Nenhum serviço encontrado. Tente ajustar os seus filtros.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                      setFilters({ recomendados: false, aberto24h: false, seloEssencial: false });
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Limpar Filtros
                  </button>
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
        {/* Header Mobile - Layout de Duas Linhas */}
        <header className="sticky top-0 z-20 bg-white shadow-md border-b border-gray-200">
          {/* Seção Superior */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {/* Seletor de Localização */}
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary text-sm" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Entregar em:</div>
                  <div className="text-sm font-semibold text-gray-900">Belo Horizonte, MG</div>
                </div>
              </div>
              
              {/* Ícone de Perfil */}
              <div className="flex items-center">
                {!isLoggedIn ? (
                    <button 
                      onClick={() => showModal('loginClient')}
                    className="p-2 text-gray-600 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
                      title="Entrar"
                    >
                    <FontAwesomeIcon icon={faUserCircle} className="w-6 h-6" />
                    </button>
                ) : (
                  <ProfileMenu
                    isLoggedIn={isLoggedIn}
                    userData={userData}
                    onLogout={handleLogout}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Seção Inferior - Barra de Busca */}
          <div className="px-4 py-3">
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
                className="w-full pl-12 pr-4 py-3 border-2 border-border rounded-xl bg-card text-card-foreground focus:outline-none focus:border-primary transition-all"
            />
          </div>
          </div>
        </header>

        <main className="p-4 space-y-6">

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
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="text-2xl text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum serviço encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    Nenhum serviço encontrado. Tente ajustar os seus filtros.
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory(null);
                      setFilters({ recomendados: false, aberto24h: false, seloEssencial: false });
                    }}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-colors"
                  >
                    Limpar Filtros
                  </button>
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
      
      {/* Componentes do Fluxo de Contratação - Renderizados condicionalmente */}
      {fluxoEtapa === 'confirmacao' && <ModalConfirmacao />}
    </div>
  );
};

export default Index;
