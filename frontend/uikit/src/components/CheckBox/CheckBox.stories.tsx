import type { Meta, StoryObj } from "@storybook/react";
import CheckBox from "./CheckBox";
import { CommonSize } from "../../types/CommonSize";

const meta: Meta<typeof CheckBox> = {
  title: "UIKIT/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `# CheckBox

Компонент чекбокса с кастомной стилизацией и поддержкой различных размеров.

## Основные возможности

- **Размеры**: Small, Medium, Regular, Large
- **Состояния**: Checked, Unchecked, Disabled, Required
- **Обработчики**: onClick, onChange, onSelect
- **Кастомная иконка**: Использует DoneToggle для отмеченного состояния

## Использование

\`\`\`tsx
import CheckBox from "src/shared/UIKIT/CheckBox";

// Базовое использование
<CheckBox 
    checked={isChecked} 
    onSelect={(checked) => setIsChecked(checked)} 
/>

// С обработчиками событий
<CheckBox 
    checked={isChecked}
    onClick={({ checked, event }) => console.log("Clicked:", checked)}
    onChange={(event) => console.log("Changed:", event)}
    onSelect={(checked) => setIsChecked(checked)}
    size={CommonSize.Large}
    isDisabled={false}
    isRequired={true}
/>
\`\`\`

## Пропсы

| Проп | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| \`checked\` | \`boolean\` | \`false\` | Состояние чекбокса |
| \`onClick\` | \`({ checked, event }) => void\` | - | Обработчик клика |
| \`onChange\` | \`(event) => void\` | - | Обработчик изменения |
| \`onSelect\` | \`(checked) => void\` | - | Обработчик выбора |
| \`isDisabled\` | \`boolean\` | \`false\` | Отключенное состояние |
| \`isRequired\` | \`boolean\` | \`false\` | Обязательное поле |
| \`size\` | \`CommonSize\` | \`Regular\` | Размер чекбокса |
| \`className\` | \`string\` | - | Дополнительные CSS классы |
| \`id\` | \`string\` | - | ID элемента |

## Размеры

- **Small**: 16px
- **Medium**: 20px  
- **Large**: 24px

## Состояния

1. **Unchecked** - неотмеченное состояние
2. **Checked** - отмеченное состояние с иконкой
3. **Disabled** - отключенное состояние
4. **Required** - обязательное поле
5. **Hover** - состояние при наведении
6. **Focus** - состояние при фокусе
7. **Error** - состояние при ошибке
`,
      },
    },
  },
  argTypes: {
    checked: {
      control: "boolean",
      description: "Состояние чекбокса",
    },
    isDisabled: {
      control: "boolean",
      description: "Отключенное состояние",
    },
    isRequired: {
      control: "boolean",
      description: "Обязательное поле",
    },
    error: {
      control: "boolean",
      description: "Состояние при ошибке"
    },
    indeterminate: {
      control: "boolean",
      description: "Состояние при неполном выборе",
    },
    size: {
      control: "select",
      options: Object.values(CommonSize),
      description: "Размер чекбокса",
    },
    onClick: { action: "clicked" },
    onChange: { action: "changed" },
    onSelect: { action: "selected" },
    fullLine: { table: { disable: true }, control: false }, // скрываем fullLine
  },
  args: {
    checked: false,
    isDisabled: false,
    isRequired: false,
    size: CommonSize.Small,
    error: false,
    indeterminate: false,
  },
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Controls: Story = {
  args: {
    checked: false,
    isDisabled: false,
    isRequired: false,
    size: CommonSize.Small,
  },
  render: (args) => (
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
        ☑️ <strong>Контейнер для демонстрации CheckBox</strong>
      </div>
      <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
        Состояние: {args.checked ? "Отмечен" : "Не отмечен"} | Размер:{" "}
        {args.size}
      </div>
      <div
        style={{
          marginBottom: "20px",
          fontSize: "11px",
          color: "#666",
          fontStyle: "italic",
        }}
      >
        💡 Используйте Storybook controls справа для изменения свойств
      </div>
      <div style={{ marginBottom: "20px" }}>
        <CheckBox {...args} />
      </div>
      <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
        Контейнер для демонстрации CheckBox
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## CheckBox с интерактивными контролами\n\nЭта история демонстрирует компонент CheckBox с возможностью управления всеми свойствами через контролы Storybook.",
      },
    },
  },
};
