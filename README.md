# Requests Service

MVP веб-сервиса для создания и обработки заявок.

## Стек

- Backend: Java 21, Spring Boot 3, Spring Web, Spring Data JPA
- Frontend: React, Vite, TypeScript
- Database: PostgreSQL

## Запуск

### Вариант 1: через Docker

```powershell
docker compose up --build
```

После запуска:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

### Вариант 2: локальная разработка

Нужны Java 21+, Maven, Node.js/npm и PostgreSQL.

1. Запустите PostgreSQL:

```powershell
docker compose up -d postgres
```

2. Запустите backend:

```powershell
cd backend
mvn spring-boot:run
```

Backend будет доступен на `http://localhost:8080`.

3. Запустите frontend:

```powershell
cd frontend
npm install
npm run dev
```

Frontend будет доступен на `http://localhost:5173`.

## Публикация на Render

Проект подготовлен для Render Blueprint через файл `render.yaml`.

В production Render собирает единый Docker-образ из `Dockerfile.render`: React собирается в статические файлы и отдаётся из Spring Boot вместе с API. PostgreSQL создаётся отдельным managed-сервисом Render.

После деплоя приложение будет доступно по URL сервиса Render, а API будет на том же домене по `/api/requests`.

## API

- `GET /api/requests` - список заявок
- `POST /api/requests` - создать заявку
- `GET /api/requests/{id}` - получить заявку
- `PATCH /api/requests/{id}/status` - изменить статус
- `DELETE /api/requests/{id}` - удалить заявку

Статусы: `NEW`, `IN_PROGRESS`, `DONE`, `CANCELED`.
