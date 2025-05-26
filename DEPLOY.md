# 🚀 Guía de Despliegue - AI Image Studio

## 📋 Pasos para subir a GitHub

### 1. Crear repositorio en GitHub
1. Ve a [GitHub.com](https://github.com)
2. Haz clic en "New repository"
3. Nombre: `ai-image-studio`
4. Descripción: `🎨 AI Image Studio - Portfolio Showcase con Next.js 14 + FastAPI`
5. **NO** marques "Initialize with README" (ya tenemos uno)
6. Haz clic en "Create repository"

### 2. Conectar repositorio local con GitHub
```bash
# Añadir el remote origin (reemplaza TU_USERNAME con tu usuario de GitHub)
git remote add origin https://github.com/TU_USERNAME/ai-image-studio.git

# Verificar que se añadió correctamente
git remote -v

# Subir el código
git push -u origin main
```

### 3. Verificar que se subió correctamente
- Ve a tu repositorio en GitHub
- Deberías ver todos los archivos EXCEPTO `node_modules/`
- El README.md se mostrará automáticamente

## 🌐 Opciones de Despliegue

### Opción 1: Vercel (Recomendado para Frontend)
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa el repositorio `ai-image-studio`
4. Vercel detectará automáticamente Next.js
5. Configura las variables de entorno si es necesario
6. ¡Deploy automático!

### Opción 2: Netlify
1. Ve a [netlify.com](https://netlify.com)
2. "New site from Git"
3. Conecta GitHub y selecciona el repositorio
4. Build command: `cd frontend && npm run build`
5. Publish directory: `frontend/out`

### Opción 3: Railway/Render (Para Fullstack)
1. Conecta tu repositorio
2. Usa el `docker-compose.yml` incluido
3. Configura variables de entorno
4. Deploy automático

## 🔧 Variables de Entorno para Producción

Crea estas variables en tu plataforma de despliegue:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://tu-api.com
NEXT_PUBLIC_APP_URL=https://tu-app.com

# AI Services (opcional)
OPENAI_API_KEY=tu_openai_key
STABILITY_API_KEY=tu_stability_key

# Analytics (opcional)
NEXT_PUBLIC_GA_ID=tu_google_analytics_id
```

## 📊 Verificación Post-Despliegue

Después del despliegue, verifica:
- ✅ La página carga correctamente
- ✅ Las animaciones funcionan
- ✅ El diseño responsive se ve bien
- ✅ No hay errores en la consola
- ✅ Lighthouse score >90

## 🎯 URLs de Ejemplo

Una vez desplegado, tendrás:
- **Frontend**: `https://tu-usuario.vercel.app`
- **Repositorio**: `https://github.com/tu-usuario/ai-image-studio`

## 🔄 Actualizaciones Futuras

Para actualizar el proyecto:
```bash
# Hacer cambios en el código
git add .
git commit -m "✨ Nueva funcionalidad"
git push origin main
```

El despliegue se actualizará automáticamente en Vercel/Netlify. 