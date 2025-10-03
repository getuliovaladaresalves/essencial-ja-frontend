# Essencial Já - Versão 1.0

Uma aplicação web moderna para conectar usuários com prestadores de serviços essenciais como eletricistas, encanadores, chaveiros e borracheiros.

**Última atualização:** $(Get-Date -Format "dd/MM/yyyy HH:mm")

## 📊 Status do Projeto

🟢 **Projeto Ativo** - Em desenvolvimento contínuo
- ✅ Estrutura base implementada
- ✅ Componentes UI configurados
- 🔄 Funcionalidades em desenvolvimento

## 🚀 Sobre o Projeto

O **Essencial Já** é uma plataforma que facilita a busca e contratação de serviços essenciais, oferecendo:

- 🔍 Busca inteligente por prestadores de serviços
- 📍 Localização geográfica com mapa integrado
- ⭐ Sistema de avaliações e reviews
- 🕒 Disponibilidade 24h para emergências
- 💰 Preços transparentes
- 🛡️ Selo de qualidade "Essencial"

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **Vite** - Build tool e dev server
- **TypeScript** - Linguagem de programação tipada
- **React 18** - Biblioteca para interfaces de usuário
- **React Router** - Roteamento client-side
- **shadcn/ui** - Componentes de interface
- **Tailwind CSS** - Framework CSS utilitário
- **Radix UI** - Componentes primitivos acessíveis
- **Font Awesome** - Ícones
- **React Query** - Gerenciamento de estado do servidor

## 📦 Instalação e Execução

### Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn

### Passos para executar o projeto

```bash
# 1. Clone o repositório
git clone <URL_DO_REPOSITORIO>

# 2. Navegue até o diretório do projeto
cd essenciais-ja-app-main

# 3. Instale as dependências
npm install

# 4. Execute o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia o servidor de desenvolvimento

# Build
npm run build        # Cria build de produção
npm run build:dev    # Cria build de desenvolvimento

# Qualidade de código
npm run lint         # Executa o linter

# Preview
npm run preview      # Visualiza o build de produção
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── ui/             # Componentes de interface (shadcn/ui)
├── pages/              # Páginas da aplicação
├── hooks/              # Custom hooks
├── lib/                 # Utilitários e configurações
├── assets/             # Imagens e recursos estáticos
└── main.tsx           # Ponto de entrada da aplicação
```

## 🎨 Design System

O projeto utiliza um design system consistente com:

- **Cores**: Paleta personalizada com suporte a tema claro/escuro
- **Tipografia**: Sistema tipográfico escalável
- **Componentes**: Biblioteca de componentes reutilizáveis
- **Responsividade**: Design mobile-first

## 🚀 Deploy

Para fazer deploy da aplicação:

1. Execute o build de produção:
   ```bash
   npm run build
   ```

2. Os arquivos estáticos serão gerados na pasta `dist/`

3. Faça upload dos arquivos para seu servidor web ou plataforma de hospedagem

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

Para suporte e dúvidas, entre em contato através dos canais oficiais do projeto.