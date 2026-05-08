import type { Meta, StoryObj } from "@storybook/react";
import Chevron from "./Chevron";
import { ChevronDirection } from "./types";

const meta: Meta<typeof Chevron> = {
    title: "UIKIT/Chevron",
    component: Chevron,
    parameters: {
        docs: {
            description: {
                component: `
## Описание

**Chevron** — универсальный компонент стрелки-шеврона, используемый для индикации направления, раскрытия/скрытия контента и навигации.

Основан на SVG иконке с CSS трансформациями для изменения направления. Поддерживает настраиваемые размеры, цвета и кастомные стили.

Используется в выпадающих списках, аккордеонах, пагинации, навигации и других интерактивных элементах интерфейса.

## Направления

| Направление | Поворот | Применение                                    |
|-------------|---------|-----------------------------------------------|
| \`DOWN\`      | 0°      | Раскрытие списков, по умолчанию              |
| \`UP\`        | 180°    | Скрытие списков, возврат наверх              |
| \`LEFT\`      | 270°    | Навигация назад, сворачивание                |
| \`RIGHT\`     | 90°     | Навигация вперед, разворачивание             |

## Размеры

| Размер | Рекомендуемое применение                    |
|--------|--------------------------------------------|
| 12px   | Компактные элементы, иконки в тексте       |
| 16px   | Стандартные выпадающие списки              |
| 24px   | Основной размер, по умолчанию              |
| 32px   | Крупные элементы, акценты                  |
| 48px   | Большие интерактивные элементы             |

## Пропсы

| Пропс            | Тип                                      | Описание                                                                                   |
|------------------|------------------------------------------|--------------------------------------------------------------------------------------------|
| \`direction\`      | \`ChevronDirection\` (\`UP\`, \`DOWN\`, \`LEFT\`, \`RIGHT\`) | Направление стрелки. По умолчанию — \`DOWN\`.                                              |
| \`size\`           | \`number\`                                 | Размер иконки в пикселях. По умолчанию — \`24\`.                                           |
| \`color\`          | \`string\`                                 | Цвет иконки (CSS цвет). Наследует цвет родителя по умолчанию.                              |
| \`customClassName\`| \`string\`                                 | Кастомные CSS-классы для дополнительной стилизации.                                        |

## Примеры использования

### Базовый шеврон
\`\`\`tsx
<Chevron direction={ChevronDirection.DOWN} />
\`\`\`
                `,
            },
        },
    },
    argTypes: {
        direction: {
            description: "Направление стрелки. Определяет поворот иконки через CSS transform",
            control: "select",
            options: ["UP", "DOWN", "LEFT", "RIGHT"],
            mapping: {
                UP: ChevronDirection.UP,
                DOWN: ChevronDirection.DOWN,
                LEFT: ChevronDirection.LEFT,
                RIGHT: ChevronDirection.RIGHT,
            },
            table: {
                type: { summary: "ChevronDirection" },
                defaultValue: { summary: "ChevronDirection.DOWN" },
            },
        },
        size: {
            description: "Размер иконки в пикселях. Влияет на width, height, minWidth и minHeight",
            control: { type: "number", min: 8, max: 64, step: 2 },
            table: {
                type: { summary: "number" },
                defaultValue: { summary: "24" },
            },
        },
        color: {
            description: "Цвет иконки (CSS цвет). Наследует цвет родителя по умолчанию.",
            control: "color",
            table: {
                type: { summary: "string" },
                defaultValue: { summary: "inherit" },
            },
        },
        hover: {
          description: "Boolean для включения hover эффекта шеврона",
          control: "boolean",
        }
      
    },
    args: {
        direction: ChevronDirection.DOWN,
    },
};

export default meta;
type Story = StoryObj<typeof Chevron>;

export const Controls: Story = {
    render: (args) => (
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
            }}>
            <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
                <strong>Chevron</strong> — универсальная стрелка
            </div>
            <Chevron {...args} />
            <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
                direction: <b>{String(args.direction)}</b>, size: <b>{args.size}</b>, color:{" "}
                <b>{args.color}</b>
            </div>
        </div>
    ),
    parameters: {
        docs: {
            description: {
                story: "## Интерактивный Chevron",
            },
        },
    },
    tags: ["autodocs"],
};
