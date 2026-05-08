import type {
    Meta,
    StoryObj,
} from "@storybook/react";
import { SelectBool } from "./SelectBool";

const meta: Meta<typeof SelectBool> = {
  title: "UIKIT/DropDown/SelectBool",
  component: SelectBool,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
SelectBool — компонент для выбора булевого значения (да/нет/не выбрано).

---

## Как работает SelectBool в Storybook

**В Storybook компонент SelectBool используется напрямую, без интеграции с внешними справочниками. Компонент имеет встроенные опции для выбора булевых значений.**

### Цепочка действий:
1. Вы объявляете компонент SelectBool в файле сторибука (SelectBool.stories.tsx).
2. Передаёте пропсы (например, value, isDisable, error, placeholder) через args или напрямую в JSX.
3. Компонент отображает выпадающий список с тремя опциями: true (да), false (нет), undefined (не выбрано).
4. onChange — функция, которая вызывается при изменении значения (в сторибуке обычно просто обновляет value через controls).
5. Все остальные пропсы (placeholder, error, isDisable) управляются через controls в Storybook.

### Пример использования:

~~~tsx
<SelectBool
  value={true}
  isDisable={false}
  error={false}
  placeholder="Выберите да/нет"
  onChange={(val) => { /* обработка выбора */ }}
/>
~~~

---

## Пропсы

| Пропс              | Тип         | Описание                                                                 | По умолчанию |
|--------------------|-------------|--------------------------------------------------------------------------|--------------|
| **value**          | boolean     | Текущее выбранное значение (true/false/undefined).                       | —            |
| **isDisable**      | boolean     | Отключает селект (делает его неактивным для пользователя). По умолчанию — false. | false        |
| **error**          | boolean     | Включает ошибочное состояние (красная подсветка). По умолчанию — false.  | false        |
| **placeholder**    | строка      | Текст-плейсхолдер, который отображается, когда ничего не выбрано.        | —            |
| **dataTestId**          | строка                           | Имя для автотестов (data-test-id).                                                        | —            |
| **onChange**       | (value) => void | Колбэк, вызывается при изменении значения. В аргументе — новое значение. | —            |
| **label**          | string       | —                 | Текст лейбла над полем ввода. |
| **withoutClearIcon**     | boolean                    | Отключает иконку и возможность удаления выбранного свойства одним кликом. По умолчанию — true.                            | true        |
| **hintText**       | string       | —                 | Подсказка под полем ввода (для ошибок или дополнительной информации). |
| **colors**       | обьект или null       | —                 | Обьект с цветами|
| **isTable**     | boolean                    | Переход на табличную вариацию selectbool. По умолчанию — false.                            | false        |
---

### Возможные значения:
- **true** — да (отображается с иконкой галочки)
- **false** — нет (отображается с иконкой крестика)
- **undefined** — не выбрано (отображается плейсхолдер)

---
`,
      },
    },
  },
  argTypes: {
    value: {
      description: "Выбранное значение",
      control: "select",
      options: [undefined, true, false],
      table: { type: { summary: "boolean или undefined" } },
    },
    isDisable: {
      description: "Отключить поле",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    error: {
      description: "Ошибка",
      control: "boolean",
      table: { type: { summary: "boolean" }, defaultValue: { summary: "false" } },
    },
    placeholder: {
      description: "Плейсхолдер",
      control: "text",
      table: { type: { summary: "string" } },
    },
    label: {
      description: "Текст лейбла над полем",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    hintText: {
      description: "Подсказка под полем (для ошибок или дополнительной информации)",
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
      }
    },
    isTable: {
      control: 'boolean',
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
type Story = StoryObj<typeof SelectBool>;

export const Default: Story = {
  args: {
    value: true,
    isDisable: false,
    error: false,
    placeholder: "Выберите да/нет",
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
      }}>
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>SelectBool</strong> — выбор булевого значения
      </div>
      <div style={{ width: "100%" }}>
        <SelectBool {...args} />
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
        }}>
        value: <b>{String(args.value)}</b>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Меняйте value, isDisable, error, placeholder через controls справа.",
      },
    },
  },
};

export const WithCustomOpener: Story = {
  args: {
    value: true,
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
      }}>
      <div style={{ fontSize: "14px", color: "#666", marginBottom: 8 }}>
        <strong>SelectBool</strong> с произвольным открывающим элементом
      </div>
      <div style={{ width: "100%" }}>
        <SelectBool {...args} />
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
        }}>
        value: <b>{String(args.value)}</b>
      </div>
    </div>
  ),
};
