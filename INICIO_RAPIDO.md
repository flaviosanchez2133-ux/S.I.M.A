# 🚀 Inicio Rápido - S.I.M.A Desktop

## ✅ Instalación Completada

¡Felicitaciones! Ya tienes instalados todos los componentes necesarios para S.I.M.A Desktop.

## 📋 Próximos Pasos

### 1️⃣ **Probar en Modo Desarrollo** (Recomendado primero)

```bash
npm run dev
```

Esto iniciará:

- ✅ Backend en http://localhost:4000
- ✅ Frontend en http://localhost:3000
- ✅ Ventana de Electron con la aplicación

**Login por defecto:**

- Usuario: `admin`
- Contraseña: `admin123`

---

### 2️⃣ **Compilar Instalador (Una vez probado)**

#### Para Windows (.exe):

```bash
npm run electron:build:win
```

#### Para macOS (.dmg):

```bash
npm run electron:build:mac
```

#### Para Linux (.deb / .AppImage):

```bash
npm run electron:build:linux
```

**⏱️ Tiempo estimado:** 5-10 minutos por plataforma

**📦 Ubicación:** Los instaladores se crearán en la carpeta `dist/`

---

### 3️⃣ **Agregar Iconos (Opcional pero recomendado)**

Para que la app tenga su propio icono:

1. Crea o descarga iconos en estos formatos:

   - `icon.ico` (Windows) - 256x256px
   - `icon.icns` (macOS)
   - `icon.png` (Linux) - 512x512px

2. Colócalos en la carpeta `build/`

3. Vuelve a compilar con el comando del paso 2

**💡 Herramientas gratuitas:**

- https://icon.kitchen/
- https://converticon.com/
- https://favicon.io/

---

## 🐛 Solución de Problemas

### El comando `npm run dev` no funciona

1. Verifica que no haya otro proceso usando los puertos 3000 o 4000
2. Cierra cualquier instancia previa de la app
3. Intenta nuevamente

### Error al compilar

1. Asegúrate de tener suficiente espacio en disco (mínimo 2GB)
2. Cierra antivirus temporalmente (a veces bloquea electron-builder)
3. Ejecuta `npm install` nuevamente

### La base de datos no se crea

1. Ve a `backend/`
2. Ejecuta manualmente: `npm run migrate`
3. Verifica que se haya creado `backend/dev.sqlite3`

---

## 📚 Documentación Completa

- **README Principal**: [README.md](./README.md)
- **README Desktop**: [README_DESKTOP.md](./README_DESKTOP.md)
- **Iconos**: [build/README_ICONS.md](./build/README_ICONS.md)

---

## 🎯 Comandos Útiles

| Comando                        | Descripción                        |
| ------------------------------ | ---------------------------------- |
| `npm run dev`                  | Inicia en modo desarrollo          |
| `npm run build`                | Compila frontend y backend         |
| `npm run electron:build`       | Compila para todas las plataformas |
| `npm run electron:build:win`   | Solo Windows                       |
| `npm run electron:build:mac`   | Solo macOS                         |
| `npm run electron:build:linux` | Solo Linux                         |

---

## 💻 Estructura del Proyecto

```
S.I.M.A/
├── electron/              # Configuración de Electron
│   └── main.js           # Proceso principal
├── backend/              # API Node.js + Express
│   ├── src/             # Código fuente
│   ├── migrations/      # Migraciones de DB
│   └── package.json
├── sima-frontend/        # App React
│   ├── src/
│   ├── public/
│   └── package.json
├── build/                # Iconos y recursos
├── dist/                 # Instaladores compilados (se crea al compilar)
├── package.json          # Configuración principal
├── install.bat           # Instalador para Windows
├── install.sh            # Instalador para Linux/Mac
└── README_DESKTOP.md     # Documentación completa

```

---

## ✨ Características Implementadas

- ✅ Base de datos SQLite embebida
- ✅ Interfaz modernizada con animaciones
- ✅ Ventana nativa de Electron
- ✅ Menú de aplicación personalizado
- ✅ Funcionamiento offline
- ✅ Instaladores para Windows, Mac y Linux
- ✅ Estilos modernos y responsivos
- ✅ Sistema de autenticación JWT
- ✅ Gestión de personas y registros delictuales
- ✅ Mapas interactivos con Leaflet
- ✅ Exportación a Excel/CSV/PDF
- ✅ Sistema de búsqueda avanzada

---

## 🔥 ¡Estás listo para usar S.I.M.A Desktop!

Comienza ejecutando:

```bash
npm run dev
```

---

**Desarrollado por:** Flavio Sanchez  
**Versión:** 1.0.0  
**Fecha:** Enero 2026

¿Necesitas ayuda? Revisa [README_DESKTOP.md](./README_DESKTOP.md) para documentación detallada.
