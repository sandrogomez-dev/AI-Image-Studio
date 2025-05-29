#!/bin/bash
echo "Preparando para despliegue en Vercel..."

# Backup del package.json original
cp package.json package-original.json

# Usar package.json sin workspaces
cp package-vercel.json package.json

echo "✅ Configuración preparada para Vercel"
echo "Recuerda ejecutar restore-deploy.sh después del despliegue" 