# UI Kit Library (@alabuga/uikit)

Компонентная библиотека UI для проектов ALIS (Alabuga Logistic Information System).

## Установка

```bash
npm install @alabuga/uikit
```

## Использование

```jsx
import { BaseButton, Select, InfoBlock } from '@alabuga/uikit';

function App() {
  return (
    <div>
      <BaseButton>Кнопка</BaseButton>
      <Select options={[...]} />
      <InfoBlock data={[...]} />
    </div>
  );
}
```

## Реестр пакетов

Пакет публикуется в **Nexus**:

- **URL:** https://nexus.lkds.alabuga.ru/repository/npm-hosted/

## Как обновить библиотеку

### Разработчик библиотеки

#### Релиз через GitLab CI (рекомендуется)

После merge в `master` в пайплайне доступны ручные джобы:

- `release_patch` — исправления багов
- `release_minor` — изменения компонентов
- `release_major` — крупные изменения

Перед релизом выполняется: typecheck, build, Playwright-тесты, Dependency Scanning и Secret Detection. После успешной публикации запускается downstream pipeline ALIS FE.

#### Контракт интеграции с ALIS FE

UIKIT сначала публикует пакет в Nexus, затем запускает ALIS FE через GitLab multi-project downstream pipeline с `CI_JOB_TOKEN`.

ALIS FE получает следующие переменные:

- `UIKIT_VERSION`
- `UIKIT_PACKAGE_NAME`
- `UIKIT_RELEASE_TAG`
- `UIKIT_SOURCE_PROJECT_PATH`
- `UIKIT_SOURCE_PIPELINE_URL`
- `UIKIT_SOURCE_COMMIT_SHA`

Для работы интеграции в ALIS FE нужно:

- разрешить входящий `CI_JOB_TOKEN` от проекта UIKIT в job token permissions / allowlist
- добавить rules для job-ов, которые должны реагировать на этот сценарий, с поддержкой `$CI_PIPELINE_SOURCE == "pipeline"`

#### Локальная публикация (скрипт)

```bash
# Маленькие изменения (баг)
npm run release:patch

# Средние изменения (компонент)
npm run release:minor

# Крупные изменения (новый компонент)
npm run release:major
```

Скрипт: `git pull` → `npm run build` → commit/push → bump версии → `npm run publish:prod` → push.

#### Ручная публикация

```bash
npm run version:patch   # или minor / major
npm run publish:prod
```

### Потребитель библиотеки

```bash
npm install @alabuga/uikit@latest
```

Или конкретная версия:

```bash
npm install @alabuga/uikit@^15.7.0 --legacy-peer-deps
```

## Компоненты

- **BaseButton, ButtonIcon, DownloadButton** — кнопки
- **Select, SelectBool, SelectMulti, Autocomplete, TreeSelect** — выпадающие списки
- **InfoBlock** — информационные блоки
- **DatePicker, DateRangePicker, TimePicker, DateTimePicker** — выбор даты и времени
- **InputText, InputEmail, InputPhone, InputRange, InputAutocompleteMulti** — поля ввода
- **Modal, Dialog, DialogPrompt** — модальные окна
- **Drawer** — боковая панель
- **Badge, CheckBox, TextLabel, Preloader** — прочие элементы

## Разработка

### Установка

```bash
npm install
```

### Сборка

```bash
npm run build
```

### Разработка с watch

```bash
npm run dev
```

### Storybook и тесты

Использование Storybook и визуальные тесты описаны в **[docs/STORYBOOK.md](docs/STORYBOOK.md)**.

Для локальной сборки Docker-образа Storybook из исходников используйте `docker compose -f docker-compose.dev.yaml up --build`.
Для deployment-окружений `docker-compose.yaml` использует готовый образ и переменные `UIKIT_STORYBOOK_IMAGE` / `UIKIT_STORYBOOK_TAG`.
Канонический runtime Dockerfile для Storybook теперь находится в корневом `Dockerfile`.

## Версионирование

- **patch** — баги
- **minor** — изменения существующих компонентов
- **major** — новые компоненты, несовместимые изменения

## Полезные ссылки

- [Nexus Registry](https://nexus.lkds.alabuga.ru/repository/npm-hosted/)
- [Storybook — разработка и тесты](docs/STORYBOOK.md)
- [Nexus: управление пакетом](docs/NEXUS.md)
- [Nexus: управление пакетом](docs/NEXUS.md)
- [Nexus: удаление версий](docs/NEXUS.md)

## Удаление версии из Nexus

```bash
# Удалить конкретную версию
npm unpublish @alabuga/uikit@15.7.0 --registry https://nexus.lkds.alabuga.ru/repository/npm-hosted/

# Удалить все версии пакета (осторожно)
npm unpublish @alabuga/uikit --registry https://nexus.lkds.alabuga.ru/repository/npm-hosted/ --force
```
