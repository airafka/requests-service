import type { Meta, StoryObj } from "@storybook/react";
import { useState, useEffect } from "react";

import { PickerPositions } from "@/types";

import TimePicker from "./TimePicker";

const meta: Meta<typeof TimePicker> = {
  title: "UIKIT/TimePicker",
  component: TimePicker,
  argTypes: {
    value: {
      description: "Выбранное время (строка в формате HH:MM или объект Date)",
      control: { type: "text" },
      table: {
        type: { summary: "string | Date | null" },
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
    label: {
      description: "Текст лейбла над полем ввода времени",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    hintText: {
      description:
        "Подсказка под полем ввода времени (для ошибок или дополнительной информации)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**TimePicker** — компонент выбора времени с единообразным интерфейсом. Основан на Material-UI TimePicker с кастомными стилями и дополнительной функциональностью.

Компонент предоставляет интуитивный интерфейс для выбора времени в 24-часовом формате с поддержкой различных состояний и позиционирования.

## Позиции выпадающего пикера

| Позиция | Описание | Применение |
|---------|----------|------------|
| BOTTOM_START | Снизу слева | Стандартная позиция, по умолчанию |
| BOTTOM_END | Снизу справа | Когда есть ограничения слева |
| TOP_START | Сверху слева | Когда снизу недостаточно места |
| TOP_END | Сверху справа | Альтернативная позиция сверху |

## Формат времени

Компонент использует **24-часовой формат** (HH:MM):
- **00:00** - полночь
- **12:00** - полдень  
- **23:59** - конец дня

## Пропсы

| Пропс         | Тип                             | Описание | По умолчанию |
|---------------|---------------------------------|----------|--------------|
| \`value\`     | \`string | Date | null\`.       | Выбранное время | \`null\` |
| \`onChange\`  | \`(time: Date | null) => void\` | Обработчик изменения времени | \`undefined\` |
| \`disabled\`  | \`boolean\`                     | Отключен ли компонент | \`false\` |
| \`error\`     | \`boolean\`                     | Отображается ли ошибка | \`false\` |
| \`fullWidth\` | \`boolean\`                     | Занимает ли всю ширину | \`false\` |
| \`position\`  | \`PickerPositions\`             | Позиция выпадающего пикера | \`PickerPositions.BOTTOM_START\` |
| \`label\`     | \`string\`                      | Текст лейбла над полем ввода. |
| \`hintText\`  | \`string\`                      | Подсказка под полем ввода (для ошибок или дополнительной информации). |

## Примеры использования

### Базовый выбор времени
\`\`\`tsx
<TimePicker 
  value={null}
  onChange={(time) => console.log('Выбрано время:', time)}
/>
\`\`\`
## Особенности

### 🔒 **Только для чтения**
Поле ввода недоступно для прямого редактирования - время выбирается только через пикер.

### 🎯 **Кнопка "Сейчас"**
В футере пикера есть кнопка для быстрого выбора текущего времени.

### 🌍 **Русская локализация**
Компонент использует русскую локализацию для отображения времени.

### 🎨 **Кастомные стили**
Уникальный дизайн с кастомными иконками и стилизацией.

## Рекомендации по использованию

1. **Позиции** - BOTTOM_START подходит для большинства ситуаций
2. **Валидация** - проверяйте выбранное время на стороне формы
3. **Доступность** - используйте Large размер для лучшей доступности

## Интеграция с формами

TimePicker легко интегрируется с формами:

\`\`\`tsx
const [selectedTime, setSelectedTime] = useState<Date | null>(null);

<TimePicker 
  value={selectedTime}
  onChange={setSelectedTime}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

export const Default: Story = {
  args: {
    value: "09:00",
    disabled: false,
    error: false,
    fullWidth: false,
    position: PickerPositions.BOTTOM_START,
    label: "Время",
    hintText: "Введите время",
  },
  render: (args) => {
    const [timeValue, setTimeValue] = useState<Date | null>(() => {
      if (typeof args.value === "string") {
        const [hours, minutes] = args.value.split(":");
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
      }
      return null;
    });

    useEffect(() => {
      if (typeof args.value === "string") {
        const [hours, minutes] = args.value.split(":");
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        date.setSeconds(0);
        date.setMilliseconds(0);
        setTimeValue(date);
      } else {
        setTimeValue(null);
      }
    }, [args.value]);

    const handleTimeChange = (time: Date | null) => {
      setTimeValue(time);
    };

    const formatTimeForDisplay = (date: Date | null) => {
      if (!date) {
        return "не выбрано";
      }
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
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
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Контейнер для демонстрации</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          {args.fullWidth ? "fullWidth: true" : "fullWidth: false"} | Позиция:{" "}
          {getPositionVisual(args.position)}{" "}
          {getPositionDescription(args.position)} | Время:{" "}
          {formatTimeForDisplay(timeValue)} | Отключен:{" "}
          {args.disabled ? "Да" : "Нет"}
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Нажмите на поле времени, чтобы увидеть, как работает
          позиционирование пикера
        </div>
        <TimePicker
          key={timeValue ? timeValue.getTime() : "null"}
          value={timeValue}
          disabled={args.disabled}
          error={args.error}
          fullWidth={args.fullWidth}
          position={args.position}
          label={args.label}
          hintText={args.hintText}
          onChange={handleTimeChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## Стандартный TimePicker с базовыми настройками",
      },
    },
  },
};

export const WithCustomOpener: Story = {
  args: {
    position: PickerPositions.BOTTOM_START,
    customOpener: ({ isOpen, setAnchorRef, onClick }) => (
      <button ref={setAnchorRef} onClick={onClick}>
        Произвольный открывающий элемент{isOpen && " (открыт)"}
      </button>
    ),
  },
  render: (args) => {
    const [timeValue, setTimeValue] = useState<Date | null>(() => {
      if (typeof args.value === "string") {
        const [hours, minutes] = args.value.split(":");
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
      }
      return null;
    });

    useEffect(() => {
      if (typeof args.value === "string") {
        const [hours, minutes] = args.value.split(":");
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        date.setSeconds(0);
        date.setMilliseconds(0);
        setTimeValue(date);
      } else {
        setTimeValue(null);
      }
    }, [args.value]);

    const handleTimeChange = (time: Date | null) => {
      setTimeValue(time);
    };

    const formatTimeForDisplay = (date: Date | null) => {
      if (!date) {
        return "не выбрано";
      }
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
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
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Контейнер для демонстрации</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          Время: {formatTimeForDisplay(timeValue)}
        </div>

        <TimePicker
          {...args}
          key={timeValue ? timeValue.getTime() : "null"}
          value={timeValue}
          onChange={handleTimeChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## TimePicker с произвольным открывающим элементом",
      },
    },
  },
};
