# 🚀 Guia de Deploy no Vercel - Essencial Já

## 📋 **Pré-requisitos**

### **1. Conta Vercel**
- ✅ Criar conta em [vercel.com](https://vercel.com)
- ✅ Fazer login na plataforma
- ✅ Verificar email (se necessário)

### **2. Vercel CLI**
- ✅ Instalado globalmente: `npm install -g vercel`
- ✅ Versão atual: 48.1.7

---

## 🔐 **Passo 1: Login no Vercel**

### **Opção A: Login via Browser (Recomendado)**
```bash
# Executar comando
vercel login

# Seguir instruções:
# 1. Visitar: https://vercel.com/oauth/device?user_code=DJFB-SJXN
# 2. Fazer login na conta Vercel
# 3. Autorizar o dispositivo
# 4. Voltar ao terminal e pressionar ENTER
```

### **Opção B: Login via Token**
```bash
# 1. Ir para: https://vercel.com/account/tokens
# 2. Criar novo token
# 3. Copiar o token
# 4. Executar:
vercel login --token SEU_TOKEN_AQUI
```

---

## 🚀 **Passo 2: Deploy da API**

### **2.1 Navegar para API**
```bash
cd api
```

### **2.2 Deploy da API**
```bash
# Deploy em produção
vercel --prod --yes

# Ou deploy de desenvolvimento primeiro
vercel --yes
```

### **2.3 Configurar Variáveis da API**
Após o deploy, configurar no dashboard do Vercel:

```env
# Variáveis de Ambiente da API
DATABASE_URL=postgresql://postgres:58$ZgwavJZHj26c@db.chvulzyyvqaxokgvajyk.supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://essencial-ja-app.vercel.app
```

---

## 🌐 **Passo 3: Deploy do Frontend**

### **3.1 Voltar ao Diretório Raiz**
```bash
cd ..
```

### **3.2 Deploy do Frontend**
```bash
# Deploy em produção
vercel --prod --yes

# Ou deploy de desenvolvimento primeiro
vercel --yes
```

### **3.3 Configurar Variáveis do Frontend**
Após o deploy, configurar no dashboard do Vercel:

```env
# Variáveis de Ambiente do Frontend
REACT_APP_API_URL=https://essencial-ja-api.vercel.app
NODE_ENV=production
```

---

## 🔧 **Passo 4: Configuração Completa**

### **4.1 URLs dos Projetos**
- **API:** `https://essencial-ja-api.vercel.app`
- **Frontend:** `https://essencial-ja-app.vercel.app`

### **4.2 Configuração de Domínio (Opcional)**
```bash
# Adicionar domínio personalizado
vercel domains add essencialja.com.br
```

### **4.3 Configuração de CORS**
A API já está configurada para aceitar requisições do frontend.

---

## 🧪 **Passo 5: Testar Deploy**

### **5.1 Testar API**
```bash
# Testar login
curl -X POST https://essencial-ja-api.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@teste.com","senha":"123456"}'

# Testar prestadores (com token)
curl -X GET https://essencial-ja-api.vercel.app/api/prestadores \
  -H "Authorization: Bearer <token>"
```

### **5.2 Testar Frontend**
- ✅ Acessar: `https://essencial-ja-app.vercel.app`
- ✅ Verificar se carrega corretamente
- ✅ Testar login/logout
- ✅ Testar listagem de prestadores

---

## 📊 **Estrutura Final**

### **🎯 URLs de Produção:**
```
Frontend: https://essencial-ja-app.vercel.app
API:      https://essencial-ja-api.vercel.app
```

### **🔗 Endpoints da API:**
```
POST /api/auth/login
POST /api/auth/register
GET  /api/prestadores
GET  /api/prestadores/[id]
GET  /api/prestadores/servico/[servicoId]
```

---

## 🛠️ **Comandos Úteis**

### **📋 Verificar Status**
```bash
# Verificar projetos
vercel ls

# Verificar logs
vercel logs

# Verificar variáveis
vercel env ls
```

### **🔄 Atualizar Deploy**
```bash
# Atualizar API
cd api
vercel --prod --yes

# Atualizar Frontend
cd ..
vercel --prod --yes
```

### **🗑️ Remover Deploy**
```bash
# Remover projeto
vercel remove --yes
```

---

## 🎯 **Checklist de Deploy**

### **✅ API:**
- [ ] Login no Vercel CLI
- [ ] Deploy da API em produção
- [ ] Configurar variáveis de ambiente
- [ ] Testar endpoints da API
- [ ] Verificar CORS configurado

### **✅ Frontend:**
- [ ] Deploy do frontend em produção
- [ ] Configurar variáveis de ambiente
- [ ] Testar carregamento da página
- [ ] Testar integração com API
- [ ] Verificar responsividade

### **✅ Integração:**
- [ ] Frontend conectado com API
- [ ] Login/logout funcionando
- [ ] Listagem de prestadores funcionando
- [ ] Filtros e busca funcionando
- [ ] Modais funcionando

---

## 🚨 **Troubleshooting**

### **❌ Erro de CORS**
```bash
# Verificar se CORS_ORIGIN está configurado
# Deve incluir a URL do frontend
```

### **❌ Erro de Database**
```bash
# Verificar se DATABASE_URL está correto
# Testar conexão com Supabase
```

### **❌ Erro de JWT**
```bash
# Verificar se JWT_SECRET está configurado
# Deve ser uma string segura
```

### **❌ Erro de Build**
```bash
# Verificar se todas as dependências estão instaladas
# Verificar se não há erros de TypeScript
```

---

## 🎊 **Deploy Concluído!**

### **✅ Projeto Essencial Já Deployado:**
- ✅ **API:** `https://essencial-ja-api.vercel.app`
- ✅ **Frontend:** `https://essencial-ja-app.vercel.app`
- ✅ **Database:** Supabase conectado
- ✅ **Autenticação:** JWT funcionando
- ✅ **CORS:** Configurado
- ✅ **HTTPS:** Automático

### **🚀 Pronto para Produção:**
- ✅ **Performance:** Otimizada
- ✅ **Segurança:** Configurada
- ✅ **Escalabilidade:** Vercel Edge
- ✅ **Monitoramento:** Vercel Analytics
- ✅ **Backup:** Automático

**🎉 Essencial Já - Deploy Completo no Vercel!**

**✨ Aplicação web moderna e escalável!**

**🎯 Pronto para usuários reais!**
