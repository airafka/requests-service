import type { Meta, StoryObj } from "@storybook/react";
import TextLabel from "./TextLabel";
import { FontWeight } from "./types";

const meta: Meta<typeof TextLabel> = {
  title: "UIKIT/TextLabel",
  component: TextLabel,
  args: {
    size: 14,
    weight: FontWeight.Regular,
    text: "Текст лейбла",
    required: false,
    withColon: true,
    error: false,
  },
  argTypes: {
    size: {
      description: "Размер шрифта лейбла в пикселях",
      control: "select",
      options: [8, 10, 12, 14, 16, 20, 24],
    },
    weight: {
      description: "Вес шрифта лейбла",
      control: "select",
      options: ["Regular", "Medium", "Semibold"],
      mapping: {
        Regular: FontWeight.Regular,
        Medium: FontWeight.Medium,
        Semibold: FontWeight.Semibold,
      },
    },
    text: {
      description: "Текст лейбла для отображения",
      control: "text",
    },
    required: {
      description:
        "Показывает ли лейбл обязательное поле (добавляет звездочку)",
      control: "boolean",
    },
    withColon: {
      description: "Добавлять ли двоеточие после текста",
      control: "boolean",
    },
    error: {
      description: "Отображать ли лейбл в состоянии ошибки",
      control: "boolean",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**TextLabel** — компонент для отображения текстовых лейблов в формах и интерфейсе. Предназначен для создания подписей к полям ввода, заголовков секций и других текстовых элементов с единообразным стилем.

Компонент автоматически добавляет двоеточие после текста (если включено) и звездочку для обязательных полей, обеспечивая консистентность интерфейса.

## Назначение

- **Подписи к полям форм** - основной случай использования
- **Заголовки секций** - для группировки связанных элементов
- **Описательные тексты** - для пояснения функциональности
- **Навигационные элементы** - для обозначения разделов

## Размеры шрифтов

| Размер | Применение |
|--------|------------|
| 8px    | Микротекст, сноски, очень компактные интерфейсы |
| 10px   | Компактные интерфейсы, ограниченное пространство |
| 12px   | Вспомогательный текст, подсказки |
| 14px   | Стандартный размер, по умолчанию |
| 16px   | Увеличенный размер для лучшей читаемости |
| 20px   | Заголовки секций, акценты |
| 24px   | Основные заголовки, крупные акценты |

## Веса шрифтов

| Вес | Применение |
|-----|------------|
| Regular (400) | Обычные подписи, стандартный текст |
| Medium (500) | Важные элементы, акценты |
| Semibold (600) | Заголовки, критически важная информация |

## Пропсы

| Пропс | Тип | Описание | По умолчанию |
|-------|-----|----------|--------------|
| \`size\` | \`number\` | Размер шрифта в пикселях | \`14\` |
| \`weight\` | \`FontWeight\` | Вес шрифта (Regular, Medium, Semibold) | \`FontWeight.Regular\` |
| \`text\` | \`string\` | Текст для отображения | \`""\` |
| \`required\` | \`boolean\` | Добавляет звездочку для обязательных полей | \`false\` |
| \`withColon\` | \`boolean\` | Добавляет двоеточие после текста | \`true\` |
| \`error\` | \`boolean\` | Отображает лейбл в состоянии ошибки | \`false\` |
| \`className\` | \`string\` | Имя класса из стилей компонента для кастомизации | \`""\` |

## Примеры использования
\`\`\`tsx
<TextLabel 
    text="Имя пользователя" 
    size={14} 
    weight={FontWeight.Regular} 
/>
\`\`\`
## Рекомендации по использованию

1. **Консистентность размеров** - используйте одинаковые размеры для связанных элементов
2. **Обязательные поля** - всегда используйте \`required={true}\` для обязательных полей
3. **Двоеточие** - включайте для подписей к полям, отключайте для заголовков
4. **Доступность** - используйте семантически правильные размеры для лучшей читаемости

## Интеграция с формами

TextLabel часто используется в паре с полями ввода:

\`\`\`tsx
<div>
    <TextLabel 
        text="Имя" 
        required={true} 
        size={14} 
    />
    <input 
        type="text" 
        placeholder="Введите ваше имя" 
    />
</div>
\`\`\`
                `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TextLabel>;

export const Default: Story = {
  args: {
    size: 14,
    weight: FontWeight.Regular,
    text: "Текст лейбла",
    required: false,
    withColon: true,
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story: "## Стандартный TextLabel с возможностью изменения всех пропсов через контролы",
      },
    },
  },
};
