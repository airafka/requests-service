import type { Meta, StoryObj } from "@storybook/react";
import { InputRange } from "./index";

const meta: Meta<typeof InputRange> = {
  title: "UIKIT/InputRange",
  component: InputRange,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**InputRange** — компонент для ввода диапазона значений с двумя числовыми полями "от" и "до". Представляет собой кликабельное поле с выпадающим popover, содержащим два поля ввода.

Основан на Material-UI компонентах с кастомными стилями, соответствующими дизайн-системе приложения. Компонент автоматически валидирует введенные значения, поддерживает очистку и отображает состояние ошибки при некорректном диапазоне.

Используется в фильтрах, формах поиска, настройках параметров и любых местах, где требуется выбор диапазона значений.

## Пропсы

| Пропс            | Тип                    | Описание                                                                                   |
|------------------|------------------------|--------------------------------------------------------------------------------------------|
| \`value\`          | \`InputRangeValue\`      | Текущее значение диапазона с полями \`from\` и \`to\`. По умолчанию — \`undefined\`.      |
| \`onChange\`      | \`(value: InputRangeValue \\| undefined) => void\` | Обработчик изменения диапазона. Получает валидное значение или undefined.                |
| \`placeholder\`   | \`string\`               | Текст-подсказка, отображаемый перед значениями диапазона.                                |
| \`label\`     | \`string\`          | Текст лейбла над полем ввода. |
| \`hintText\`  | \`string\`          | Подсказка под полем ввода (для ошибок или дополнительной информации). |

## Структура InputRangeValue

\`\`\`tsx
type InputRangeValue = {
  from?: number;  // Значение "от"
  to?: number;    // Значение "до"
};
\`\`\`

## Валидация

Компонент автоматически валидирует введенные значения:
- Если указано только одно значение (from или to) — ошибки нет
- Если указаны оба значения и from > to — отображается ошибка
- При ошибке поля ввода подсвечиваются красным цветом

## Примеры использования

### Базовый фильтр
\`\`\`tsx
<InputRange
  value={{ from: 1000, to: 5000 }}
  placeholder="Цена"
  onChange={(value) => setPriceRange(value)}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    value: {
      description: "Текущее значение диапазона с полями from и to",
      control: "object",
      table: {
        type: { summary: "InputRangeValue" },
        defaultValue: { summary: "undefined" },
      },
    },
    onChange: {
      description: "Обработчик изменения диапазона",
      action: "changed",
      table: {
        type: { summary: "(value: InputRangeValue | undefined) => void" },
      },
    },
    placeholder: {
      description: "Текст-подсказка, отображаемый перед значениями диапазона",
      control: "text",
      table: {
        type: { summary: "string" },
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
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputRange>;

export const Default: Story = {
  render: (args) => (
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
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>InputRange</strong> — диапазон значений
      </div>
      <InputRange {...args} />
      <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
        value: <b>{JSON.stringify(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Интерактивный InputRange\n\nМеняйте value (from, to) и placeholder через controls справа.",
      },
    },
  },
};

export const WithCustomOpener: Story = {
  render: (args) => (
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
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>InputRange</strong> с произвольным открывающим элементом
      </div>

      <InputRange
        {...args}
        customOpener={({ isOpen, setAnchorRef, onClick }) => (
          <button ref={setAnchorRef} onClick={onClick}>
            Произвольный открывающий элемент{isOpen && " (открыт)"}
          </button>
        )}
      />

      <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
        value: <b>{JSON.stringify(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "## InputRange с произвольным открывающим элементом",
      },
    },
  },
};
