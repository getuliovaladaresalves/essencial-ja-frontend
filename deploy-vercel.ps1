# 🚀 Script de Deploy no Vercel - Essencial Já
# PowerShell Script para Windows

Write-Host "🚀 Iniciando Deploy no Vercel - Essencial Já" -ForegroundColor Green
Write-Host ""

# Verificar se Vercel CLI está instalado
Write-Host "📋 Verificando Vercel CLI..." -ForegroundColor Yellow
try {
    $vercelVersion = vercel --version
    Write-Host "✅ Vercel CLI encontrado: $vercelVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Vercel CLI não encontrado. Instalando..." -ForegroundColor Red
    npm install -g vercel
    Write-Host "✅ Vercel CLI instalado!" -ForegroundColor Green
}

Write-Host ""

# Verificar login no Vercel
Write-Host "🔐 Verificando login no Vercel..." -ForegroundColor Yellow
try {
    vercel whoami
    Write-Host "✅ Login no Vercel confirmado!" -ForegroundColor Green
} catch {
    Write-Host "❌ Não logado no Vercel. Execute: vercel login" -ForegroundColor Red
    Write-Host "📝 Siga as instruções em: DEPLOY-VERCEL-GUIDE.md" -ForegroundColor Yellow
    exit 1
}

Write-Host ""

# Deploy da API
Write-Host "🔧 Deploy da API..." -ForegroundColor Yellow
Set-Location api

try {
    Write-Host "📦 Instalando dependências da API..." -ForegroundColor Cyan
    npm install
    
    Write-Host "🚀 Deploy da API em produção..." -ForegroundColor Cyan
    vercel --prod --yes
    
    Write-Host "✅ API deployada com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro no deploy da API: $($_.Exception.Message)" -ForegroundColor Red
    Set-Location ..
    exit 1
}

Set-Location ..

Write-Host ""

# Deploy do Frontend
Write-Host "🌐 Deploy do Frontend..." -ForegroundColor Yellow

try {
    Write-Host "📦 Instalando dependências do Frontend..." -ForegroundColor Cyan
    npm install
    
    Write-Host "🚀 Deploy do Frontend em produção..." -ForegroundColor Cyan
    vercel --prod --yes
    
    Write-Host "✅ Frontend deployado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro no deploy do Frontend: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Resumo do Deploy
Write-Host "🎉 Deploy Concluído com Sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "📊 URLs de Produção:" -ForegroundColor Cyan
Write-Host "🌐 Frontend: https://essencial-ja-app.vercel.app" -ForegroundColor White
Write-Host "🔧 API: https://essencial-ja-api.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "📋 Próximos Passos:" -ForegroundColor Yellow
Write-Host "1. Configurar variáveis de ambiente no dashboard do Vercel" -ForegroundColor White
Write-Host "2. Testar endpoints da API" -ForegroundColor White
Write-Host "3. Testar integração frontend-backend" -ForegroundColor White
Write-Host "4. Verificar responsividade" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentação: DEPLOY-VERCEL-GUIDE.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "🎊 Essencial Já - Deploy Completo!" -ForegroundColor Green
