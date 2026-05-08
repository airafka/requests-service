import type { Meta, StoryObj } from "@storybook/react";
import { ModalFooter } from "./ModalFooter";
import { ButtonType } from "../../Button/index";
import { CommonSize } from "../../../types/CommonSize";

const meta: Meta<typeof ModalFooter> = {
  title: "UIKIT/Modal/ModalFooter",
  component: ModalFooter,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**ModalFooter** — компонент для кнопок действий в футере модальных окон.

Предоставляет единообразный интерфейс для отображения кнопок действий в нижней части модальных окон с поддержкой различных типов кнопок, состояний и размеров.

## Пропсы

| Пропс            | Тип                    | Описание                                                                                   |
|------------------|------------------------|--------------------------------------------------------------------------------------------|
| \`footerButtons\` | \`ModalFooterButtonsProps[]\` | Массив конфигураций кнопок для отображения в футере.                                    |

## Структура footerButtons

Каждый элемент массива \`footerButtons\` имеет следующую структуру:

| Пропс            | Тип                    | Обязательный | Описание                                                                                   |
|------------------|------------------------|--------------|--------------------------------------------------------------------------------------------|
| \`children\`      | \`ReactNode\`           | Да           | Содержимое кнопки (текст, иконка и т.д.)                                                  |
| \`onClick\`       | \`() => void\`          | Да           | Обработчик клика по кнопке                                                                |
| \`buttonType\`    | \`ButtonType\`          | Да           | Тип кнопки (light, default, outlined, iconOutlined)                                     |
| \`isDisabled\`    | \`boolean\`             | Нет          | Отключить кнопку                                                                           |
| \`isLoad\`        | \`boolean\`             | Нет          | Показать состояние загрузки (спиннер)                                                     |
| \`size\`          | \`CommonSize\`          | Нет          | Размер кнопки (Small, Medium, Large)                                                      |
| \`buttonAction\`  | \`"submit" | "reset"\` | Нет          | HTML-атрибут type для кнопки                                                              |

## Типы кнопок

| Тип                    | Описание                                                                                   |
|------------------------|--------------------------------------------------------------------------------------------|
| \`ButtonType.light\`    | Светлая вторичная кнопка                                                                     |
| \`ButtonType.default\`  | Основная кнопка с цветным фоном                                                             |
| \`ButtonType.outlined\` | Кнопка с рамкой                                                                             |

## Состояния кнопок

| Состояние        | Описание                                                                                   |
|------------------|--------------------------------------------------------------------------------------------|
| \`isDisabled\`   | Отключенная кнопка (неактивна)                                                             |
| \`isLoad\`       | Кнопка в состоянии загрузки (показывает спиннер)                                          |

## Размеры

| Размер           | Размер шрифта | Применение                                                                                 |
|------------------|---------------|--------------------------------------------------------------------------------------------|
| \`Small\`        | 14px          | Компактные футеры                                                                          |
| \`Medium\`       | 16px          | Стандартный размер                                                                         |
| \`Large\`        | 24px          | Крупные кнопки для важных действий                                                         |

## Пример

\`\`\`tsx
<ModalFooter
  footerButtons={[
    { children: "Отмена", onClick: handleCancel, buttonType: ButtonType.light },
    { children: "Сохранить", onClick: handleSave, buttonType: ButtonType.default }
  ]}
/>
\`\`\`
                `,
      },
    },
  },
  argTypes: {
    footerButtons: {
      description: "Массив конфигураций кнопок для футера",
      control: "object",
    },
  },
  args: {
    footerButtons: [
      {
        children: "Отмена",
        onClick: () => alert("Отмена"),
        buttonType: ButtonType.light,
        isDisabled: false,
        isLoad: false,
        size: CommonSize.Medium,
      },
      {
        children: "Сохранить",
        onClick: () => alert("Сохранить"),
        buttonType: ButtonType.default,
        isDisabled: false,
        isLoad: false,
        size: CommonSize.Medium,
      },
    ],
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalFooter>;

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
        <strong>ModalFooter</strong> — кнопки действий модального окна
      </div>
      <ModalFooter {...args} />
      <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
        footerButtons: <b>{args.footerButtons.length}</b> кнопки
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Интерактивный ModalFooter\n\nМеняйте массив footerButtons через controls справа.",
      },
    },
  },
};
