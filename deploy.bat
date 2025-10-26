@echo off
REM 🚀 Скрипт деплоя TrackIsta на удаленный сервер (Windows)

echo 🔥 TrackIsta Deployment Script
echo ==============================

REM Проверяем npm
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm не установлен
    exit /b 1
)

REM Устанавливаем зависимости
echo 📦 Установка зависимостей...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Ошибка установки зависимостей
    exit /b 1
)

REM Собираем проект
echo 🏗️  Сборка проекта...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Ошибка сборки проекта
    exit /b 1
)

REM Проверяем что сборка прошла успешно
if not exist "dist" (
    echo ❌ Ошибка сборки - папка dist не создана
    exit /b 1
)

echo ✅ Сборка завершена успешно!
echo 📁 Файлы для деплоя находятся в папке: dist\
echo.
echo 📊 Содержимое dist\:
dir dist

echo.
echo 🚀 Готово к деплою!
echo 💡 Скопируйте содержимое папки dist\ на ваш веб-сервер
echo.
echo 📖 Подробные инструкции: DEPLOY.md

pause