# Private Service

NestJS приложение для управления курьерами, агрегаторами и связанными данными.

## Требования

- Node.js 21+
- Docker и Docker Compose
- PostgreSQL (если запускаете БД отдельно)
- RabbitMQ (если запускаете отдельно)

## Переменные окружения

Создайте файл `.env` в корне проекта со следующими переменными:

### Обязательные переменные

```env
# Порт приложения
PORT=3002

# Настройки PostgreSQL
PG_HOST=localhost
PG_PORT=5432
PG_USER=postgres
PG_PASSWORD=your_password
PG_DATABASE=private_db

# Настройки RabbitMQ
RMQ_URL=localhost:5672
RMQ_USER=guest
RMQ_PASSWORD=guest
RMQ_QUEUE_AGGREGATOR=to_aggregator
RMQ_QUEUE_PRIVATE=to_private

# Токен для административных операций
ADMIN_TOKEN=your_admin_token_here
```

### Опциональные переменные

```env
# Логирование (true/false)
IS_LOGGER=true

# Автоматическая синхронизация схемы БД (true/false, не рекомендуется для production)
IS_SYNCHRONIZE=false
```

## Установка и запуск

### Локальная разработка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env` с необходимыми переменными (см. раздел выше)

3. Убедитесь, что PostgreSQL и RabbitMQ запущены и доступны

4. Запустите приложение в режиме разработки:
```bash
npm run start:dev
```

Приложение будет доступно по адресу `http://localhost:3002` (или по порту, указанному в `PORT`)

### Запуск через Docker

#### Вариант 1: Использование готового образа

1. Установите переменную окружения с тегом образа:
```bash
export IMAGE_TAG=your-image-tag:latest
```

2. Создайте файл `.env` с необходимыми переменными

3. Запустите контейнер:
```bash
docker-compose up -d
```

#### Вариант 2: Сборка образа локально

1. Соберите Docker образ:
```bash
docker build -t private:latest .
```

2. Установите переменную окружения:
```bash
export IMAGE_TAG=private:latest
```

3. Создайте файл `.env` с необходимыми переменными

4. Запустите контейнер:
```bash
docker-compose up -d
```

### Проверка работы

Проверьте статус контейнера:
```bash
docker ps
```

Проверьте логи:
```bash
docker logs private
```

## Скрипты

- `npm run build` - сборка проекта
- `npm run start` - запуск в production режиме
- `npm run start:dev` - запуск в режиме разработки с hot-reload
- `npm run start:debug` - запуск в режиме отладки
- `npm run start:prod` - запуск собранного приложения

## Структура проекта

- `src/` - исходный код приложения
  - `aggregator/` - модуль агрегаторов
  - `couriers/` - модуль курьеров
  - `courier-shifts/` - модуль смен курьеров
  - `courier-violations/` - модуль нарушений курьеров
  - `entities/` - сущности базы данных
  - `rabbitmq/` - модуль для работы с RabbitMQ
  - `guard/` - guards для авторизации
- `Dockerfile` - конфигурация Docker образа
- `docker-compose.yaml` - конфигурация Docker Compose

## API

Приложение использует Bearer токен для авторизации административных операций. Установите заголовок:
```
Authorization: Bearer <ADMIN_TOKEN>
```

Создание агрегатора
```json
{
    "name": "aggregator",
    "method": "POST",
    "data": { "name":"Яндекс"}
}
```

Создание статуса
```json
{
    "name": "statuses",
    "method": "POST",
    "data": { "status_name":"Ожидание"}
}
```

Создание типа нарушений
```json
{
    "name": "violations-type",
    "method": "POST",
    "data": { "category":"ПДД", "code": "10.20"}
}
```