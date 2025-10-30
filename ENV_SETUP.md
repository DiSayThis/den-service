# Настройка переменных окружения

## Переменные окружения для Web-приложения (Next.js)

Создайте файл `.env` в корневой директории проекта со следующими переменными:

```env
# URL для доступа к Strapi API
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

# URL для доступа к загруженным файлам Strapi
NEXT_PUBLIC_STRAPI_ASSETS_URL=http://localhost:1337

# API токен для доступа к Strapi
STRAPI_API_TOKEN=your_strapi_api_token

# URL для API (используется в generateMetadata.ts)
NEXT_PUBLIC_API_URL=your-domain.com

# Телеграм бот токен для отправки сообщений
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# ID чатов для отправки сообщений (через запятую)
TELEGRAM_CHAT_ID=your_chat_id
```

## Переменные окружения для Strapi

Создайте файл `strapi/.env` со следующими переменными:

```env
# Настройки сервера
HOST=localhost
PORT=1337
PUBLIC_URL=http://localhost:1337

# Ключи безопасности
APP_KEYS=your_app_keys
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
TRANSFER_TOKEN_SALT=your_transfer_token_salt
ENCRYPTION_KEY=your_encryption_key

# Настройки базы данных (пример для SQLite)
DATABASE_CLIENT=sqlite

# Настройки базы данных (пример для PostgreSQL)
# DATABASE_CLIENT=postgres
# DATABASE_HOST=localhost
# DATABASE_PORT=5432
# DATABASE_NAME=strapi
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=strapi

# Настройки базы данных (пример для MySQL)
# DATABASE_CLIENT=mysql
# DATABASE_HOST=localhost
# DATABASE_PORT=3306
# DATABASE_NAME=strapi
# DATABASE_USERNAME=strapi
# DATABASE_PASSWORD=strapi
```

## Использование в docker-compose

Все эти переменные должны быть доступны при запуске через docker-compose. Убедитесь, что файлы .env находятся в правильных директориях и доступны для docker-compose.
