# Instrucciones para iconos de S.I.M.A Desktop

Para crear los iconos de la aplicación, necesitas generar los siguientes archivos:

## Windows (.ico)
- **Archivo**: `icon.ico`
- **Tamaños**: 16x16, 32x32, 48x48, 64x64, 128x128, 256x256
- **Herramienta recomendada**: https://converticon.com/ o GIMP

## macOS (.icns)
- **Archivo**: `icon.icns`
- **Tamaños**: 16x16@2x, 32x32@2x, 128x128@2x, 256x256@2x, 512x512@2x
- **Herramienta recomendada**: https://cloudconvert.com/png-to-icns o `iconutil`

## Linux (.png)
- **Archivo**: `icon.png`
- **Tamaño**: 512x512 o 1024x1024
- **Formato**: PNG con transparencia

## Generación rápida
Puedes usar herramientas online como:
- https://www.electronjs.org/docs/latest/tutorial/application-distribution#icon
- https://icon.kitchen/ (PWA/App icons)
- https://favicon.io/ (generador gratuito)

## Sugerencias de diseño
- Usa un diseño simple y reconocible
- Colores: Azul policial (#1976D2), blanco, negro
- Símbolos: Escudo policial, documento, persona
- Fondo transparente o con borde redondeado

Una vez generados los iconos, colócalos en este directorio (`build/`):
```
build/
  ├── icon.ico     (Windows)
  ├── icon.icns    (macOS)
  └── icon.png     (Linux)
```
