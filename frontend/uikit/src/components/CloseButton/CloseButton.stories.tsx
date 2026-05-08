import type { Meta, StoryObj } from "@storybook/react";
import { CloseButton } from "./CloseButton";

const meta: Meta<typeof CloseButton> = {
    title: "UIKIT/CloseButton",
    component: CloseButton,
    args: {
        onClick: () => console.log("Close button clicked"),
        top: 10,
        right: 10,
    },
    argTypes: {
        onClick: {
            description: "Обработчик клика по кнопке",
            action: "clicked",
            table: {
                type: { summary: "() => void" },
            },
        },
        top: {
            description: "Отступ сверху в пикселях",
            control: { type: "number", min: 0, max: 100, step: 1 },
            table: {
                type: { summary: "number" },
                defaultValue: { summary: "10" },
            },
        },
        right: {
            description: "Отступ справа в пикселях",
            control: { type: "number", min: 0, max: 100, step: 1 },
            table: {
                type: { summary: "number" },
                defaultValue: { summary: "10" },
            },
        },
    },
    parameters: {
        docs: {
            description: {
                component: `
## Описание

**CloseButton** — компонент кнопки закрытия с единообразным интерфейсом. Используется для закрытия модальных окон, карточек, панелей и других элементов интерфейса.

Компонент предоставляет настраиваемое позиционирование и визуальную обратную связь при взаимодействии.

## Пропсы

| Пропс | Тип | Описание | По умолчанию |
|-------|-----|----------|--------------|
| \`onClick\` | \`() => void\` | Обработчик клика по кнопке | \`undefined\` |
| \`top\` | \`number\` | Отступ сверху в пикселях | \`10\` |
| \`right\` | \`number\` | Отступ справа в пикселях | \`10\` |

## Примеры использования

### Базовое использование
\`\`\`tsx
<CloseButton 
    onClick={handleClose}
    top={10}
    right={10}
/>
\`\`\`
## Особенности

### 🎯 **Абсолютное позиционирование**
Компонент позиционируется абсолютно относительно ближайшего позиционированного родителя.

### 🎨 **Визуальные эффекты**
- Тонкая граница с эффектами при наведении и фокусе
- Адаптация под текущую тему приложения
- Встроенная SVG иконка CloseToggle

### 🎨 **Тематизация**
Автоматическая адаптация цветов под текущую тему приложения.

## Интеграция с модальными окнами

CloseButton часто используется в модальных окнах:

\`\`\`tsx
const Modal = ({ onClose, children }) => (
    <div style={{ position: "relative" }}>
        <CloseButton onClick={onClose} top={10} right={10} />
        {children}
    </div>
);
\`\`\`
                `,
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CloseButton>;

export const Default: Story = {
    args: {
        onClick: () => console.log("Close button clicked"),
        top: 10,
        right: 10,
    },
    render: (args) => {
        return (
            <div
                style={{
                    padding: "20px",
                    border: "2px dashed #ccc",
                    borderRadius: "8px",
                    backgroundColor: "#f9f9f9",
                    minHeight: "200px",
                    position: "relative",
                }}>
                <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
                    📦 <strong>Контейнер для демонстрации</strong>
                </div>
                <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
                    Отступ сверху: {args.top}px | Отступ справа: {args.right}px
                </div>
                <div
                    style={{
                        marginBottom: "12px",
                        fontSize: "11px",
                        color: "#666",
                        fontStyle: "italic",
                    }}>
                    💡 Нажмите на кнопку закрытия, чтобы увидеть действие в консоли
                </div>
                <CloseButton {...args} />
                <div style={{ marginTop: "20px", fontSize: "12px", color: "#999" }}>
                    Контейнер для демонстрации позиционирования CloseButton
                </div>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "## Стандартный CloseButton с базовыми настройками",
            },
        },
    },
};
