# S.I.M.A Desktop — Aplicación de Escritorio

**Sistema de Información de Mencionados y Aprehendidos**  
Versión de escritorio independiente, lista para instalar y usar.

## 🎯 Características de la Versión Desktop

- ✅ **Instalación con un clic** - Instaladores nativos para Windows, macOS y Linux
- ✅ **Base de datos embebida** - SQLite integrado, no requiere PostgreSQL externo
- ✅ **Funcionamiento offline** - No necesita conexión a internet después de instalado
- ✅ **Interfaz nativa** - Aplicación de escritorio con menú y atajos de teclado
- ✅ **Auto-actualizable** - Sistema de actualizaciones automáticas (próximamente)
- ✅ **Portabilidad** - Todos los datos en una carpeta local
- ✅ **Rendimiento mejorado** - Optimizado para ejecución local

## 📥 Instalación Rápida (Usuarios Finales)

### Opción 1: Instalador Pre-compilado (Recomendado)

1. Descarga el instalador para tu sistema operativo:

   - **Windows**: `S.I.M.A-Setup-1.0.0.exe`
   - **macOS**: `S.I.M.A-1.0.0.dmg`
   - **Linux**: `S.I.M.A-1.0.0.AppImage` o `sima-desktop_1.0.0_amd64.deb`

2. Ejecuta el instalador y sigue las instrucciones

3. La aplicación se iniciará automáticamente

4. **Credenciales por defecto**:
   - Usuario: `admin`
   - Contraseña: `admin123`
   - ⚠️ **IMPORTANTE**: Cambia la contraseña en el primer inicio

### Opción 2: Desarrollo/Compilación Manual

Si eres desarrollador o quieres compilar desde el código fuente:

```bash
# 1. Clonar el repositorio
git clone https://github.com/flaviosanchez2133-ux/S.I.M.A.git
cd S.I.M.A

# 2. Instalar dependencias (usar script automático)
# En Windows:
install.bat

# En macOS/Linux:
chmod +x install.sh
./install.sh

# 3. Iniciar en modo desarrollo
npm run dev

# 4. Compilar instalador (requiere ~10 minutos)
npm run electron:build:win    # Windows
npm run electron:build:mac    # macOS
npm run electron:build:linux  # Linux
```

Los instaladores compilados estarán en la carpeta `dist/`.

## 🎮 Uso de la Aplicación

### Primer Inicio

1. Al abrir la aplicación por primera vez, se creará automáticamente:

   - Base de datos SQLite en `%APPDATA%/sima-desktop/data/sima.sqlite3`
   - Carpeta de fotos en `%APPDATA%/sima-desktop/data/uploads/`
   - Usuario administrador por defecto

2. Inicia sesión con las credenciales por defecto

3. **Cambia inmediatamente la contraseña**:
   - Ve a "Configuración" → "Cambiar Contraseña"
   - O usa el menú superior derecho

### Funciones Principales

#### 👤 Gestión de Personas

- Registrar nuevas personas mencionadas/aprehendidas
- Buscar por nombre, DNI o comisaría
- Subir fotografías
- Exportar listados a Excel/CSV
- Ver historial completo de registros

#### 📋 Registros Delictuales

- Crear registros con toda la información delictual
- Asociar a personas existentes
- Búsqueda avanzada con múltiples filtros
- Generar reportes en PDF
- Exportar datos a Excel/CSV

#### 🗺️ Visualización Geográfica

- Mapa interactivo con ubicaciones de delitos
- Mapa de calor (heatmap) de zonas críticas
- Clusters de incidentes
- Filtros por fecha, tipo de delito y comisaría

#### 📊 Estadísticas y Reportes

- Dashboard con indicadores clave
- Gráficos de delitos por tipo
- Tendencias temporales
- Ranking de comisarías

## 🔧 Configuración Avanzada

### Ubicación de los Datos

**Windows**:

```
C:\Users\[TuUsuario]\AppData\Roaming\sima-desktop\data\
  ├── sima.sqlite3      (base de datos)
  └── uploads/          (fotografías)
```

**macOS**:

```
~/Library/Application Support/sima-desktop/data/
  ├── sima.sqlite3
  └── uploads/
```

**Linux**:

```
~/.config/sima-desktop/data/
  ├── sima.sqlite3
  └── uploads/
```

### Backup de Datos

**Método Manual**:

1. Cierra la aplicación S.I.M.A
2. Copia la carpeta `data/` completa a una ubicación segura
3. Para restaurar, reemplaza la carpeta `data/` con tu backup

**Método Automático** (próximamente):

- La aplicación incluirá backups automáticos programables
- Exportación a archivos comprimidos con fecha

### Migración desde PostgreSQL

Si tenías una instalación web con PostgreSQL:

1. Exporta los datos desde PostgreSQL:

```bash
pg_dump -U postgres sima > backup.sql
```

2. Convierte el dump a SQLite usando herramientas como:
   - `pgloader`
   - `sqlitetransfer`
   - O el script de migración incluido (próximamente)

## ⌨️ Atajos de Teclado

| Atajo              | Acción                     |
| ------------------ | -------------------------- |
| `Ctrl + R`         | Recargar aplicación        |
| `Ctrl + Q`         | Salir                      |
| `F11`              | Pantalla completa          |
| `Ctrl + Shift + I` | Herramientas de desarrollo |

## 🔒 Seguridad

- ✅ Autenticación JWT con tokens de acceso y refresco
- ✅ Contraseñas hasheadas con bcrypt
- ✅ Validación de entrada de datos
- ✅ Protección contra inyección SQL
- ✅ Sesiones con expiración automática
- ✅ Logs de auditoría de cambios

## 🐛 Solución de Problemas

### La aplicación no inicia

1. Verifica que no haya otra instancia corriendo
2. Elimina la carpeta de caché:
   - Windows: `%APPDATA%/sima-desktop/Cache`
   - macOS: `~/Library/Application Support/sima-desktop/Cache`
3. Reinstala la aplicación

### Error de base de datos

1. Cierra la aplicación
2. Renombra `sima.sqlite3` a `sima.sqlite3.backup`
3. Reinicia la aplicación (se creará una nueva DB vacía)
4. Si necesitas los datos, contacta a soporte

### No se cargan las fotos

1. Verifica que la carpeta `uploads/` exista
2. Comprueba los permisos de escritura
3. El tamaño máximo por foto es 5MB

### Lentitud o congelamiento

1. Cierra y reinicia la aplicación
2. Verifica que no haya muchos registros abiertos simultáneamente
3. Considera hacer un backup y compactar la base de datos

## 🏗️ Tecnologías Utilizadas

### Frontend

- React 18
- Material-UI (MUI)
- Leaflet (mapas)
- Axios
- React Router

### Backend

- Node.js + Express
- Knex.js (ORM)
- SQLite3
- JWT (autenticación)
- Multer (uploads)

### Desktop

- Electron
- Electron Builder
- Squirrel (auto-update)

## 📝 Changelog

### v1.0.0 (2026-01-16)

- ✨ Primera versión de escritorio
- ✅ Migración de PostgreSQL a SQLite
- ✅ Instaladores para Windows, macOS y Linux
- ✅ Base de datos embebida
- ✅ Interfaz modernizada
- ✅ Mejoras de rendimiento

## 🤝 Soporte y Contribuciones

- **Reportar bugs**: [GitHub Issues](https://github.com/flaviosanchez2133-ux/S.I.M.A/issues)
- **Solicitar funciones**: [GitHub Discussions](https://github.com/flaviosanchez2133-ux/S.I.M.A/discussions)
- **Código fuente**: [GitHub Repository](https://github.com/flaviosanchez2133-ux/S.I.M.A)

## 📜 Licencia

Copyright © 2026 Flavio Sanchez  
Todos los derechos reservados.

---

**Desarrollado con ❤️ para la Policía de Tucumán**
