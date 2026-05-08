import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./";
import { ModalHeader } from "./ModalHeader";
import { ModalFooter } from "./ModalFooter";
import { ButtonType } from "../Button/BaseButton";
import { useState } from "react";

const meta: Meta<typeof Modal> = {
  title: "UIKIT/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**Modal** — основной компонент модального окна в приложении, предоставляющий единообразный интерфейс для всех модальных окон.

Основан на Material-UI Modal с кастомными стилями, соответствующими дизайн-системе приложения. Компонент поддерживает различные размеры, заголовки, футеры и автоматическое закрытие.

## Пропсы

| Пропс            | Тип                    | Описание                                                                                   |
|------------------|------------------------|--------------------------------------------------------------------------------------------|
| \`open\`           | \`boolean\`              | Открыто ли модальное окно. По умолчанию — \`false\`.                                      |
| \`onClose\`       | \`() => void\`          | Обработчик закрытия модального окна.                                                      |
| \`height\`        | \`string \\| number\`   | Кастомная высота модального окна. По умолчанию — \`"100%"\`.                              |
| \`children\`      | \`ReactNode\`           | Содержимое модального окна.                                                               |

## Особенности

- **Автоматическое закрытие**: по клику вне окна или по Escape
- **Кнопка закрытия**: встроенная кнопка в правом верхнем углу
- **Прокрутка**: автоматическая прокрутка при переполнении содержимого
- **Размеры**: настраиваемая высота и фиксированная ширина 588px
- **Позиционирование**: центрирование по вертикали и горизонтали
- **Стилизация**: кастомные скроллбары и скругленные углы

## Компоненты

### ModalHeader
Компонент для заголовков модальных окон с типизацией Typography.

### ModalFooter
Компонент для кнопок действий в футере модального окна с поддержкой различных типов кнопок и состояний.

## Примеры использования

### Базовое модальное окно
\`\`\`tsx
<Modal open={isOpen} onClose={handleClose}>
  <div>Содержимое модального окна</div>
</Modal>
\`\`\`

### Модальное окно с заголовком и кнопками
\`\`\`tsx
<Modal open={isOpen} onClose={handleClose}>
  <ModalHeader>Заголовок</ModalHeader>
  <div>Содержимое</div>
  <ModalFooter
    footerButtons={[
      { children: "Отмена", onClick: handleCancel, buttonType: ButtonType.light },
      { children: "Сохранить", onClick: handleSave, buttonType: ButtonType.default }
    ]}
  />
</Modal>
\`\`\`
                `,
      },
    },
  },
  argTypes: {
    height: {
      description: "Кастомная высота модального окна",
      control: "text",
      table: {
        type: { summary: "string | number" },
        defaultValue: { summary: "100%" },
      },
    },
    children: {
      description: "Содержимое модального окна",
      control: false,
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
  args: {
    height: "100%",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3472ED",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Открыть модальное окно
        </button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          height={args.height}
        >
          <div style={{ padding: "20px" }}>
            <h3>Простое модальное окно</h3>
            <p>Это базовый пример модального окна с простым содержимым.</p>
            <p>
              Модальное окно можно закрыть кликом вне окна, по Escape или
              кнопкой закрытия.
            </p>
          </div>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Базовый пример Modal с простым содержимым",
      },
    },
  },
};

export const FullModal: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#3472ED",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Открыть полную модалку
        </button>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          height={args.height}
        >
          <>
            <ModalHeader>Заголовок модального окна</ModalHeader>
            <div style={{ padding: "0 20px", flex: 1 }}>
              <p>
                Это полноценное модальное окно с заголовком, содержимым и
                кнопками действий.
              </p>
              <p>
                Используйте ModalHeader для заголовка и ModalFooter для кнопок.
              </p>
            </div>
            <ModalFooter
              footerButtons={[
                {
                  children: "Отмена",
                  onClick: () => setIsOpen(false),
                  buttonType: ButtonType.light,
                },
                {
                  children: "Сохранить",
                  onClick: () => {
                    alert("Сохранено!");
                    setIsOpen(false);
                  },
                  buttonType: ButtonType.default,
                },
              ]}
            />
          </>
        </Modal>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Полноценное модальное окно с ModalHeader и ModalFooter",
      },
    },
  },
};
