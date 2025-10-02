# 🚀 Pré-visualização do Projeto Essenciais Já

## 📋 Instruções para Visualizar o Projeto

### Opção 1: Execução Rápida (Recomendada)

```bash
# 1. Navegue até o diretório do projeto
cd essenciais-ja-app-main

# 2. Instale as dependências (apenas na primeira vez)
npm install

# 3. Execute o servidor de desenvolvimento
npm run dev
```

### Opção 2: Execução com Build de Produção

```bash
# 1. Navegue até o diretório do projeto
cd essenciais-ja-app-main

# 2. Instale as dependências
npm install

# 3. Crie o build de produção
npm run build

# 4. Visualize o build
npm run preview
```

## 🌐 Acesso ao Projeto

Após executar os comandos acima, o projeto estará disponível em:

- **Desenvolvimento**: http://localhost:8080
- **Preview**: http://localhost:4173

## 📱 Funcionalidades Disponíveis

### 🏠 Página Principal
- ✅ Busca por prestadores de serviços
- ✅ Filtros por categoria (Borracharia, Chaveiro, Encanador, etc.)
- ✅ Filtros por disponibilidade (24h, Selo Essencial)
- ✅ Ordenação por relevância, avaliação ou distância
- ✅ Visualização em mapa integrado

### 📱 Layout Responsivo
- ✅ Design mobile-first
- ✅ Interface adaptativa para desktop e mobile
- ✅ Navegação otimizada para diferentes dispositivos

### 🎨 Componentes Interativos
- ✅ Cards de prestadores com informações detalhadas
- ✅ Modal de detalhes do prestador
- ✅ Sistema de avaliações e reviews
- ✅ Botão de emergência SOS
- ✅ Filtros dinâmicos e busca em tempo real

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento com hot-reload |
| `npm run build` | Cria build otimizado para produção |
| `npm run build:dev` | Cria build de desenvolvimento |
| `npm run preview` | Visualiza build de produção localmente |
| `npm run lint` | Executa verificação de código |

## 🔧 Configurações do Servidor

### Desenvolvimento
- **Porta**: 8080
- **Host**: :: (aceita conexões de qualquer IP)
- **Hot Reload**: Ativado
- **Source Maps**: Ativados

### Preview
- **Porta**: 4173 (padrão do Vite)
- **Host**: localhost
- **Build**: Otimizado para produção

## 📊 Informações Técnicas

### Tecnologias Utilizadas
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 5.4.19
- **Styling**: Tailwind CSS + shadcn/ui
- **Icons**: Font Awesome
- **Routing**: React Router DOM
- **State Management**: React Query

### Estrutura do Projeto
```
essenciais-ja-app-main/
├── src/
│   ├── components/ui/     # Componentes de interface
│   ├── pages/           # Páginas da aplicação
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utilitários
│   └── assets/          # Recursos estáticos
├── public/              # Arquivos públicos
└── dist/                # Build de produção (após npm run build)
```

## 🚨 Solução de Problemas

### Erro: "Cannot find module"
```bash
# Limpe o cache e reinstale as dependências
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"
```bash
# Use uma porta diferente
npm run dev -- --port 3000
```

### Erro: "Permission denied"
```bash
# No Windows, execute como administrador
# No Linux/Mac, use sudo se necessário
```

## 📞 Suporte

Se encontrar problemas:

1. Verifique se o Node.js está instalado (versão 18+)
2. Confirme se todas as dependências foram instaladas
3. Verifique se a porta 8080 não está sendo usada por outro processo
4. Consulte os logs do terminal para mensagens de erro específicas

## 🎯 Próximos Passos

Após visualizar o projeto:

1. **Teste todas as funcionalidades** no navegador
2. **Verifique a responsividade** em diferentes tamanhos de tela
3. **Teste os filtros e busca** para garantir funcionamento
4. **Explore o código** para entender a estrutura
5. **Faça modificações** conforme necessário

---

**🎉 Projeto pronto para visualização!**


