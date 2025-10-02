# 🧹 Script de Limpeza da API Antiga - Essencial Já
# Remove arquivos NestJS antigos que causam limite de funções no Vercel

Write-Host "🧹 Iniciando Limpeza da API Antiga..." -ForegroundColor Yellow
Write-Host ""

# Navegar para o diretório da API
Set-Location api

Write-Host "📁 Removendo estrutura NestJS antiga..." -ForegroundColor Cyan

# Remover pasta src (estrutura NestJS antiga)
if (Test-Path "src") {
    Write-Host "🗑️ Removendo pasta src/..." -ForegroundColor Red
    Remove-Item -Recurse -Force "src"
    Write-Host "✅ Pasta src/ removida!" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Pasta src/ não encontrada" -ForegroundColor Yellow
}

# Remover pasta dist (build antigo)
if (Test-Path "dist") {
    Write-Host "🗑️ Removendo pasta dist/..." -ForegroundColor Red
    Remove-Item -Recurse -Force "dist"
    Write-Host "✅ Pasta dist/ removida!" -ForegroundColor Green
} else {
    Write-Host "ℹ️ Pasta dist/ não encontrada" -ForegroundColor Yellow
}

# Remover arquivos de configuração NestJS
$arquivosNestJS = @(
    "nest-cli.json",
    "tsconfig-nestjs.json",
    "package-nestjs.json",
    "schema-nestjs.prisma"
)

foreach ($arquivo in $arquivosNestJS) {
    if (Test-Path $arquivo) {
        Write-Host "🗑️ Removendo $arquivo..." -ForegroundColor Red
        Remove-Item -Force $arquivo
        Write-Host "✅ $arquivo removido!" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ $arquivo não encontrado" -ForegroundColor Yellow
    }
}

Write-Host ""

# Verificar estrutura final
Write-Host "📊 Estrutura Final da API:" -ForegroundColor Cyan
Write-Host ""

if (Test-Path "api") {
    Write-Host "✅ Pasta api/ (serverless) - MANTIDA" -ForegroundColor Green
    Get-ChildItem "api" -Recurse | ForEach-Object {
        Write-Host "  📄 $($_.Name)" -ForegroundColor White
    }
} else {
    Write-Host "❌ Pasta api/ não encontrada!" -ForegroundColor Red
}

Write-Host ""

# Verificar se ainda existem arquivos problemáticos
$arquivosProblematicos = Get-ChildItem -Recurse -Name | Where-Object { 
    $_ -like "src/*" -or 
    $_ -like "dist/*" -or 
    $_ -like "*controller.ts" -or 
    $_ -like "*service.ts" -or 
    $_ -like "*module.ts" 
}

if ($arquivosProblematicos.Count -gt 0) {
    Write-Host "⚠️ Ainda existem arquivos problemáticos:" -ForegroundColor Yellow
    $arquivosProblematicos | ForEach-Object {
        Write-Host "  ❌ $_" -ForegroundColor Red
    }
} else {
    Write-Host "✅ Nenhum arquivo problemático encontrado!" -ForegroundColor Green
}

Write-Host ""

# Contar funções serverless
$funcoesServerless = Get-ChildItem "api" -Recurse -Name | Where-Object { $_ -like "*.ts" }
$totalFuncoes = $funcoesServerless.Count

Write-Host "📊 Resumo da Limpeza:" -ForegroundColor Cyan
Write-Host "✅ Funções serverless: $totalFuncoes" -ForegroundColor Green
Write-Host "✅ Limite Vercel: 12" -ForegroundColor Green

if ($totalFuncoes -le 12) {
    Write-Host "🎉 LIMPEZA CONCLUÍDA COM SUCESSO!" -ForegroundColor Green
    Write-Host "✅ Projeto otimizado para Vercel!" -ForegroundColor Green
} else {
    Write-Host "⚠️ Ainda pode haver problemas com limite de funções" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Próximos Passos:" -ForegroundColor Cyan
Write-Host "1. Fazer commit das alterações" -ForegroundColor White
Write-Host "2. Fazer push para GitHub" -ForegroundColor White
Write-Host "3. Tentar deploy no Vercel novamente" -ForegroundColor White
Write-Host ""
Write-Host "📚 Documentação: DEPLOY-VERCEL-GUIDE.md" -ForegroundColor Cyan
