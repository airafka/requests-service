import type { Meta, StoryObj } from "@storybook/react";
import { DateRangePicker } from "./DateRangePicker";
import { CommonSize, PickerPositions } from "../../types";
import { useState } from "react";

const meta: Meta<typeof DateRangePicker> = {
  title: "UIKIT/DatePicker/DateRangePicker",
  component: DateRangePicker,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
DateRangePicker — компонент для выбора диапазона дат с двумя полями: начальная и конечная дата.

---

## Как работает DateRangePicker в Storybook

**В Storybook компонент DateRangePicker используется напрямую, без интеграции с внешними системами. Все даты передаются в ISO формате (строки).**

### Цепочка действий:
1. Вы объявляете компонент DateRangePicker в файле сторибука (DateRangePicker.stories.tsx).
2. Передаёте пропсы (например, value, onChange, placeholder и т.д.) через args или напрямую в JSX.
3. value — это объект с полями start и end (даты в ISO формате) или undefined.
4. Компонент отображает поле с выбранным диапазоном дат в формате "От - До".
5. При клике открывается попап с двумя DatePicker'ами для выбора начальной и конечной даты.
6. onChange — функция, которая вызывается при изменении диапазона дат.
7. Все остальные пропсы (disabled, error и т.д.) управляются через controls в Storybook.

### Пример использования:

~~~tsx
const [value, setValue] = useState({
  start: "2024-01-01T00:00:00.000Z",
  end: "2024-01-31T00:00:00.000Z"
});

<DateRangePicker
  value={value}
  onChange={setValue}
  placeholder="Период"
  disabled={false}
  error={false}
/>
~~~

---

## Пропсы

| Пропс              | Тип                              | Описание                                                                                   | По умолчанию |
|--------------------|----------------------------------|--------------------------------------------------------------------------------------------|--------------|
| **value**          | объект с start/end или undefined | Текущий диапазон дат. Объект с полями start и end (даты в ISO формате) или undefined.     | undefined    |
| **onChange**       | (value) => void                  | Колбэк, вызывается при изменении диапазона дат. В аргументе — новый диапазон или undefined. | —            |
| **placeholder**    | строка                           | Текст-плейсхолдер, отображаемый перед диапазоном дат.                                     | —            |
| **disabled**       | boolean                          | Отключает компонент (делает его неактивным). По умолчанию — false.                        | false        |
| **error**          | boolean                          | Включает ошибочное состояние (красная подсветка). По умолчанию — false.                   | false        |
| **fullWidth**      | boolean                          | Растягивает компонент на всю ширину контейнера. По умолчанию — false.                     | false        |
| **position**       | PickerPositions                  | Позиция выпадающего попапа с датапикерами.                                                | BOTTOM_START  |
| **label**     | string          | Текст лейбла над полем ввода. |
| **hintText**  | string          | Подсказка под полем ввода (для ошибок или дополнительной информации). |

---

### Возможные значения position:
- **BOTTOM_START** — снизу слева (по умолчанию)
- **BOTTOM_END** — снизу справа
- **TOP_START** — сверху слева
- **TOP_END** — сверху справа

### Пример value:
\`\`\`json
{
  "start": "2024-01-01T00:00:00.000Z",
  "end": "2024-01-31T00:00:00.000Z"
}
\`\`\`

---
        `,
      },
    },
  },
  argTypes: {
    value: {
      control: false,
      table: { type: { summary: "{start: string, end: string} | null" } },
    },
    onChange: { action: "change" },
    placeholder: {
      description: "Плейсхолдер",
      control: "text",
      table: { type: { summary: "string" } },
    },
    disabled: {
      description: "Отключить компонент",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      description: "Ошибка",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    fullWidth: {
      description: "Растянуть на всю ширину",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    readOnly: {
      table: { disable: true },
    },
    position: {
      description: "Позиция попапа",
      control: "select",
      options: Object.values(PickerPositions),
      table: {
        type: { summary: "PickerPositions" },
        defaultValue: { summary: PickerPositions.BOTTOM_START },
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
  },
  args: {
    value: {
      start: "2024-01-01T00:00:00.000Z",
      end: "2024-01-31T00:00:00.000Z",
    },
    placeholder: "Период",
    disabled: false,
    error: false,
    fullWidth: false,
    readOnly: false,
    position: PickerPositions.BOTTOM_START,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

function toISO(date: string | Date | null | undefined): string | null {
  if (!date) {
    return null;
  }
  if (typeof date === "string") {
    if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
      const [day, month, year] = date.split(".");
      const d = new Date(Number(year), Number(month) - 1, Number(day));
      return d.toISOString();
    }
    return new Date(date).toISOString();
  }
  if (date instanceof Date) {
    return date.toISOString();
  }
  return null;
}

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState({
      start: args.value?.start ?? null,
      end: args.value?.end ?? null,
    });

    const valueForComponent = {
      start: value.start || "",
      end: value.end || "",
    };

    return (
      <div
        style={{
          padding: "32px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
          <strong>DateRangePicker</strong> — выбор диапазона дат
        </div>
        <div style={{ width: "100%" }}>
          <DateRangePicker
            {...args}
            value={valueForComponent}
            onChange={(val) => {
              setValue({
                start: val?.start ? toISO(val.start) : null,
                end: val?.end ? toISO(val.end) : null,
              });
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "#999",
          }}
        ></div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте placeholder, disabled, error, position через controls справа. value управляется только внутри истории. Крестик очищает соответствующее поле (null).",
      },
    },
  },
};

export const WithCustomOpener: Story = {
  render: (args) => {
    const [value, setValue] = useState({
      start: args.value?.start ?? null,
      end: args.value?.end ?? null,
    });

    const valueForComponent = {
      start: value.start || "",
      end: value.end || "",
    };

    return (
      <div
        style={{
          padding: "32px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
          <strong>DateRangePicker</strong> с произвольным открывающим элементом
        </div>
        <div style={{ width: "100%" }}>
          <DateRangePicker
            {...args}
            value={valueForComponent}
            onChange={(val) => {
              setValue({
                start: val?.start ? toISO(val.start) : null,
                end: val?.end ? toISO(val.end) : null,
              });
            }}
            customOpener={({ isOpen, setAnchorRef, onClick }) => (
              <button ref={setAnchorRef} onClick={onClick}>
                Произвольный открывающий элемент{isOpen && " (открыт)"}
              </button>
            )}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 16,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 12,
            color: "#999",
          }}
        ></div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте placeholder, disabled, error, position через controls справа. value управляется только внутри истории. Крестик очищает соответствующее поле (null).",
      },
    },
  },
};
