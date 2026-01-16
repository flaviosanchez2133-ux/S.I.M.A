@echo off
echo.
echo 🚀 Instalando S.I.M.A Desktop...
echo.

:: Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error: Node.js no está instalado.
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js %NODE_VERSION% detectado
echo.

:: Instalar dependencias raíz
echo 📦 Instalando dependencias principales...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al instalar dependencias principales
    pause
    exit /b 1
)

echo.
echo 📦 Instalando dependencias del backend...
cd backend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al instalar dependencias del backend
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo 📦 Instalando dependencias del frontend...
cd sima-frontend
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Error al instalar dependencias del frontend
    cd ..
    pause
    exit /b 1
)
cd ..

echo.
echo 🗄️  Configurando base de datos...
cd backend
if not exist "sima.sqlite3" (
    echo 📝 Ejecutando migraciones...
    call npm run migrate
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Error al ejecutar migraciones
        cd ..
        pause
        exit /b 1
    )
) else (
    echo ✅ Base de datos ya existe
)
cd ..

echo.
echo ✅ Instalación completada!
echo.
echo Para iniciar la aplicación en modo desarrollo:
echo   npm run dev
echo.
echo Para compilar la aplicación de escritorio:
echo   npm run electron:build:win   (Windows)
echo   npm run electron:build:mac   (macOS)
echo   npm run electron:build:linux (Linux)
echo.
pause
