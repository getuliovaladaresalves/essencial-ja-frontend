# Script PowerShell para iniciar o projeto Essenciais Já
# Autor: Desenvolvedor Sênior
# Data: 2025-10-01

# Função para verificar se um comando existe
function Test-Command {
    param ($Command)
    $oldPreference = $ErrorActionPreference
    $ErrorActionPreference = 'stop'
    try {
        if (Get-Command $Command) { return $true }
    } catch {
        return $false
    } finally {
        $ErrorActionPreference = $oldPreference
    }
}

# Função para exibir mensagens coloridas
function Write-ColorOutput {
    param ([string]$Message, [string]$Color = "White")
    Write-Host $Message -ForegroundColor $Color
}

# Limpar a tela
Clear-Host

# Banner do projeto
Write-ColorOutput "========================================" "Cyan"
Write-ColorOutput "    ESSENCIAIS JÁ - INICIALIZAÇÃO" "Cyan"
Write-ColorOutput "========================================" "Cyan"
Write-ColorOutput ""

# Verificar Node.js
Write-ColorOutput "[1/5] Verificando Node.js..." "Yellow"
if (-not (Test-Command node)) {
    Write-ColorOutput "❌ Node.js não encontrado!" "Red"
    Write-ColorOutput "Por favor, instale o Node.js em: https://nodejs.org/" "Yellow"
    Write-ColorOutput "Versão recomendada: 18.x ou superior" "Yellow"
    pause
    exit 1
}
$nodeVersion = node -v
Write-ColorOutput "✅ Node.js encontrado: $nodeVersion" "Green"

# Verificar npm
Write-ColorOutput "`n[2/5] Verificando npm..." "Yellow"
if (-not (Test-Command npm)) {
    Write-ColorOutput "❌ npm não encontrado!" "Red"
    pause
    exit 1
}
$npmVersion = npm -v
Write-ColorOutput "✅ npm encontrado: v$npmVersion" "Green"

# Verificar diretório do projeto
Write-ColorOutput "`n[3/5] Verificando diretório do projeto..." "Yellow"
$projectFiles = @("package.json", "vite.config.ts", "src", "public")
$missingFiles = $projectFiles | Where-Object { -not (Test-Path $_) }
if ($missingFiles) {
    Write-ColorOutput "❌ Arquivos essenciais não encontrados: $($missingFiles -join ', ')" "Red"
    Write-ColorOutput "Certifique-se de estar no diretório correto do projeto." "Yellow"
    pause
    exit 1
}
Write-ColorOutput "✅ Estrutura do projeto verificada" "Green"

# Instalar dependências
Write-ColorOutput "`n[4/5] Verificando dependências..." "Yellow"
if (-not (Test-Path "node_modules")) {
    Write-ColorOutput "📦 Instalando dependências (isso pode levar alguns minutos)..." "Blue"
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-ColorOutput "❌ Erro ao instalar dependências!" "Red"
        pause
        exit 1
    }
    Write-ColorOutput "✅ Dependências instaladas com sucesso!" "Green"
} else {
    Write-ColorOutput "✅ Dependências já instaladas" "Green"
}

# Iniciar o servidor de desenvolvimento
Write-ColorOutput "`n[5/5] Iniciando servidor de desenvolvimento..." "Yellow"
Write-ColorOutput "`n🌐 O projeto será aberto em: http://localhost:8080" "Cyan"
Write-ColorOutput "📱 Para testar em outros dispositivos, use o IP da sua rede local" "Cyan"
Write-ColorOutput "⚠️  Para parar o servidor, pressione Ctrl+C`n" "Yellow"

# Executar o servidor
npm run dev

