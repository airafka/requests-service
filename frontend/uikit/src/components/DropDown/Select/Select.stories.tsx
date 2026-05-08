import type { Meta, StoryObj } from "@storybook/react";
import { colorBadge } from "@/components/Badge";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UIKIT/DropDown/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
Select — обычный выпадающий список для выбора одного значения из массива опций.

---

## Как работает Select в Storybook

**В Storybook компонент Select используется напрямую, без интеграции с внешними справочниками. Все данные для выбора (options) передаются через пропс options прямо в сторибуке.**

### Цепочка действий:
1. Вы объявляете компонент Select в файле сторибука (Select.stories.tsx).
2. Передаёте пропсы (например, options, value, isDisable, error и т.д.) через args или напрямую в JSX.
3. options — это массив объектов вида: объект с ключами value (строка или число) и label (строка), либо просто массив строк или чисел.
4. Компонент отображает выпадающий список с этими опциями.
5. onChange — функция, которая вызывается при изменении значения (в сторибуке обычно просто обновляет value через controls).
6. Все остальные пропсы (placeholder, error, withClearButton и т.д.) управляются через controls в Storybook.

### Пример использования:

~~~tsx
<Select
  options={[
    { value: "one", label: "Один" },
    { value: "two", label: "Два" },
    { value: "three", label: "Три" }
  ]}
  value="one"
  isDisable={false}
  error={false}
  placeholder="Выберите значение"
  onChange={(val) => { /* обработка выбора */ }}
/>
~~~

---

## Пропсы

| Пропс                   | Тип                              | Описание                                                                                   | По умолчанию |
|-------------------------|----------------------------------|--------------------------------------------------------------------------------------------|--------------|
| **options**             | Массив объектов или строк/чисел  | Массив опций для выбора. Каждый элемент — либо строка/число, либо объект с ключами value (строка/число) и label (строка). | —            |
| **value**               | строка или число                 | Текущее выбранное значение. Должно совпадать с одним из value в options.                  | —            |
| **isDisable**           | boolean                          | Отключает селект (делает его неактивным для пользователя). По умолчанию — false.          | false        |
| **error**               | boolean                          | Включает ошибочное состояние (красная подсветка). По умолчанию — false.                   | false        |
| **placeholder**         | строка                           | Текст-плейсхолдер, который отображается, когда ничего не выбрано.                         | —            |
| **onChange**            | (value) => void                  | Колбэк, вызывается при изменении значения. В аргументе — новое выбранное значение.        | —            |
| **withoutClearIcon**     | boolean                    | Отключает иконку и возможность удаления выбранного свойства одним кликом. По умолчанию — true.                            | true        |
| **translatePath**       | строка                           | Путь для локализации значений options (если используется).                                | —            |
| **translate**           | (value) => string                | Кастомная функция для локализации/отображения значений options.                           | —            |
| **fieldName**           | строка                           | Имя поля (например, для тестирования или интеграции с формами).                           | —            |
| **dataTestId**          | строка                           | Имя для автотестов (data-test-id).                                                        | —            |
| **label**               | string                           | Текст лейбла над полем ввода.                                                             | —            |
| **hintText**            | string                           | Подсказка под полем ввода (для ошибок или дополнительной информации).                     | —            |
| **withBadge**           | boolean                          | Отображать выбранное значение внутри \`Badge\` вместо обычного текста. Крестик удаления показывается в Badge, если не передан цвет (или передан дефолтный). | false        |
| **colors**       | обьект или null       | —                 | Обьект с цветами|
| **isTable**     | boolean                    | Переход на табличную вариацию select. По умолчанию — false.                            | false        |
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
      description: "Опции для выбора (массив объектов value, label)",
      control: "object",
      table: { type: { summary: "Array<Object> или Array<string>" } },
    },
    value: {
      description: "Выбранное значение",
      control: "text",
      table: { type: { summary: "string или number" } },
    },
    isDisable: {
      description: "Отключить поле",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      description: "Ошибка",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    placeholder: {
      description: "Плейсхолдер",
      control: "text",
      table: { type: { summary: "string" } },
    },
    withoutClearIcon: {
      description:
        "Отключение иконки удаления",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
      }
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
    withBadge: {
      description:
        "Отображать выбранное значение внутри бейджа вместо обычного текста",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
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
      chevron: {
        default: undefined,
        hover: undefined,
      }
    }
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    options: [
      { value: "one", label: "Один" },
      { value: "two", label: "Два" },
      { value: "three", label: "Три" },
    ],
    value: "one",
    isDisable: false,
    error: false,
    placeholder: "Выберите значение",
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
        Обычный выпадающий список
      </div>
      <div style={{ width: "100%" }}>
        <Select {...args} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          color: "#999",
        }}
      >
        value: <b>{String(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, value, isDisable, error, placeholder через controls справа.",
      },
    },
  },
};

export const withBadge: Story = {
  args: {
    options: [
      { value: "one", label: "Один" },
      { value: "two", label: "Два" },
      { value: "three", label: "Три" },
    ],
    value: "one",
    isDisable: false,
    error: false,
    placeholder: "Выберите значение",
    withBadge: true,
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
        Выпадающий список с бейджем
      </div>
      <div style={{ width: "100%" }}>
        <Select {...args} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          color: "#999",
        }}
      >
        value: <b>{String(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, value, isDisable, error, placeholder через controls справа.",
      },
    },
  },
};

export const WithColoredBage: Story = {
  args: {
    options: [
      { value: "active", label: "Активный" },
      { value: "disabled", label: "Неактивный" },
      { value: "default", label: "Обычный" },
    ],
    value: "active",
    isDisable: false,
    error: false,
    placeholder: "Выберите значение",
    withBadge: true,
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
        Выпадающий список с цветным бейджем
      </div>
      <div style={{ width: "100%" }}>
        <Select {...args} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          color: "#999",
        }}
      >
        value: <b>{String(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, value, isDisable, error, placeholder через controls справа.",
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
    value: "active",
    isDisable: false,
    error: false,
    placeholder: "Выберите значение",
    withBadge: true,
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
        Выпадающий список с цветными бейджами в списке опций
      </div>
      <div style={{ width: "100%" }}>
        <Select {...args} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          color: "#999",
        }}
      >
        value: <b>{String(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, value, isDisable, error, placeholder через controls справа.",
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
    ],
    value: "one",
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
        Обычный выпадающий список с произвольным открывающим элементом
      </div>
      <div style={{ width: "100%" }}>
        <Select {...args} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          width: "100%",
          textAlign: "center",
          fontSize: 12,
          color: "#999",
        }}
      >
        value: <b>{String(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Меняйте options, value, isDisable, error, placeholder через controls справа.",
      },
    },
  },
};
