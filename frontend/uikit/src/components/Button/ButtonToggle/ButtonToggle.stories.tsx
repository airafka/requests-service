import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ButtonToggle } from "./index";
import { ToggleSize, ToggleColor, ToggleOption } from "./types";

const meta: Meta<typeof ButtonToggle> = {
  title: "UIKIT/ButtonToggle",
  component: ButtonToggle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    exclusive: {
      control: "boolean",
      description:
        "Позволяет выбрать только один элемент (true) или несколько (false)",
    },
    disabled: {
      control: "boolean",
      description: "Отключает все кнопки в группе",
    },
    fullWidth: {
      control: "boolean",
      description: "Растягивает компонент на всю ширину контейнера",
    },
    size: {
      control: "select",
      options: Object.values(ToggleSize),
      description: "Размер компонента",
    },
    color: {
      control: "select",
      options: Object.values(ToggleColor),
      description: "Цвет выбранного элемента",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonToggle>;

const WithStateWrapper = (args: any) => {
  const [value, setValue] = useState<string>(args.value);

  return (
    <ButtonToggle
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue as string);
        console.log("Selected value:", newValue);
      }}
    />
  );
};

const MultiSelectWrapper = (args: any) => {
  const [value, setValue] = useState<string[]>(args.value || []);

  return (
    <ButtonToggle
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue as string[]);
        console.log("Selected values:", newValue);
      }}
    />
  );
};

const hierarchyOptions: ToggleOption[] = [
  { value: "without", label: "Без иерархии" },
  { value: "with", label: "С иерархией" },
];

export const Default: Story = {
  render: WithStateWrapper,
  args: {
    options: hierarchyOptions,
    value: "without",
    exclusive: true,
    size: ToggleSize.medium,
    color: ToggleColor.standard,
  },
};

export const WithIcons: Story = {
  render: WithStateWrapper,
  args: {
    options: [
      {
        value: "list",
        label: "Список",
        icon: <span>📋</span>,
      },
      {
        value: "grid",
        label: "Сетка",
        icon: <span>⊞</span>,
      },
      {
        value: "table",
        label: "Таблица",
        icon: <span>☰</span>,
      },
    ],
    value: "list",
    exclusive: true,
  },
};

export const MultiSelect: Story = {
  render: MultiSelectWrapper,
  args: {
    options: [
      { value: "bold", label: "Жирный" },
      { value: "italic", label: "Курсив" },
      { value: "underline", label: "Подчеркнутый" },
    ],
    value: [],
    exclusive: false,
    size: ToggleSize.medium,
  },
};

export const SmallSize: Story = {
  render: WithStateWrapper,
  args: {
    options: hierarchyOptions,
    value: "without",
    size: ToggleSize.small,
  },
};

export const LargeSize: Story = {
  render: WithStateWrapper,
  args: {
    options: hierarchyOptions,
    value: "without",
    size: ToggleSize.large,
  },
};

export const FullWidth: Story = {
  render: (args) => (
    <div style={{ width: "400px" }}>
      <WithStateWrapper {...args} />
    </div>
  ),
  args: {
    options: hierarchyOptions,
    value: "without",
    fullWidth: true,
  },
};

export const Vertical: Story = {
  render: WithStateWrapper,
  args: {
    options: hierarchyOptions,
    value: "without",
  },
};

export const WithDisabledOption: Story = {
  render: WithStateWrapper,
  args: {
    options: [
      { value: "option1", label: "Опция 1" },
      { value: "option2", label: "Опция 2 (отключена)", disabled: true },
      { value: "option3", label: "Опция 3" },
    ],
    value: "option1",
  },
};

export const AllDisabled: Story = {
  render: WithStateWrapper,
  args: {
    options: hierarchyOptions,
    value: "without",
    disabled: true,
  },
};

export const FourOptions: Story = {
  render: WithStateWrapper,
  args: {
    options: [
      { value: "day", label: "День" },
      { value: "week", label: "Неделя" },
      { value: "month", label: "Месяц" },
      { value: "year", label: "Год" },
    ],
    value: "week",
  },
};

export const ColorVariants: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {Object.values(ToggleColor).map((color) => (
        <div key={color}>
          <p style={{ marginBottom: "8px", fontSize: "12px", color: "#666" }}>
            Color: {color}
          </p>
          <WithStateWrapper {...args} color={color} />
        </div>
      ))}
    </div>
  ),
  args: {
    options: hierarchyOptions,
    value: "without",
  },
};
