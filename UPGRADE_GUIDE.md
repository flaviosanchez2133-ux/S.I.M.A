# 📋 Guía de Actualización - S.I.M.A Desktop v1.0.0

## 🎉 ¡Bienvenido a la nueva versión de escritorio!

S.I.M.A ahora es una aplicación de escritorio completa, lista para instalar y usar sin necesidad de configurar servidores web ni bases de datos externas.

---

## ✨ Cambios Principales

### 🖥️ Aplicación de Escritorio con Electron

- **Antes:** Aplicación web que requería servidor Node.js + PostgreSQL
- **Ahora:** Aplicación de escritorio independiente con un instalador simple
- **Beneficio:** Instalación con un clic, funciona offline

### 💾 Base de Datos Embebida (SQLite)

- **Antes:** Requería instalar y configurar PostgreSQL
- **Ahora:** SQLite integrado, se configura automáticamente
- **Beneficio:** Cero configuración, portable, más simple

### 🎨 Interfaz Modernizada

- Nuevos estilos con design system moderno
- Animaciones suaves y transiciones
- Mejor experiencia de usuario (UX)
- Tipografía mejorada con fuente Inter
- Sistema de colores actualizado
- Cards y componentes con sombras modernas

### 📦 Sistema de Instalación

- Instaladores nativos para Windows (.exe), macOS (.dmg) y Linux (.deb/.AppImage)
- Scripts de instalación automatizados
- Configuración de primera ejecución simplificada

---

## 🔄 Migración desde la Versión Web

Si ya tenías S.I.M.A funcionando como aplicación web con PostgreSQL, aquí está cómo migrar:

### Opción 1: Empezar de Nuevo (Recomendado para pruebas)

1. Instala la versión Desktop
2. La app creará una nueva base de datos SQLite vacía
3. Puedes importar datos manualmente si es necesario

### Opción 2: Migrar Datos de PostgreSQL (Avanzado)

```bash
# 1. Exportar desde PostgreSQL
pg_dump -U postgres sima > backup.sql

# 2. Convertir a SQLite (usa herramientas como pgloader)
# Documentación completa próximamente

# 3. Copiar la DB convertida a la ubicación de S.I.M.A Desktop
```

---

## 📁 Nuevas Ubicaciones de Archivos

### Windows:

```
C:\Users\[TuUsuario]\AppData\Roaming\sima-desktop\
  ├── data/
  │   ├── sima.sqlite3   (base de datos)
  │   └── uploads/       (fotos)
  └── logs/              (registros de errores)
```

### macOS:

```
~/Library/Application Support/sima-desktop/
```

### Linux:

```
~/.config/sima-desktop/
```

---

## ⚙️ Configuración

### Variables de Entorno (solo para desarrollo)

Si estás ejecutando en modo desarrollo (`npm run dev`), puedes configurar:

```bash
# backend/.env
PORT=4000
DB_CLIENT=sqlite3
DB_FILENAME=./dev.sqlite3
JWT_SECRET=tu-secreto-aqui
UPLOADS_DIR=./uploads
```

**Nota:** En la aplicación compilada, todo se configura automáticamente.

---

## 🚀 Comandos de Desarrollo

### Desarrollo

```bash
npm run dev                    # Iniciar en modo desarrollo
npm run dev:backend           # Solo backend
npm run dev:frontend          # Solo frontend
npm run dev:electron          # Solo Electron
```

### Compilación

```bash
npm run build                 # Compilar frontend + backend
npm run electron:build        # Compilar para todas las plataformas
npm run electron:build:win    # Solo Windows
npm run electron:build:mac    # Solo macOS
npm run electron:build:linux  # Solo Linux
```

---

## 🐛 Problemas Conocidos y Soluciones

### 1. El backend no inicia en modo desarrollo

**Solución:**

```bash
cd backend
npm install
npm run migrate
```

### 2. Error de módulos no encontrados

**Solución:**

```bash
# Reinstalar todo
npm install
cd backend && npm install && cd ..
cd sima-frontend && npm install && cd ..
```

### 3. Puerto 4000 ya en uso

**Solución:**

```bash
# Windows
netstat -ano | findstr :4000
taskkill /PID [número] /F

# Linux/Mac
lsof -ti:4000 | xargs kill -9
```

### 4. La base de datos no se crea

**Solución:**

```bash
cd backend
npm run migrate
```

---

## 📊 Comparación de Versiones

| Característica         | Versión Web                  | Versión Desktop            |
| ---------------------- | ---------------------------- | -------------------------- |
| Instalación            | Compleja (Node + PostgreSQL) | Simple (1 instalador)      |
| Base de datos          | PostgreSQL externa           | SQLite embebida            |
| Funcionamiento offline | No                           | Sí                         |
| Actualizaciones        | Manual                       | Auto-update (próximamente) |
| Portabilidad           | Baja                         | Alta                       |
| Respaldo de datos      | pg_dump                      | Copiar carpeta             |
| Interfaz               | Web moderna                  | Desktop moderna            |

---

## 🎯 Roadmap Futuro

### v1.1.0 (Próximamente)

- [ ] Sistema de auto-actualización
- [ ] Importador de datos desde PostgreSQL
- [ ] Backup automático programado
- [ ] Modo oscuro
- [ ] Exportación avanzada de reportes

### v1.2.0

- [ ] Sincronización en la nube (opcional)
- [ ] Múltiples usuarios con perfiles
- [ ] Dashboard personalizable
- [ ] Notificaciones del sistema

---

## 📞 Soporte

¿Problemas con la migración?

1. Revisa [README_DESKTOP.md](./README_DESKTOP.md)
2. Revisa [INICIO_RAPIDO.md](./INICIO_RAPIDO.md)
3. Abre un issue en GitHub: https://github.com/flaviosanchez2133-ux/S.I.M.A/issues

---

## 🙏 Agradecimientos

Gracias por usar S.I.M.A. Esta nueva versión de escritorio hace que la aplicación sea más accesible y fácil de usar para todos.

**Desarrollado por:** Flavio Sanchez  
**Versión:** 1.0.0  
**Fecha:** Enero 2026
