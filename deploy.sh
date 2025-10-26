#!/bin/bash

# 🚀 Скрипт деплоя TrackIsta на удаленный сервер

set -e

echo "🔥 TrackIsta Deployment Script"
echo "=============================="

# Проверяем зависимости
if ! command -v npm &> /dev/null; then
    echo "❌ npm не установлен"
    exit 1
fi

# Устанавливаем зависимости
echo "📦 Установка зависимостей..."
npm install

# Собираем проект
echo "🏗️  Сборка проекта..."
npm run build

# Проверяем что сборка прошла успешно
if [ ! -d "dist" ]; then
    echo "❌ Ошибка сборки - папка dist не создана"
    exit 1
fi

echo "✅ Сборка завершена успешно!"
echo "📁 Файлы для деплоя находятся в папке: dist/"
echo ""
echo "📊 Содержимое dist/:"
ls -la dist/

echo ""
echo "🚀 Готово к деплою!"
echo "💡 Скопируйте содержимое папки dist/ на ваш веб-сервер"
echo ""
echo "📖 Подробные инструкции: DEPLOY.md"