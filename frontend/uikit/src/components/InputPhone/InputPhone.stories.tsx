import type { Meta, StoryObj } from "@storybook/react";
import InputPhone from "./InputPhone";
import { useEffect, useState } from "react";

const meta: Meta<typeof InputPhone> = {
  title: "UIKIT/InputPhone",
  component: InputPhone,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**InputPhone** — специализированный компонент для ввода международных номеров телефонов с поддержкой выбора страны и автоматической валидацией.

Основан на библиотеке mui с кастомными стилями и логике, соответствующими дизайн-системе приложения. Компонент автоматически форматирует номера телефонов, предоставляет выбор страны с флагами и кодами, а также поддерживает различные состояния.

Используется в формах регистрации, профиля, заказов и любых местах, где требуется ввод номера телефона с международной поддержкой.

## Пропсы

| Пропс            | Тип                    | Описание                                                                                   |
|------------------|------------------------|--------------------------------------------------------------------------------------------|
| \`value\`          | \`string\`               | Текущее значение номера телефона в международном формате.                                 |
| \`onChange\`      | \`(phone: string) => void\` | Обработчик изменения номера телефона. Получает отформатированную строку.                |
| \`placeholder\`   | \`string\`               | Текст-подсказка, отображаемый в пустом поле. По умолчанию указывает пример номеров выбранной страны в defaultCountry. |
| \`label\`         | \`string\`               | Текст лейбла над полем ввода.                                                             |
| \`hintText\`      | \`string\`               | Подсказка под полем ввода (для ошибок или дополнительной информации).                    |
| \`disabled\`      | \`boolean\`              | Отключает поле ввода и делает его недоступным для взаимодействия. По умолчанию — \`false\`. |
| \`error\`         | \`boolean\`              | Показывает поле в состоянии ошибки с красной рамкой. По умолчанию — \`false\`.             |
| \`defaultCountry\`| \`'ru' | 'cn' | 'us'\`               | ISO код страны по умолчанию (например, "ru", "us", "cn"). По умолчанию — \`"ru"\`. Влияет на форматирование номера и отображает флаг страны.        |
| \`dataTestId\`| \`string\`                   | Пропс для указания id тестирования.        |
 \`borderColors\`       | \`обьект или null\`       | —                 | Обьект с цветами|
 | \`isTable\`  | \`boolean\`          |Переход на табличную вариацию datepicker. По умолчанию — false. | \`false\`|
## Примеры использования

### Базовая форма регистрации
\`\`\`tsx
<InputPhone
  value={phone}
  onChange={setPhone}
  label="Номер телефона"
  placeholder="Введите номер телефона"
  hintText="Будет использоваться для связи"
/>
\`\`\`
### Поле для другой страны
\`\`\`tsx
<InputPhone
  value={phone}
  onChange={setPhone}
  label="Номер телефона"
  defaultCountry="us"
  placeholder="Enter phone number"
/>
\`\`\`

Компонент автоматически отображает флаг выбранной страны и форматирует номер в соответствии с форматом этой страны.
        `,
      },
    },
  },
  argTypes: {
      value: {
        description: "Текущее значение номера телефона в международном формате",
        control: "text",
        table: {
          type: { summary: "string" },
          defaultValue: { summary: '""' },
        },
      },
      onChange: {
        description: "Обработчик изменения номера телефона",
        action: "changed",
        table: {
          type: { summary: "(phone: string) => void" },
        },
      },
      placeholder: {
        description: "Текст-подсказка, отображаемый в пустом поле",
        control: "text",
        table: {
          type: { summary: "string" },
          defaultValue: { summary: '+ 7 (123) 123-12-23' },
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
      defaultCountry: {
        description: "ISO код страны по умолчанию (влияет на форматирование номера и отображает флаг страны)",
        control: "select",
        options: ["ru", "us", "cn"],
        table: {
          type: { summary: "ru | us | cn" },
          defaultValue: { summary: '"ru"' },
        },
      },
      dataTestId: {
        description: "Пропс для указания id тестирования",
        control: 'text',
        table:{
          type: {summary: "string"},
          defaultValue: {summary: "defaultDataTestId"}
        }
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
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputPhone>;

export const Controls: Story = {
  render: (args) => {
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
        }}>
        <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
          <strong>InputPhone</strong> — поле для ввода телефона
        </div>
        <InputPhone key={args.defaultCountry} {...args} />
        <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
          value: <b>{args.value}</b>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "## Интерактивный InputPhone\n\nМеняйте value, error, disabled, label, hintText, placeholder, defaultCountry через controls справа.",
      },
    },
  },
};
