# 🚀 Executar Deploy no Vercel - Instruções

## 📋 **Opções de Deploy**

### **Opção 1: Script Automatizado (Recomendado)**

#### **Windows (PowerShell):**
```powershell
# Executar script automatizado
.\deploy-vercel.ps1
```

#### **Linux/Mac (Bash):**
```bash
# Executar script automatizado
./deploy-vercel.sh
```

---

### **Opção 2: Deploy Manual**

#### **Passo 1: Login no Vercel**
```bash
# Fazer login no Vercel
vercel login

# Seguir instruções:
# 1. Visitar URL fornecida
# 2. Fazer login na conta Vercel
# 3. Autorizar dispositivo
# 4. Voltar ao terminal
```

#### **Passo 2: Deploy da API**
```bash
# Navegar para API
cd api

# Instalar dependências
npm install

# Deploy em produção
vercel --prod --yes
```

#### **Passo 3: Deploy do Frontend**
```bash
# Voltar ao diretório raiz
cd ..

# Instalar dependências
npm install

# Deploy em produção
vercel --prod --yes
```

---

## 🔧 **Configuração Pós-Deploy**

### **1. Configurar Variáveis da API**
No dashboard do Vercel, adicionar:

```env
DATABASE_URL=postgresql://postgres:58$ZgwavJZHj26c@db.chvulzyyvqaxokgvajyk.supabase.co:5432/postgres
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://essencial-ja-app.vercel.app
```

### **2. Configurar Variáveis do Frontend**
No dashboard do Vercel, adicionar:

```env
REACT_APP_API_URL=https://essencial-ja-api.vercel.app
NODE_ENV=production
```

---

## 🧪 **Testar Deploy**

### **1. Testar API**
```bash
# Testar login
curl -X POST https://essencial-ja-api.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"cliente@teste.com","senha":"123456"}'
```

### **2. Testar Frontend**
- Acessar: `https://essencial-ja-app.vercel.app`
- Verificar se carrega corretamente
- Testar funcionalidades

---

## 📚 **Documentação Completa**

- **Guia Detalhado:** `DEPLOY-VERCEL-GUIDE.md`
- **Scripts Automatizados:** `deploy-vercel.ps1` (Windows) / `deploy-vercel.sh` (Linux/Mac)
- **Configurações:** `vercel.json` (Frontend) / `api/vercel.json` (API)

---

## 🎯 **URLs Finais**

- **Frontend:** `https://essencial-ja-app.vercel.app`
- **API:** `https://essencial-ja-api.vercel.app`

---

## 🚨 **Troubleshooting**

### **Erro de Login:**
```bash
# Fazer logout e login novamente
vercel logout
vercel login
```

### **Erro de Deploy:**
```bash
# Verificar logs
vercel logs

# Verificar status
vercel ls
```

### **Erro de Variáveis:**
- Verificar se todas as variáveis estão configuradas
- Verificar se os valores estão corretos
- Fazer redeploy após configurar variáveis

---

## 🎊 **Deploy Concluído!**

Após o deploy, o projeto Essencial Já estará disponível em:
- **Frontend:** Interface web moderna e responsiva
- **API:** Backend otimizado para Vercel
- **Database:** Supabase conectado
- **Autenticação:** JWT funcionando
- **CORS:** Configurado

**🚀 Pronto para produção!**
