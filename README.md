# todo-app-insiders

Full-stack застосунок для керування завданнями (TODO) з JWT-аутентифікацією.

## Можливості

- Реєстрація, вхід і вихід (JWT у httpOnly cookie)
- Створення, перегляд, редагування та видалення завдань
- Поля завдання: `title`, `description`, `status` (`todo` | `in progress` | `done`)
- Фільтрація списку завдань за статусом
- Кожен користувач бачить і змінює лише власні завдання

## Стек

| Частина  | Технології                                                  |
| -------- | ----------------------------------------------------------- |
| Бекенд   | NestJS (Express), Prisma ORM, PostgreSQL, JWT, class-validator, bcrypt |
| Фронтенд | Next.js 16, React 19, TanStack Query, axios, Tailwind CSS 4 |
| Інфра    | Docker, Docker Compose                                      |

## Структура репозиторію

```
.
├── todo-server/         # бекенд (NestJS) — див. todo-server/README.md
├── todo-client/         # фронтенд (Next.js) — див. todo-client/README.md
└── docker-compose.yml   # PostgreSQL + бекенд + фронтенд
```

## Швидкий старт (Docker)

Потрібен лише Docker.

```bash
docker compose up --build
```

| Сервіс   | Адреса                  |
| -------- | ----------------------- |
| Фронтенд | http://localhost:3000   |
| Бекенд   | http://localhost:3001   |

Міграції бази даних застосовуються автоматично під час старту бекенду. Порти `3000` і `3001` мають бути вільними.

Зупинити: `docker compose down` (додайте `-v`, щоб також видалити дані бази).

## Локальний запуск без Docker

Потрібні Node.js 24+, pnpm і PostgreSQL.

```bash
# Бекенд
cd todo-server
pnpm install
cp .env.example .env          # вказати свій DATABASE_URL
pnpm prisma migrate dev
pnpm prisma generate
pnpm start:dev                # http://localhost:3001

# Фронтенд (в окремому терміналі)
cd todo-client
pnpm install
cp .env.example .env.local
pnpm dev                      # http://localhost:3000
```

Детальніше — у README кожної частини:

- [todo-server/README.md](todo-server/README.md) — змінні оточення, опис API, коди відповідей
- [todo-client/README.md](todo-client/README.md) — сторінки, аутентифікація, робота з React Query
