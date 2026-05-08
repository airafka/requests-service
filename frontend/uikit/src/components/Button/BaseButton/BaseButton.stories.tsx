import type { Meta, StoryObj } from "@storybook/react";
import { ButtonType } from "./types";
import { PlusCircleIcon } from "../../../icons";
import BaseButton from "./BaseButton";

const meta: Meta<typeof BaseButton> = {
  title: "UIKIT/BaseButton",
  component: BaseButton,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**BaseButton** — универсальный компонент кнопки, используемый во всем приложении для создания интерактивных элементов интерфейса.

Основан на Material-UI Button с кастомными стилями и расширенной функциональностью. Поддерживает различные типы стилей, размеры, состояния загрузки и отключения, а также интеграцию с формами.

Используется для действий, навигации, отправки форм и других интерактивных элементов.

## Типы кнопок

| Тип              | Описание                                    | Применение                           |
|------------------|---------------------------------------------|--------------------------------------|
| \`default\`        | Основная кнопка с заливкой                  | Основные действия, призывы к действию |
| \`light\`          | Кнопка с белым фоном и цветной обводкой     | Вторичные действия                   |
| \`iconOutlined\`   | Кнопка с иконкой, белым фоном и обводкой    | Действия с иконками                  |

## Размеры

| Размер   | Высота | Шрифт | Padding        | Описание                    |
|----------|--------|-------|----------------|-----------------------------|
| \`small\`  | 28px   | 14px  | 0 16px         | Компактный размер           |
| \`regular\`| 28px   | 19px  | 0 16px         | Обычный размер              |
| \`medium\` | 36px   | 16px  | 0 34px         | Стандартный размер, по умолчанию |
| \`large\`  | 44px   | 19px  | 0 39px         | Увеличенный размер          |

## Пропсы

| Пропс           | Тип                                      | Описание                                                                                   |
|-----------------|------------------------------------------|--------------------------------------------------------------------------------------------|
| \`buttonType\`    | \`ButtonType\` (\`default\`, \`lightDefault\`, \`light\`, \`simpleBorder\`, \`simple\`, \`simpleColor\`) | Тип стиля кнопки. По умолчанию — \`default\`.                                              |
| \`size\`          | \`CommonSize\` (\`small\`, \`regular\`, \`medium\`, \`large\`)          | Размер кнопки. По умолчанию — \`medium\`.                                                   |
| \`isDisabled\`    | \`boolean\`                                | Отключена ли кнопка. При \`true\` блокирует взаимодействие. По умолчанию — \`false\`.       |
| \`isLoad\`        | \`boolean\`                                | Показывать ли индикатор загрузки. По умолчанию — \`false\`.                                |
| \`icon\`          | \`React.ReactNode\`                        | Иконка, отображаемая в начале кнопки.                                                      |
| \`onClick\`       | \`(event: React.MouseEvent<HTMLButtonElement>) => void\` | Обработчик клика по кнопке.                                                                |
| \`children\`      | \`React.ReactNode | string\`                 | Содержимое кнопки (текст или другие элементы).                                             |
| \`ButtonAction\`  | \`"button" | "submit" | "reset"\`              | HTML-тип кнопки. По умолчанию — \`"button"\`.                                              |
| \`form\`          | \`string\`                                 | ID формы для связи с кнопкой.                                                              |
| \`className\`     | \`string\`                                 | Кастомные CSS-классы для дополнительной стилизации.                                        |

## Примеры использования

### Основная кнопка действия
\`\`\`tsx
<BaseButton onClick={handleSubmit}>
  Сохранить
</BaseButton>
\`\`\`

### Кнопка отправки формы
\`\`\`tsx
<BaseButton ButtonAction="submit" form="myForm">
  Отправить!
</BaseButton>
\`\`\`

### Кнопка с загрузкой
\`\`\`tsx
<BaseButton isLoad={isLoading} onClick={handleAction}>
  {isLoading ? "Загрузка..." : "Выполнить"}
</BaseButton>
\`\`\`

### Кнопка с иконкой
\`\`\`tsx
<BaseButton 
  icon={<SaveIcon />} 
  onClick={handleSave}
>
  Сохранить
</BaseButton>
\`\`\`
                `,
      },
    },
  },
  argTypes: {
    buttonType: {
      description: "Тип стиля кнопки. Определяет внешний вид и цветовую схему",
      control: "select",
      options: ["default", "light", "iconOutlined"],
      mapping: {
        default: ButtonType.default,
        light: ButtonType.light,
        iconOutlined: ButtonType.iconOutlined,
      },
    },
    isDisabled: {
      description: "Отключена ли кнопка",
      control: "boolean",
    },
    isLoad: {
      description: "Показывать ли индикатор загрузки",
      control: "boolean",
    },
    fullWidth: {
      description: "Растянуть кнопку на всю ширину",
      control: "boolean",
    },
    allowTextWrap: {
      description: "Разрешить перенос текста на несколько строк",
      control: "boolean",
    },
    startIcon: {
      description: "Иконка в начале кнопки (ReactNode)",
      control: "text",
    },
    endIcon: {
      description: "Иконка в конце кнопки (ReactNode)",
      control: "text",
    },
    ButtonAction: {
      description: "HTML-тип кнопки",
      control: "select",
      options: ["button", "submit", "reset"],
    },
    form: {
      description: "ID формы для связи с кнопкой",
      control: "text",
    },
    children: {
      description: "Содержимое кнопки (текст)",
      control: "text",
    },
    className: {
      control: "text",
    },
  },
  args: {
    buttonType: ButtonType.default,
    isDisabled: false,
    isLoad: false,
    startIcon: undefined,
    ButtonAction: "button",
    form: "",
    children: "Кнопка",
    allowTextWrap: false,
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BaseButton>;

export const Controls: Story = {
  args: {
    fullWidth: false,
  },

  render: (args) => {
    const iconToShow =
      args.buttonType === ButtonType.iconOutlined ? (
        <PlusCircleIcon />
      ) : (
        args.startIcon
      );

    return (
      <div
        style={{
          padding: "32px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
          <strong>BaseButton</strong> — универсальная кнопка
        </div>
        <BaseButton {...args} startIcon={iconToShow} />
        <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
          buttonType: <b>{String(args.buttonType)}</b>, disabled:{" "}
          <b>{String(args.isDisabled)}</b>, loading:{" "}
          <b>{String(args.isLoad)}</b>
        </div>
      </div>
    );
  },

  parameters: {
    docs: {
      description: {
        story:
          "## Интерактивная BaseButton\n\nМеняйте buttonType, size, isDisabled, isLoad, ButtonAction, form, children через controls справа.\n\n**Примечание:** При выборе типа `iconOutlined` автоматически добавляется иконка.",
      },
    },
  },
};

export const AllTypes: Story = {
  render: () => (
    <div
      style={{
        padding: "32px",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      <div style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
        Все типы кнопок BaseButton
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <BaseButton buttonType={ButtonType.default}>Button</BaseButton>
        <span style={{ fontSize: "12px", color: "#666" }}>
          default — основная кнопка с заливкой
        </span>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <BaseButton buttonType={ButtonType.light}>Button</BaseButton>
        <span style={{ fontSize: "12px", color: "#666" }}>
          light — кнопка с обводкой
        </span>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <BaseButton
          buttonType={ButtonType.iconOutlined}
          startIcon={<PlusCircleIcon />}
        >
          Button
        </BaseButton>
        <span style={{ fontSize: "12px", color: "#666" }}>
          iconOutlined — кнопка с иконкой и обводкой
        </span>
      </div>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        <BaseButton className="sizeLarge" buttonType={ButtonType.outlined}>
          Сохранить
        </BaseButton>
        <BaseButton
          className="sizeLarge"
          buttonType={ButtonType.default}
          endIcon={<>{`->`}</>}
        >
          Далее
        </BaseButton>
        <span style={{ fontSize: "12px", color: "#666" }}>
          sizeLarge — большая кнопка
        </span>
      </div>
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story:
          "## Все типы кнопок\n\nСравнение всех доступных типов кнопок BaseButton.",
      },
    },
  },
};
