# TableUI Component - План миграции

## 🎯 Цель
Вынести TSBaseTableUI из проекта frontend в переиспользуемую библиотеку @alabuga/uikit

## 📊 Текущее состояние

### Исходный компонент: `frontend/src/shared/UIKIT/TSBaseTable/TSBaseTableUI.tsx`
- **Строк кода:** 786
- **Сложность:** Очень высокая
- **Зависимостей:** ~30+ импортов

### Основные зависимости компонента:

#### 1. **React & Core библиотеки**
- ✅ React (hooks, types)
- ✅ MobX (observer, toJS)
- ✅ React Hook Form
- ✅ classnames

#### 2. **UI библиотеки**
- ✅ @mui/material (Table, TableBody, TableCell, etc.)
- ✅ @mui/x-data-grid (GridRowId, GridRowModel)
- ✅ @tanstack/react-table
- ✅ @alabuga/uikit (уже в библиотеке)

#### 3. **Зависимости проекта (требуют рефакторинга)**
- ⚠️ `src/shared/entities/Sorting` - MobX State Tree модель
- ⚠️ `src/shared/UIKIT/Filter/TableFilter` - компонент фильтрации
- ⚠️ `src/shared/entities/BaseStore` - базовый стор
- ⚠️ `src/shared/hooks/useColumnSettings` - хук настроек колонок
- ⚠️ `src/shared/hooks/useContextMenu` - хук контекстного меню
- ⚠️ `src/shared/utils/measureText` - утилита измерения текста
- ⚠️ `src/shared/helpers/order` - orderStatusEnum
- ⚠️ `src/assets/icons` - иконки проекта

#### 4. **Внутренние компоненты**
- ⚠️ `EditableRow` - редактируемая строка
- ⚠️ `SortingIcon` - иконка сортировки
- ⚠️ `ColumnManagementModal` - модалка управления колонками
- ⚠️ Стили через JSS

## 🏗️ Архитектурный план миграции

### Этап 1: Подготовка инфраструктуры ✅
- [x] Создать структуру папок в ui-kit
- [x] Проанализировать зависимости
- [ ] Создать типы и интерфейсы

### Этап 2: Вынос утилит и хелперов
- [ ] Создать `measureText` утилиту
- [ ] Создать хуки `useContextMenu`
- [ ] Создать хук `useColumnSettings` с абстракцией storage

### Этап 3: Вынос UI компонентов
- [ ] Мигрировать `SortingIcon`
- [ ] Мигрировать `ColumnManagementModal`
- [ ] Мигрировать `EditableRow`
- [ ] Перенести стили на emotion/styled

### Этап 4: Создание базового TableUI
- [ ] Создать базовый интерфейс таблицы без MobX зависимостей
- [ ] Реализовать рендеринг заголовков
- [ ] Реализовать рендеринг строк
- [ ] Реализовать resizing колонок

### Этап 5: Абстракция от MobX
- [ ] Создать интерфейс ISorting (абстракция от Sorting MobX модели)
- [ ] Создать интерфейс ITableStore (абстракция от BaseStore)
- [ ] Использовать пропсы вместо прямых зависимостей

### Этап 6: Продвинутые фичи
- [ ] Система фильтрации
- [ ] Контекстные меню
- [ ] Режимы редактирования
- [ ] Раскрывающиеся строки
- [ ] Пагинация

### Этап 7: Интеграция
- [ ] Адаптеры для обратной совместимости
- [ ] Миграция TableWithDrawer
- [ ] Миграция других надстроек
- [ ] Документация и примеры

## 🎨 Принципы проектирования

### 1. **Инверсия зависимостей (SOLID)**
Вместо:
```typescript
sorting: Sorting // MobX модель
```

Используем:
```typescript
sorting: {
  column: string;
  direction: 'asc' | 'desc' | 'none';
  onSortChange: (column: string) => void;
}
```

### 2. **Композиция над наследованием**
```typescript
<TableUI>
  <TableUI.Header />
  <TableUI.Body />
  <TableUI.Footer />
</TableUI>
```

### 3. **Контролируемые/неконтролируемые компоненты**
```typescript
// Контролируемый
<TableUI columnOrder={order} onColumnOrderChange={setOrder} />

// Неконтролируемый
<TableUI defaultColumnOrder={order} />
```

### 4. **Абстракция через интерфейсы**
```typescript
interface ITableStore<T> {
  data: T[];
  isLoading: boolean;
  pagination?: IPagination;
  fetch?: (params: unknown) => void;
}
```

## 📦 Структура файлов

```
ui-kit/src/components/TableUI/
├── README.md                    # Этот файл
├── MIGRATION_PLAN.md           # Детальный план миграции
├── DEPENDENCIES_ANALYSIS.md    # Анализ зависимостей
├── index.ts                    # Экспорты
├── TableUI.tsx                 # Главный компонент
├── TableUI.types.ts            # Типы и интерфейсы
├── TableUI.styles.ts           # Стили
├── hooks/
│   ├── useTableInstance.ts     # Хук создания инстанса таблицы
│   ├── useColumnResize.ts      # Хук для resizing
│   ├── useColumnWidth.ts       # Хук расчета ширины
│   ├── useContextMenu.ts       # Хук контекстного меню
│   └── useColumnSettings.ts    # Хук настроек колонок
├── components/
│   ├── TableHeader/
│   │   ├── TableHeader.tsx
│   │   └── TableHeaderCell.tsx
│   ├── TableBody/
│   │   ├── TableBody.tsx
│   │   ├── TableRow.tsx
│   │   └── TableCell.tsx
│   ├── EditableRow/
│   │   └── EditableRow.tsx
│   ├── SortingIcon/
│   │   └── SortingIcon.tsx
│   ├── ColumnManagement/
│   │   └── ColumnManagementModal.tsx
│   └── ExpandButton/
│       └── ExpandButton.tsx
├── utils/
│   ├── measureText.ts
│   ├── columnWidth.ts
│   └── helpers.ts
└── constants/
    └── constants.ts
```

## 🚀 Следующие шаги

1. **Создать файл DEPENDENCIES_ANALYSIS.md** - детальный анализ каждой зависимости
2. **Создать файл MIGRATION_PLAN.md** - пошаговый план с чеклистами
3. **Создать базовые типы** в TableUI.types.ts
4. **Начать с малого** - вынести утилиты и простые компоненты
5. **Итеративная разработка** - постепенное наполнение функционалом

## 📝 Заметки

- Компонент очень сложный, разбиваем на маленькие части
- Сохраняем обратную совместимость через адаптеры
- Используем TypeScript strict mode
- Покрываем тестами критичные части
- Документируем каждый публичный API
