# 🧪 Guia de Testes Práticos - Essencial Já

## 🚀 **API Rodando em: http://localhost:3000**

### 📋 **Credenciais de Teste Disponíveis:**

#### **👤 Cliente:**
- **Email:** `cliente@teste.com`
- **Senha:** `123456`

#### **🏢 Prestador:**
- **Email:** `joao@borrachariasilva.com`
- **Senha:** `123456`

## 🔐 **1. Teste de Login (Cliente)**

### **Endpoint:** `POST http://localhost:3000/auth/login`

**Headers:**
```
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "cliente@teste.com",
  "senha": "123456"
}
```

**Resposta Esperada:**
```json
{
  "message": "Login realizado com sucesso",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "nome": "Cliente Teste",
    "email": "cliente@teste.com",
    "criadoEm": "2025-01-02T20:02:00.000Z"
  }
}
```

**⚠️ IMPORTANTE:** Copie o `access_token` da resposta!

## 🏢 **2. Teste de Listagem de Prestadores**

### **Endpoint:** `GET http://localhost:3000/prestadores`

**Headers:**
```
Authorization: Bearer <token_obtido_no_login>
Content-Type: application/json
```

**Resposta Esperada:**
```json
{
  "message": "Prestadores listados com sucesso",
  "data": [
    {
      "id": "uuid",
      "fotoUrl": "https://images.unsplash.com/...",
      "descricao": "Especialista em conserto de pneus...",
      "disponivel": true,
      "user": {
        "id": "uuid",
        "nome": "João Silva",
        "email": "joao@borrachariasilva.com",
        "criadoEm": "2025-01-02T20:02:00.000Z"
      },
      "servicos": [
        {
          "id": "uuid",
          "nome": "Conserto de Pneu",
          "categoria": {
            "id": "uuid",
            "nome": "Automotivo"
          }
        }
      ]
    }
  ],
  "total": 5
}
```

## 🔍 **3. Teste de Busca por ID**

### **Endpoint:** `GET http://localhost:3000/prestadores/{id}`

**Headers:**
```
Authorization: Bearer <token>
```

**Nota:** Use um ID de prestador da resposta anterior.

## 🎯 **4. Teste de Filtro por Serviço**

### **Endpoint:** `GET http://localhost:3000/prestadores/servico/{servicoId}`

**Headers:**
```
Authorization: Bearer <token>
```

**Nota:** Use um ID de serviço da resposta anterior.

## 📊 **5. Dados Disponíveis para Teste**

### **Prestadores Criados:**
1. **João Silva** - Borracharia Silva (Conserto de Pneu)
2. **Carlos Mendes** - Chaveiro Central (Abertura de Porta)
3. **Maria Santos** - Eletro Fix (Reparo Elétrico)
4. **Pedro Oliveira** - Gás & Água Express (Entrega de Gás)
5. **Ana Costa** - Desentupidora Rápida (Reparo de Vazamento)

### **Categorias:**
- **Automotivo** - Conserto de Pneu
- **Residencial** - Reparo Elétrico, Entrega de Gás
- **Urgências** - Abertura de Porta, Reparo de Vazamento

## 🧪 **6. Fluxo Completo de Teste**

### **Passo 1: Login**
1. Faça login com `cliente@teste.com` / `123456`
2. Copie o `access_token` da resposta

### **Passo 2: Listar Prestadores**
1. Use o token no header `Authorization: Bearer <token>`
2. Faça GET para `/prestadores`
3. Verifique se retorna 5 prestadores

### **Passo 3: Buscar Prestador Específico**
1. Use um ID de prestador da resposta anterior
2. Faça GET para `/prestadores/{id}`
3. Verifique se retorna dados completos

### **Passo 4: Filtrar por Serviço**
1. Use um ID de serviço da resposta anterior
2. Faça GET para `/prestadores/servico/{servicoId}`
3. Verifique se retorna prestadores do serviço

## 🎯 **7. Resultados Esperados**

✅ **Login funcionando** - Token JWT válido  
✅ **Listagem de prestadores** - 5 prestadores retornados  
✅ **Busca por ID** - Dados completos do prestador  
✅ **Filtro por serviço** - Prestadores filtrados corretamente  
✅ **Relacionamentos** - Dados de usuário e serviços incluídos  
✅ **Proteção JWT** - Endpoints protegidos funcionando  

## 🐛 **8. Solução de Problemas**

### **Erro 401 Unauthorized**
- Verifique se o token está correto
- Verifique se o header `Authorization` está formatado como `Bearer <token>`

### **Erro 500 Internal Server Error**
- Verifique se o banco de dados está conectado
- Verifique se o seed foi executado

### **Erro de CORS**
- Verifique se a origem está permitida no CORS_ORIGIN

## 📱 **9. Teste com Postman/Insomnia**

### **Importar Coleção:**
1. Abra o Postman/Insomnia
2. Importe o arquivo `api/COLLECTION-POSTMAN.json`
3. Configure a variável `base_url` como `http://localhost:3000`
4. Execute os testes na ordem sugerida

### **Variáveis da Coleção:**
- `base_url`: `http://localhost:3000`
- `token`: Token obtido no login
- `prestador_id`: ID de um prestador
- `servico_id`: ID de um serviço

## 🎉 **Status Final**

A API está **100% funcional** com:
- ✅ Autenticação JWT
- ✅ Endpoints protegidos
- ✅ Banco de dados populado
- ✅ Relacionamentos funcionando
- ✅ Validação de dados
- ✅ CORS configurado

**🚀 Pronto para integração com o frontend React!**
