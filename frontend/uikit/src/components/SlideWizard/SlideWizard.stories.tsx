import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Box } from "@mui/material";
import { ButtonType } from "../Button";
import { Modal } from "../Modal";
import { InputText } from "../InputText";
import type { Frame } from "./types";
import { SlideWizard } from "./SlideWizard";

const FRAMES: Frame[] = [
  {
    label: "Название слайда",
    component: () => <>Слайд 1</>,
    actions: [
      {
        title: "Далее",
        position: "right",
        buttonType: ButtonType.default,
        handler: "next",
      },
    ],
  },
  {
    label: "Название слайда",
    component: () => <>Слайд 2</>,
    actions: [
      {
        title: "Назад",
        position: "right",
        buttonType: ButtonType.default,
        handler: "prev",
      },
      {
        title: "Далее",
        position: "right",
        buttonType: ButtonType.default,
        handler: "next",
      },
    ],
  },
  {
    label: "Очень-очень длинное название слайда",
    component: () => <>Слайд 3</>,
    actions: [
      {
        title: "Назад",
        position: "right",
        buttonType: ButtonType.default,
        handler: "prev",
      },
      {
        title: "Далее",
        position: "right",
        buttonType: ButtonType.default,
        handler: "next",
      },
    ],
  },
  {
    label: "Очень длинное название слайда",
    component: () => <>Слайд 4</>,
    actions: [
      {
        title: "Назад",
        position: "right",
        buttonType: ButtonType.default,
        handler: "prev",
      },
    ],
  },
];

const FORM_FIELDS_COUNT = 14;

const FormWithScrollContent = () => {
  const [values, setValues] = useState<Record<number, string>>({});
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pb: 2 }}>
      {Array.from({ length: FORM_FIELDS_COUNT }, (_, i) => (
        <InputText
          key={i}
          label={`Поле ${i + 1}`}
          placeholder={`Введите значение ${i + 1}`}
          value={values[i] ?? ""}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, [i]: e.target.value }))
          }
        />
      ))}
    </Box>
  );
};

const FRAMES_MODAL: Frame[] = [
  {
    label: "Шаг 1 — Форма",
    component: FormWithScrollContent,
    actions: [
      {
        title: "Далее",
        position: "right",
        buttonType: ButtonType.default,
        handler: "next",
      },
    ],
  },
  {
    label: "Шаг 2",
    component: () => <>Слайд 2</>,
    actions: [
      {
        title: "Назад",
        position: "right",
        buttonType: ButtonType.default,
        handler: "prev",
      },
      {
        title: "Далее",
        position: "right",
        buttonType: ButtonType.default,
        handler: "next",
      },
    ],
  },
  {
    label: "Шаг 3",
    component: () => <>Слайд 3</>,
    actions: [
      {
        title: "Назад",
        position: "right",
        buttonType: ButtonType.default,
        handler: "prev",
      },
    ],
  },
];

const meta: Meta<typeof SlideWizard> = {
  title: "UIKIT/SlideWizard",
  component: SlideWizard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SlideWizard>;

export const Default: Story = {
  args: {
    title: "Визард",
    frames: FRAMES,
  },
  render: (args) => {
    const [currentFrame, setCurrentFrame] = useState(0);

    return (
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
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <SlideWizard
            {...args}
            currentFrame={currentFrame}
            onFrameChange={setCurrentFrame}
          />
        </div>
      </div>
    );
  },
};

export const WithClickableIndicators: Story = {
  args: {
    title: "Визард с кликабельными индикаторами",
    frames: FRAMES,
    hasClickableIndicators: true,
  },
  render: (args) => {
    const [currentFrame, setCurrentFrame] = useState(0);

    return (
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
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "400px",
          }}
        >
          <SlideWizard
            {...args}
            currentFrame={currentFrame}
            onFrameChange={setCurrentFrame}
          />
        </div>
      </div>
    );
  },
};

export const ModalWizard: Story = {
  args: {
    title: "Визард в модальном окне",
    frames: FRAMES_MODAL,
    hasClickableIndicators: true,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentFrame, setCurrentFrame] = useState(0);

    return (
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
          width: "100%",
        }}
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <button
            onClick={() => setIsOpen(true)}
            style={{
              padding: "8px 16px",
              backgroundColor: "#3472ED",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Открыть модальное окно
          </button>

          <Modal
            open={isOpen}
            onClose={() => setIsOpen(false)}
            width={800}
            height={500}
          >
            <SlideWizard
              {...args}
              currentFrame={currentFrame}
              onFrameChange={setCurrentFrame}
            />
          </Modal>
        </div>
      </div>
    );
  },
};
