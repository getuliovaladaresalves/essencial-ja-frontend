# Script de Teste da API Essencial Já
Write-Host "🧪 Testando API Essencial Já..." -ForegroundColor Green

# 1. Teste de Login
Write-Host "`n1. Testando Login..." -ForegroundColor Yellow
$loginBody = @{
    email = "cliente@teste.com"
    senha = "123456"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-RestMethod -Uri "http://localhost:3000/auth/login" -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "✅ Login realizado com sucesso!" -ForegroundColor Green
    Write-Host "Token: $($loginResponse.access_token.Substring(0,20))..." -ForegroundColor Cyan
    
    # 2. Teste de Listagem de Prestadores
    Write-Host "`n2. Testando Listagem de Prestadores..." -ForegroundColor Yellow
    $headers = @{
        "Authorization" = "Bearer $($loginResponse.access_token)"
        "Content-Type" = "application/json"
    }
    
    $prestadoresResponse = Invoke-RestMethod -Uri "http://localhost:3000/prestadores" -Method GET -Headers $headers
    Write-Host "✅ Prestadores listados com sucesso!" -ForegroundColor Green
    Write-Host "Total de prestadores: $($prestadoresResponse.total)" -ForegroundColor Cyan
    
    # 3. Teste de Busca por ID
    if ($prestadoresResponse.data.Count -gt 0) {
        Write-Host "`n3. Testando Busca por ID..." -ForegroundColor Yellow
        $prestadorId = $prestadoresResponse.data[0].id
        $prestadorResponse = Invoke-RestMethod -Uri "http://localhost:3000/prestadores/$prestadorId" -Method GET -Headers $headers
        Write-Host "✅ Prestador encontrado: $($prestadorResponse.data.user.nome)" -ForegroundColor Green
    }
    
    # 4. Teste de Filtro por Serviço
    if ($prestadoresResponse.data.Count -gt 0 -and $prestadoresResponse.data[0].servicos.Count -gt 0) {
        Write-Host "`n4. Testando Filtro por Serviço..." -ForegroundColor Yellow
        $servicoId = $prestadoresResponse.data[0].servicos[0].id
        $servicoResponse = Invoke-RestMethod -Uri "http://localhost:3000/prestadores/servico/$servicoId" -Method GET -Headers $headers
        Write-Host "✅ Filtro por serviço funcionando!" -ForegroundColor Green
        Write-Host "Prestadores para o serviço: $($servicoResponse.total)" -ForegroundColor Cyan
    }
    
    Write-Host "`n🎉 Todos os testes passaram com sucesso!" -ForegroundColor Green
    Write-Host "API está funcionando perfeitamente!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Erro no teste: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Verifique se a API está rodando em http://localhost:3000" -ForegroundColor Yellow
}
