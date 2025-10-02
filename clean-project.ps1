# Script para limpar e reorganizar o projeto
Clear-Host

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    ESSENCIAIS JÁ - LIMPEZA DO PROJETO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Função para verificar se um diretório está vazio
function Test-IsEmptyDirectory {
    param ($Path)
    return (Get-ChildItem -Path $Path -Force | Select-Object -First 1).Count -eq 0
}

# Função para mover arquivos preservando a estrutura
function Move-ProjectFiles {
    param (
        $SourcePath,
        $DestinationPath
    )
    
    Get-ChildItem -Path $SourcePath -Recurse -File | ForEach-Object {
        $RelativePath = $_.FullName.Substring($SourcePath.Length + 1)
        $NewPath = Join-Path $DestinationPath $RelativePath
        $NewDir = Split-Path $NewPath -Parent
        
        if (-not (Test-Path $NewDir)) {
            New-Item -ItemType Directory -Path $NewDir -Force | Out-Null
        }
        
        Move-Item $_.FullName $NewPath -Force
    }
}

# Verificar diretório atual
Write-Host "[1/5] Verificando diretório atual..." -ForegroundColor Yellow
$ProjectRoot = Get-Location
Write-Host "📂 Diretório do projeto: $ProjectRoot" -ForegroundColor Gray

# Verificar estrutura duplicada
Write-Host "`n[2/5] Verificando estrutura duplicada..." -ForegroundColor Yellow
$SubDir = Join-Path $ProjectRoot "essenciais-ja-app-main"
if (Test-Path $SubDir) {
    Write-Host "🔍 Encontrado diretório duplicado: $SubDir" -ForegroundColor Yellow
    
    # Mover arquivos do subdiretório
    Write-Host "`n[3/5] Movendo arquivos..." -ForegroundColor Yellow
    try {
        Move-ProjectFiles -SourcePath $SubDir -DestinationPath $ProjectRoot
        Write-Host "✅ Arquivos movidos com sucesso!" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Erro ao mover arquivos: $_" -ForegroundColor Red
        pause
        exit 1
    }
    
    # Remover diretório vazio
    Write-Host "`n[4/5] Removendo diretório duplicado..." -ForegroundColor Yellow
    if (Test-IsEmptyDirectory $SubDir) {
        Remove-Item $SubDir -Force -Recurse
        Write-Host "✅ Diretório duplicado removido!" -ForegroundColor Green
    }
    else {
        Write-Host "⚠️  Diretório não está vazio, verificação manual necessária" -ForegroundColor Yellow
    }
}
else {
    Write-Host "✅ Estrutura já está correta!" -ForegroundColor Green
}

# Limpar arquivos desnecessários
Write-Host "`n[5/5] Limpando arquivos desnecessários..." -ForegroundColor Yellow

# Lista de arquivos/diretórios para remover
$ToRemove = @(
    "node_modules",
    ".DS_Store",
    "Thumbs.db",
    "*.log",
    "fix-and-run.*",
    "start-project.*",
    "clean-project.*"
)

foreach ($item in $ToRemove) {
    Get-ChildItem -Path $ProjectRoot -Recurse -Force -Include $item | ForEach-Object {
        try {
            Remove-Item $_.FullName -Force -Recurse -ErrorAction Stop
            Write-Host "✅ Removido: $($_.FullName)" -ForegroundColor Green
        }
        catch {
            Write-Host "⚠️  Não foi possível remover: $($_.FullName)" -ForegroundColor Yellow
        }
    }
}

Write-Host "`n✨ Limpeza concluída!" -ForegroundColor Cyan
Write-Host "📝 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Execute 'npm install' para reinstalar as dependências" -ForegroundColor White
Write-Host "2. Execute 'npm run dev' para iniciar o servidor" -ForegroundColor White

pause

