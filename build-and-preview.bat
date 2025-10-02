@echo off
echo ========================================
echo    ESSENCIAIS JA - BUILD E PREVIEW
echo ========================================
echo.

echo [1/3] Verificando Node.js...
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
    echo 📦 Instalando dependencias...
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
echo [3/3] Criando build de producao...
echo 📦 Criando build otimizado...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro ao criar build!
    pause
    exit /b 1
)

echo.
echo ✅ Build criado com sucesso!
echo 🌐 Iniciando preview de producao...
echo.
echo 📱 O projeto sera aberto em: http://localhost:4173
echo ⚠️  Para parar o servidor, pressione Ctrl+C
echo.

npm run preview

pause


