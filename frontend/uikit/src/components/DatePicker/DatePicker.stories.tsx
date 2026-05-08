import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { PickerPositions } from "@/types";
import { formatDate } from "@/helpers";
import DatePicker from "./DatePicker";

const meta: Meta<typeof DatePicker> = {
  title: "UIKIT/DatePicker",
  component: DatePicker,
  argTypes: {
    value: {
      description: "Выбранная дата (строка в формате DD.MM.YYYY)",
      control: { type: "text" },
      table: {
        type: { summary: "string | null" },
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      description: "Отключен ли компонент",
      control: "boolean",
    },
    error: {
      description: "Отображается ли ошибка",
      control: "boolean",
    },
    fullWidth: {
      description: "Занимает ли компонент всю ширину",
      control: "boolean",
    },
    position: {
      description: "Позиция выпадающего пикера",
      control: "select",
      options: Object.values(PickerPositions),
    },
    readOnly: {
      table: {
        disable: true,
      },
    },
    label: {
      description: "Текст лейбла над полем ввода даты",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    hintText: {
      description:
        "Подсказка под полем ввода даты (для ошибок или дополнительной информации)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    isTable: {
      description: "Для отображения табличной версии",
      control: "boolean",
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**DatePicker** — компонент выбора даты с единообразным интерфейсом. Основан на Material-UI DatePicker с кастомными стилями и дополнительной функциональностью.

Компонент предоставляет интуитивный интерфейс для выбора даты в формате DD.MM.YYYY с поддержкой различных рсостояний и позиционирования.

## Позиции выпадающего пикера

| Позиция | Описание | Применение |
|---------|----------|------------|
| BOTTOM_END | Снизу справа | По умолчанию |
| BOTTOM_START | Снизу слева | Когда есть ограничения справа |
| TOP_START | Сверху слева | Когда снизу недостаточно места |
| TOP_END | Сверху справа | Альтернативная позиция сверху |

## Формат даты

Компонент использует **формат DD.MM.YYYY**:
- **18.07.2025** - 18 июля 2025 года
- **01.01.2024** - 1 января 2024 года
- **31.12.2023** - 31 декабря 2023 года

## Пропсы

| Пропс         | Тип                 | Описание | По умолчанию |
|---------------|---------------------|----------|--------------|
| \`value\`     | \`string            | null\` | Выбранная дата | \`null\` |
| \`onChange\`  | \`(date: Date       | null) => void\` | Обработчик изменения даты | \`undefined\` |
| \`disabled\`  | \`boolean\`         | Отключен ли компонент | \`false\` |
| \`error\`     | \`boolean\`         | Отображается ли ошибка | \`false\` |
| \`fullWidth\` | \`boolean\`         | Занимает ли всю ширину | \`false\` |
| \`position\`  | \`PickerPositions\` | Позиция выпадающего пикера | \`PickerPositions.BOTTOM_END\` |
| \`label\`     | \`string\`          | Текст лейбла над полем ввода. |
| \`hintText\`  | \`string\`          | Подсказка под полем ввода (для ошибок или дополнительной информации). 
| \`isTable\`  | \`boolean\`          |Переход на табличную вариацию datepicker. По умолчанию — false. | \`false\`|

## Примеры использования

### Базовый выбор даты
\`\`\`tsx
<DatePicker 
  value={null}
  onChange={(date) => console.log('Выбрана дата:', date)}
/>
\`\`\`

### С ошибкой
\`\`\`tsx
<DatePicker 
  value="18.07.2025"
  error={true}
/>
\`\`\`

## Особенности

### 🔒 **Только для чтения**
Поле ввода недоступно для прямого редактирования - дата выбирается только через пикер.

### 🎯 **Кнопки "Сегодня" и "Очистить"**
В футере пикера есть кнопки для быстрого выбора текущей даты и очистки поля.

### 🌍 **Русская локализация**
Компонент использует русскую локализацию для отображения дат и месяцев.

### 🎨 **Кастомные стили**
Уникальный дизайн с кастомными иконками и стилизацией.

### 📅 **Многоуровневый выбор**
Поддерживает выбор года, месяца и дня с удобной навигацией.

## Рекомендации по использованию

1. **Позиции** - BOTTOM_END подходит для большинства ситуаций
2. **Валидация** - проверяйте выбранную дату на стороне формы

## Интеграция с формами

DatePicker легко интегрируется с формами:

\`\`\`tsx
const [selectedDate, setSelectedDate] = useState<Date | null>(null);

<DatePicker 
  value={selectedDate ? format(selectedDate, 'dd.MM.yyyy') : null}
  onChange={setSelectedDate}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    value: "18.07.2025",
    disabled: false,
    error: false,
    fullWidth: false,
    position: PickerPositions.BOTTOM_END,
    label: "Дата",
    hintText: "Введите дату",
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
      setDateValue(date);
    };

    const getPositionDescription = (position: string | undefined) => {
      if (!position) {
        return "не задана";
      }
      switch (position) {
        case "bottom-start":
          return "Снизу слева";
        case "bottom-end":
          return "Снизу справа";
        case "top-start":
          return "Сверху слева";
        case "top-end":
          return "Сверху справа";
        default:
          return position;
      }
    };

    const getPositionVisual = (position: string | undefined) => {
      if (!position) {
        return "❓";
      }
      switch (position) {
        case "bottom-start":
          return "⬇️↙️";
        case "bottom-end":
          return "⬇️↘️";
        case "top-start":
          return "⬆️↖️";
        case "top-end":
          return "⬆️↗️";
        default:
          return "❓";
      }
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Контейнер для демонстрации</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          {args.fullWidth ? "fullWidth: true" : "fullWidth: false"} | Позиция:{" "}
          {getPositionVisual(args.position)}{" "}
          {getPositionDescription(args.position)} |
          {args.disabled ? "Да" : "Нет"} | Ошибка: {args.error ? "Да" : "Нет"}
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Нажмите на поле даты, чтобы увидеть, как работает позиционирование
          пикера
        </div>
        <DatePicker
          value={dateValue ? formatDate(dateValue, "dd.MM.yyyy") : undefined}
          disabled={args.disabled}
          error={args.error}
          fullWidth={args.fullWidth}
          position={args.position}
          label={args.label}
          hintText={args.hintText}
          onChange={handleDateChange}
          isTable={args.isTable}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## Стандартный DatePicker с базовыми настройками",
      },
    },
  },
};

export const WithCustomOpener: Story = {
  args: {
    position: PickerPositions.BOTTOM_END,
    customOpener: ({ isOpen, setAnchorRef, onClick }) => (
      <button ref={setAnchorRef} onClick={onClick}>
        Произвольный открывающий элемент{isOpen && " (открыт)"}
      </button>
    ),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
      setDateValue(date);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Контейнер для демонстрации</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          <p>
            Выбранная дата:{" "}
            {dateValue ? formatDate(dateValue, "dd.MM.yyyy") : "нет"}
          </p>
        </div>

        <DatePicker
          {...args}
          value={dateValue ? formatDate(dateValue, "dd.MM.yyyy") : undefined}
          onChange={handleDateChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## DatePicker с произвольным открывающим элементом",
      },
    },
  },
};
