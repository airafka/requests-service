import type { Meta, StoryObj } from "@storybook/react";
import { ModalHeader } from "./ModalHeader";

const meta: Meta<typeof ModalHeader> = {
    title: "UIKIT/Modal/ModalHeader",
    component: ModalHeader,
    parameters: {
        docs: {
            description: {
                component: `
## Описание

**ModalHeader** — компонент для заголовков модальных окон, основанный на Typography из Material-UI.

Обеспечивает единообразное отображение заголовков во всех модальных окнах приложения с кастомными стилями, соответствующими дизайн-системе.

## Пропсы

| Пропс            | Тип                    | Описание                                                                                   |
|------------------|------------------------|--------------------------------------------------------------------------------------------|
| \`children\`      | \`ReactNode\`           | Содержимое заголовка (обычно текст).                                                      |

## Особенности

- **Типизация**: основан на Typography из Material-UI
- **Стилизация**: кастомные стили в соответствии с дизайн-системой
- **Доступность**: автоматическая семантика заголовка
- **Гибкость**: поддерживает любой ReactNode в качестве содержимого

## Пример
\`\`\`tsx
<ModalHeader>Заголовок модального окна</ModalHeader>
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        children: {
            description: "Содержимое заголовка",
            control: "text",
            table: {
                type: { summary: "ReactNode" },
            },
        },
    },
    args: {
        children: "Заголовок модального окна",
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModalHeader>;

export const Controls: Story = {
    render: (args) => (
        <div
            style={{
                padding: "32px",
                border: "2px dashed #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                minHeight: "60px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px",
            }}>
            <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
                <strong>ModalHeader</strong> — заголовок модального окна
            </div>
            <ModalHeader {...args} />
            <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
                children: <b>{String(args.children)}</b>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "## Интерактивный ModalHeader\n\nМеняйте содержимое заголовка через controls справа.",
            },
        },
    },
};
