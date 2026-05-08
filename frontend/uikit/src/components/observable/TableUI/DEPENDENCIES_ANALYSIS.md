# Детальный анализ зависимостей TSBaseTableUI

## 🔍 Категории зависимостей

### 1️⃣ БЕЗОПАСНЫЕ ЗАВИСИМОСТИ (уже есть в ui-kit)
Эти зависимости уже присутствуют в @alabuga/uikit и могут использоваться напрямую.

#### React & Hooks
```typescript
import { Fragment, ElementRef, MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from "react";
```
✅ **Статус:** Готово к использованию  
📝 **Действие:** Копируем импорты как есть

#### MobX
```typescript
import { observer } from "mobx-react";
import { toJS } from "mobx";
```
✅ **Статус:** Готово (peerDependencies)  
📝 **Действие:** Используем, но делаем опциональным через generic типы

#### Material-UI
```typescript
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from "@mui/material";
```
✅ **Статус:** Готово (peerDependencies)  
📝 **Действие:** Прямое использование

#### MUI X DataGrid
```typescript
import { GridRowId, GridRowModel } from "@mui/x-data-grid";
```
✅ **Статус:** Готово (peerDependencies)  
📝 **Действие:** Используем для типов совместимости

#### TanStack Table
```typescript
import { Cell, Column, flexRender, Row, Table as TableType } from "@tanstack/react-table";
```
✅ **Статус:** Готово (peerDependencies)  
📝 **Действие:** Основа компонента

#### React Hook Form
```typescript
import { FieldErrors, FieldValues } from "react-hook-form";
```
✅ **Статус:** Готово (peerDependencies)  
📝 **Действие:** Для EditableRow

#### classnames
```typescript
import classnames from "classnames";
```
✅ **Статус:** Готово (peerDependencies)  
📝 **Действие:** Прямое использование

---

### 2️⃣ КОМПОНЕНТЫ ИЗ @alabuga/uikit (уже доступны)
```typescript
import { ContextMenu, ContextMenuItems, useContextMenu, ITooltype, Chevron, ChevronDirection, OverflowText } from "@alabuga/uikit";
```
✅ **Статус:** Готово  
📝 **Действие:** Внутренние импорты

---

### 3️⃣ ЗАВИСИМОСТИ ТРЕБУЮЩИЕ РЕФАКТОРИНГА

#### 🔴 Sorting (MobX State Tree модель)
```typescript
import { Sorting } from "src/shared/entities/Sorting";
```

**Текущая структура:**
```typescript
// MobX State Tree модель
const Sorting = types.model("Sorting", {
  sorting: types.model({
    sortingColumn: types.string,
    sortingDirection: types.enumeration(["ASC", "DESC", "NONE"])
  })
}).actions((self) => ({
  setNextSorting({ field, baseSortingField, fetchParams, isReverse }) { ... },
  toggleSorting(field, baseSortingField) { ... }
}))
```

**Проблема:** Жёсткая зависимость от MobX State Tree

**Решение:** Создать абстрактный интерфейс
```typescript
// ui-kit/src/components/TableUI/TableUI.types.ts
export interface ISortingState {
  sortingColumn: string;
  sortingDirection: 'ASC' | 'DESC' | 'NONE';
}

export interface ISorting {
  sorting: ISortingState;
  setNextSorting: (params: {
    field: string;
    baseSortingField?: string;
    fetchParams?: Record<string, unknown>;
    isReverse?: boolean;
  }) => void;
}

// В проекте можно создать адаптер
class SortingAdapter implements ISorting {
  constructor(private mobxSorting: Sorting) {}
  
  get sorting() {
    return {
      sortingColumn: this.mobxSorting.sorting.sortingColumn,
      sortingDirection: this.mobxSorting.sorting.sortingDirection
    };
  }
  
  setNextSorting(params) {
    this.mobxSorting.setNextSorting(params);
  }
}
```

---

#### 🔴 useColumnSettings
```typescript
import { useColumnSettings } from "src/shared/hooks/useColumnSettings";
```

**Текущая реализация:**
```typescript
export const useColumnSettings = ({ tableId, defaultColumnIds, showColumnManagement }) => {
  // Использует UserSettingsService для сохранения на бэкенд
  const settingKey = buildSettingKey(tableId);
  const dto = await getUserSetting(settingKey);
  await setUserSetting(settingKey, payload);
  
  return { columnOrder, setColumnOrder, visibility, setVisibility, reset, isLoaded };
}
```

**Проблема:** Привязан к конкретной реализации API

**Решение:** Абстракция storage
```typescript
// ui-kit/src/components/TableUI/hooks/useColumnSettings.ts
export interface IColumnSettingsStorage {
  get(key: string): Promise<{ order: string[]; visibility: Record<string, boolean> }>;
  set(key: string, value: { order: string[]; visibility: Record<string, boolean> }): Promise<void>;
}

// Встроенная реализация через localStorage
class LocalStorageAdapter implements IColumnSettingsStorage {
  async get(key: string) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
  
  async set(key: string, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export const useColumnSettings = ({
  tableId,
  defaultColumnIds,
  storage = new LocalStorageAdapter() // по умолчанию localStorage
}: {
  tableId: string;
  defaultColumnIds: string[];
  storage?: IColumnSettingsStorage;
}) => {
  // Логика без привязки к конкретному API
}

// В проекте создаём адаптер для бэкенда
class BackendStorageAdapter implements IColumnSettingsStorage {
  async get(key: string) {
    const dto = await getUserSetting(key);
    return dto.value;
  }
  
  async set(key: string, value) {
    await setUserSetting(key, value);
  }
}
```

---

#### 🔴 useContextMenu
```typescript
import { useContextMenu } from "@alabuga/uikit";
```

✅ **Статус:** УЖЕ ЕСТЬ в @alabuga/uikit!  
📝 **Действие:** Проверить совместимость и использовать

---

#### 🔴 measureText
```typescript
import { measureText } from "src/shared/utils/measureText";
```

**Текущая реализация (предполагаемая):**
```typescript
export const measureText = (text: string, font?: string): number => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    context.font = font || '14px Arial';
    return context.measureText(text).width;
  }
  return 0;
};
```

**Решение:** Вынести в утилиты
```typescript
// ui-kit/src/components/TableUI/utils/measureText.ts
export const measureText = (text: string, font?: string): number => {
  // Копируем реализацию
}
```

---

#### 🔴 orderStatusEnum
```typescript
import { orderStatusEnum } from "src/shared/helpers/order";
```

**Проблема:** Доменная логика проекта (статусы заказов)

**Решение:** Сделать конфигурируемым
```typescript
// ui-kit/src/components/TableUI/TableUI.types.ts
export interface ITableCellConfig {
  /**
   * Список значений, которые считаются "статусами" и не оборачиваются в OverflowText
   */
  statusValues?: string[];
  /**
   * Кастомная функция проверки, является ли значение статусом
   */
  isStatusValue?: (value: unknown) => boolean;
}

// В компоненте
const isStatusText = useMemo(() => {
  if (cellConfig?.isStatusValue) {
    return cellConfig.isStatusValue(cellRender);
  }
  
  if (cellConfig?.statusValues && typeof cellRender === "string") {
    return cellConfig.statusValues.includes(cellRender);
  }
  
  return typeof cellRender === "boolean";
}, [cell, cellConfig]);
```

---

#### 🟡 TableFilter
```typescript
import { TableFilter, TableFilterProps } from "src/shared/UIKIT/Filter/TableFilter";
```

**Проблема:** Компонент фильтрации привязан к BaseStore

**Решение:** Поэтапная миграция
1. **Этап 1:** Сделать TableFilter опциональным пропсом
2. **Этап 2:** Вынести TableFilter в ui-kit отдельно
3. **Этап 3:** Создать абстрактный интерфейс для фильтрации

```typescript
// Временное решение - делаем опциональным
export interface ITableUIProps<T> {
  filter?: React.ReactElement; // Любой компонент фильтрации
  // или
  filterComponent?: React.ComponentType<{ onFilterChange: (data: unknown) => void }>;
}
```

---

#### 🔴 Иконки проекта
```typescript
import { EditToggle, Ellipsis, WarningIcon } from "src/assets/icons";
```

**Решение:** Сделать конфигурируемыми через пропсы
```typescript
export interface ITableUIIcons {
  editToggle?: React.ReactElement;
  contextMenu?: React.ReactElement;
  warning?: React.ReactElement;
  sortAsc?: React.ReactElement;
  sortDesc?: React.ReactElement;
}

// Дефолтные иконки из @mui/icons-material
import { MoreVert, Warning, Settings } from "@mui/icons-material";

const defaultIcons: ITableUIIcons = {
  editToggle: <Settings />,
  contextMenu: <MoreVert />,
  warning: <Warning />
};
```

---

#### 🟡 Стили (JSS)
```typescript
import useStyles from "./styles";
import { createUseStyles } from "@alabuga/uikit";
```

**Проблема:** JSS vs Emotion (MUI v6 использует Emotion)

**Решение:** Миграция на @emotion/styled
```typescript
// ui-kit/src/components/TableUI/TableUI.styles.ts
import { styled } from '@mui/material/styles';

export const StyledTableContainer = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));

export const StyledTableWrapper = styled('div')(({ theme }) => ({
  color: theme.colors.black.black20,
  position: 'relative',
  overflow: 'hidden',
  // ...
}));
```

---

#### 🔴 EditableRow
```typescript
import { EditableRow, SubmitHandle } from "./UI/EditableRow";
```

**Зависимости EditableRow:**
- react-hook-form
- FieldItemType (доменная логика)
- Стили

**Решение:** Вынести в компоненты с абстракцией
```typescript
// ui-kit/src/components/TableUI/components/EditableRow/EditableRow.tsx
export interface IEditableCell<T> {
  fieldType?: string;
  defaultValue?: unknown;
  component: (props: {
    row: { getValue: (key: string) => unknown; setValue: (key: string, value: unknown) => void };
    register: UseFormRegister<T>;
    control: Control<T>;
    error?: FieldError;
  }) => React.ReactElement;
}

export interface IEditableColumnDef<T> {
  id: string;
  editableCell?: IEditableCell<T> | ((original: T) => IEditableCell<T>);
}
```

---

#### 🔴 SortingIcon
```typescript
import { SortingIcon } from "./UI/SortingIcon";
import { SortAscIcon, SortDescIcon } from "src/assets/svg";
```

**Решение:** Вынести с конфигурируемыми иконками
```typescript
// ui-kit/src/components/TableUI/components/SortingIcon/SortingIcon.tsx
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export interface ISortingIconProps {
  columnId: string;
  sorting: ISorting;
  icons?: {
    asc?: React.ReactElement;
    desc?: React.ReactElement;
  };
}

export const SortingIcon = ({ columnId, sorting, icons }: ISortingIconProps) => {
  const defaultIcons = {
    asc: <ArrowUpwardIcon />,
    desc: <ArrowDownwardIcon />
  };
  
  const activeIcons = { ...defaultIcons, ...icons };
  // ...
}
```

---

#### 🔴 ColumnManagementModal
```typescript
import { ColumnManagementModal } from "./UI/ColumnManagementModal";
```

**Зависимости:**
- @dnd-kit/core, @dnd-kit/sortable (drag-and-drop)
- @alabuga/uikit (CheckBox, BaseButton, ContextMenu)
- i18next (локализация)

**Решение:** Вынести с сохранением зависимостей
```typescript
// ui-kit/src/components/TableUI/components/ColumnManagement/ColumnManagementModal.tsx
// @dnd-kit уже есть в проекте, можно использовать
// Для локализации - передавать тексты через пропсы

export interface IColumnManagementTexts {
  reset?: string;
  dragHandle?: string;
  [key: string]: string | undefined;
}

export const ColumnManagementModal = <T,>({
  texts = {
    reset: 'Reset',
    dragHandle: '⋮⋮'
  },
  // ...
}: IColumnManagmentProps<T>) => {
  // ...
}
```

---

## 📊 Итоговая таблица миграции

| Зависимость | Статус | Приоритет | Сложность | Решение |
|-------------|--------|-----------|-----------|---------|
| React hooks | ✅ Готово | - | - | Прямое использование |
| MobX | ⚠️ Требует абстракции | Высокий | Средняя | Интерфейс ISorting |
| Material-UI | ✅ Готово | - | - | Прямое использование |
| TanStack Table | ✅ Готово | - | - | Основа компонента |
| Sorting | 🔴 Рефакторинг | Критичный | Средняя | Интерфейс + адаптер |
| useColumnSettings | 🔴 Рефакторинг | Высокий | Высокая | Абстракция storage |
| measureText | 🟡 Перенос | Средний | Низкая | Копировать в utils |
| orderStatusEnum | 🟡 Конфигурация | Низкий | Низкая | Конфигурируемый проп |
| TableFilter | 🟠 Опционально | Средний | Высокая | Отдельная миграция |
| Иконки | 🟡 Конфигурация | Средний | Низкая | Пропсы + дефолты |
| Стили JSS | 🔴 Миграция | Высокий | Средняя | Emotion styled |
| EditableRow | 🟡 Перенос | Средний | Средняя | Вынести с абстракцией |
| SortingIcon | 🟢 Простой | Низкий | Низкая | Прямой перенос |
| ColumnManagement | 🟡 Перенос | Средний | Средняя | Перенос + i18n |

## 🎯 План действий по приоритетам

### Фаза 1: Утилиты (1-2 дня)
1. Создать `utils/measureText.ts`
2. Создать базовые типы в `TableUI.types.ts`
3. Создать константы в `constants/constants.ts`

### Фаза 2: Абстракции (2-3 дня)
1. Создать интерфейс `ISorting`
2. Создать интерфейс `IColumnSettingsStorage`
3. Создать `hooks/useColumnSettings.ts` с абстракцией
4. Тесты для хуков

### Фаза 3: Простые компоненты (2-3 дня)
1. Мигрировать `SortingIcon`
2. Мигрировать `ExpandButton`
3. Создать конфигурацию иконок
4. Миграция стилей на Emotion

### Фаза 4: Сложные компоненты (3-5 дней)
1. Мигрировать `EditableRow` с абстракцией
2. Мигрировать `ColumnManagementModal`
3. Создать `TableHeader`, `TableBody`, `TableCell`

### Фаза 5: Основной компонент (5-7 дней)
1. Создать базовый `TableUI` без продвинутых фич
2. Добавить рендеринг строк и колонок
3. Добавить resizing
4. Добавить сортировку
5. Добавить управление колонками

### Фаза 6: Продвинутые фичи (5-7 дней)
1. Режимы редактирования
2. Раскрывающиеся строки
3. Контекстные меню
4. Интеграция фильтрации

### Фаза 7: Интеграция и тесты (3-5 дней)
1. Создать адаптеры для проекта
2. Миграция TableWithDrawer
3. E2E тесты
4. Документация и storybook

---

## 💡 Рекомендации

1. **Начинать с малого** - утилиты и типы
2. **Итеративная разработка** - каждый этап работает независимо
3. **Тесты** - покрываем критичную логику
4. **Обратная совместимость** - создаём адаптеры для старого кода
5. **Документация** - пишем по ходу разработки

## 🔗 Связанные файлы

- `README.md` - Общий план миграции
- `MIGRATION_PLAN.md` - Детальный чеклист задач (следующий файл)
