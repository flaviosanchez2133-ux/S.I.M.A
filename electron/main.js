const { app, BrowserWindow, Menu, shell, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

// Variables globales
let mainWindow;
let backendProcess;
const isDev = !app.isPackaged;
const BACKEND_PORT = 4000;
const FRONTEND_PORT = 3000;

// Configuración de paths
const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'backend')
  : path.join(__dirname, '..', 'backend');

const FRONTEND_PATH = app.isPackaged
  ? path.join(process.resourcesPath, 'sima-frontend', 'build', 'index.html')
  : `http://localhost:${FRONTEND_PORT}`;

// Crear carpeta de datos del usuario
const USER_DATA_PATH = path.join(app.getPath('userData'), 'data');
if (!fs.existsSync(USER_DATA_PATH)) {
  fs.mkdirSync(USER_DATA_PATH, { recursive: true });
}

// Crear carpeta de uploads
const UPLOADS_PATH = path.join(USER_DATA_PATH, 'uploads');
if (!fs.existsSync(UPLOADS_PATH)) {
  fs.mkdirSync(UPLOADS_PATH, { recursive: true });
}

// Función para iniciar el backend
function startBackend() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Iniciando backend...');
    console.log('📂 Resources path:', RESOURCES_PATH);
    console.log('📂 User data path:', USER_DATA_PATH);

    const nodePath = isDev ? 'node' : process.execPath;
    const scriptPath = path.join(RESOURCES_PATH, 'src', 'server.js');

    // Variables de entorno para el backend
    const env = {
      ...process.env,
      NODE_ENV: isDev ? 'development' : 'production',
      PORT: BACKEND_PORT.toString(),
      DB_CLIENT: 'sqlite3',
      DB_FILENAME: path.join(USER_DATA_PATH, 'sima.sqlite3'),
      UPLOADS_DIR: UPLOADS_PATH,
      JWT_SECRET: 'sima-desktop-secret-key-change-in-production',
      JWT_REFRESH_SECRET: 'sima-desktop-refresh-secret-key-change-in-production',
      FRONTEND_URL: isDev ? `http://localhost:${FRONTEND_PORT}` : 'file://'
    };

    if (isDev) {
      backendProcess = spawn(nodePath, [scriptPath], {
        cwd: RESOURCES_PATH,
        env,
        stdio: 'inherit'
      });
    } else {
      // En producción, usar el node embebido
      backendProcess = spawn(process.execPath, [scriptPath], {
        cwd: RESOURCES_PATH,
        env,
        stdio: 'pipe'
      });

      backendProcess.stdout?.on('data', (data) => {
        console.log(`Backend: ${data}`);
      });

      backendProcess.stderr?.on('data', (data) => {
        console.error(`Backend Error: ${data}`);
      });
    }

    backendProcess.on('error', (error) => {
      console.error('❌ Error al iniciar backend:', error);
      reject(error);
    });

    backendProcess.on('exit', (code) => {
      console.log(`Backend process exited with code ${code}`);
    });

    // Esperar a que el backend esté listo
    setTimeout(() => {
      console.log('✅ Backend iniciado');
      resolve();
    }, 3000);
  });
}

// Función para crear la ventana principal
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 768,
    backgroundColor: '#1a1a2e',
    icon: path.join(__dirname, '..', 'build', 'icon.png'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      webSecurity: true
    },
    show: false,
    frame: true,
    titleBarStyle: 'default'
  });

  // Mostrar ventana cuando esté lista
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Cargar la aplicación
  if (isDev) {
    mainWindow.loadURL(FRONTEND_PATH);
  } else {
    mainWindow.loadFile(FRONTEND_PATH);
  }

  // Abrir enlaces externos en el navegador
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Menú de la aplicación
  const menuTemplate = [
    {
      label: 'Archivo',
      submenu: [
        {
          label: 'Recargar',
          accelerator: 'CmdOrCtrl+R',
          click: () => mainWindow.reload()
        },
        { type: 'separator' },
        {
          label: 'Salir',
          accelerator: 'CmdOrCtrl+Q',
          click: () => app.quit()
        }
      ]
    },
    {
      label: 'Ver',
      submenu: [
        {
          label: 'Pantalla completa',
          accelerator: 'F11',
          click: () => mainWindow.setFullScreen(!mainWindow.isFullScreen())
        },
        {
          label: 'Herramientas de desarrollo',
          accelerator: 'CmdOrCtrl+Shift+I',
          click: () => mainWindow.webContents.toggleDevTools()
        }
      ]
    },
    {
      label: 'Ayuda',
      submenu: [
        {
          label: 'Acerca de',
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Acerca de S.I.M.A',
              message: 'S.I.M.A - Sistema de Información de Mencionados y Aprehendidos',
              detail: `Versión: ${app.getVersion()}\n\nDesarrollado por Flavio Sanchez\n© 2026 Todos los derechos reservados`
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// Función de inicialización
async function initialize() {
  try {
    console.log('🔧 Inicializando S.I.M.A Desktop...');
    
    // Iniciar backend
    await startBackend();
    
    // Crear ventana
    createWindow();
    
    console.log('✅ Aplicación lista');
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error);
    dialog.showErrorBox(
      'Error de Inicio',
      `No se pudo iniciar la aplicación:\n${error.message}`
    );
    app.quit();
  }
}

// Eventos de la aplicación
app.whenReady().then(initialize);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('before-quit', () => {
  if (backendProcess) {
    console.log('🛑 Deteniendo backend...');
    backendProcess.kill();
  }
});

// Manejo de errores no capturados
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});
