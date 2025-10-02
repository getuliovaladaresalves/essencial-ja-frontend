# Script de Deploy Automatizado - Essencial Já (PowerShell)
Write-Host "🚀 Iniciando deploy do Essencial Já..." -ForegroundColor Green

# Função para imprimir com cor
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar se Docker está instalado
try {
    docker --version | Out-Null
    Write-Success "Docker está instalado"
} catch {
    Write-Error "Docker não está instalado. Instale o Docker primeiro."
    exit 1
}

# Verificar se Docker Compose está instalado
try {
    docker-compose --version | Out-Null
    Write-Success "Docker Compose está instalado"
} catch {
    Write-Error "Docker Compose não está instalado. Instale o Docker Compose primeiro."
    exit 1
}

# Verificar se arquivo .env existe
if (-not (Test-Path ".env")) {
    Write-Warning "Arquivo .env não encontrado. Criando a partir do exemplo..."
    if (Test-Path "env.production.example") {
        Copy-Item "env.production.example" ".env"
        Write-Success "Arquivo .env criado. Configure as variáveis antes de continuar."
        Write-Warning "Edite o arquivo .env com suas configurações e execute o script novamente."
        exit 1
    } else {
        Write-Error "Arquivo env.production.example não encontrado."
        exit 1
    }
}

# Parar containers existentes
Write-Status "Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
if ($args -contains "--clean") {
    Write-Status "Removendo imagens antigas..."
    docker-compose down --rmi all
}

# Build e start dos containers
Write-Status "Fazendo build e iniciando containers..."
docker-compose up -d --build

# Aguardar containers iniciarem
Write-Status "Aguardando containers iniciarem..."
Start-Sleep -Seconds 30

# Verificar se containers estão rodando
Write-Status "Verificando status dos containers..."
docker-compose ps

# Verificar se backend está respondendo
Write-Status "Verificando se backend está respondendo..."
for ($i = 1; $i -le 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001" -TimeoutSec 5 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Success "Backend está respondendo!"
            break
        }
    } catch {
        Write-Warning "Aguardando backend... ($i/10)"
        Start-Sleep -Seconds 5
    }
}

# Executar seed do banco
Write-Status "Executando seed do banco de dados..."
docker-compose exec -T backend npm run prisma:seed

# Verificar se frontend está respondendo
Write-Status "Verificando se frontend está respondendo..."
for ($i = 1; $i -le 10; $i++) {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -TimeoutSec 5 -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Success "Frontend está respondendo!"
            break
        }
    } catch {
        Write-Warning "Aguardando frontend... ($i/10)"
        Start-Sleep -Seconds 5
    }
}

# Teste de API
Write-Status "Testando API..."
try {
    $body = '{"email":"cliente@teste.com","senha":"123456"}'
    $response = Invoke-RestMethod -Uri "http://localhost:3001/auth/login" -Method POST -Body $body -ContentType "application/json"
    if ($response.access_token) {
        Write-Success "API funcionando corretamente!"
    }
} catch {
    Write-Warning "API pode não estar funcionando corretamente."
}

# Mostrar status final
Write-Host ""
Write-Success "🎉 Deploy concluído com sucesso!"
Write-Host ""
Write-Host "📊 Status dos Serviços:"
Write-Host "  Frontend: http://localhost:3000"
Write-Host "  Backend:  http://localhost:3001"
Write-Host "  Database: localhost:5432"
Write-Host ""
Write-Host "🔑 Credenciais de Teste:"
Write-Host "  Email: cliente@teste.com"
Write-Host "  Senha: 123456"
Write-Host ""
Write-Host "📋 Comandos Úteis:"
Write-Host "  Ver logs:     docker-compose logs -f"
Write-Host "  Parar:        docker-compose down"
Write-Host "  Reiniciar:    docker-compose restart"
Write-Host "  Status:       docker-compose ps"
Write-Host ""
Write-Success "🚀 Aplicação pronta para uso!"
