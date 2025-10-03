# 🚀 Como Executar o Projeto Essencial Já

## ⚡ Execução Rápida (3 opções)

### Opção 1: Script Automático (Windows)
```bash
# Clique duplo no arquivo:
start-dev.bat
```

### Opção 2: PowerShell (Windows)
```powershell
# Execute no PowerShell:
.\start-dev.ps1
```

### Opção 3: Comandos Manuais
```bash
# 1. Instalar dependências
npm install

# 2. Executar servidor
npm run dev
```

## 🌐 Acesso ao Projeto

Após executar qualquer uma das opções acima:

- **URL**: http://localhost:8080
- **Hot Reload**: ✅ Ativado
- **Responsivo**: ✅ Mobile + Desktop

## 📱 Funcionalidades para Testar

### 🔍 Busca e Filtros
- [ ] Digite na barra de busca
- [ ] Clique nas categorias (Borracharia, Chaveiro, etc.)
- [ ] Use os filtros (Aberto 24h, Selo Essencial)
- [ ] Teste a ordenação (Relevância, Avaliação, Distância)

### 📍 Mapa e Localização
- [ ] Visualize os prestadores no mapa
- [ ] Clique nos marcadores do mapa
- [ ] Teste a responsividade do mapa

### 📱 Layout Mobile
- [ ] Redimensione a janela para testar mobile
- [ ] Teste o botão SOS de emergência
- [ ] Navegue pelos cards de prestadores

### 🎨 Componentes Interativos
- [ ] Clique nos cards para ver detalhes
- [ ] Teste o modal de informações
- [ ] Verifique as avaliações e preços

## 🛠️ Scripts Disponíveis

| Arquivo | Descrição |
|---------|-----------|
| `start-dev.bat` | Inicia servidor de desenvolvimento (Windows) |
| `start-dev.ps1` | Inicia servidor de desenvolvimento (PowerShell) |
| `build-and-preview.bat` | Cria build e visualiza produção |

## 🔧 Comandos NPM

```bash
# Desenvolvimento
npm run dev          # Servidor de desenvolvimento

# Build
npm run build        # Build de produção
npm run build:dev    # Build de desenvolvimento

# Preview
npm run preview      # Visualiza build de produção

# Qualidade
npm run lint         # Verifica código
```

## 🚨 Solução de Problemas

### Erro: "Cannot find module"
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port already in use"
```bash
# Use porta diferente
npm run dev -- --port 3000
```

### Erro: "Permission denied" (Windows)
- Execute o PowerShell como Administrador
- Ou use o arquivo `.bat` em vez do `.ps1`

## 📊 Informações Técnicas

- **Framework**: React 18 + TypeScript
- **Build**: Vite 5.4.19
- **Styling**: Tailwind CSS + shadcn/ui
- **Porta Dev**: 8080
- **Porta Preview**: 4173

## 🎯 Próximos Passos

1. ✅ **Execute o projeto** usando uma das opções acima
2. ✅ **Teste todas as funcionalidades** no navegador
3. ✅ **Verifique a responsividade** em diferentes tamanhos
4. ✅ **Explore o código** para entender a estrutura
5. ✅ **Faça modificações** conforme necessário

---

**🎉 Projeto pronto para visualização!**


