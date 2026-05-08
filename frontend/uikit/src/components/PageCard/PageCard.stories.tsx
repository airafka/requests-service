import type { Meta, StoryObj } from "@storybook/react";
import PageCard from "./PageCard";

/**
 * PageCard — компонент карточки страницы в приложении
 *
 * Предоставляет базовый контейнер для контента страниц с единообразным стилем.
 * Поддерживает произвольное содержимое.
 */
const meta: Meta<typeof PageCard> = {
    title: "UIKIT/PageCard",
    component: PageCard,
    parameters: {
        docs: {
            description: {
                component: `
## Описание
PageCard — это базовый компонент карточки для отображения контента на страницах.
Он обеспечивает единообразный стиль для всех карточек с поддержкой различных размеров и содержимого.

- **Белый фон**: использует цвет white из темы
- **Скругленные углы**: радиус скругления 5px
- **Отступы**: внутренние отступы 8px сверху/снизу, 16px слева/справа
- **Высота**: занимает 100% высоты родительского контейнера
- **Прокрутка**: автоматическая прокрутка при переполнении содержимого
- **Гибкость**: поддерживает любой React контент

## Пропсы

| Пропс      | Тип         | Описание                                                        | По умолчанию |
|-----------|-------------|-----------------------------------------------------------------|--------------|
| children  | ReactNode   | Содержимое карточки. Можно вставлять любой JSX/HTML.             | —            |

`,
            },
        },
    },
    argTypes: {
        children: {
            description:
                "Содержимое карточки (ReactNode). Можно вставлять HTML/JSX для демонстрации любых кейсов.",
            control: "text",
            table: {
                type: { summary: "ReactNode" },
                defaultValue: {
                    summary:
                        "<div><h3>Заголовок карточки</h3><p>Это содержимое карточки страницы. Здесь может быть любой контент.</p></div>",
                },
            },
        },
    },
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PageCard>;

export const Controls: Story = {
    args: {
        children: `<div><h3>Заголовок карточки</h3><p>Это содержимое карточки страницы. Здесь может быть любой контент.</p></div>`,
    },
    render: (args) => {
        let children: React.ReactNode = args.children;
        if (typeof children === "string") {
            try {
                children = <div dangerouslySetInnerHTML={{ __html: children }} />;
            } catch {
                children = args.children;
            }
        }
        return (
            <div
                style={{
                    minHeight: 320,
                    minWidth: 320,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#f5f7fa",
                    padding: 32,
                    borderRadius: 12,
                    position: "relative",
                }}>
                <PageCard>
                    {children}
                </PageCard>
            </div>
        );
    },
    parameters: {
        docs: {
            description: {
                story: "Меняйте содержимое через controls справа. Для демонстрации различных кейсов (таблица, код, длинный текст и т.д.) вставляйте HTML/JSX в поле children.",
            },
        },
    },
};
