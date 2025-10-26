# 🌐 Настройка деплоя на собственный сервер

## 🔧 Шаг 1: Настройка GitHub Secrets

Зайдите в ваш репозиторий GitHub:
**https://github.com/terran666/trackista.live/settings/secrets/actions**

### Добавьте secrets в зависимости от типа подключения:

### 📡 **Вариант A: FTP деплой (самый простой)**
```
FTP_SERVER = ftp.your-server.com
FTP_USERNAME = your-username  
FTP_PASSWORD = your-password
```

### 🔐 **Вариант B: SSH деплой (безопасный)**
```
SSH_HOST = your-server-ip
SSH_USER = username
SSH_PRIVATE_KEY = ваш-приватный-ssh-ключ
SSH_PORT = 22 (или другой порт)
PROJECT_PATH = /var/www/html (путь на сервере)
```

### 📂 **Вариант C: rsync деплой**
```
RSYNC_HOST = your-server.com
RSYNC_USER = username
RSYNC_KEY = ssh-private-key
REMOTE_PATH = /var/www/html/
```

## 🚀 Шаг 2: Активация деплоя

После настройки secrets:

```bash
# Коммитим изменения
git add .
git commit -m "🚀 Setup server deployment"
git push origin main
```

## 📁 Шаг 3: Структура на сервере

### Для FTP:
- Файлы из `dist/` копируются в `/public_html/`
- Убедитесь что права доступа настроены

### Для SSH:
- Клонируется репозиторий на сервер
- Выполняется сборка на сервере
- Копируются файлы в веб-папку

## 🔍 Проверка:

1. Зайдите в **Actions** вашего репозитория
2. Должен запуститься **"Deploy to Server"**
3. Проверьте логи на ошибки
4. Откройте ваш сайт в браузере

## 🛠 Troubleshooting:

### FTP ошибки:
- Проверьте данные FTP подключения
- Убедитесь что папка `/public_html/` существует

### SSH ошибки:
- Проверьте SSH ключи
- Убедитесь что пользователь имеет права на папку

### Права доступа:
```bash
# На сервере выполните:
chmod -R 755 /var/www/html/
chown -R www-data:www-data /var/www/html/
```

## 📋 Какой способ выбрать?

- **FTP** - если у вас обычный веб-хостинг
- **SSH** - если у вас VPS/выделенный сервер  
- **rsync** - для синхронизации файлов

Скажите, какой у вас тип сервера, и я помогу настроить конкретный способ!