import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { format } from "date-fns";
import { PickerPositions } from "@/types";

import type {
  TimeInterval,
  DateTimePickerProps,
  ValidationState,
} from "./DateTimePicker.types";
import { DateTimePicker } from "./DateTimePicker";

type Story = StoryObj<typeof DateTimePicker>;

const TIME_INTERVALS = {
  Ночь: [
    { from: "00:00", to: "01:00" },
    { from: "01:00", to: "02:00" },
    { from: "02:00", to: "03:00" },
    { from: "03:00", to: "04:00" },
    { from: "04:00", to: "05:00" },
    { from: "05:00", to: "06:00" },
  ],
  Утро: [
    { from: "06:00", to: "07:00" },
    { from: "07:00", to: "08:00" },
    { from: "08:00", to: "09:00" },
    { from: "09:00", to: "10:00" },
    { from: "10:00", to: "11:00" },
    { from: "11:00", to: "12:00" },
  ],
  День: [
    { from: "12:00", to: "13:00" },
    { from: "13:00", to: "14:00" },
    { from: "14:00", to: "15:00" },
    { from: "15:00", to: "16:00" },
    { from: "16:00", to: "17:00" },
  ],
  Вечер: [
    { from: "17:00", to: "18:00" },
    { from: "18:00", to: "19:00" },
    { from: "19:00", to: "20:00" },
    { from: "20:00", to: "21:00" },
    { from: "21:00", to: "22:00" },
    { from: "22:00", to: "23:00" },
    { from: "23:00", to: "24:00" },
  ],
};

const meta: Meta<typeof DateTimePicker> = {
  title: "UIKIT/DateTimePicker",
  component: DateTimePicker,
  argTypes: {
    value: {
      description: "Выбранная дата (строка в формате DD.MM.YYYY)",
      control: { type: "text" },
      table: {
        type: { summary: "string | null" },
        defaultValue: { summary: "null" },
      },
    },
    disabled: {
      description: "Отключен ли компонент",
      control: "boolean",
    },
    error: {
      description: "Отображается ли ошибка",
      control: "boolean",
    },
    fullWidth: {
      description: "Занимает ли компонент всю ширину",
      control: "boolean",
    },
    position: {
      description: "Позиция выпадающего пикера",
      control: "select",
      options: Object.values(PickerPositions),
    },
    readOnly: {
      table: {
        disable: true,
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
    placeholder: {
      description:
        "Текст placeholder для поля ввода (имеет приоритет над inputReplacer)",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    requiredTime: {
      description:
        "Требует обязательного выбора времени/интервала. При true компонент не отдаёт наружу значение без времени.",
      control: "boolean",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onValidationChange: { action: false },
    isTable:{
      description: "Для перехода на табличный вид",
      control: "boolean"
    }
  },
  parameters: {
    docs: {
      description: {
        component: `
## Описание

**DateTimePicker** — компонент выбора даты и интервала времени. Является обёрткой над DatePicker с дополнительной функциональностью.

## Позиции выпадающего пикера

| Позиция | Описание | Применение |
|---------|----------|------------|
| BOTTOM_END | Снизу справа | По умолчанию |
| BOTTOM_START | Снизу слева | Когда есть ограничения справа |
| TOP_START | Сверху слева | Когда снизу недостаточно места |
| TOP_END | Сверху справа | Альтернативная позиция сверху |

## Формат даты

Компонент использует формат **DD.MM.YYYY**:
- **18.07.2025** - 18 июля 2025 года
- **01.01.2024** - 1 января 2024 года
- **31.12.2023** - 31 декабря 2023 года

## Формат интервала времени

Компонент использует формат **HH:mm** для начала и конца интервала

## Валидация с requiredTime

При \`requiredTime === true\` компонент:
- Считает поле валидным только если выбраны и дата, и время/интервал
- Не отдаёт "полу-значение" в onChange (отдаёт null пока не выбрано всё)
- Сообщает о состоянии валидации через onValidationChange

### Коды ошибок валидации

| Reason | Описание |
|--------|----------|
| missing_date | Не выбрана дата |
| missing_time | Не выбрано время (режим isExactTime) |
| missing_interval | Не выбран интервал (режим интервалов) |
| invalid_date | Некорректная дата |

## Пропсы

| Пропс         | Тип                 | Описание | По умолчанию |
|---------------|---------------------|----------|--------------|
| \`value\`     | \`string | null\`   | Выбранная дата | \`null\` |
| \`chosenInterval\` | \`{from: string, to: string}\`   | Выбранный интервал времени | \`null\` |
| \`timeIntervals\` | \`{ [key: string]: {from: string, to: string}[] }\`   | Доступные интервалы времени | \`null\` |
| \`onChange\`  | \`(date: Date | null) => void\` | Обработчик изменения даты | \`undefined\` |
| \`onIntervalChange\`  | \`({dates,interval}: {dates: [Date, Date], interval: {from: string, to: string}}) => void\` | Обработчик изменения интервала времени | \`undefined\` |
| \`disabled\`  | \`boolean\`         | Отключен ли компонент | \`false\` |
| \`error\`     | \`boolean\`         | Отображается ли ошибка | \`false\` |
| \`fullWidth\` | \`boolean\`         | Занимает ли всю ширину | \`false\` |
| \`position\`  | \`PickerPositions\` | Позиция выпадающего пикера | \`PickerPositions.BOTTOM_END\` |
| \`label\`     | \`string\`          | Текст лейбла над полем ввода. | undefined |
| \`hintText\`  | \`string\`          | Подсказка под полем ввода (для ошибок или дополнительной информации). | undefined |
| \`requiredTime\` | \`boolean\`      | Требует обязательного выбора времени/интервала | \`false\` |
| \`onValidationChange\` | \`(state: ValidationState) => void\` | Коллбэк состояния валидации | undefined |
| \`isTable\`  | \`boolean\`          |Переход на табличную вариацию datepicker. По умолчанию — false. | \`false\`|

## Особенности

### 🔒 **Только для чтения**
Поле ввода недоступно для прямого редактирования - дата выбирается только через пикер.

### 🎯 **Кнопки "Сегодня" и "Очистить"**
В футере пикера есть кнопки для быстрого выбора текущей даты и очистки поля.

### 🌍 **Русская локализация**
Компонент использует русскую локализацию для отображения дат и месяцев.

### 🎨 **Кастомные стили**
Уникальный дизайн с кастомными иконками и стилизацией.

### 📅 **Многоуровневый выбор**
Поддерживает выбор года, месяца и дня с удобной навигацией.

## Рекомендации по использованию

1. **Позиции** - BOTTOM_END подходит для большинства ситуаций
2. **Валидация** - используйте \`requiredTime\` и \`onValidationChange\` для централизованной валидации

## Пример использования

\`\`\`tsx
const [dateValue, setDateValue] = useState<Date | null>();
const [dates, setDates] = useState<[Date, Date]>();
const [intervalValue, setIntervalValue] = useState<TimeInterval>();
const [validation, setValidation] = useState<ValidationState>({ isValid: false });

const handleDateChange = (date: Date | null) => {
  setDateValue(date);
};

const handleIntervalChange = ({
  dates,
  interval
}: Parameters<DateTimePickerProps['onIntervalChange']>[0]) => {
  setDates(dates);
  setIntervalValue(interval);
};

<DateTimePicker 
  value={dateValue ? format(dateValue, 'dd.MM.yyyy') : "18.07.2025"}
  chosenInterval={intervalValue}
  onChange={handleDateChange}
  onIntervalChange={handleIntervalChange}
  requiredTime
  onValidationChange={setValidation}
  timeIntervals={{
    'Утро': [
      { from: "8:00", to: "9:00" },
      { from: "9:00", to: "10:00" },
    ],
    'День': [
      { from: "12:00", to: "13:00" },
      { from: "13:00", to: "14:00" },
    ]
  }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

// requiredTime = false - можно отправить DateTimePicker без выбора времени
export const Default: Story = {
  args: {
    label: "Дата и время:",
    timeIntervals: TIME_INTERVALS,
    position: PickerPositions.BOTTOM_END,
    fullWidth: false,
    disabled: false,
    error: false,
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [intervalValue, setIntervalValue] = useState<TimeInterval>();

    const handleDateChange = (date: Date | null) => {
      if (!date) {
        setIntervalValue(undefined);
      }
      setDateValue(date);
    };

    const handleIntervalChange = ({
      interval,
    }: Parameters<NonNullable<DateTimePickerProps["onIntervalChange"]>>[0]) => {
      setIntervalValue(interval);
    };

    const getPositionDescription = (position: string | undefined) => {
      if (!position) {
        return "не задана";
      }
      switch (position) {
        case "bottom-start":
          return "Снизу слева";
        case "bottom-end":
          return "Снизу справа";
        case "top-start":
          return "Сверху слева";
        case "top-end":
          return "Сверху справа";
        default:
          return position;
      }
    };

    const getPositionVisual = (position: string | undefined) => {
      if (!position) {
        return "❓";
      }
      switch (position) {
        case "bottom-start":
          return "⬇️↙️";
        case "bottom-end":
          return "⬇️↘️";
        case "top-start":
          return "⬆️↖️";
        case "top-end":
          return "⬆️↗️";
        default:
          return "❓";
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
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Контейнер для демонстрации</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          {args.fullWidth ? "fullWidth: true" : "fullWidth: false"} | Позиция:{" "}
          {getPositionVisual(args.position)}{" "}
          {getPositionDescription(args.position)} |
          {args.disabled ? "Да" : "Нет"} | Ошибка: {args.error ? "Да" : "Нет"}
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Нажмите на поле даты, чтобы увидеть, как работает позиционирование
          пикера
        </div>
        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          chosenInterval={intervalValue}
          onChange={handleDateChange}
          onIntervalChange={handleIntervalChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "## Стандартный DateTimePicker с базовыми настройками\n\nСтарое поведение: `requiredTime = false`. Компонент отдаёт значение сразу при выборе даты.",
      },
    },
  },
};

// WithPlaceholder

export const WithPlaceholder: Story = {
  args: {
    label: "Дата и время:",
    placeholder: "Выберите дату и время",
    timeIntervals: TIME_INTERVALS,
    position: PickerPositions.BOTTOM_END,
    fullWidth: false,
    disabled: false,
    error: false,
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [intervalValue, setIntervalValue] = useState<TimeInterval>();

    const handleDateChange = (date: Date | null) => {
      if (!date) {
        setIntervalValue(undefined);
      }
      setDateValue(date);
    };

    const handleIntervalChange = ({
      interval,
    }: Parameters<NonNullable<DateTimePickerProps["onIntervalChange"]>>[0]) => {
      setIntervalValue(interval);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>DateTimePicker с кастомным placeholder</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          placeholder: "{args.placeholder}" | Приоритет над inputReplacer
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Когда дата не выбрана, отображается кастомный placeholder вместо
          стандартного
        </div>
        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          chosenInterval={intervalValue}
          onChange={handleDateChange}
          onIntervalChange={handleIntervalChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "## DateTimePicker с кастомным placeholder\n\nДемонстрирует, как работает приоритет `placeholder` над `inputReplacer`. Когда дата не выбрана, отображается кастомный placeholder вместо стандартного 'ДД.ММ.ГГГГ чч:мм – чч:мм'.",
      },
    },
  },
};

// WithExactTime

export const WithExactTime: Story = {
  args: {
    label: "Дата и время:",
    placeholder: "Выберите дату и время",
    position: PickerPositions.BOTTOM_END,
    fullWidth: false,
    disabled: false,
    error: false,
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
      setDateValue(date);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>DateTimePicker с в выбором конкретного времени</strong>
        </div>
        <div style={{ marginBottom: "16px", fontSize: "12px", color: "#999" }}>
          isExactTime: true
        </div>
        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          onChange={handleDateChange}
          isExactTime
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## DateTimePicker с в выбором конкретного времени",
      },
    },
  },
};

// RequiredExactTime — requiredTime + isExactTime

export const RequiredExactTime: Story = {
  args: {
    label: "Дата и точное время (обязательно):",
    placeholder: "Выберите дату и время",
    position: PickerPositions.BOTTOM_END,
    fullWidth: false,
    disabled: false,
    error: false,
    requiredTime: true,
    isExactTime: true,
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [validation, setValidation] = useState<ValidationState>({
      isValid: false,
      reason: "missing_date",
      message: "Укажите дату",
    });

    const handleDateChange = (date: Date | null) => {
      setDateValue(date);
    };

    const handleValidationChange = (state: ValidationState) => {
      setValidation(state);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "300px",
          position: "relative",
          width: 500,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦{" "}
          <strong>
            requiredTime + isExactTime: время обязательно к выбору
          </strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          requiredTime: true | isExactTime: true
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Выберите дату → onChange получит null (время не выбрано). Выберите
          время → onChange получит Date
        </div>

        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          onChange={handleDateChange}
          onValidationChange={handleValidationChange}
        />

        {/* Панель состояния */}
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: validation.isValid ? "#e8f5e9" : "#ffebee",
            borderRadius: "8px",
            border: `1px solid ${validation.isValid ? "#4caf50" : "#f44336"}`,
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: validation.isValid ? "#2e7d32" : "#c62828",
            }}
          >
            {validation.isValid ? "✅ Валидно" : "❌ Невалидно"}
          </div>
          <pre
            style={{
              margin: 0,
              fontSize: "11px",
              whiteSpace: "pre-wrap",
              color: "#333",
            }}
          >
            {JSON.stringify(
              {
                value: dateValue ? format(dateValue, "dd.MM.yyyy HH:mm") : null,
                validation,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `## requiredTime + isExactTime

Демонстрирует поведение с \`requiredTime=true\` и \`isExactTime=true\`:

1. **Выбрана только дата** → validation: \`{ isValid: false, reason: "missing_time" }\`, onChange получает \`null\`
2. **Выбраны дата и время** → validation: \`{ isValid: true }\`, onChange получает \`Date\`
3. **При очистке** → всё сбрасывается, validation: \`{ isValid: false, reason: "missing_date" }\``,
      },
    },
  },
};

// RequiredInterval — requiredTime + intervals

export const RequiredInterval: Story = {
  args: {
    label: "Дата и интервал (обязательно):",
    timeIntervals: TIME_INTERVALS,
    position: PickerPositions.BOTTOM_END,
    fullWidth: false,
    disabled: false,
    error: false,
    requiredTime: true,
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [intervalValue, setIntervalValue] = useState<TimeInterval>();
    const [validation, setValidation] = useState<ValidationState>({
      isValid: false,
      reason: "missing_date",
      message: "Укажите дату",
    });

    const handleDateChange = (date: Date | null) => {
      setDateValue(date);
    };

    const handleIntervalChange = ({
      interval,
    }: Parameters<NonNullable<DateTimePickerProps["onIntervalChange"]>>[0]) => {
      setIntervalValue(interval);
    };

    const handleValidationChange = (state: ValidationState) => {
      setValidation(state);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "300px",
          position: "relative",
          width: 500,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦{" "}
          <strong>
            requiredTime + intervals: интервал обязателен к выбору
          </strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          requiredTime: true | isExactTime: false (интервалы)
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Выберите дату → onChange получит null. Выберите интервал → onChange
          получит Date
        </div>

        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          chosenInterval={intervalValue}
          onChange={handleDateChange}
          onIntervalChange={handleIntervalChange}
          onValidationChange={handleValidationChange}
        />

        {/* Панель состояния */}
        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            backgroundColor: validation.isValid ? "#e8f5e9" : "#ffebee",
            borderRadius: "8px",
            border: `1px solid ${validation.isValid ? "#4caf50" : "#f44336"}`,
          }}
        >
          <div
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              marginBottom: "8px",
              color: validation.isValid ? "#2e7d32" : "#c62828",
            }}
          >
            {validation.isValid ? "✅ Валидно" : "❌ Невалидно"}
          </div>
          <pre
            style={{
              margin: 0,
              fontSize: "11px",
              whiteSpace: "pre-wrap",
              color: "#333",
            }}
          >
            {JSON.stringify(
              {
                value: dateValue ? format(dateValue, "dd.MM.yyyy HH:mm") : null,
                interval: intervalValue ?? null,
                validation,
              },
              null,
              2
            )}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `## requiredTime + intervals

Демонстрирует поведение с \`requiredTime=true\` в режиме интервалов:

1. **Выбрана только дата** → validation: \`{ isValid: false, reason: "missing_interval" }\`, onChange получает \`null\`
2. **Выбран интервал** → validation: \`{ isValid: true }\`, onChange получает \`Date\`
3. **При очистке** → всё сбрасывается`,
      },
    },
  },
};

// ClearBehavior — демонстрация очистки

export const ClearBehavior: Story = {
  args: {
    label: "Очистка сбрасывает валидацию:",
    timeIntervals: TIME_INTERVALS,
    position: PickerPositions.BOTTOM_END,
    fullWidth: false,
    disabled: false,
    error: false,
    requiredTime: true,
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [intervalValue, setIntervalValue] = useState<TimeInterval>();
    const [validation, setValidation] = useState<ValidationState>({
      isValid: false,
      reason: "missing_date",
      message: "Укажите дату",
    });
    const [history, setHistory] = useState<string[]>([]);

    const addToHistory = (action: string) => {
      setHistory((prev) => [
        `[${new Date().toLocaleTimeString()}] ${action}`,
        ...prev.slice(0, 9),
      ]);
    };

    const handleDateChange = (date: Date | null) => {
      if (!date) {
        setIntervalValue(undefined);
        addToHistory("clear: interval reset");
      }
      setDateValue(date);
      addToHistory(
        `onChange: ${date ? format(date, "dd.MM.yyyy HH:mm") : "null"}`
      );
    };

    const handleIntervalChange = ({
      interval,
    }: Parameters<NonNullable<DateTimePickerProps["onIntervalChange"]>>[0]) => {
      setIntervalValue(interval);
      addToHistory(`onIntervalChange: ${interval.from} - ${interval.to}`);
    };

    const handleValidationChange = (state: ValidationState) => {
      setValidation(state);
      addToHistory(
        `onValidationChange: ${
          state.isValid ? "valid" : `invalid (${state.reason})`
        }`
      );
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "400px",
          position: "relative",
          width: 600,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Демонстрация очистки и сброса валидации</strong>
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Выберите дату и интервал, затем нажмите "Очистить" в пикере.
          История событий показана ниже.
        </div>

        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          chosenInterval={intervalValue}
          onChange={handleDateChange}
          onIntervalChange={handleIntervalChange}
          onValidationChange={handleValidationChange}
        />

        <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
          {/* Панель состояния */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: validation.isValid ? "#e8f5e9" : "#ffebee",
              borderRadius: "8px",
              border: `1px solid ${validation.isValid ? "#4caf50" : "#f44336"}`,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: validation.isValid ? "#2e7d32" : "#c62828",
              }}
            >
              Текущее состояние
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: "10px",
                whiteSpace: "pre-wrap",
                color: "#333",
              }}
            >
              {JSON.stringify(
                {
                  value: dateValue
                    ? format(dateValue, "dd.MM.yyyy HH:mm")
                    : null,
                  interval: intervalValue ?? null,
                  validation,
                },
                null,
                2
              )}
            </pre>
          </div>

          {/* История событий */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#666",
              }}
            >
              📜 История событий
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#333",
                maxHeight: "150px",
                overflow: "auto",
              }}
            >
              {history.length === 0 ? (
                <div style={{ color: "#999", fontStyle: "italic" }}>
                  Взаимодействуйте с компонентом...
                </div>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "2px 0",
                      borderBottom:
                        idx < history.length - 1 ? "1px solid #eee" : "none",
                    }}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `## Демонстрация очистки

Показывает, как работает очистка поля:

1. **Выберите дату и интервал** — значение валидно
2. **Нажмите "Очистить"** в футере пикера
3. **Результат:**
   - onChange(null) вызывается
   - onValidationChange({ isValid: false, reason: "missing_date" }) вызывается
   - при очистке \`onChange(null)\` сбрасывает выбранный интервал
   - Все внутренние состояния сбрасываются`,
      },
    },
  },
};

// DateChangeResetsTime — смена даты сбрасывает время

export const DateChangeResetsTime: Story = {
  args: {
    label: "Смена даты сбрасывает выбор времени:",
    position: PickerPositions.BOTTOM_END,
    fullWidth: false,
    disabled: false,
    error: false,
    requiredTime: true,
    isExactTime: true,
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [validation, setValidation] = useState<ValidationState>({
      isValid: false,
      reason: "missing_date",
      message: "Укажите дату",
    });
    const [history, setHistory] = useState<string[]>([]);

    const addToHistory = (action: string) => {
      setHistory((prev) => [
        `[${new Date().toLocaleTimeString()}] ${action}`,
        ...prev.slice(0, 14),
      ]);
    };

    const handleDateChange = (date: Date | null) => {
      setDateValue(date);
      addToHistory(
        `onChange: ${date ? format(date, "dd.MM.yyyy HH:mm") : "null"}`
      );
    };

    const handleValidationChange = (state: ValidationState) => {
      setValidation(state);
      addToHistory(
        `validation: ${state.isValid ? "✅ valid" : `❌ ${state.reason}`}`
      );
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "400px",
          position: "relative",
          width: 600,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Edge-case: смена даты сбрасывает время</strong>
        </div>
        <div
          style={{
            marginBottom: "12px",
            fontSize: "11px",
            color: "#666",
            fontStyle: "italic",
          }}
        >
          💡 Выберите дату → выберите время (станет валидно) → измените дату →
          время сбросится
        </div>

        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          onChange={handleDateChange}
          onValidationChange={handleValidationChange}
        />

        <div style={{ display: "flex", gap: "16px", marginTop: "20px" }}>
          {/* Панель состояния */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: validation.isValid ? "#e8f5e9" : "#ffebee",
              borderRadius: "8px",
              border: `1px solid ${validation.isValid ? "#4caf50" : "#f44336"}`,
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: validation.isValid ? "#2e7d32" : "#c62828",
              }}
            >
              {validation.isValid ? "✅ Валидно" : "❌ Невалидно"}
            </div>
            <pre
              style={{
                margin: 0,
                fontSize: "10px",
                whiteSpace: "pre-wrap",
                color: "#333",
              }}
            >
              {JSON.stringify(
                {
                  value: dateValue
                    ? format(dateValue, "dd.MM.yyyy HH:mm")
                    : null,
                  validation,
                },
                null,
                2
              )}
            </pre>
          </div>

          {/* История событий */}
          <div
            style={{
              flex: 1,
              padding: "12px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                fontWeight: "bold",
                marginBottom: "8px",
                color: "#666",
              }}
            >
              📜 История событий
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#333",
                maxHeight: "180px",
                overflow: "auto",
              }}
            >
              {history.length === 0 ? (
                <div style={{ color: "#999", fontStyle: "italic" }}>
                  Взаимодействуйте с компонентом...
                </div>
              ) : (
                history.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "2px 0",
                      borderBottom:
                        idx < history.length - 1 ? "1px solid #eee" : "none",
                    }}
                  >
                    {item}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `## Edge-case: смена даты сбрасывает выбор времени

При \`requiredTime=true\` смена даты сбрасывает выбор времени, чтобы:
- Не переносить старое время на новую дату
- Требовать явного подтверждения времени для новой даты

**Сценарий:**
1. Выберите дату "15 декабря"
2. Выберите время "14:30" → validation становится valid
3. Измените дату на "16 декабря"
4. Время сбрасывается → validation становится invalid (missing_time)
5. Нужно снова выбрать время`,
      },
    },
  },
};

// WithCustomOpener

export const WithCustomOpener: Story = {
  args: {
    timeIntervals: TIME_INTERVALS,
    position: PickerPositions.BOTTOM_END,
    customOpener: ({ isOpen, setAnchorRef, onClick }) => (
      <button ref={setAnchorRef} onClick={onClick}>
        Произвольный открывающий элемент{isOpen && " (открыт)"}
      </button>
    ),
    onValidationChange: fn(),
  },
  render: (args) => {
    const [dateValue, setDateValue] = useState<Date | null>(null);
    const [intervalValue, setIntervalValue] = useState<TimeInterval>();

    const handleDateChange = (date: Date | null) => {
      if (!date) {
        setIntervalValue(undefined);
      }
      setDateValue(date);
    };

    const handleIntervalChange = ({
      interval,
    }: Parameters<NonNullable<DateTimePickerProps["onIntervalChange"]>>[0]) => {
      setIntervalValue(interval);
    };

    return (
      <div
        style={{
          padding: "20px",
          border: "2px dashed #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
          minHeight: "200px",
          position: "relative",
          width: args.fullWidth ? "100%" : 400,
        }}
      >
        <div style={{ marginBottom: "16px", fontSize: "14px", color: "#666" }}>
          📦 <strong>Контейнер для демонстрации</strong>
        </div>
        <div style={{ marginBottom: "8px", fontSize: "12px", color: "#999" }}>
          <p>
            Выбранная дата:{" "}
            {dateValue ? format(dateValue, "dd.MM.yyyy") : "нет"}{" "}
            {intervalValue && `(${intervalValue.from} - ${intervalValue.to})`}
          </p>
        </div>

        <DateTimePicker
          {...args}
          value={dateValue ? format(dateValue, "dd.MM.yyyy") : undefined}
          onChange={handleDateChange}
          onIntervalChange={handleIntervalChange}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "## DatePicker с произвольным открывающим элементом",
      },
    },
  },
};
