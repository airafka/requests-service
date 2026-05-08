import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { colorBadge } from "@/components/Badge";
import { Autocomplete } from "./Autocomplete";
import { useToken } from '@/theme'

const meta: Meta<typeof Autocomplete> = {
  title: "UIKIT/DropDown/Autocomplete",
  component: Autocomplete,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
Autocomplete — компонент для поиска и выбора одного значения из списка опций с поддержкой ввода и фильтрации.

---

## Как работает Autocomplete в Storybook

**В Storybook компонент Autocomplete используется напрямую, без интеграции с внешними справочниками. Все данные для выбора (options) передаются через пропс options прямо в сторибуке.**

### Цепочка действий:
1. Вы объявляете компонент Autocomplete в файле сторибука (Autocomplete.stories.tsx).
2. Передаёте пропсы (например, options, selectedValue, inputValue, onChange и т.д.) через args или напрямую в JSX.
3. options — это массив объектов с обязательным полем id и опциональным code.
4. Компонент отображает поле ввода с выпадающим списком опций, поддерживает поиск по вводу.
5. onChange — функция, которая вызывается при изменении выбранного значения.
6. handleInput — функция, которая вызывается при изменении текста в поле ввода.
7. Все остальные пропсы (placeholder, error, isLoading и т.д.) управляются через controls в Storybook.

### Пример использования:

~~~tsx
const [selectedValue, setSelectedValue] = useState(null);
const [inputValue, setInputValue] = useState("");

<Autocomplete
  options={[
    { id: "1", code: "one" },
    { id: "2", code: "two" },
    { id: "3", code: "three" }
  ]}
  selectedValue={selectedValue}
  setSelectedValue={setSelectedValue}
  inputValue={inputValue}
  handleInput={setInputValue}
  placeholder="Поиск..."
  onChange={(value) => { /* обработка выбора */ }}
/>
~~~

---

## Пропсы

| Пропс              | Тип                              | Описание                                                                                   | По умолчанию |
|--------------------|----------------------------------|--------------------------------------------------------------------------------------------|--------------|
| **options**        | Массив объектов с id и code      | Массив опций для выбора. Каждый объект должен иметь поле id (обязательно) и code (опционально). | —            |
| **selectedValue**  | объект или null                  | Текущее выбранное значение (объект из options или null).                                  | —            |
| **setSelectedValue**| (value) => void                 | Функция для установки выбранного значения.                                                | —            |
| **inputValue**     | строка                           | Текущий текст в поле ввода.                                                               | —            |
| **handleInput**    | (value) => void                  | Функция, вызываемая при изменении текста в поле ввода.                                    | —            |
| **placeholder**    | строка                           | Текст-плейсхолдер в поле ввода.                                                           | —            |
| **onChange**       | (value) => void                  | Колбэк, вызывается при изменении выбранного значения.                                     | —            |
| **onClear**        | () => void                       | Колбэк, вызывается при очистке поля.                                                      | —            |
| **error**          | boolean                          | Включает ошибочное состояние (красная подсветка). По умолчанию — false.                   | false        |
| **isDisable**      | boolean                          | Отключает автокомплит (делает его неактивным). По умолчанию — false.                      | false        |
| **isLoading**      | boolean                          | Показывает состояние загрузки (спиннер). По умолчанию — false.                            | false        |
| **translatePath**  | строка                           | Путь для локализации значений options (если используется).                                | —            |
| **renderValuePrimary** | строка                       | Поле объекта для отображения как основное значение.                                       | —            |
| **renderValueSecondary** | строка                     | Поле объекта для отображения как дополнительное значение.                                 | —            |
| **fieldName**      | строка                           | Имя поля (например, для тестирования или интеграции с формами).                           | —            |
| **dataTestId**  | строка                              | Имя для автотестов (data-test-id).                                                        | —            |
| **withoutClearIcon**     | boolean                    | Отключает иконку и возможность удаления выбранного свойства одним кликом. По умолчанию — true.                            | true        |
| **label**          | string       | —                 | Текст лейбла над полем ввода. |
| **hintText**       | string       | —                 | Подсказка под полем ввода (для ошибок или дополнительной информации). |
| **colors**       | обьект или null       | —                 | Обьект с цветами|
| **isTable**     | boolean                    | Переход на табличную вариацию autocomplete. По умолчанию — false.                            | false        |

---

### Пример options:
[ { id: "1", code: "one" }, { id: "2", code: "two" }, { id: "3", code: "three" } ]

---
`,
      },
    },
  },
  argTypes: {
    options: {
      description: "Опции для выбора (массив объектов с id и code)",
      control: "object",
      table: { type: { summary: "Array<{id: string, code?: string}>" } },
    },
    selectedValue: {
      description: "Выбранное значение",
      control: "object",
      table: { type: { summary: "object или null" } },
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
        default: {
          control: "string",
        },
        hover: {
          control: "string",
        },
      },
    },
    isTable: {
      control: "boolean",
    }
  },
  args: {
    colors: {
      borderColor: {
        default: undefined,
        hover: undefined,
        focus: undefined,
      },
      chevron: {
        default: undefined,
        hover: undefined,
      },
    }
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AutocompleteWrapper = (args: any) => {
  const [selectedValue, setSelectedValue] = useState(args.selectedValue);
  const [inputValue, setInputValue] = useState(args.inputValue || "");

  return (
    <Autocomplete
      {...args}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      inputValue={inputValue}
      handleInput={setInputValue}
    />
  );
};

export const Default: Story = {
  args: {
    options: [
      { id: "1", code: "one" },
      { id: "2", code: "two" },
      { id: "3", code: "three" },
      { id: "4", code: "four" },
      { id: "5", code: "five" },
    ],
    selectedValue: null,
    inputValue: "",
    placeholder: "Поиск...",
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
        <strong>Autocomplete</strong> — поиск и выбор значения
      </div>
      <div style={{ width: "100%" }}>
        <AutocompleteWrapper {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, placeholder, error, isDisable, isLoading через controls справа.",
      },
    },
  },
};

export const WithOptionsBages: Story = {
  args: {
    options: [
      { id: "active", code: "Активный" },
      { id: "disabled", code: "Неактивный" },
      { id: "default", code: "Обычный" },
    ],
    selectedValue: null,
    inputValue: "",
    placeholder: "Поиск...",
    error: false,
    isDisable: false,
    isLoading: false,
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
        <strong>Autocomplete</strong> — поиск и выбор значения
      </div>
      <div style={{ width: "100%" }}>
        <AutocompleteWrapper {...args} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, placeholder, error, isDisable, isLoading через controls справа.",
      },
    },
  },
};

export const WithCustomOpener: Story = {
  args: {
    options: [
      { id: "1", code: "one" },
      { id: "2", code: "two" },
      { id: "3", code: "three" },
      { id: "4", code: "four" },
      { id: "5", code: "five" },
      { id: "6", code: "six" },
      { id: "7", code: "seven" },
      { id: "8", code: "eight" },
      { id: "9", code: "nine" },
      { id: "10", code: "ten" },
    ],
    selectedValue: null,
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
        <strong>Autocomplete</strong> с произвольным открывающим элементом
      </div>
      <div style={{ width: "100%" }}>
        <AutocompleteWrapper {...args} />
      </div>
    </div>
  ),
};
