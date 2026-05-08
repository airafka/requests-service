import type { Meta, StoryObj } from "@storybook/react";
import { InfoBlock } from "./InfoBlock";

/**
 * InfoBlock - компонент для отображения информационных блоков
 *
 * Отображает данные в виде таблицы с названием блока и полями.
 * Поддерживает обновленные поля и пустые значения.
 */
const meta: Meta<typeof InfoBlock> = {
  title: "UIKIT/InfoBlock",
  component: InfoBlock,
  parameters: {
    docs: {
      description: {
        component: `
## Описание
InfoBlock - это компонент для отображения структурированной информации в виде таблицы.
Идеально подходит для отображения деталей объектов, профилей пользователей и других информационных блоков.

## Особенности
- **Структурированное отображение**: данные в виде таблицы с метками и значениями
- **Название блока**: заголовок для группировки связанной информации
- **Обработка пустых значений**: отображает "-" для пустых полей
- **Обновленные поля**: визуальное выделение измененных полей
- **Адаптивная ширина**: фиксированная ширина меток для выравнивания
- **Типизация**: полная поддержка TypeScript
                `,
      },
    },
  },
  argTypes: {
    name: {
      description: "Название информационного блока",
      control: "text",
      table: {
        type: { summary: "string" },
      },
    },
    fields: {
      description: "Массив полей для отображения",
      control: false,
      table: {
        type: { summary: "InfoFieldItem[]" },
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InfoBlock>;

export const Default: Story = {
  args: {
    name: "Основная информация",
    fields: [
      {
        name: "name",
        label: "Имя",
        value: "Иван Иванов",
      },
      {
        name: "email",
        label: "Email",
        value: "ivan.ivanov@example.com",
      },
      {
        name: "phone",
        label: "Телефон",
        value: "+7 (999) 123-45-67",
      },
      {
        name: "position",
        label: "Должность",
        value: "Менеджер",
        tooltypeLabel: "Текущая должность сотрудника в организации",
      },
    ],
  },
};

export const WithEmptyValues: Story = {
  args: {
    name: "Дополнительная информация",
    fields: [
      {
        name: "address",
        label: "Адрес",
        value: "г. Москва, ул. Примерная, д. 1",
      },
      {
        name: "department",
        label: "Отдел",
        value: "Продажи",
      },
      {
        name: "skype",
        label: "Skype",
        value: "",
      },
      {
        name: "telegram",
        label: "Telegram",
        value: null,
      },
      {
        name: "notes",
        label: "Примечания",
        value: "Активный сотрудник",
      },
    ],
  },
};

export const WithUpdatedFields: Story = {
  args: {
    name: "Контактная информация",
    fields: [
      {
        name: "email",
        label: "Email",
        value: "new.email@example.com",
        isUpdated: true,
      },
      {
        name: "phone",
        label: "Телефон",
        value: "+7 (999) 987-65-43",
        isUpdated: true,
      },
      {
        name: "address",
        label: "Адрес",
        value: "г. Санкт-Петербург, ул. Новая, д. 5",
      },
      {
        name: "website",
        label: "Веб-сайт",
        value: "www.example.com",
      },
    ],
  },
};

export const ClientInfo: Story = {
  args: {
    name: "Информация о клиенте",
    fields: [
      {
        name: "company",
        label: "Компания",
        value: "ООО 'Рога и Копыта'",
      },
      {
        name: "inn",
        label: "ИНН",
        value: "1234567890",
      },
      {
        name: "kpp",
        label: "КПП",
        value: "123456789",
      },
      {
        name: "address",
        label: "Юридический адрес",
        value: "г. Москва, ул. Юридическая, д. 1, оф. 100",
      },
      {
        name: "contact",
        label: "Контактное лицо",
        value: "Петров Петр Петрович",
      },
      {
        name: "phone",
        label: "Телефон",
        value: "+7 (495) 123-45-67",
      },
    ],
  },
};

export const OrderInfo: Story = {
  args: {
    name: "Детали заказа",
    fields: [
      {
        name: "orderNumber",
        label: "Номер заказа",
        value: "ORD-2024-001",
      },
      {
        name: "orderDate",
        label: "Дата заказа",
        value: "15.01.2024",
      },
      {
        name: "status",
        label: "Статус",
        value: "В обработке",
      },
      {
        name: "totalAmount",
        label: "Общая сумма",
        value: "125,000 ₽",
      },
      {
        name: "paymentMethod",
        label: "Способ оплаты",
        value: "Банковская карта",
      },
      {
        name: "deliveryAddress",
        label: "Адрес доставки",
        value: "г. Москва, ул. Доставки, д. 10, кв. 5",
      },
    ],
  },
};

export const ProductInfo: Story = {
  args: {
    name: "Характеристики товара",
    fields: [
      {
        name: "name",
        label: "Наименование",
        value: "Ноутбук Dell Inspiron 15",
      },
      {
        name: "category",
        label: "Категория",
        value: "Электроника",
      },
      {
        name: "brand",
        label: "Бренд",
        value: "Dell",
      },
      {
        name: "model",
        label: "Модель",
        value: "Inspiron 15 3000",
      },
      {
        name: "color",
        label: "Цвет",
        value: "Черный",
      },
      {
        name: "weight",
        label: "Вес",
        value: "2.1 кг",
      },
      {
        name: "dimensions",
        label: "Размеры",
        value: "380 x 258 x 22 мм",
      },
    ],
  },
};

export const LongValues: Story = {
  args: {
    name: "Подробная информация",
    fields: [
      {
        name: "description",
        label: "Описание",
        value:
          "Очень длинное описание товара или услуги, которое может занимать несколько строк и содержать много детальной информации о характеристиках, особенностях и преимуществах",
      },
      {
        name: "requirements",
        label: "Требования",
        value:
          "Список требований к системе, включающий минимальные системные требования, рекомендуемые характеристики и совместимость с различными операционными системами",
      },
      {
        name: "notes",
        label: "Примечания",
        value:
          "Дополнительные примечания и комментарии, которые могут содержать важную информацию для пользователей",
      },
    ],
  },
};

export const NumericValues: Story = {
  args: {
    name: "Статистика",
    fields: [
      {
        name: "totalOrders",
        label: "Всего заказов",
        value: 156,
      },
      {
        name: "totalRevenue",
        label: "Общая выручка",
        value: "2,450,000 ₽",
      },
      {
        name: "averageOrder",
        label: "Средний заказ",
        value: "15,705 ₽",
      },
      {
        name: "successRate",
        label: "Процент успешных",
        value: "94.2%",
      },
      {
        name: "customerCount",
        label: "Количество клиентов",
        value: 89,
      },
    ],
  },
};

export const WithReactElements: Story = {
  args: {
    name: "Статус и действия",
    fields: [
      {
        name: "status",
        label: "Статус",
        value: (
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "#4caf50",
              color: "white",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            Активен
          </span>
        ),
      },
      {
        name: "priority",
        label: "Приоритет",
        value: (
          <span
            style={{
              padding: "4px 8px",
              backgroundColor: "#ff9800",
              color: "white",
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            Высокий
          </span>
        ),
      },
      {
        name: "actions",
        label: "Действия",
        value: (
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                padding: "4px 8px",
                backgroundColor: "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Редактировать
            </button>
            <button
              style={{
                padding: "4px 8px",
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Удалить
            </button>
          </div>
        ),
      },
    ],
  },
};

export const MultipleBlocks: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <InfoBlock
        name="Личная информация"
        fields={[
          { name: "name", label: "Имя", value: "Анна Петрова" },
          { name: "email", label: "Email", value: "anna.petrova@example.com" },
          { name: "phone", label: "Телефон", value: "+7 (999) 111-22-33" },
        ]}
      />
      <InfoBlock
        name="Рабочая информация"
        fields={[
          { name: "position", label: "Должность", value: "Дизайнер" },
          { name: "department", label: "Отдел", value: "Дизайн" },
          { name: "startDate", label: "Дата начала", value: "01.03.2023" },
          { name: "salary", label: "Зарплата", value: "85,000 ₽" },
        ]}
      />
      <InfoBlock
        name="Дополнительно"
        fields={[
          {
            name: "skills",
            label: "Навыки",
            value: "Figma, Photoshop, Illustrator",
          },
          { name: "languages", label: "Языки", value: "Русский, Английский" },
          { name: "notes", label: "Примечания", value: "Опыт работы 5 лет" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Пример использования нескольких информационных блоков на одной странице",
      },
    },
  },
};

export const UpdatedFields: Story = {
  args: {
    name: "Изменения в профиле",
    fields: [
      {
        name: "oldEmail",
        label: "Старый email",
        value: "old.email@example.com",
      },
      {
        name: "newEmail",
        label: "Новый email",
        value: "new.email@example.com",
        isUpdated: true,
      },
      {
        name: "oldPhone",
        label: "Старый телефон",
        value: "+7 (999) 111-11-11",
      },
      {
        name: "newPhone",
        label: "Новый телефон",
        value: "+7 (999) 222-22-22",
        isUpdated: true,
      },
      {
        name: "address",
        label: "Адрес",
        value: "г. Москва, ул. Новая, д. 15",
      },
    ],
  },
};
