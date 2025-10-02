@echo off
REM ========================================
REM Script para Organizar Projeto Essencial Já
REM ========================================
REM Este script separa o projeto monolítico em duas pastas:
REM - essencial-ja-frontend (React + Vite)
REM - essencial-ja-backend (Next.js API)

echo.
echo ========================================
echo   ORGANIZADOR DE PROJETO - ESSENCIAL JA
echo ========================================
echo.

REM Verificar se estamos fora da pasta do projeto
if exist "ESSENCIAIS-JA-APP-MAIN" (
    echo ❌ ERRO: Este script deve ser executado FORA da pasta ESSENCIAIS-JA-APP-MAIN
    echo    Mova-se para o diretório pai e execute novamente
    pause
    exit /b 1
)

REM Verificar se a pasta do projeto existe
if not exist "ESSENCIAIS-JA-APP-MAIN" (
    echo ❌ ERRO: Pasta ESSENCIAIS-JA-APP-MAIN não encontrada
    echo    Certifique-se de que está no diretório correto
    pause
    exit /b 1
)

echo ✅ Pasta do projeto encontrada: ESSENCIAIS-JA-APP-MAIN
echo.

REM ========================================
REM ETAPA 1: Criar Diretórios
REM ========================================
echo 📁 ETAPA 1: Criando diretórios...
echo.

if exist "essencial-ja-frontend" (
    echo ⚠️  Aviso: Pasta essencial-ja-frontend já existe
    set /p confirm="Deseja continuar e sobrescrever? (s/N): "
    if /i not "%confirm%"=="s" (
        echo ❌ Operação cancelada pelo usuário
        pause
        exit /b 1
    )
    echo 🗑️  Removendo pasta existente...
    rmdir /s /q "essencial-ja-frontend"
)

if exist "essencial-ja-backend" (
    echo ⚠️  Aviso: Pasta essencial-ja-backend já existe
    set /p confirm="Deseja continuar e sobrescrever? (s/N): "
    if /i not "%confirm%"=="s" (
        echo ❌ Operação cancelada pelo usuário
        pause
        exit /b 1
    )
    echo 🗑️  Removendo pasta existente...
    rmdir /s /q "essencial-ja-backend"
)

echo 📁 Criando essencial-ja-frontend...
mkdir "essencial-ja-frontend"
if errorlevel 1 (
    echo ❌ ERRO: Falha ao criar pasta essencial-ja-frontend
    pause
    exit /b 1
)

echo 📁 Criando essencial-ja-backend...
mkdir "essencial-ja-backend"
if errorlevel 1 (
    echo ❌ ERRO: Falha ao criar pasta essencial-ja-backend
    pause
    exit /b 1
)

echo ✅ Diretórios criados com sucesso!
echo.

REM ========================================
REM ETAPA 2: Mover Backend (API)
REM ========================================
echo 🔧 ETAPA 2: Movendo backend (API)...
echo.

if not exist "ESSENCIAIS-JA-APP-MAIN\api" (
    echo ❌ ERRO: Pasta api não encontrada em ESSENCIAIS-JA-APP-MAIN
    echo    Verifique se a estrutura do projeto está correta
    pause
    exit /b 1
)

echo 📦 Movendo conteúdo da pasta api para essencial-ja-backend...
xcopy "ESSENCIAIS-JA-APP-MAIN\api\*" "essencial-ja-backend\" /E /H /Y
if errorlevel 1 (
    echo ❌ ERRO: Falha ao mover arquivos do backend
    pause
    exit /b 1
)

echo ✅ Backend movido com sucesso!
echo.

REM ========================================
REM ETAPA 3: Mover Frontend (React + Vite)
REM ========================================
echo 🎨 ETAPA 3: Movendo frontend (React + Vite)...
echo.

echo 📦 Movendo arquivos do frontend...
echo    - Movendo arquivos de configuração...
xcopy "ESSENCIAIS-JA-APP-MAIN\*.json" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.ts" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.js" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.md" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.html" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.bat" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.ps1" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.sh" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.yml" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.yaml" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.conf" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.txt" "essencial-ja-frontend\" /Y
xcopy "ESSENCIAIS-JA-APP-MAIN\*.ignore" "essencial-ja-frontend\" /Y

echo    - Movendo pastas do frontend...
if exist "ESSENCIAIS-JA-APP-MAIN\src" (
    echo      📁 Movendo pasta src...
    xcopy "ESSENCIAIS-JA-APP-MAIN\src" "essencial-ja-frontend\src\" /E /H /Y
)

if exist "ESSENCIAIS-JA-APP-MAIN\public" (
    echo      📁 Movendo pasta public...
    xcopy "ESSENCIAIS-JA-APP-MAIN\public" "essencial-ja-frontend\public\" /E /H /Y
)

if exist "ESSENCIAIS-JA-APP-MAIN\dist" (
    echo      📁 Movendo pasta dist...
    xcopy "ESSENCIAIS-JA-APP-MAIN\dist" "essencial-ja-frontend\dist\" /E /H /Y
)

if exist "ESSENCIAIS-JA-APP-MAIN\node_modules" (
    echo      📁 Movendo pasta node_modules...
    xcopy "ESSENCIAIS-JA-APP-MAIN\node_modules" "essencial-ja-frontend\node_modules\" /E /H /Y
)

echo ✅ Frontend movido com sucesso!
echo.

REM ========================================
REM ETAPA 4: Verificação
REM ========================================
echo 🔍 ETAPA 4: Verificando estrutura...
echo.

echo 📊 Estrutura do Frontend (essencial-ja-frontend):
if exist "essencial-ja-frontend\package.json" (
    echo    ✅ package.json
) else (
    echo    ❌ package.json - FALTANDO
)

if exist "essencial-ja-frontend\vite.config.ts" (
    echo    ✅ vite.config.ts
) else (
    echo    ❌ vite.config.ts - FALTANDO
)

if exist "essencial-ja-frontend\src" (
    echo    ✅ pasta src
) else (
    echo    ❌ pasta src - FALTANDO
)

echo.
echo 📊 Estrutura do Backend (essencial-ja-backend):
if exist "essencial-ja-backend\package.json" (
    echo    ✅ package.json
) else (
    echo    ❌ package.json - FALTANDO
)

if exist "essencial-ja-backend\next.config.js" (
    echo    ✅ next.config.js
) else (
    echo    ❌ next.config.js - FALTANDO
)

if exist "essencial-ja-backend\api" (
    echo    ✅ pasta api
) else (
    echo    ❌ pasta api - FALTANDO
)

echo.

REM ========================================
REM ETAPA 5: Limpeza (Opcional)
REM ========================================
echo 🧹 ETAPA 5: Limpeza...
echo.

set /p cleanup="Deseja remover a pasta original ESSENCIAIS-JA-APP-MAIN? (s/N): "
if /i "%cleanup%"=="s" (
    echo 🗑️  Removendo pasta original...
    rmdir /s /q "ESSENCIAIS-JA-APP-MAIN"
    echo ✅ Pasta original removida!
) else (
    echo ℹ️  Pasta original mantida para backup
)

echo.

REM ========================================
REM CONCLUSÃO
REM ========================================
echo ========================================
echo   ORGANIZAÇÃO CONCLUÍDA COM SUCESSO!
echo ========================================
echo.
echo 📁 Estrutura Final:
echo    essencial-ja-frontend/  (React + Vite)
echo    essencial-ja-backend/   (Next.js API)
echo.
echo 🚀 Próximos Passos:
echo    1. Navegue para essencial-ja-frontend
echo    2. Execute: npm install
echo    3. Execute: npm run dev
echo.
echo    4. Navegue para essencial-ja-backend
echo    5. Execute: npm install
echo    6. Execute: npm run dev
echo.
echo ✅ Projeto organizado com sucesso!
echo.
pause
