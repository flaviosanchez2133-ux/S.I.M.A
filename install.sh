#!/bin/bash

echo "🚀 Instalando S.I.M.A Desktop..."
echo ""

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado."
    echo "Por favor, instala Node.js desde https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) detectado"
echo ""

# Instalar dependencias raíz
echo "📦 Instalando dependencias principales..."
npm install

echo ""
echo "📦 Instalando dependencias del backend..."
cd backend && npm install && cd ..

echo ""
echo "📦 Instalando dependencias del frontend..."
cd sima-frontend && npm install && cd ..

echo ""
echo "🗄️  Configurando base de datos..."
cd backend
if [ ! -f "sima.sqlite3" ]; then
    echo "📝 Ejecutando migraciones..."
    npm run migrate
else
    echo "✅ Base de datos ya existe"
fi
cd ..

echo ""
echo "✅ Instalación completada!"
echo ""
echo "Para iniciar la aplicación en modo desarrollo:"
echo "  npm run dev"
echo ""
echo "Para compilar la aplicación de escritorio:"
echo "  npm run electron:build:win   (Windows)"
echo "  npm run electron:build:mac   (macOS)"
echo "  npm run electron:build:linux (Linux)"
echo ""
