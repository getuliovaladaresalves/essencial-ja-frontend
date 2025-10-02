# ========================================
# Script para Organizar Projeto Essencial Já
# ========================================
# Este script separa o projeto monolítico em duas pastas:
# - essencial-ja-frontend (React + Vite)
# - essencial-ja-backend (Next.js API)

param(
    [switch]$Force,
    [switch]$Cleanup
)

# Configuração de cores para output
$Host.UI.RawUI.ForegroundColor = "White"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    $Host.UI.RawUI.ForegroundColor = $Color
    Write-Host $Message
    $Host.UI.RawUI.ForegroundColor = "White"
}

function Write-Success {
    param([string]$Message)
    Write-ColorOutput "✅ $Message" "Green"
}

function Write-Error {
    param([string]$Message)
    Write-ColorOutput "❌ $Message" "Red"
}

function Write-Warning {
    param([string]$Message)
    Write-ColorOutput "⚠️  $Message" "Yellow"
}

function Write-Info {
    param([string]$Message)
    Write-ColorOutput "ℹ️  $Message" "Cyan"
}

function Write-Step {
    param([string]$Message)
    Write-ColorOutput "🔧 $Message" "Magenta"
}

# ========================================
# CABEÇALHO
# ========================================
Write-Host ""
Write-ColorOutput "========================================" "Blue"
Write-ColorOutput "   ORGANIZADOR DE PROJETO - ESSENCIAL JA" "Blue"
Write-ColorOutput "========================================" "Blue"
Write-Host ""

# ========================================
# VERIFICAÇÕES INICIAIS
# ========================================
Write-Info "Verificando estrutura do projeto..."

# Verificar se estamos fora da pasta do projeto
if (Test-Path "ESSENCIAIS-JA-APP-MAIN") {
    Write-Error "Este script deve ser executado FORA da pasta ESSENCIAIS-JA-APP-MAIN"
    Write-Info "Mova-se para o diretório pai e execute novamente"
    exit 1
}

# Verificar se a pasta do projeto existe
if (-not (Test-Path "ESSENCIAIS-JA-APP-MAIN")) {
    Write-Error "Pasta ESSENCIAIS-JA-APP-MAIN não encontrada"
    Write-Info "Certifique-se de que está no diretório correto"
    exit 1
}

Write-Success "Pasta do projeto encontrada: ESSENCIAIS-JA-APP-MAIN"
Write-Host ""

# ========================================
# ETAPA 1: Criar Diretórios
# ========================================
Write-Step "ETAPA 1: Criando diretórios..."
Write-Host ""

# Verificar se as pastas já existem
$frontendExists = Test-Path "essencial-ja-frontend"
$backendExists = Test-Path "essencial-ja-backend"

if ($frontendExists -or $backendExists) {
    if (-not $Force) {
        Write-Warning "Uma ou ambas as pastas já existem:"
        if ($frontendExists) { Write-Info "  - essencial-ja-frontend" }
        if ($backendExists) { Write-Info "  - essencial-ja-backend" }
        
        $confirm = Read-Host "Deseja continuar e sobrescrever? (s/N)"
        if ($confirm -ne "s" -and $confirm -ne "S") {
            Write-Error "Operação cancelada pelo usuário"
            exit 1
        }
    }
    
    if ($frontendExists) {
        Write-Info "Removendo pasta essencial-ja-frontend existente..."
        Remove-Item "essencial-ja-frontend" -Recurse -Force
    }
    
    if ($backendExists) {
        Write-Info "Removendo pasta essencial-ja-backend existente..."
        Remove-Item "essencial-ja-backend" -Recurse -Force
    }
}

# Criar diretórios
Write-Info "Criando essencial-ja-frontend..."
try {
    New-Item -ItemType Directory -Path "essencial-ja-frontend" -Force | Out-Null
    Write-Success "Pasta essencial-ja-frontend criada"
} catch {
    Write-Error "Falha ao criar pasta essencial-ja-frontend: $($_.Exception.Message)"
    exit 1
}

Write-Info "Criando essencial-ja-backend..."
try {
    New-Item -ItemType Directory -Path "essencial-ja-backend" -Force | Out-Null
    Write-Success "Pasta essencial-ja-backend criada"
} catch {
    Write-Error "Falha ao criar pasta essencial-ja-backend: $($_.Exception.Message)"
    exit 1
}

Write-Success "Diretórios criados com sucesso!"
Write-Host ""

# ========================================
# ETAPA 2: Mover Backend (API)
# ========================================
Write-Step "ETAPA 2: Movendo backend (API)..."
Write-Host ""

if (-not (Test-Path "ESSENCIAIS-JA-APP-MAIN\api")) {
    Write-Error "Pasta api não encontrada em ESSENCIAIS-JA-APP-MAIN"
    Write-Info "Verifique se a estrutura do projeto está correta"
    exit 1
}

Write-Info "Movendo conteúdo da pasta api para essencial-ja-backend..."
try {
    Copy-Item "ESSENCIAIS-JA-APP-MAIN\api\*" "essencial-ja-backend\" -Recurse -Force
    Write-Success "Backend movido com sucesso!"
} catch {
    Write-Error "Falha ao mover arquivos do backend: $($_.Exception.Message)"
    exit 1
}

Write-Host ""

# ========================================
# ETAPA 3: Mover Frontend (React + Vite)
# ========================================
Write-Step "ETAPA 3: Movendo frontend (React + Vite)..."
Write-Host ""

Write-Info "Movendo arquivos do frontend..."

# Mover arquivos de configuração
$configFiles = @(
    "*.json", "*.ts", "*.js", "*.md", "*.html", "*.bat", "*.ps1", "*.sh", 
    "*.yml", "*.yaml", "*.conf", "*.txt", "*.ignore"
)

foreach ($pattern in $configFiles) {
    $files = Get-ChildItem "ESSENCIAIS-JA-APP-MAIN" -Filter $pattern -File
    foreach ($file in $files) {
        try {
            Copy-Item $file.FullName "essencial-ja-frontend\" -Force
            Write-Info "  📄 Movido: $($file.Name)"
        } catch {
            Write-Warning "  ⚠️  Falha ao mover: $($file.Name)"
        }
    }
}

# Mover pastas específicas
$foldersToMove = @("src", "public", "dist", "node_modules")

foreach ($folder in $foldersToMove) {
    if (Test-Path "ESSENCIAIS-JA-APP-MAIN\$folder") {
        Write-Info "  📁 Movendo pasta $folder..."
        try {
            Copy-Item "ESSENCIAIS-JA-APP-MAIN\$folder" "essencial-ja-frontend\$folder\" -Recurse -Force
            Write-Success "    ✅ Pasta $folder movida"
        } catch {
            Write-Warning "    ⚠️  Falha ao mover pasta $folder"
        }
    }
}

Write-Success "Frontend movido com sucesso!"
Write-Host ""

# ========================================
# ETAPA 4: Verificação
# ========================================
Write-Step "ETAPA 4: Verificando estrutura..."
Write-Host ""

Write-Info "📊 Estrutura do Frontend (essencial-ja-frontend):"
$frontendFiles = @(
    @{Name="package.json"; Path="essencial-ja-frontend\package.json"},
    @{Name="vite.config.ts"; Path="essencial-ja-frontend\vite.config.ts"},
    @{Name="pasta src"; Path="essencial-ja-frontend\src"}
)

foreach ($file in $frontendFiles) {
    if (Test-Path $file.Path) {
        Write-Success "    ✅ $($file.Name)"
    } else {
        Write-Error "    ❌ $($file.Name) - FALTANDO"
    }
}

Write-Host ""
Write-Info "📊 Estrutura do Backend (essencial-ja-backend):"
$backendFiles = @(
    @{Name="package.json"; Path="essencial-ja-backend\package.json"},
    @{Name="next.config.js"; Path="essencial-ja-backend\next.config.js"},
    @{Name="pasta api"; Path="essencial-ja-backend\api"}
)

foreach ($file in $backendFiles) {
    if (Test-Path $file.Path) {
        Write-Success "    ✅ $($file.Name)"
    } else {
        Write-Error "    ❌ $($file.Name) - FALTANDO"
    }
}

Write-Host ""

# ========================================
# ETAPA 5: Limpeza (Opcional)
# ========================================
Write-Step "ETAPA 5: Limpeza..."
Write-Host ""

if ($Cleanup) {
    Write-Info "Removendo pasta original (parâmetro -Cleanup ativado)..."
    try {
        Remove-Item "ESSENCIAIS-JA-APP-MAIN" -Recurse -Force
        Write-Success "Pasta original removida!"
    } catch {
        Write-Warning "Falha ao remover pasta original: $($_.Exception.Message)"
    }
} else {
    $cleanupChoice = Read-Host "Deseja remover a pasta original ESSENCIAIS-JA-APP-MAIN? (s/N)"
    if ($cleanupChoice -eq "s" -or $cleanupChoice -eq "S") {
        Write-Info "Removendo pasta original..."
        try {
            Remove-Item "ESSENCIAIS-JA-APP-MAIN" -Recurse -Force
            Write-Success "Pasta original removida!"
        } catch {
            Write-Warning "Falha ao remover pasta original: $($_.Exception.Message)"
        }
    } else {
        Write-Info "Pasta original mantida para backup"
    }
}

Write-Host ""

# ========================================
# CONCLUSÃO
# ========================================
Write-ColorOutput "========================================" "Blue"
Write-ColorOutput "   ORGANIZAÇÃO CONCLUÍDA COM SUCESSO!" "Blue"
Write-ColorOutput "========================================" "Blue"
Write-Host ""

Write-Info "📁 Estrutura Final:"
Write-Info "    essencial-ja-frontend/  (React + Vite)"
Write-Info "    essencial-ja-backend/   (Next.js API)"
Write-Host ""

Write-Info "🚀 Próximos Passos:"
Write-Info "    1. Navegue para essencial-ja-frontend"
Write-Info "    2. Execute: npm install"
Write-Info "    3. Execute: npm run dev"
Write-Host ""

Write-Info "    4. Navegue para essencial-ja-backend"
Write-Info "    5. Execute: npm install"
Write-Info "    6. Execute: npm run dev"
Write-Host ""

Write-Success "Projeto organizado com sucesso!"
Write-Host ""

# Pausar para o usuário ver o resultado
Read-Host "Pressione Enter para continuar"
