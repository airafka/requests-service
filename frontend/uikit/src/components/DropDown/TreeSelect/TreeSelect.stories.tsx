import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { TreeSelect } from "./TreeSelect";
import type { TreeSelectNodeBase } from "./types";

interface DemoNode extends TreeSelectNodeBase {
  code: string;
  children?: DemoNode[];
}

const meta: Meta<typeof TreeSelect<DemoNode>> = {
  title: "UIKIT/DropDown/TreeSelect",
  component: TreeSelect,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
TreeSelect — выпадающий древовидный список с поиском.

- Поиск **фильтрует дерево**, оставляя только ветки, ведущие к совпадениям.
- Выбор возможен **только на листьях исходного дерева** (узлы, у которых нет children в исходных данных).
- \`onChange\` возвращает **объект выбранного узла** или \`null\` при очистке.
`,
      },
    },
  },
  argTypes: {
    placeholder: {
      description: "Плейсхолдер",
      control: "text",
      table: { type: { summary: "string" } },
    },
    error: {
      description: "Ошибка",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isDisable: {
      description: "Отключить поле",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    isLoading: {
      description: "Состояние загрузки",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    withoutClearIcon: {
      description:
        "Отключение иконки удаления",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
      }
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TreeSelect<DemoNode>>;

const makeDemoTree = (): DemoNode[] => [
  {
    id: "1",
    code: "Уровень 1.1",
    children: [
      {
        id: "1-1",
        code: "Уровень 2.1",
        children: [
          { id: "1-1-1", code: "Уровень 3.1" },
          { id: "1-1-2", code: "Уровень 3.2" },
        ],
      },
      { id: "1-2", code: "Уровень 2.2" },
    ],
  },
  {
    id: "2",
    code: "Уровень 1.2",
    children: [
      { id: "2-1", code: "Уровень 2.1" },
      { id: "2-2", code: "Уровень 2.2" },
    ],
  },
  { id: "3", code: "Уровень 1.3" },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TreeSelectWrapper = (args: any) => {
  const options = useMemo(() => makeDemoTree(), []);
  const [selectedValue, setSelectedValue] = useState<DemoNode | null>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <TreeSelect<DemoNode>
      {...args}
      options={options}
      selectedValue={selectedValue}
      onChange={(v) => setSelectedValue(v)}
      inputValue={inputValue}
      handleInput={setInputValue}
      getOptionLabel={(n) => n.code}
    />
  );
};

export const Default: Story = {
  args: {
    placeholder: "Выберите группу номенклатуры",
    error: false,
    isDisable: false,
    isLoading: false,
  },
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
        position: "relative",
        width: 420,
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>TreeSelect</strong> — древовидный список с поиском (выбор только
        листьев)
      </div>
      <div style={{ width: "100%" }}>
        <TreeSelectWrapper {...args} />
      </div>
      <div style={{ fontSize: 12, color: "#999", marginTop: 8 }}>
        Подсказка: попробуйте поиск по “3.1”
      </div>
    </div>
  ),
};
