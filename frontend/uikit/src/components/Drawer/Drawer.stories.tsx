import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./Drawer";
import { DrawerTitle } from "./UI/DrawerHeader/DrawerHeader";
import { InfoBlock } from "../InfoBlock";
import { Box, Chip } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import { Button } from "@mui/material";
import { CommonSize } from "../../types/CommonSize";

const meta: Meta<typeof Drawer> = {
  title: "UIKIT/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    footerButtons: {
      control: false,
      table: {
        type: { summary: "ModalFooterButtonsProps[]" },
      },
    },
    children: {
      control: false,
      table: {
        type: { summary: "ReactNode" },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Drawer>;

// Data defined outside render to avoid Storybook serialization issues
const createStatusValue = () => (
  <Box display="flex" alignItems="center" gap="8px">
    <Chip
      label="Черновик"
      size="small"
      sx={{
        borderRadius: "4px",
        backgroundColor: "#F5F5F5",
        color: "#333",
        height: "24px",
      }}
    />
  </Box>
);

const mainInfoFieldsData = [
  {
    name: "requestNumber",
    label: "Номер заявки",
    value: "3685",
  },
  {
    name: "creationDate",
    label: "Дата создания",
    value: "03.12.2025 09:16:06",
  },
  {
    name: "client",
    label: "Клиент",
    value: 'ПАО "Сибур Холдинг"',
  },
  {
    name: "contract",
    label: "Договор",
    value: "АЭ-4/23",
  },
  {
    name: "contractType",
    label: "Вид договора",
    value: 'Транспортно-экспедиционное обслуживание "ТЭО"',
  },
  {
    name: "validFrom",
    label: "Действует с",
    value: "04.04.2023 03:00:00",
  },
];

const requestParamsFieldsData = [
  {
    name: "site",
    label: "Площадка",
    value: "Контейнерная площадка",
  },
  {
    name: "transportType",
    label: "Вид транспорта",
    value:
      "Производится при необходимости восстановить упаковку. Без заявки Заказчика производится восстановление упаковки сыпучих (разваливающихся, вываливающихся из упаковки) товаров, повреждение которой получено при транспортировке товара и выявлено при помещении товара на хранение в крытый склад. Производится в случае, не позволяющем без производства восстановительных работ упакованного места поместить товар в крытый склад без потери качества или количества товара. Проведение данной операции возможно силами Заказчика. Для обеспечения доступа к товару необходимо предоставить Исполнителю письменное согласование таможенным органом списка лиц, допущенных на территорию таможенной зоны терминала. Согласование списка допущенных лиц производится должностными лицами уполномоченного таможенного органа.",
  },
  {
    name: "currency",
    label: "Операция",
    value: "нет",
    tooltypeLabel: "Тип операции по объекту",
  },
  {
    name: "supplyType",
    label: "Зависимая",
    value: "нет",
    tooltypeLabel: "Признак зависимой услуги",
  },
  {
    name: "plannedArrivalTime",
    label: "Плановое время поступления",
    value: "03.12.2025 06:16:02",
  },
  {
    name: "actualArrivalDate",
    label: "Фактическая дата поступления",
    value: "-",
  },
  {
    name: "storagePeriod",
    label: "Срок хранения номенклатуры",
    value: "-",
  },
];

const contactInfoFieldsData = [
  {
    name: "representative",
    label: "Уполномоченный представитель",
    value: "-",
  },
  {
    name: "phone",
    label: "Номер телефона",
    value: "-",
  },
  {
    name: "email",
    label: "Email",
    value: "-",
  },
];

const additionalInfoFieldsData = [
  {
    name: "comment",
    label: "Комментарий",
    value: "-",
  },
];

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
      setIsOpen(false);
    };

    const handleOpen = () => {
      setIsOpen(true);
    };

    const statusValue = createStatusValue();

    const handleFooterClick = useCallback(() => {
      console.log("clicked");
    }, []);

    const footerButtons = useMemo(
      () => [
        {
          children: "Подробнее",
          onClick: handleFooterClick,
          size: CommonSize.Medium,
        },
      ],
      [handleFooterClick]
    );

    const mainInfoFields = [
      ...mainInfoFieldsData,
      {
        name: "status",
        label: "Статус",
        value: statusValue,
      },
    ];

    const requestParamsFields = [
      ...requestParamsFieldsData.slice(0, 4),
      {
        name: "status",
        label: "Статус",
        value: statusValue,
        tooltypeLabel: "Текущий статус услуги",
      },
      ...requestParamsFieldsData.slice(4),
    ];
    const contactInfoFields = contactInfoFieldsData;
    const additionalInfoFields = additionalInfoFieldsData;

    return (
      <>
        <Button onClick={handleOpen}>Открыть Drawer</Button>
        <Drawer
          {...args}
          open={isOpen}
          onClose={handleClose}
          footerButtons={footerButtons}
        >
          <DrawerTitle>Заявка на поставку №3685</DrawerTitle>
          <Box display="flex" flexDirection="column" gap="24px">
            <InfoBlock name="Основная информация" fields={mainInfoFields} />
            <InfoBlock name="Параметры заявки" fields={requestParamsFields} />
            <InfoBlock
              name="Контактная информация"
              fields={contactInfoFields}
            />
            <InfoBlock
              name="Дополнительная информация"
              fields={additionalInfoFields}
            />
          </Box>
        </Drawer>
      </>
    );
  },
};
