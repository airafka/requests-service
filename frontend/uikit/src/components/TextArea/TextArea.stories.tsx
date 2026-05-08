import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import TextArea from "./TextArea";

const meta: Meta<typeof TextArea> = {
  title: "UIKIT/TextArea",
  component: TextArea,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**TextArea** — компонент многострочного текстового поля в приложении, предоставляющий единообразный интерфейс для всех областей ввода текста.

Основан на HTML textarea элементах с кастомными стилями, соответствующими дизайн-системе приложения. Компонент поддерживает различные состояния, лейблы, подсказки и стандартные атрибуты textarea.

## Пропсы

| Пропс            | Тип                    | Описание                                                                                   |
|------------------|------------------------|--------------------------------------------------------------------------------------------|
| \`value\`          | \`string\`               | Текущее значение поля ввода. По умолчанию — \`""\`.                                      |
| \`onChange\`      | \`(e: React.ChangeEvent<HTMLTextAreaElement>) => void\` | Обработчик изменения с полным событием.                                                |
| \`placeholder\`   | \`string\`               | Текст-подсказка, отображаемый в пустом поле.                                            |
| \`label\`         | \`string\`               | Текст лейбла над полем ввода.                                                            |
| \`hintText\`      | \`string\`               | Подсказка под полем ввода (для ошибок или дополнительной информации).                    |
| \`disabled\`      | \`boolean\`              | Отключает поле ввода и делает его недоступным для взаимодействия. По умолчанию — \`false\`. |
| \`error\`         | \`boolean\`              | Показывает поле в состоянии ошибки с красной рамкой. По умолчанию — \`false\`.             |
| \`minLength\`     | \`number\`               | Минимальная допустимая длина значения.                                                   |
| \`maxLength\`     | \`number\`               | Максимальная допустимая длина значения.                                                  |
| \`rows\`          | \`number\`               | Количество видимых строк.                                                                |
| \`cols\`          | \`number\`               | Количество видимых символов в строке.                                                    |
| \`autoFocus\`     | \`boolean\`              | Автоматически устанавливает фокус на поле при монтировании. По умолчанию — \`false\`.     |
| \`className\`     | \`string\`               | Дополнительные CSS классы для контейнера.                                               |
| \`onFocus\`       | \`(e: React.FocusEvent<HTMLTextAreaElement>) => void\` | Обработчик получения фокуса.                                                          |
| \`onBlur\`        | \`(e: React.FocusEvent<HTMLTextAreaElement>) => void\` | Обработчик потери фокуса.                                                             |
| \`readOnly\`      | \`boolean\`              | Делает поле только для чтения.                                                           |
| \`required\`      | \`boolean\`              | Поле обязательно для заполнения.                                                         |
| \`autoComplete\`  | \`string\`               | Автозаполнение браузера.                                                                 |
| \`spellcheck\`    | \`boolean\`              | Включить проверку орфографии.                                                            |
        `,
      },
    },
  },
  argTypes: {
    value: {
      description: "Текущее значение поля ввода",
      control: "text",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: '""' },
      },
    },
    onChange: {
      description: "Обработчик изменения с полным событием",
      action: "changed",
      table: {
        type: { summary: "(e: React.ChangeEvent<HTMLTextAreaElement>) => void" },
      },
    },
    placeholder: {
      description: "Текст-подсказка, отображаемый в пустом поле",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    label: {
      description: "Текст лейбла над полем ввода",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    hintText: {
      description: "Подсказка под полем ввода (для ошибок или дополнительной информации)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      description: "Отключает поле ввода и делает его недоступным для взаимодействия",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      description: "Показывает поле в состоянии ошибки с красной рамкой",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    rows: {
      description: "Количество видимых строк",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    cols: {
      description: "Количество видимых символов в строке",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    minLength: {
      description: "Минимальная допустимая длина значения",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    maxLength: {
      description: "Максимальная допустимая длина значения",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    autoFocus: {
      description: "Автоматически устанавливает фокус на поле при монтировании",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    readOnly: {
      description: "Делает поле только для чтения",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
      },
    },
    required: {
      description: "Поле обязательно для заполнения",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
      },
    },
    autoComplete: {
      description: "Автозаполнение браузера",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    spellcheck: {
      description: "Включить проверку орфографии",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
      },
    },
  },
  args: {
    placeholder: "Введите текст...",
    rows: 4,
    cols: 0,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Controls: Story = {
  render: (args) => (
    <div
      style={{
        padding: "32px",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        minHeight: "200px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>TextArea</strong> — многострочное текстовое поле
      </div>
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <TextArea {...args} />
      </div>
      <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
        value: <b>{args.value}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Интерактивный TextArea\n\nМеняйте value, error, disabled, label, placeholder, rows, cols и другие пропсы через controls справа.",
      },
    },
  },
};

export const WithState: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || "");
    return (
      <div
        style={{
          padding: "32px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
          <strong>TextArea</strong> с управляемым состоянием
        </div>
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <TextArea
            {...args}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </div>
        <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
          value: <b>{value}</b>
        </div>
      </div>
    );
  },
  args: {
    label: "Описание",
    placeholder: "Введите подробное описание...",
    rows: 6,
    hintText: "Максимум 500 символов",
    maxLength: 500,
  },
  parameters: {
    docs: {
      description: {
        story:
          "## TextArea с состоянием\n\nПолноценный пример с управляемым состоянием через useState. Поддерживает все стандартные возможности textarea.",
      },
    },
  },
};

export const ErrorState: Story = {
  args: {
    label: "Описание с ошибкой",
    placeholder: "Введите описание",
    error: true,
    hintText: "Поле обязательно для заполнения",
    value: "",
  },
};

export const DisabledState: Story = {
  args: {
    label: "Заблокированное поле",
    value: "Этот текст нельзя изменить",
    disabled: true,
    hintText: "Поле заблокировано",
  },
};

export const ReadOnlyState: Story = {
  args: {
    label: "Только для чтения",
    value: "Этот текст можно только просматривать",
    readOnly: true,
    hintText: "Режим только для чтения",
  },
};
