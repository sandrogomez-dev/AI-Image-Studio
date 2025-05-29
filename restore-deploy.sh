#!/bin/bash
echo "Restaurando configuración original..."

# Restaurar package.json original
if [ -f "package-original.json" ]; then
    cp package-original.json package.json
    rm package-original.json
    echo "✅ Configuración original restaurada"
else
    echo "❌ No se encontró backup del package.json original"
fi 