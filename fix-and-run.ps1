# Script para corrigir o diretório e executar o projeto
Clear-Host

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    ESSENCIAIS JÁ - CORREÇÃO E EXECUÇÃO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Função para verificar se estamos no diretório correto
function Test-ProjectDirectory {
    return (Test-Path "package.json")
}

# Verificar Node.js
Write-Host "[1/4] Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node -v
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado! Por favor, instale o Node.js em: https://nodejs.org/" -ForegroundColor Red
    pause
    exit 1
}

# Verificar diretório
Write-Host "`n[2/4] Verificando diretório do projeto..." -ForegroundColor Yellow
$currentPath = Get-Location
Write-Host "📂 Diretório atual: $currentPath" -ForegroundColor Gray

if (-not (Test-ProjectDirectory)) {
    Write-Host "⚠️  package.json não encontrado no diretório atual." -ForegroundColor Yellow
    Write-Host "🔍 Procurando diretório correto..." -ForegroundColor Yellow
    
    # Tentar navegar para o diretório correto
    if (Test-Path "essenciais-ja-app-main") {
        Set-Location "essenciais-ja-app-main"
        if (Test-ProjectDirectory) {
            Write-Host "✅ Diretório correto encontrado e acessado!" -ForegroundColor Green
        } else {
            Write-Host "❌ Não foi possível encontrar o diretório correto do projeto." -ForegroundColor Red
            pause
            exit 1
        }
    } else {
        Write-Host "❌ Não foi possível encontrar o diretório do projeto." -ForegroundColor Red
        pause
        exit 1
    }
}

# Instalar dependências
Write-Host "`n[3/4] Verificando dependências..." -ForegroundColor Yellow
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependências (isso pode levar alguns minutos)..." -ForegroundColor Blue
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar dependências!" -ForegroundColor Red
        pause
        exit 1
    }
    Write-Host "✅ Dependências instaladas com sucesso!" -ForegroundColor Green
} else {
    Write-Host "✅ Dependências já instaladas" -ForegroundColor Green
}

# Iniciar o servidor
Write-Host "`n[4/4] Iniciando o servidor..." -ForegroundColor Yellow
Write-Host "`n🌐 O projeto será aberto em: http://localhost:8080" -ForegroundColor Cyan
Write-Host "📱 Para testar em outros dispositivos, use o IP da sua rede local" -ForegroundColor Cyan
Write-Host "⚠️  Para parar o servidor, pressione Ctrl+C`n" -ForegroundColor Yellow

# Executar o servidor
npm run dev

