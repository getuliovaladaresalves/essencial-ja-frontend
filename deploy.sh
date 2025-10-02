#!/bin/bash

# Script de Deploy Automatizado - Essencial Já
echo "🚀 Iniciando deploy do Essencial Já..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir com cor
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    print_error "Docker não está instalado. Instale o Docker primeiro."
    exit 1
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose não está instalado. Instale o Docker Compose primeiro."
    exit 1
fi

# Verificar se arquivo .env existe
if [ ! -f ".env" ]; then
    print_warning "Arquivo .env não encontrado. Criando a partir do exemplo..."
    if [ -f "env.production.example" ]; then
        cp env.production.example .env
        print_success "Arquivo .env criado. Configure as variáveis antes de continuar."
        print_warning "Edite o arquivo .env com suas configurações e execute o script novamente."
        exit 1
    else
        print_error "Arquivo env.production.example não encontrado."
        exit 1
    fi
fi

# Parar containers existentes
print_status "Parando containers existentes..."
docker-compose down

# Remover imagens antigas (opcional)
if [ "$1" = "--clean" ]; then
    print_status "Removendo imagens antigas..."
    docker-compose down --rmi all
fi

# Build e start dos containers
print_status "Fazendo build e iniciando containers..."
docker-compose up -d --build

# Aguardar containers iniciarem
print_status "Aguardando containers iniciarem..."
sleep 30

# Verificar se containers estão rodando
print_status "Verificando status dos containers..."
docker-compose ps

# Verificar se backend está respondendo
print_status "Verificando se backend está respondendo..."
for i in {1..10}; do
    if curl -s http://localhost:3001 > /dev/null 2>&1; then
        print_success "Backend está respondendo!"
        break
    else
        print_warning "Aguardando backend... ($i/10)"
        sleep 5
    fi
done

# Executar seed do banco
print_status "Executando seed do banco de dados..."
docker-compose exec -T backend npm run prisma:seed

# Verificar se frontend está respondendo
print_status "Verificando se frontend está respondendo..."
for i in {1..10}; do
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        print_success "Frontend está respondendo!"
        break
    else
        print_warning "Aguardando frontend... ($i/10)"
        sleep 5
    fi
done

# Teste de API
print_status "Testando API..."
if curl -s -X POST http://localhost:3001/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"cliente@teste.com","senha":"123456"}' \
    | grep -q "access_token"; then
    print_success "API funcionando corretamente!"
else
    print_warning "API pode não estar funcionando corretamente."
fi

# Mostrar status final
echo ""
print_success "🎉 Deploy concluído com sucesso!"
echo ""
echo "📊 Status dos Serviços:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:3001"
echo "  Database: localhost:5432"
echo ""
echo "🔑 Credenciais de Teste:"
echo "  Email: cliente@teste.com"
echo "  Senha: 123456"
echo ""
echo "📋 Comandos Úteis:"
echo "  Ver logs:     docker-compose logs -f"
echo "  Parar:        docker-compose down"
echo "  Reiniciar:    docker-compose restart"
echo "  Status:       docker-compose ps"
echo ""
print_success "🚀 Aplicação pronta para uso!"
