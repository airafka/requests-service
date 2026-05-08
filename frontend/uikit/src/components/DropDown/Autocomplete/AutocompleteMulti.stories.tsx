import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { colorBadge } from "@/components/Badge";
import { AutocompleteMulti } from "./AutocompleteMulti";

const meta: Meta<typeof AutocompleteMulti> = {
  title: "UIKIT/DropDown/AutocompleteMulti",
  component: AutocompleteMulti,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
AutocompleteMulti — компонент для поиска и выбора нескольких значений из списка опций с поддержкой ввода, фильтрации и чекбоксов.

---

## Как работает AutocompleteMulti в Storybook

**В Storybook компонент AutocompleteMulti используется напрямую, без интеграции с внешними справочниками. Все данные для выбора (options) передаются через пропс options прямо в сторибуке.**

### Цепочка действий:
1. Вы объявляете компонент AutocompleteMulti в файле сторибука (AutocompleteMulti.stories.tsx).
2. Передаёте пропсы (например, options, value, onChange и т.д.) через args или напрямую в JSX.
3. options — это массив объектов с полями value и label.
4. Компонент отображает поле ввода с выпадающим списком опций, поддерживает поиск по вводу и множественный выбор.
5. onChange — функция, которая вызывается при изменении выбранных значений.
6. handleInput — функция, которая вызывается при изменении текста в поле ввода.
7. Все остальные пропсы (placeholder, error, isLoading и т.д.) управляются через controls в Storybook.

### Пример использования:

~~~tsx
const [value, setValue] = useState([]);
const [inputValue, setInputValue] = useState("");

<AutocompleteMulti
  options={[
    { value: "one", label: "Один" },
    { value: "two", label: "Два" },
    { value: "three", label: "Три" }
  ]}
  value={value}
  onChange={setValue}
  inputValue={inputValue}
  handleInput={setInputValue}
  placeholder="Поиск..."
/>
~~~

---

## Пропсы

| Пропс              | Тип                              | Описание                                                                                   | По умолчанию |
|--------------------|----------------------------------|--------------------------------------------------------------------------------------------|--------------|
| **options**        | Массив объектов с value и label  | Массив опций для выбора. Каждый объект должен иметь поля value и label.                   | —            |
| **value**          | массив объектов                  | Текущие выбранные значения (массив объектов из options).                                  | —            |
| **onChange**       | (value) => void                  | Функция, вызываемая при изменении выбранных значений.                                     | —            |
| **inputValue**     | строка                           | Текущий текст в поле ввода.                                                               | —            |
| **handleInput**    | (value) => void                  | Функция, вызываемая при изменении текста в поле ввода.                                    | —            |
| **placeholder**    | строка                           | Текст-плейсхолдер в поле ввода.                                                           | "Выберите"   |
| **error**          | boolean                          | Включает ошибочное состояние (красная подсветка). По умолчанию — false.                   | false        |
| **isDisable**      | boolean                          | Отключает автокомплит (делает его неактивным). По умолчанию — false.                      | false        |
| **isLoading**      | boolean                          | Показывает состояние загрузки (спиннер). По умолчанию — false.                            | false        |
| **isFilter**       | boolean                          | Включает режим фильтрации (отображение иконки фильтра). По умолчанию — true.               | true         |
| **translatePath**  | строка                           | Путь для локализации значений options (если используется).                                | —            |
| **fieldName**           | строка                           | Имя поля (например, для тестирования или интеграции с формами).                           | —            |
| **dataTestId**          | строка                           | Имя для автотестов (data-test-id).                                                        | —            |
| **style**          | CSSProperties                    | Дополнительные стили для компонента.                                                      | —            |
| **handleItemLoad** | (element) => void                | Колбэк для загрузки элементов списка.                                                     | —            |
| **handleListLoad** | (element) => void                | Колбэк для загрузки списка.                                                               | —            |
| **withoutClearIcon**     | boolean                    | Отключает иконку и возможность удаления выбранного свойства одним кликом. По умолчанию — true.                            | true        |
| **label**          | string       | —                 | Текст лейбла над полем ввода. |
| **hintText**       | string       | —                 | Подсказка под полем ввода (для ошибок или дополнительной информации). |
| **colors**       | обьект или null       | —                 | Обьект с цветами|
| **isTable**     | boolean                    | Переход на табличную вариацию autocompletemulti. По умолчанию — false.                            | false        |
---

### Пример options:
[ { value: "one", label: "Один" }, { value: "two", label: "Два" }, { value: "three", label: "Три" } ]

---
`,
      },
    },
  },
  argTypes: {
    options: {
      description: "Опции для выбора (массив объектов с value и label)",
      control: "object",
      table: { type: { summary: "Array<{value: string, label: string}>" } },
    },
    value: {
      description: "Выбранные значения (массив объектов)",
      control: "object",
      table: { type: { summary: "Array<{value: string, label: string}>" } },
    },
    inputValue: {
      description: "Текст в поле ввода",
      control: "text",
      table: { type: { summary: "string" } },
    },
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
    isFilter: {
      description: "Режим фильтрации",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "true" },
      },
    },
    label: {
      description: "Текст лейбла над полем",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    hintText: {
      description:
        "Подсказка под полем (для ошибок или дополнительной информации)",
      control: "text",
      table: {
        type: { summary: "string" },
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
    colors: {
      borderColor: {
        default: {
          control: "string",
        },
        hover: {
          control: "string",
        },
        focus: {
          control: "string",
        }
      },
      chevron: {
        control: "string",
      }
    },
    isTable: {
      control: 'boolean'
    }
  },
  args: {
    colors: {
      borderColor: {
        default: undefined,
        hover: undefined,
        focus: undefined,
      },
      chevron: undefined,
    }
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AutocompleteMulti>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutocompleteMultiWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || []);
  const [inputValue, setInputValue] = useState(args.inputValue || "");

  return (
    <AutocompleteMulti
      {...args}
      value={value}
      onChange={setValue}
      inputValue={inputValue}
      handleInput={setInputValue}
    />
  );
};

export const Default: Story = {
  args: {
    options: [
      { value: "one", label: "Один" },
      { value: "two", label: "Два" },
      { value: "three", label: "Три" },
      { value: "four", label: "Четыре" },
      { value: "five", label: "Пять" },
    ],
    value: [],
    inputValue: "",
    placeholder: "Поиск...",
    error: false,
    isDisable: false,
    isLoading: false,
    isFilter: true,
  },
  render: (args) => (
    <div
      style={{
        padding: "32px",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        minHeight: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        position: "relative",
        width: 400,
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>AutocompleteMulti</strong> — поиск и множественный выбор
      </div>
      <div style={{ width: "100%" }}>
        <AutocompleteMultiWrapper {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, placeholder, error, isDisable, isLoading, isFilter через controls справа.",
      },
    },
  },
};

export const WithOptionsBages: Story = {
  args: {
    options: [
      { value: "active", label: "Активный" },
      { value: "disabled", label: "Неактивный" },
      { value: "default", label: "Обычный" },
    ],
    value: [],
    inputValue: "",
    placeholder: "Поиск...",
    error: false,
    isDisable: false,
    isLoading: false,
    isFilter: true,
    withOptionsBadges: true,
    optionsToBadgeColors: {
      active: colorBadge.green,
      disabled: colorBadge.red,
    },
  },
  render: (args) => (
    <div
      style={{
        padding: "32px",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        minHeight: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        position: "relative",
        width: 400,
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>AutocompleteMulti</strong> — поиск и множественный выбор
      </div>
      <div style={{ width: "100%" }}>
        <AutocompleteMultiWrapper {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, placeholder, error, isDisable, isLoading, isFilter через controls справа.",
      },
    },
  },
};

export const WithCustomOpener: Story = {
  args: {
    options: [
      { value: "one", label: "Один" },
      { value: "two", label: "Два" },
      { value: "three", label: "Три" },
      { value: "four", label: "Четыре" },
      { value: "five", label: "Пять" },
    ],
    value: [],
    inputValue: "",
    isLoading: false,
    customOpener: ({ isOpen, setAnchorRef, onClick }) => (
      <button ref={setAnchorRef} onClick={onClick}>
        Произвольный открывающий элемент{isOpen && " (открыт)"}
      </button>
    ),
  },
  render: (args) => (
    <div
      style={{
        padding: "32px",
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        minHeight: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        position: "relative",
        width: 400,
      }}
    >
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>AutocompleteMulti</strong> с произвольным открывающим элементом
      </div>
      <div style={{ width: "100%" }}>
        <AutocompleteMultiWrapper {...args} />
      </div>
    </div>
  ),
};
