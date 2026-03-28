# Промокоды API

## Задание

Реализовать REST API для системы промокодов.

**Сущности:**
- Промокод — код, скидка (%), лимит активаций, срок действия
- Активация — привязка промокода к email пользователя

**Требования:**
- CRUD промокодов (создание, просмотр, список)
- Активация промокода по email — каждый email может активировать конкретный промокод только один раз
- Промокод нельзя активировать сверх лимита
- Стек: Node.js, TypeScript, PostgreSQL

## Запуск

```bash
npm install

docker-compose up -d

yarn prisma:generate

yarn prisma:migrate

yarn start:dev

P.S. Для удобства проверяющего - .env уже лежит в репозитории
```

API на `http://localhost:3000`
Swagger документация на `http://localhost:3000/api`

## Endpoints

**Создать промокод:**
```
POST /promocodes
```

**Список промокодов:**
```
GET /promocodes
```

**Промокод по ID:**
```
GET /promocodes/:id
```

**Активировать промокод:**
```
POST /promocodes/activate
```
