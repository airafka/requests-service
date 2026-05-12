# Локальная разработка

Этот режим нужен, чтобы разрабатывать и показывать систему на этом ПК без постоянных деплоев в Render.

## Как запускаем локально

Самый простой вариант, если не хочется отдельно ставить Maven и Node.js:

```powershell
docker compose up --build
```

После запуска:

- сайт: `http://localhost:5173`
- backend API: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

Остановить:

```powershell
Ctrl+C
```

Если нужно остановить контейнеры из другого окна:

```powershell
docker compose down
```

Данные PostgreSQL сохраняются в Docker volume `new-chat_postgres_data`, поэтому обычный `docker compose down` базу не удаляет.

## Как работаем с Git локально

Git хранит историю прямо на этом ПК в папке `.git`. GitHub для отката не нужен.

Проверить изменения:

```powershell
git status
```

Сделать локальную контрольную точку:

```powershell
git add .
git commit -m "Краткое описание изменения"
```

Посмотреть историю:

```powershell
git log --oneline
```

Откатить один файл до последнего коммита:

```powershell
git restore frontend/src/styles.css
```

Откатить все незакоммиченные изменения:

```powershell
git restore .
```

Важно: `git restore .` удалит все текущие незакоммиченные правки. Перед ним лучше проверить `git status`.

## Когда нужен GitHub и Render

В обычной локальной разработке GitHub и Render не нужны.

Публикация в Render нужна только когда надо показать систему по внешней ссылке:

```powershell
git push
```

После `git push` Render сам запустит деплой из GitHub.

По умолчанию работаем так:

1. Меняем код локально.
2. Проверяем на `http://localhost:5173`.
3. Делаем локальный commit.
4. Не пушим в GitHub, пока явно не нужен внешний деплой.
