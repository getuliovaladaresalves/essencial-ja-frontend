# 🚀 Guia Passo a Passo para Corrigir o Deploy na Vercel

## 📋 **Resumo do Problema**
O erro de limite de funções na Vercel ocorre quando a plataforma detecta automaticamente mais de 12 funções serverless no seu projeto. A solução é criar um ficheiro `vercel.json` que define explicitamente apenas as 2 funções necessárias.

---

## 🛠️ **Etapa 1: Corrigir o Código Localmente**

### **1.1 Criar o Ficheiro vercel.json**
1. Abra o seu editor de código (VS Code, Cursor, etc.)
2. Navegue até à raiz do seu projeto `essencial-ja-app-main`
3. Crie um novo ficheiro chamado `vercel.json`
4. Copie e cole o seguinte conteúdo:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "api/auth/[...action].ts",
      "use": "@vercel/node"
    },
    {
      "src": "api/prestadores/[...params].ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/auth/(.*)",
      "dest": "/api/auth/[...action].ts"
    },
    {
      "src": "/api/prestadores/(.*)",
      "dest": "/api/prestadores/[...params].ts"
    }
  ],
  "functions": {
    "api/auth/[...action].ts": {
      "maxDuration": 30
    },
    "api/prestadores/[...params].ts": {
      "maxDuration": 30
    }
  }
}
```

### **1.2 Verificar a Estrutura**
Certifique-se de que a sua estrutura de pastas está assim:
```
essencial-ja-app-main/
├── api/
│   ├── auth/
│   │   └── [...action].ts
│   └── prestadores/
│       └── [...params].ts
├── vercel.json ← NOVO FICHEIRO
└── ...outros ficheiros
```

---

## 📤 **Etapa 2: Enviar a Correção para o GitHub**

### **2.1 Abrir o Terminal**
1. Abra o terminal no seu computador
2. Navegue até à pasta do projeto:
   ```bash
   cd C:\Users\getul\essenciais-ja-app-main
   ```

### **2.2 Executar os Comandos Git**
Execute os seguintes comandos **exatamente nesta ordem**:

```bash
git add vercel.json
```

```bash
git commit -m "Adicionar vercel.json para corrigir limite de funções - Define explicitamente 2 funções serverless - Resolve erro de deploy na Vercel"
```

```bash
git push origin main
```

### **2.3 Verificar o Sucesso**
Após executar os comandos, deve ver uma mensagem similar a:
```
To https://github.com/getuliovaladaresalves/essencial-ja-app.git
   [hash]..[hash]  main -> main
```

---

## 🗑️ **Etapa 3: Apagar o Projeto Antigo na Vercel**

### **3.1 Aceder ao Dashboard da Vercel**
1. Abra o seu navegador
2. Vá para [vercel.com](https://vercel.com)
3. Faça login na sua conta
4. Clique no projeto `essencial-ja-app` (se existir)

### **3.2 Eliminar o Projeto**
1. Clique em **"Settings"** (Configurações) no menu do projeto
2. Clique em **"General"** no menu lateral
3. Role até ao final da página
4. Clique no botão **"Delete Project"** (vermelho)
5. Confirme a eliminação digitando o nome do projeto
6. Clique em **"Delete"** para confirmar

### **3.3 Verificar a Eliminação**
- O projeto deve desaparecer da sua lista de projetos
- Aguarde alguns minutos para garantir que foi completamente removido

---

## 🚀 **Etapa 4: Re-importar e Fazer o Deploy do Projeto Corrigido**

### **4.1 Criar Novo Projeto**
1. No dashboard principal da Vercel, clique em **"Add New..."**
2. Clique em **"Project"**
3. Selecione **"Import Git Repository"**

### **4.2 Conectar o Repositório**
1. Procure por `essencial-ja-app` na lista de repositórios
2. Clique em **"Import"** ao lado do repositório correto
3. **NÃO altere nenhuma configuração** - o `vercel.json` cuidará de tudo

### **4.3 Configurar Variáveis de Ambiente (Opcional)**
Se tiver variáveis de ambiente configuradas anteriormente:
1. Clique em **"Environment Variables"**
2. Adicione as variáveis necessárias:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`

### **4.4 Fazer o Deploy**
1. Clique em **"Deploy"**
2. Aguarde o processo de build (2-3 minutos)
3. Verifique se o deploy foi bem-sucedido

---

## ✅ **Verificação Final**

### **5.1 Testar os Endpoints**
Após o deploy bem-sucedido, teste os seguintes URLs:
- `https://seu-projeto.vercel.app/api/auth/login`
- `https://seu-projeto.vercel.app/api/auth/register`
- `https://seu-projeto.vercel.app/api/prestadores`

### **5.2 Verificar o Log de Deploy**
1. No dashboard da Vercel, clique em **"Functions"**
2. Deve ver apenas **2 funções** listadas:
   - `api/auth/[...action].ts`
   - `api/prestadores/[...params].ts`

---

## 🎯 **Por que Esta Solução Funciona**

### **🔧 Explicação Técnica:**
- O `vercel.json` **sobrescreve** a deteção automática da Vercel
- Define **explicitamente** apenas as 2 funções necessárias
- As rotas garantem que todas as chamadas sejam direcionadas corretamente
- O limite de 12 funções é respeitado (apenas 2 são criadas)

### **📊 Resultado Esperado:**
- ✅ **Deploy bem-sucedido** sem erros de limite
- ✅ **2 funções serverless** funcionais
- ✅ **Performance otimizada** com cold start reduzido
- ✅ **Custo zero** no plano gratuito da Vercel

---

## 🆘 **Resolução de Problemas**

### **Se o Deploy Ainda Falhar:**
1. Verifique se o `vercel.json` está na raiz do projeto
2. Confirme que os ficheiros `[...action].ts` e `[...params].ts` existem
3. Verifique se não há erros de sintaxe no JSON
4. Aguarde 5-10 minutos antes de tentar novamente

### **Se as Funções Não Funcionarem:**
1. Verifique os logs na Vercel dashboard
2. Teste localmente primeiro
3. Confirme que as variáveis de ambiente estão configuradas

---

## 🎉 **Conclusão**

Com este guia, o seu projeto **Essencial Já** deve fazer deploy com sucesso na Vercel, respeitando o limite de funções e mantendo todas as funcionalidades.

**🚀 O projeto estará online e funcional em poucos minutos!**
