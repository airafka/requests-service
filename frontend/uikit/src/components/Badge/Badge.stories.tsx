import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "./Badge";
import { colorBadge } from "./types";

const meta: Meta<typeof Badge> = {
  title: "UIKIT/Badge",
  component: Badge,
  args: {
    text: "Badge",
    type: "default",
    color: colorBadge.gray,
    hasDot: false,
    hasHint: false,
  },
  argTypes: {
    type: {
      description: "Тип бейджа: default — обычный, loading — состояние загрузки",
      control: "select",
      options: ["default", "loading"],
      table: {
        type: { summary: "BadgeType" },
        defaultValue: { summary: '"default"' },
      },
    },
    text: {
      description: "Текст бейджа",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
    color: {
      description: "Цвет бейджа",
      control: "select",
      options: ["gray", "purple", "red", "yellow", "green", "blue", "lightGreen", "lightPurple", "lightYellow", "lightRed", "softGreen", "darkGray", "loading"],
      mapping: {
        gray: colorBadge.gray,
        purple: colorBadge.purple,
        red: colorBadge.red,
        yellow: colorBadge.yellow,
        green: colorBadge.green,
        blue: colorBadge.blue,
        lightGreen: colorBadge.lightGreen,
        lightPurple: colorBadge.lightPurple,
        lightYellow: colorBadge.lightYellow,
        lightRed: colorBadge.lightRed,
        softGreen: colorBadge.softGreen,
        darkGray: colorBadge.darkGray,
        loading: colorBadge.loading,
      },
      table: {
        type: { summary: "colorBadge" },
        defaultValue: { summary: "colorBadge.gray" },
      },
    },
    hasDot: {
      description: "Показывать точку перед текстом",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    hasHint: {
      description: "Показывать подсказку при наведении",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      description: "Обработчик клика",
      control: false,
      table: {
        type: { summary: "(index?: number) => void" },
        defaultValue: { summary: "undefined" },
      },
    },
    onDelete: {
      description: "Обработчик удаления",
      control: false,
      table: {
        type: { summary: "(index?: number) => void" },
        defaultValue: { summary: "undefined" },
      },
    },
    index: {
      description: "Индекс элемента",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "undefined" },
      },
    },
    customClassName: {
      description: "Дополнительный CSS класс",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "undefined" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**Badge** — компонент для отображения меток, тегов и статусов. Предоставляет единообразный способ показа коротких текстовых меток с различными цветами, размерами и дополнительными элементами.

Компонент основан на Material-UI Chip и поддерживает все его возможности с дополнительными кастомизациями.

## Цвета бейджей

| Цвет | Применение | CSS переменные |
|------|------------|----------------|
| Gray | По умолчанию, нейтральные метки | \`--badge-bg\`, \`--badge-color\` |
| Purple | Специальные метки | \`--badge-bg\`, \`--badge-color\` |
| Red | Ошибки, предупреждения, удаление | \`--badge-bg\`, \`--badge-color\` |
| Yellow | Внимание, ожидание, процесс | \`--badge-bg\`, \`--badge-color\` |
| Green | Успех, завершение, активность | \`--badge-bg\`, \`--badge-color\` |
| Blue | Информация, ссылки, действия | \`--badge-bg\`, \`--badge-color\` |
| LightGreen | Светло-зеленый вариант | \`--badge-bg\`, \`--badge-color\` |
| LightPurple | Светло-фиолетовый вариант | \`--badge-bg\`, \`--badge-color\` |
| LightYellow | Светло-желтый вариант | \`--badge-bg\`, \`--badge-color\` |
| LightRed | Светло-красный вариант | \`--badge-bg\`, \`--badge-color\` |
| SoftGreen | Мягкий зеленый вариант | \`--badge-bg\`, \`--badge-color\` |
| DarkGray | Темно-серый вариант | \`--badge-bg\`, \`--badge-color\` |

## Пропсы

| Пропс | Тип | Описание | По умолчанию |
|-------|-----|----------|--------------|
| \`type\` | \`default\ | loading\` | Тип бейджа: default — обычный, loading — состояние загрузки | \`default\` |
| \`text\` | \`string\` | Текст бейджа | \`undefined\` |
| \`color\` | \`colorBadge\` | Цвет бейджа | \`colorBadge.gray\` |
| \`hasDot\` | \`boolean\` | Показывать точку | \`false\` |
| \`hasHint\` | \`boolean\` | Показывать подсказку | \`false\` |
| \`onClick\` | \`(index?: number) => void\` | Обработчик клика | \`undefined\` |
| \`onDelete\` | \`(index?: number) => void\` | Обработчик удаления | \`undefined\` |
| \`index\` | \`number\` | Индекс элемента | \`undefined\` |
| \`customClassName\` | \`string\` | Дополнительный CSS класс | \`undefined\` |

## Примеры использования

### Базовое использование
\`\`\`tsx
<Badge text="Новый" color={colorBadge.green} />
\`\`\`
## Особенности

### 🎨 **CSS переменные**
Компонент использует CSS переменные для динамического изменения цветов:
- \`--badge-bg\` - фон бейджа
- \`--badge-color\` - цвет текста
- \`--dot-color\` - цвет точки
- \`--badge-height\` - высота бейджа

**Примечание:** Размер шрифта всегда равен 12px.

### 🔄 **Интерактивность**
- Поддержка кликов с передачей индекса
- Возможность удаления с иконкой X
- Интеграция с ITooltype для подсказок

### 📱 **Адаптивность**
- Автоматическая ширина по контенту
- Поддержка длинного текста с многоточием
- Responsive дизайн

### 🎯 **Доступность**
- Поддержка ARIA атрибутов от Material-UI
- Фокус на клавиатуре
- Подсказки для скринридеров

## Рекомендации по использованию

1. **Цвета** - используйте цвета в соответствии с семантикой
2. **Текст** - короткий и понятный, максимум 2-3 слова
3. **Интерактивность** - добавляйте onClick для фильтров, onDelete для тегов
4. **Подсказки** - используйте hasHint для дополнительной информации
                `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    text: "Badge",
    color: colorBadge.gray,
    hasDot: false,
    hasHint: false,
  },
  render: (args) => {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

    const handleClick = (index?: number) => {
      setClickedIndex(index || 0);
      console.log("Badge clicked:", index);
    };

    const handleDelete = (index?: number) => {
      setDeletedIndex(index || 0);
      console.log("Badge deleted:", index);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Контейнер для демонстрации Badge</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          Цвет: {Object.keys(colorBadge)[args.color || 0]} | Тип: {args.type}
        </div>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 {args.hasDot ? "С точкой" : "Без точки"} |{" "}
          {args.hasHint ? "С подсказкой" : "Без подсказки"}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Badge
            {...args}
            onClick={handleClick}
            onDelete={handleDelete}
            index={0}
          />
        </div>
        <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
          {clickedIndex !== null && (
            <div style={{ marginBottom: "8px" }}>
              🖱️ Кликнут бейдж с индексом: {clickedIndex}
            </div>
          )}
          {deletedIndex !== null && (
            <div style={{ marginBottom: "8px" }}>
              🗑️ Удален бейдж с индексом: {deletedIndex}
            </div>
          )}
          <div>Контейнер для демонстрации Badge</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## Badge",
      },
    },
  },
};

export const WithMaxWidth: Story = {
  args: {
    text: "BadgeBadgeBadgeBadgeBadgeBadgeBadgeBadge",
    color: colorBadge.gray,
    hasDot: false,
    hasHint: false,
    maxWidth: 140,
  },
  render: (args) => {
    const [clickedIndex, setClickedIndex] = useState<number | null>(null);
    const [deletedIndex, setDeletedIndex] = useState<number | null>(null);

    const handleClick = (index?: number) => {
      setClickedIndex(index || 0);
      console.log("Badge clicked:", index);
    };

    const handleDelete = (index?: number) => {
      setDeletedIndex(index || 0);
      console.log("Badge deleted:", index);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Badge с ограниченной шириной</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          Цвет: {Object.keys(colorBadge)[args.color || 0]} | Тип: {args.type}
        </div>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 {args.hasDot ? "С точкой" : "Без точки"} |{" "}
          {args.hasHint ? "С подсказкой" : "Без подсказки"}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Badge
            {...args}
            onClick={handleClick}
            onDelete={handleDelete}
            index={0}
          />
        </div>
        <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
          {clickedIndex !== null && (
            <div style={{ marginBottom: "8px" }}>
              🖱️ Кликнут бейдж с индексом: {clickedIndex}
            </div>
          )}
          {deletedIndex !== null && (
            <div style={{ marginBottom: "8px" }}>
              🗑️ Удален бейдж с индексом: {deletedIndex}
            </div>
          )}
          <div>Контейнер для демонстрации Badge</div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## Badge с ограниченной шириной",
      },
    },
  },
};
