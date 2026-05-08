import type { Meta, StoryObj } from "@storybook/react";
import { InfoBlock } from "./InfoBlock";
import { Badge, colorBadge } from "../Badge";
import type { InfoFieldItem } from "./types";

/**
 * Story: WithBadgeAndTooltip
 *
 * Проверка выравнивания иконки подсказки (tooltip) с компонентом Badge в InfoBlock.
 * Иконка должна быть выровнена по вертикальному центру с Badge независимо от высоты строки.
 *
 * **Тест-кейсы:**
 * - Badge с tooltip (зелёный, серый, жёлтый)
 * - Обычный текст с tooltip
 * - Badge без tooltip
 * - Длинный текст в Badge с tooltip (разная высота)
 */
const meta: Meta<typeof InfoBlock> = {
  title: "UIKIT/InfoBlock",
  component: InfoBlock,
  parameters: {
    docs: {
      description: {
        story: `
Проверка вертикального выравнивания иконки подсказки с Badge в таблице InfoBlock.

**Ожидаемый результат (после фикса):**
- Иконка подсказки (?) выровнена по вертикальному центру с Badge
- Все три колонки (метка, значение, подсказка) выровнены по середине строки
- Корректно для значений и с Badge, и с обычным текстом

**Точки проверки в DevTools:**
- Ячейки таблицы: \`verticalAlign: middle\`
- Контейнер иконки: \`display: flex\`, \`alignItems: center\`, \`height: 100%\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InfoBlock>;

const fieldsWithBadgeAndTooltip: InfoFieldItem[] = [
  {
    name: "code",
    label: "Наименование",
    value: "ООО «Компания»",
  },
  {
    name: "fullName",
    label: "Полное наименование",
    value: "Общество с ограниченной ответственностью «Компания»",
  },
  {
    name: "active",
    label: "Статус",
    value: (
      <Badge color={colorBadge.green} text="Активный" />
    ),
    tooltypeLabel: "Запись актуальна и доступна для использования в работе",
  },
  {
    name: "textField",
    label: "Текстовое поле",
    value: "Обычный текст",
    tooltypeLabel: "Подсказка для текстового поля",
  },
  {
    name: "inn",
    label: "ИНН",
    value: "7707083893",
  },
  {
    name: "status",
    label: "Статус заявки",
    value: <Badge color={colorBadge.gray} text="Черновик" />,
    tooltypeLabel: "Текущий статус обработки заявки в системе",
  },
  {
    name: "badgeNoTooltip",
    label: "Без подсказки",
    value: <Badge color={colorBadge.blue} text="Принят" />,
  },
  {
    name: "orderStatus",
    label: "Статус заказа",
    value: <Badge color={colorBadge.yellow} text="На проверке" />,
    tooltypeLabel: "Заказ находится на этапе проверки документов",
  },
  {
    name: "longBadge",
    label: "Длинный текст",
    value: (
      <Badge
        color={colorBadge.red}
        text="Очень длинный статус заявки"
      />
    ),
    tooltypeLabel: "Тест с длинным текстом в Badge",
  },
];

export const WithBadgeAndTooltip: Story = {
  args: {
    name: "Основная информация",
    fields: fieldsWithBadgeAndTooltip,
  },
};

export const TwoBlocksWithBadgeAndTooltip: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <InfoBlock
        name="Основная информация"
        fields={[
          {
            name: "code",
            label: "Наименование",
            value: "ООО «Компания»",
          },
          {
            name: "fullName",
            label: "Полное наименование",
            value: "Общество с ограниченной ответственностью «Компания»",
          },
          {
            name: "active",
            label: "Статус",
            value: <Badge color={colorBadge.green} text="Активный" />,
            tooltypeLabel:
              "Запись актуальна и доступна для использования в работе",
          },
        ]}
      />
      <InfoBlock
        name="Дополнительная информация"
        fields={[
          {
            name: "inn",
            label: "ИНН",
            value: "7707083893",
          },
          {
            name: "status",
            label: "Статус заявки",
            value: <Badge color={colorBadge.gray} text="Черновик" />,
            tooltypeLabel: "Текущий статус обработки заявки в системе",
          },
          {
            name: "orderStatus",
            label: "Статус заказа",
            value: <Badge color={colorBadge.yellow} text="На проверке" />,
            tooltypeLabel:
              "Заказ находится на этапе проверки документов",
          },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Два блока по спецификации: основной и дополнительный с Badge и tooltip.",
      },
    },
  },
};
