import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import InputText from "./InputText";

const meta: Meta<typeof InputText> = {
  title: "UIKIT/InputText",
  component: InputText,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**InputText** — основной компонент текстового поля в приложении, предоставляющий единообразный интерфейс для всех текстовых полей ввода.

Основан на HTML input элементах с кастомными стилями, соответствующими дизайн-системе приложения. Компонент поддерживает различные состояния, иконки, типы ввода и автоматическую валидацию для числовых полей.

## Пропсы

| Пропс            | Тип                    | Описание                                                                                   |
|------------------|------------------------|--------------------------------------------------------------------------------------------|
| \`value\`          | \`string\`               | Текущее значение поля ввода. По умолчанию — \`""\`.                                      |
| \`onChange\`      | \`(e: React.ChangeEvent<HTMLInputElement>) => void\` | Обработчик изменения с полным событием.                                                |
| \`onChangeValue\` | \`(value: string) => void\` | Обработчик изменения только значения.                                                  |
| \`placeholder\`   | \`string\`               | Текст-подсказка, отображаемый в пустом поле.                                            |
| \`label\`         | \`string\`               | Текст лейбла над полем ввода.                                                            |
| \`hintText\`      | \`string\`               | Подсказка под полем ввода (для ошибок или дополнительной информации).                                          |
| \`disabled\`      | \`boolean\`              | Отключает поле ввода и делает его недоступным для взаимодействия. По умолчанию — \`false\`. |
| \`error\`         | \`boolean\`              | Показывает поле в состоянии ошибки с красной рамкой. По умолчанию — \`false\`.             |
| \`type\`          | \`"text" \\| "number" \\| "email" \\| "date" \\| "password"\` | Тип поля ввода. По умолчанию — \`"text"\`.                                            |
| \`min\`           | \`number\`               | Минимальное значение для числовых полей.                                                |
| \`max\`           | \`number\`               | Максимальное значение для числовых полей.                                                |
| \`minLength\`      | \`number\`               | Минимальная допустимая длина значения.                                                   |
| \`maxLength\`      | \`number\`               | Максимальная допустимая длина значения.                                                  |
| \`iconStart\`     | \`ReactNode\`            | Иконка, отображаемая слева от поля ввода.                                               |
| \`borderRadius\`  | \`number\`               | Кастомный радиус скругления углов в пикселях.                                           |
| \`autoFocus\`     | \`boolean\`              | Автоматически устанавливает фокус на поле при монтировании. По умолчанию — \`false\`.     |
| \`className\`     | \`string\`               | Дополнительные CSS классы для контейнера.                                               |
| \`onFocus\`       | \`(e: React.FocusEvent<HTMLInputElement>) => void\` | Обработчик получения фокуса.                                                          |
| \`onBlur\`        | \`(e: React.FocusEvent<HTMLInputElement>) => void\` | Обработчик потери фокуса.                                                             |
| \`allowOnlyAlphanumeric\` | \`boolean\` | Если true, разрешает ввод только букв (латиница, кириллица) и цифр. Все специальные символы будут автоматически блокироваться. По умолчанию — \`false\`. |
| \`borderColors\`       | \`обьект или null\`       | —                 | Обьект с цветами|
| \`isTable\`  | \`boolean\`          |Переход на табличную вариацию datepicker. По умолчанию — false. | \`false\`|
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
        type: { summary: "(e: React.ChangeEvent<HTMLInputElement>) => void" },
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
      description:
        "Подсказка под полем ввода (для ошибок или дополнительной информации)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    disabled: {
      description:
        "Отключает поле ввода и делает его недоступным для взаимодействия",
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
    type: {
      description: "Тип поля ввода",
      control: "select",
      options: ["text", "number", "email", "date", "password"],
      table: {
        type: { summary: '"number" | "text" | "date" | "email" | "password"' },
        defaultValue: { summary: "text" },
      },
    },
    min: {
      description: "Минимальное значение для числовых полей",
      control: "number",
      table: {
        type: { summary: "number" },
      },
    },
    max: {
      description: "Максимальное значение для числовых полей",
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
    borderRadius: {
      description: "Кастомный радиус скругления углов в пикселях",
      control: "number",
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "5" },
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
    iconStart: {
      description: "Иконка, отображаемая слева от поля ввода",
      control: false,
      table: {
        type: { summary: "ReactNode" },
      },
    },
    allowOnlyAlphanumeric: {
      description:
        "Если true, разрешает ввод только букв (латиница, кириллица) и цифр. Все специальные символы будут автоматически блокироваться",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    borderColor: {
      default: {
        control: "string",
      },
      hover: {
        control: "string",
      },
      focus: {
        control: "string",
      }
    },
    isTable: {
      control: "boolean",
    }
  },
  args: {
    borderColor: {
      default: undefined,
      hover: undefined,
      focus: undefined,
    },
    placeholder: "Введите текст",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputText>;

export const Controls: Story = {
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
        <strong>InputText</strong> — текстовое поле ввода
      </div>
      <div
        style={{
          borderRadius: args.borderRadius
            ? `${args.borderRadius}px`
            : undefined,
          overflow: args.borderRadius ? "hidden" : undefined,
          width: "100%",
        }}
      >
        <InputText {...args} />
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
          "## Интерактивный InputText\n\nМеняйте value, error, disabled, label, placeholder, type, borderRadius и другие пропсы через controls справа.",
      },
    },
  },
};

export const AlphanumericOnly: Story = {
  args: {
    value: "",
    placeholder: "Введите код (только буквы и цифры)",
    allowOnlyAlphanumeric: true,
    label: "Код",
  },
  render: (args) => {
    const [value, setValue] = React.useState(args.value || "");
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
        }}
      >
        <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
          <strong>InputText</strong> с allowOnlyAlphanumeric
        </div>
        <div style={{ width: "100%" }}>
          <InputText
            {...args}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
          value: <b>{value}</b>
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#666",
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          Попробуйте ввести специальные символы (@, #, -, пробелы и т.д.) — они
          будут заблокированы. Разрешены только буквы (латиница, кириллица) и
          цифры.
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "## InputText с блокировкой специальных символов\n\nКогда `allowOnlyAlphanumeric={true}`, компонент автоматически блокирует ввод любых специальных символов. Разрешены только буквы (латиница, кириллица, включая ё, Ё) и цифры.",
      },
    },
  },
};
