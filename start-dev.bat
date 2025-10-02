@echo off
echo ========================================
echo    ESSENCIAIS JA - SERVIDOR LOCAL
echo ========================================
echo.

echo [0/4] Navegando para o diretorio correto...
cd /d "%~dp0"
echo ✅ Diretorio correto: %CD%

echo.
echo [1/4] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js nao encontrado!
    echo    Por favor, instale o Node.js em: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js encontrado!

echo.
echo [2/3] Instalando dependencias...
if not exist node_modules (
    echo 📦 Instalando dependencias pela primeira vez...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Erro ao instalar dependencias!
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencias ja instaladas!
)

echo.
echo [3/3] Iniciando servidor de desenvolvimento...
echo.
echo 🌐 O projeto sera aberto em: http://localhost:8080
echo 📱 Teste em diferentes dispositivos usando o IP da sua rede
echo.
echo ⚠️  Para parar o servidor, pressione Ctrl+C
echo.

npm run dev

pause
