#!/bin/bash
# 🚀 Script de Deploy no Vercel - Essencial Já
# Bash Script para Linux/Mac

echo "🚀 Iniciando Deploy no Vercel - Essencial Já"
echo ""

# Verificar se Vercel CLI está instalado
echo "📋 Verificando Vercel CLI..."
if command -v vercel &> /dev/null; then
    VERCEL_VERSION=$(vercel --version)
    echo "✅ Vercel CLI encontrado: $VERCEL_VERSION"
else
    echo "❌ Vercel CLI não encontrado. Instalando..."
    npm install -g vercel
    echo "✅ Vercel CLI instalado!"
fi

echo ""

# Verificar login no Vercel
echo "🔐 Verificando login no Vercel..."
if vercel whoami &> /dev/null; then
    echo "✅ Login no Vercel confirmado!"
else
    echo "❌ Não logado no Vercel. Execute: vercel login"
    echo "📝 Siga as instruções em: DEPLOY-VERCEL-GUIDE.md"
    exit 1
fi

echo ""

# Deploy da API
echo "🔧 Deploy da API..."
cd api

echo "📦 Instalando dependências da API..."
npm install

echo "🚀 Deploy da API em produção..."
vercel --prod --yes

if [ $? -eq 0 ]; then
    echo "✅ API deployada com sucesso!"
else
    echo "❌ Erro no deploy da API"
    cd ..
    exit 1
fi

cd ..

echo ""

# Deploy do Frontend
echo "🌐 Deploy do Frontend..."

echo "📦 Instalando dependências do Frontend..."
npm install

echo "🚀 Deploy do Frontend em produção..."
vercel --prod --yes

if [ $? -eq 0 ]; then
    echo "✅ Frontend deployado com sucesso!"
else
    echo "❌ Erro no deploy do Frontend"
    exit 1
fi

echo ""

# Resumo do Deploy
echo "🎉 Deploy Concluído com Sucesso!"
echo ""
echo "📊 URLs de Produção:"
echo "🌐 Frontend: https://essencial-ja-app.vercel.app"
echo "🔧 API: https://essencial-ja-api.vercel.app"
echo ""
echo "📋 Próximos Passos:"
echo "1. Configurar variáveis de ambiente no dashboard do Vercel"
echo "2. Testar endpoints da API"
echo "3. Testar integração frontend-backend"
echo "4. Verificar responsividade"
echo ""
echo "📚 Documentação: DEPLOY-VERCEL-GUIDE.md"
echo ""
echo "🎊 Essencial Já - Deploy Completo!"
