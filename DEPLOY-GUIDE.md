# 🚀 Guia de Deploy - Essencial Já

## 📋 **Opções de Deploy**

### **1. 🐳 Docker Compose (Recomendado)**
### **2. ☁️ Vercel + Railway**
### **3. 🌐 VPS/Cloud Provider**

---

## 🐳 **1. Deploy com Docker Compose**

### **Pré-requisitos:**
- Docker e Docker Compose instalados
- Git configurado

### **Passos:**

#### **1.1. Clonar Repositório**
```bash
git clone https://github.com/getuliovaladaresalves/essencial-ja-app.git
cd essencial-ja-app
```

#### **1.2. Configurar Variáveis**
```bash
# Copiar arquivo de exemplo
cp env.production.example .env

# Editar variáveis
nano .env
```

#### **1.3. Executar Deploy**
```bash
# Build e start dos containers
docker-compose up -d --build

# Verificar status
docker-compose ps

# Ver logs
docker-compose logs -f
```

#### **1.4. Executar Seed do Banco**
```bash
# Executar seed no container do backend
docker-compose exec backend npm run prisma:seed
```

#### **1.5. Acessar Aplicação**
- **Frontend:** http://localhost:3000
- **API:** http://localhost:3001
- **Database:** localhost:5432

---

## ☁️ **2. Deploy na Nuvem (Vercel + Railway)**

### **2.1. Frontend na Vercel**

#### **Configurar Vercel:**
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login na Vercel
vercel login

# Deploy
vercel --prod
```

#### **Variáveis de Ambiente na Vercel:**
```
REACT_APP_API_URL=https://your-api.railway.app
```

### **2.2. Backend na Railway**

#### **Configurar Railway:**
```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login na Railway
railway login

# Deploy
railway up
```

#### **Variáveis de Ambiente na Railway:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret
NODE_ENV=production
PORT=3000
```

---

## 🌐 **3. Deploy em VPS/Cloud**

### **3.1. Preparar Servidor**

#### **Ubuntu/Debian:**
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Instalar Docker Compose
sudo apt install docker-compose -y

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
```

#### **CentOS/RHEL:**
```bash
# Instalar Docker
sudo yum install -y docker
sudo systemctl start docker
sudo systemctl enable docker

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### **3.2. Configurar Aplicação**

```bash
# Clonar repositório
git clone https://github.com/getuliovaladaresalves/essencial-ja-app.git
cd essencial-ja-app

# Configurar variáveis
cp env.production.example .env
nano .env

# Executar deploy
docker-compose up -d --build
```

### **3.3. Configurar Nginx (Opcional)**

```bash
# Instalar Nginx
sudo apt install nginx -y

# Configurar proxy reverso
sudo nano /etc/nginx/sites-available/essencial-ja
```

**Configuração Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ {
        proxy_pass http://localhost:3001/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 🔧 **4. Configurações de Produção**

### **4.1. Variáveis de Ambiente**

#### **Frontend (.env):**
```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_ENVIRONMENT=production
```

#### **Backend (.env):**
```env
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://yourdomain.com
```

### **4.2. Configuração do Banco**

#### **PostgreSQL:**
```sql
-- Criar banco de dados
CREATE DATABASE essencial_ja_db;

-- Criar usuário
CREATE USER essencial_user WITH PASSWORD 'secure_password';

-- Conceder permissões
GRANT ALL PRIVILEGES ON DATABASE essencial_ja_db TO essencial_user;
```

#### **Executar Migrações:**
```bash
# No container do backend
docker-compose exec backend npx prisma migrate deploy

# Executar seed
docker-compose exec backend npm run prisma:seed
```

---

## 🛡️ **5. Segurança em Produção**

### **5.1. Configurações de Segurança**

#### **JWT Secret:**
```bash
# Gerar secret seguro
openssl rand -base64 32
```

#### **Database Password:**
```bash
# Gerar senha segura
openssl rand -base64 32
```

### **5.2. Firewall**

#### **Ubuntu/Debian:**
```bash
# Configurar UFW
sudo ufw enable
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw allow 3000  # App (se necessário)
```

#### **CentOS/RHEL:**
```bash
# Configurar firewalld
sudo systemctl enable firewalld
sudo systemctl start firewalld
sudo firewall-cmd --permanent --add-port=80/tcp
sudo firewall-cmd --permanent --add-port=443/tcp
sudo firewall-cmd --reload
```

---

## 📊 **6. Monitoramento**

### **6.1. Logs**

```bash
# Ver logs da aplicação
docker-compose logs -f

# Ver logs específicos
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f database
```

### **6.2. Health Checks**

#### **Frontend:**
```bash
curl http://localhost:3000
```

#### **Backend:**
```bash
curl http://localhost:3001/auth/login
```

#### **Database:**
```bash
docker-compose exec database psql -U postgres -d essencial_ja_db -c "SELECT 1;"
```

---

## 🔄 **7. Atualizações**

### **7.1. Deploy de Atualizações**

```bash
# Parar containers
docker-compose down

# Atualizar código
git pull origin main

# Rebuild e start
docker-compose up -d --build

# Executar migrações (se necessário)
docker-compose exec backend npx prisma migrate deploy
```

### **7.2. Backup do Banco**

```bash
# Backup
docker-compose exec database pg_dump -U postgres essencial_ja_db > backup.sql

# Restore
docker-compose exec -T database psql -U postgres essencial_ja_db < backup.sql
```

---

## 🎯 **8. Checklist de Deploy**

### **✅ Pré-Deploy:**
- [ ] Variáveis de ambiente configuradas
- [ ] Banco de dados configurado
- [ ] Domínio/DNS configurado
- [ ] SSL/HTTPS configurado
- [ ] Backup do banco realizado

### **✅ Pós-Deploy:**
- [ ] Aplicação acessível
- [ ] API funcionando
- [ ] Banco populado com seed
- [ ] Login funcionando
- [ ] Logs sem erros
- [ ] Monitoramento ativo

---

## 🚀 **9. Comandos Rápidos**

### **Deploy Completo:**
```bash
# 1. Clonar e configurar
git clone https://github.com/getuliovaladaresalves/essencial-ja-app.git
cd essencial-ja-app
cp env.production.example .env

# 2. Deploy
docker-compose up -d --build

# 3. Seed
docker-compose exec backend npm run prisma:seed

# 4. Verificar
curl http://localhost:3000
curl http://localhost:3001
```

### **Atualização:**
```bash
git pull origin main
docker-compose down
docker-compose up -d --build
```

### **Logs:**
```bash
docker-compose logs -f
```

---

## 🎉 **Status Final**

✅ **Docker Compose** - Configurado  
✅ **Nginx** - Configurado  
✅ **Variáveis** - Documentadas  
✅ **Segurança** - Configurada  
✅ **Monitoramento** - Implementado  
✅ **Backup** - Documentado  
✅ **Atualizações** - Automatizadas  

**🚀 Projeto pronto para produção!**
