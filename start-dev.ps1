# Script PowerShell para iniciar o servidor de desenvolvimento
# Essenciais Já - Projeto de Serviços Essenciais

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    ESSENCIAIS JA - SERVIDOR LOCAL" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navegar para o diretório correto
Write-Host "[0/5] Navegando para o diretório correto..." -ForegroundColor Yellow
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath
Write-Host "✅ Diretório correto: $(Get-Location)" -ForegroundColor Green
Write-Host ""

# Verificar se o Node.js está instalado
Write-Host "[1/4] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "   Por favor, instale o Node.js em: https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se o npm está disponível
Write-Host ""
Write-Host "[2/4] Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm encontrado: v$npmVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ npm não encontrado!" -ForegroundColor Red
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Instalar dependências se necessário
Write-Host ""
Write-Host "[3/4] Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências pela primeira vez..." -ForegroundColor Blue
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependências já instaladas!" -ForegroundColor Green
}

# Iniciar servidor de desenvolvimento
Write-Host ""
Write-Host "[4/4] Iniciando servidor de desenvolvimento..." -ForegroundColor Yellow
Write-Host ""
Write-Host "🌐 O projeto será aberto em: http://localhost:8080" -ForegroundColor Cyan
Write-Host "📱 Teste em diferentes dispositivos usando o IP da sua rede" -ForegroundColor Cyan
Write-Host "🔧 Hot reload ativado - mudanças serão refletidas automaticamente" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  Para parar o servidor, pressione Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# Executar o comando de desenvolvimento
npm run dev
