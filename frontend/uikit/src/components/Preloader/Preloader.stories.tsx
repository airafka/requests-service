import type { Meta, StoryObj } from "@storybook/react";
import Preloader from "./Preloader";
import { preloaderSize } from "./types";

const meta: Meta<typeof Preloader> = {
  title: "UIKIT/Preloader",
  component: Preloader,
  args: {
    size: preloaderSize.regular,
  },
  argTypes: {
    size: {
      description: "Размер прелоадера",
      control: "select",
      options: ["regular", "semibold", "bold"],
      mapping: {
        regular: preloaderSize.regular,
        semibold: preloaderSize.semibold,
        bold: preloaderSize.bold,
      },
      table: {
        type: { summary: "preloaderSize" },
        defaultValue: { summary: "preloaderSize.regular" },
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**Preloader** — компонент индикатора загрузки с единообразным интерфейсом. Предоставляет анимированные индикаторы загрузки с различными размерами и стилями.

Компонент обеспечивает единообразный стиль для всех индикаторов загрузки в приложении.

## Размеры компонента

| Размер | Размеры | Применение |
|--------|---------|------------|
| Regular | 16px | Стандартный размер, по умолчанию |
| Semibold | 16px | Средний размер с более жирной иконкой |
| Bold | 32px | Большой размер для важных загрузок |

## Пропсы

| Пропс | Тип | Описание | По умолчанию |
|-------|-----|----------|--------------|
| \`size\` | \`PreloaderSize\` | Размер прелоадера | \`PreloaderSize.Regular\` |

## Примеры использования

### Базовое использование
\`\`\`tsx
<Preloader size={PreloaderSize.Regular} />
\`\`\`
## Особенности

### 🎯 **Анимация вращения**
Плавное вращение на 360 градусов с линейной анимацией.

### ⏱️ **Временные характеристики**
- Длительность: 1 секунда на полный оборот
- Бесконечное повторение
- Линейная функция анимации

### 🎨 **SVG иконки**
Кастомные SVG иконки для каждого размера:
- **Regular** - стандартная иконка
- **Semibold** - средняя жирность
- **Bold** - жирная иконка

### 🔄 **Бесконечная анимация**
Анимация повторяется бесконечно до остановки компонента.

## Рекомендации по использованию

1. **Размеры** - используйте Regular для большинства случаев, Bold для важных загрузок
2. **Контекст** - размещайте в центре загружаемого контента
3. **Доступность** - добавьте aria-label для скринридеров
4. **Консистентность** - используйте одинаковые размеры в рамках одного интерфейса
5. **Производительность** - анимация оптимизирована для плавности

## Интеграция с кнопками

Preloader часто используется в кнопках для отображения состояния загрузки:

\`\`\`tsx
const LoadingButton = ({ loading, children, onClick }) => (
    <button disabled={loading} onClick={onClick}>
        {loading && <Preloader size={PreloaderSize.Regular} />}
        {children}
    </button>
);
\`\`\`
                `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Preloader>;

export const Default: Story = {
  args: {
    size: preloaderSize.regular,
  },
  render: (args) => {
    const getSizeDescription = (size: preloaderSize) => {
      switch (size) {
        case preloaderSize.regular:
          return "Regular (16px)";
        case preloaderSize.semibold:
          return "Semibold (16px)";
        case preloaderSize.bold:
          return "Bold (32px)";
        default:
          return "Unknown";
      }
    };

    return (
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
          📦 <strong>Контейнер для демонстрации</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          Размер:{" "}
          {args.size !== undefined ? getSizeDescription(args.size) : "Unknown"}
        </div>
        <div
          style={{
            marginBottom: "20px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Прелоадер анимируется бесконечно
        </div>
        <Preloader {...args} />
        <div style={{ marginTop: "20px", fontSize: "12px", color: "#999" }}>
          Контейнер для демонстрации Preloader
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## Стандартный Preloader с базовыми настройками",
      },
    },
  },
};
