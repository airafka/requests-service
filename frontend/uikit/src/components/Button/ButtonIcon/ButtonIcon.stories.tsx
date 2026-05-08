import type { Meta, StoryObj } from "@storybook/react";
import ButtonIcon from "./ButtonIcon";
import { ButtonSize, ButtonIconType, ButtonIconColor } from "./types";
import { ChevronIcon, DateIcon, TimeIcon } from "../../../icons";

/**
 * ButtonIcon - компонент кнопки с иконкой
 *
 * Специализированная кнопка для отображения только иконки без текста.
 * Поддерживает различные размеры и типы стилей.
 */
const meta: Meta<typeof ButtonIcon> = {
  title: "UIKIT/ButtonIcon",
  component: ButtonIcon,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
ButtonIcon - это специализированный компонент кнопки, предназначенный для отображения только иконки.
Идеально подходит для панелей инструментов, навигационных элементов и действий, где важна компактность.

## Особенности
- **Только иконка**: отображает только иконку без текста
- **Различные размеры**: Small, Regular, ExtraSmall
- **Типы стилей**: Default (основной цвет) и Light (светлый)
- **Автоматическая стилизация иконки**: цвет иконки адаптируется под тип кнопки
- **Отключенный ripple эффект**: для более чистого внешнего вида
- **Тени и hover эффекты**: современный дизайн с интерактивностью
                `,
      },
    },
  },
  argTypes: {
    icon: {
      description: "React элемент иконки",
      control: false,
      table: {
        type: { summary: "React.ReactElement" },
      },
    },
    onClick: {
      description: "Обработчик клика",
      action: "clicked",
      table: {
        type: { summary: "() => void" },
      },
    },
    size: {
      description: "Размер кнопки",
      control: "select",
      options: Object.values(ButtonSize),
      table: {
        type: { summary: "ButtonSize" },
        defaultValue: { summary: "ButtonSize.Regular" },
      },
    },
    buttonType: {
      description: "Тип стиля кнопки",
      control: "select",
      options: Object.values(ButtonIconType),
      table: {
        type: { summary: "ButtonType" },
        defaultValue: { summary: "ButtonType.Light" },
      },
    },
    color: {
      description: "Цвет стиля кнопки",
      control: "select",
      options: Object.values(ButtonIconColor),
      table: {
        type: { summary: "ButtonIconColor" },
        defaultValue: { summary: "ButtonIconColor.Primary" },
      },
    },
    className: {
      description: "Дополнительные CSS классы",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ButtonIcon>;

export const Default: Story = {
  args: {
    icon: <DateIcon />,
    onClick: () => console.log("Button clicked"),
  },
  parameters: {
    docs: {
      description: {
        story: "Кнопка с иконкой по умолчанию в светлом стиле",
      },
    },
  },
};
