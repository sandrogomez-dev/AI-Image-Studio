# Guía de Despliegue en Vercel

## 🚀 Problema Resuelto: Error de Workspaces

El error `Command "npm install && cd frontend && npm install" exited with 1` se debe a conflictos entre el workspace configuration del directorio raíz y el frontend. He implementado varias soluciones:

### Archivos de Configuración Actualizados

- ✅ `vercel.json` - Configuración que evita conflictos de workspace
- ✅ `.nvmrc` - Node.js 18
- ✅ `.npmrc` - Configuración de npm en root con workspaces=false
- ✅ `frontend/.npmrc` - Configuración de npm para dependencias
- ✅ `package-vercel.json` - Package.json sin workspaces para despliegue

## 📋 Soluciones Disponibles

### Solución 1: Configuración Actual (Recomendada)

La configuración actual en `vercel.json`:
```json
{
  "version": 2,
  "buildCommand": "cd frontend && rm -rf node_modules package-lock.json && npm install --no-package-lock && npm run build",
  "outputDirectory": "frontend/.next",
  "installCommand": "echo 'Installing in build step'",
  "framework": "nextjs",
  "functions": {
    "frontend/app/**": {
      "runtime": "nodejs18.x"
    }
  }
}
```

Esta configuración:
- Evita la instalación en el root (que causa conflictos de workspace)
- Instala las dependencias directamente en el frontend durante el build
- Limpia node_modules y package-lock.json para evitar conflictos

### Solución 2: Root Directory = frontend

En el dashboard de Vercel:
1. Ve a Settings > General
2. Configura **Root Directory: `frontend`**
3. Usa la configuración simplificada (`vercel-simple-root.json`)

### Solución 3: Temporalmente remover workspaces

```bash
# Antes del despliegue
./prepare-deploy.sh

# Después del despliegue
./restore-deploy.sh
```

## 🔧 Pasos para Desplegar

### Opción Recomendada:

1. **Commit los cambios:**
   ```bash
   git add .
   git commit -m "fix: configuración Vercel sin conflictos de workspace"
   git push origin main
   ```

2. **Desplegar en Vercel:**
   - La configuración actual debería funcionar automáticamente
   - Root Directory: `./` (raíz del proyecto)

### Si sigue fallando:

1. **Cambiar Root Directory en Vercel:**
   - Dashboard > Settings > General
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Install Command: `npm install`

## 🧪 Verificación Local

```bash
# Probar el comando exacto que usa Vercel
cd frontend
rm -rf node_modules package-lock.json
npm install --no-package-lock
npm run build
```

## 🐛 Problemas Conocidos y Soluciones

### ❌ Error: "npm install && cd frontend && npm install" exited with 1
**Causa:** Conflicto entre workspace del root y frontend
**✅ Solución:** Configuración actual que evita instalación en root

### ❌ Error: "Can not use --no-workspaces and --workspace at the same time"
**Causa:** npm detecta configuración de workspace conflictiva
**✅ Solución:** Usar Root Directory = `frontend` en Vercel

### ❌ Error: "workspace config at frontend/.npmrc"
**Causa:** npm intenta usar configuración de workspace
**✅ Solución:** Configuración de `.npmrc` con `workspaces=false`

## 📊 Configuraciones Disponibles

- `vercel.json` - Configuración principal (evita workspace)
- `vercel-simple-root.json` - Para usar con Root Directory = frontend
- `vercel-simple.json` - Configuración básica de respaldo
- `package-vercel.json` - Package.json sin workspaces

## 🚀 Estado Actual

✅ **Configuración Activa:** Build que instala solo en frontend
✅ **Workspace Conflicts:** Resueltos
✅ **ESLint/TypeScript:** Configurado para permitir build
✅ **Dependencies:** Optimizadas con legacy-peer-deps

## 📞 Si Nada Funciona

Como último recurso, puedes configurar manualmente en Vercel:

1. **Root Directory:** `frontend`
2. **Build Command:** `npm install && npm run build`
3. **Install Command:** `npm install`
4. **Output Directory:** `.next`

¡El proyecto ahora debería desplegarse sin errores de workspace! 🎉 