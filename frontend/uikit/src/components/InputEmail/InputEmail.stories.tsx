import type {
  Meta,
  StoryObj,
} from "@storybook/react";

import InputEmail from "./InputEmail";

const meta: Meta<typeof InputEmail> = {
  title: "UIKIT/InputEmail",
  component: InputEmail,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**InputEmail** — специализированный компонент для ввода email адресов с встроенной валидацией и дефолтными иконками.

Является обёрткой над InputText с предустановленным типом "email" и дефолтными иконками MailInput и HelpInput. Компонент автоматически валидирует формат email и предоставляет визуальную обратную связь через изменение цвета иконок.

Используется для форм регистрации, авторизации, настроек профиля и любых мест, где требуется ввод email адреса.

## Пропсы

| Пропс        | Тип                                      | Описание                                                                                   |
|--------------|------------------------------------------|--------------------------------------------------------------------------------------------|
| \`value\`      | \`string\`                                 | Текущее значение поля email.                                                              |
| \`onChange\`  | \`(e: React.ChangeEvent<HTMLInputElement>) => void\` | Обработчик изменения значения поля.                                                        |
| \`placeholder\`| \`string\`                                 | Текст-подсказка, отображаемый в пустом поле. По умолчанию — \`"example@mail.ru"\`.        |
| \`label\`     | \`string\`                                 | Текст лейбла над полем ввода.                                                             |
| \`hintText\`  | \`string\`                                 | Подсказка под полем ввода (для ошибок или дополнительной информации).                    |
| \`disabled\`  | \`boolean\`                                | Отключает поле ввода и делает его недоступным для взаимодействия. По умолчанию — \`false\`. |
| \`error\`     | \`boolean\`                                | Показывает поле в состоянии ошибки с красной рамкой. По умолчанию — \`false\`.             |
| \`iconStart\` | \`ReactNode\`                              | Иконка, отображаемая слева от поля ввода. По умолчанию — \`<MailInput />\`.               |
| \`iconEnd\`   | \`ReactNode\`                              | Иконка, отображаемая справа от поля ввода. По умолчанию — \`<HelpInput />\`.               |
| \`onFocus\`   | \`(e: React.FocusEvent<HTMLInputElement>) => void\` | Обработчик события фокуса на поле.                                                        |
| \`onBlur\`    | \`(e: React.FocusEvent<HTMLInputElement>) => void\` | Обработчик события потери фокуса.                                                         |
| \`className\` | \`string\`                                 | Дополнительные CSS классы для кастомизации.                                               |
| \`borderColors\`       | \`обьект или null\`       | —                 | Обьект с цветами|
| \`isTable\`  | \`boolean\`          |Переход на табличную вариацию datepicker. По умолчанию — false. | \`false\`|
## Пример
\`\`\`tsx
<InputEmail
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  label="Email"
  placeholder="your@email.com"
  hintText="Будет использоваться для входа в систему"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: { table: { disable: true } },
    min: { table: { disable: true } },
    max: { table: { disable: true } },
    borderRadius: { table: { disable: true } },
    autoFocus: { table: { disable: true } },
    ref: { table: { disable: true } },
    value: {
      description: "Текущее значение поля email",
      control: "text",
    },
    error: {
      description: "Показывает поле в состоянии ошибки",
      control: "boolean",
    },
    disabled: {
      description: "Отключает поле ввода",
      control: "boolean",
    },
    label: {
      description: "Текст лейбла над полем ввода",
      control: "text",
    },
    hintText: {
      description: "Подсказка под полем ввода",
      control: "text",
    },
    placeholder: {
      description: "Текст-подсказка в поле",
      control: "text",
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
    value: "",
    error: false,
    disabled: false,
    label: "Email",
    hintText: "",
    placeholder: "example@mail.ru",
    borderColor: {
      default: undefined,
      hover: undefined,
      focus: undefined,
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputEmail>;

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
      }}>
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>InputEmail</strong> — поле для ввода email
      </div>
      <div style={{ width: "100%" }}>
        <InputEmail {...args} />
      </div>
      <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
        value: <b>{args.value}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "## Интерактивный InputEmail\n\nМеняйте value, error, disabled, label, hintText, placeholder через controls справа.",
      },
    },
  },
};
