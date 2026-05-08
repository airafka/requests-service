import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Button,
  IconButton,
  Chip,
  Badge,
  Avatar,
  TextField,
  Checkbox,
  Switch,
  Rating,
  LinearProgress,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Typography as MuiTypography,
  Box,
} from "@mui/material";
import {
  Info as InfoIcon,
  Help as HelpIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  ThumbUp as ThumbUpIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
} from "@mui/icons-material";
import { ITooltype } from "./index";

const meta: Meta<typeof ITooltype> = {
  title: "UIKIT/ITooltype",
  component: ITooltype,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `
## ITooltype - Универсальный компонент всплывающих подсказок

ITooltype - это компонент для отображения всплывающих подсказок (tooltip) при наведении на элементы интерфейса.
Компонент построен на основе Material-UI Popover и предоставляет гибкие возможности настройки.

### Основные возможности:
- **Универсальность**: Работает с любыми React элементами
- **Интернационализация**: Поддержка переводов через i18next
- **Позиционирование**: Автоматическое позиционирование подсказки
- **Специальные режимы**: Поддержка footer иконок с особым позиционированием
- **Доступность**: ARIA атрибуты для скринридеров
- **Автоматическое закрытие**: Закрытие при изменении содержимого

### Props:
- **id**: Уникальный идентификатор для ARIA атрибутов
- **item**: React элемент для отображения (альтернатива children)
- **children**: Дочерние элементы (альтернатива item)
- **label**: Текст подсказки
- **isTranslate**: Включить/отключить перевод текста

### Особенности:
- **Hover активация**: Подсказка появляется при наведении мыши
- **Автоматическое позиционирование**: Подсказка адаптируется к позиции элемента
- **Производительность**: Оптимизированная работа с состоянием
              `,
      },
    },
  },
  argTypes: {
    id: {
      description: "Уникальный идентификатор для ARIA атрибутов",
      control: "text",
    },
    label: {
      description: "Текст подсказки",
      control: "text",
    },
    isTranslate: {
      description: "Включить/отключить перевод текста",
      control: "boolean",
    },
    tooltipType: {
      description: "Тип тултипа (определяет border-radius)",
      control: "object",
    },
    item: {
      description: "React элемент для отображения",
      control: false,
    },
    children: {
      description: "Дочерние элементы",
      control: false,
    },
  },
  args:{
    tooltipType: {
      anchor: {
        vertical: 'bottom',
        horizontal: 'right'
      },
      transform: {
        vertical: 'top',
        horizontal: 'right'
      }
    }
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Базовый пример с текстом
export const Basic: Story = {
  args: {
    id: "basic-tooltip",
    label: "Это базовая подсказка",
    children: "Наведите на меня",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Базовый пример tooltip с простым текстом. Подсказка появляется при наведении на элемент.",
      },
    },
  },
};

// С иконкой
export const WithIcon: Story = {
  args: {
    id: "icon-tooltip",
    label: "Информационная подсказка",
    children: <InfoIcon color="primary" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с иконкой. Полезно для информационных элементов и справки.",
      },
    },
  },
};

// С кнопкой
export const WithButton: Story = {
  args: {
    id: "button-tooltip",
    label: "Нажмите для сохранения",
    children: (
      <Button variant="contained" color="primary">
        Сохранить
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с кнопкой. Помогает пользователям понять назначение кнопки.",
      },
    },
  },
};

// С иконкой кнопки
export const WithIconButton: Story = {
  args: {
    id: "icon-button-tooltip",
    label: "Редактировать запись",
    children: (
      <IconButton color="primary">
        <EditIcon />
      </IconButton>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с иконкой кнопки. Часто используется в панелях инструментов и таблицах.",
      },
    },
  },
};

// С чипом
export const WithChip: Story = {
  args: {
    id: "chip-tooltip",
    label: "Статус: Активен",
    children: <Chip label="Активен" color="success" size="small" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с чипом. Полезно для отображения дополнительной информации о статусах.",
      },
    },
  },
};

// С бейджем
export const WithBadge: Story = {
  args: {
    id: "badge-tooltip",
    label: "У вас 5 непрочитанных сообщений",
    children: (
      <Badge badgeContent={5} color="error">
        <EmailIcon />
      </Badge>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с бейджем. Отображает дополнительную информацию о количестве уведомлений.",
      },
    },
  },
};

// С аватаром
export const WithAvatar: Story = {
  args: {
    id: "avatar-tooltip",
    label: "Иван Петров - Разработчик",
    children: <Avatar>ИП</Avatar>,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с аватаром. Показывает информацию о пользователе при наведении.",
      },
    },
  },
};

// С полем ввода
export const WithTextField: Story = {
  args: {
    id: "textfield-tooltip",
    label: "Введите ваше полное имя",
    children: <TextField label="Имя" size="small" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с полем ввода. Помогает пользователям понять требования к вводу данных.",
      },
    },
  },
};

// С чекбоксом
export const WithCheckbox: Story = {
  args: {
    id: "checkbox-tooltip",
    label: "Согласие на обработку персональных данных",
    children: <Checkbox />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с чекбоксом. Объясняет назначение и последствия выбора.",
      },
    },
  },
};

// С переключателем
export const WithSwitch: Story = {
  args: {
    id: "switch-tooltip",
    label: "Включить уведомления",
    children: <Switch />,
  },
  parameters: {
    docs: {
      description: {
        story: "Tooltip с переключателем. Поясняет функцию настройки.",
      },
    },
  },
};

// С рейтингом
export const WithRating: Story = {
  args: {
    id: "rating-tooltip",
    label: "Оцените качество товара",
    children: <Rating value={4} readOnly />,
  },
  parameters: {
    docs: {
      description: {
        story: "Tooltip с рейтингом. Объясняет систему оценки.",
      },
    },
  },
};

// С прогрессом
export const WithProgress: Story = {
  args: {
    id: "progress-tooltip",
    label: "Загрузка: 75%",
    children: (
      <LinearProgress variant="determinate" value={75} style={{ width: 100 }} />
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Tooltip с прогрессом. Показывает точное значение прогресса.",
      },
    },
  },
};

// С круговым прогрессом
export const WithCircularProgress: Story = {
  args: {
    id: "circular-progress-tooltip",
    label: "Обработка данных...",
    children: <CircularProgress size={24} />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с круговым прогрессом. Информирует о процессе обработки.",
      },
    },
  },
};

// С алертом
export const WithAlert: Story = {
  args: {
    id: "alert-tooltip",
    label: "Важное уведомление",
    children: (
      <Alert severity="warning" icon={<WarningIcon />}>
        Внимание!
      </Alert>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с алертом. Предоставляет дополнительную информацию о предупреждении.",
      },
    },
  },
};

// С карточкой
export const WithCard: Story = {
  args: {
    id: "card-tooltip",
    label: "Детальная информация о товаре",
    children: (
      <Card style={{ width: 200, cursor: "pointer" }}>
        <CardContent>
          <MuiTypography variant="h6">Товар</MuiTypography>
          <MuiTypography variant="body2">Описание товара</MuiTypography>
        </CardContent>
      </Card>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с карточкой. Показывает дополнительную информацию о товаре или элементе.",
      },
    },
  },
};

// Без перевода
export const WithoutTranslation: Story = {
  args: {
    id: "no-translate-tooltip",
    label: "This is English text without translation",
    children: <HelpIcon color="action" />,
    isTranslate: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip без перевода. Полезно для технических терминов или английского текста.",
      },
    },
  },
};

// Множественные примеры
export const MultipleExamples: Story = {
  render: () => (
    <Box
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", alignItems: "center" }}
    >
      <ITooltype id="delete-tooltip" label="Удалить элемент">
        <IconButton color="error">
          <DeleteIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="add-tooltip" label="Добавить новый элемент">
        <IconButton color="primary">
          <AddIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="search-tooltip" label="Поиск по содержимому">
        <IconButton color="primary">
          <SearchIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="person-tooltip" label="Профиль пользователя">
        <IconButton color="primary">
          <PersonIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="phone-tooltip" label="Контактный телефон">
        <IconButton color="primary">
          <PhoneIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="location-tooltip" label="Местоположение">
        <IconButton color="primary">
          <LocationIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="star-tooltip" label="Добавить в избранное">
        <IconButton color="primary">
          <StarIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="favorite-tooltip" label="Понравилось">
        <IconButton color="primary">
          <FavoriteIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="thumb-tooltip" label="Одобрить">
        <IconButton color="primary">
          <ThumbUpIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="visibility-tooltip" label="Просмотр">
        <IconButton color="primary">
          <VisibilityIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="download-tooltip" label="Скачать файл">
        <IconButton color="primary">
          <DownloadIcon />
        </IconButton>
      </ITooltype>

      <ITooltype id="share-tooltip" label="Поделиться">
        <IconButton color="primary">
          <ShareIcon />
        </IconButton>
      </ITooltype>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Множественные примеры tooltip с различными иконками. Демонстрирует разнообразие использования в интерфейсе.",
      },
    },
  },
};

// В контексте формы
export const InFormContext: Story = {
  render: () => (
    <Box
      sx={{ width: 400, p: 3, border: "1px solid #e0e0e0", borderRadius: 2 }}
    >
      <MuiTypography variant="h6" gutterBottom>
        Форма регистрации
      </MuiTypography>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField fullWidth label="Имя пользователя" size="small" />
          <ITooltype
            id="username-tooltip"
            label="Используйте латинские буквы и цифры"
          >
            <InfoIcon color="action" fontSize="small" />
          </ITooltype>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField fullWidth label="Email" type="email" size="small" />
          <ITooltype
            id="email-tooltip"
            label="Будет использоваться для восстановления пароля"
          >
            <InfoIcon color="action" fontSize="small" />
          </ITooltype>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <TextField fullWidth label="Пароль" type="password" size="small" />
          <ITooltype
            id="password-tooltip"
            label="Минимум 8 символов, включая буквы и цифры"
          >
            <InfoIcon color="action" fontSize="small" />
          </ITooltype>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Checkbox />
          <MuiTypography variant="body2">Согласен с условиями</MuiTypography>
          <ITooltype
            id="terms-tooltip"
            label="Ознакомьтесь с пользовательским соглашением"
          >
            <HelpIcon color="action" fontSize="small" />
          </ITooltype>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ITooltype в контексте формы. Показывает, как использовать подсказки для помощи пользователям при заполнении форм.",
      },
    },
  },
};

// В контексте таблицы
export const InTableContext: Story = {
  render: () => (
    <Box sx={{ width: 600 }}>
      <MuiTypography variant="h6" gutterBottom>
        Таблица пользователей
      </MuiTypography>

      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 100px",
            bgcolor: "#f5f5f5",
            p: 1,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <MuiTypography variant="subtitle2">Имя</MuiTypography>
          <MuiTypography variant="subtitle2">Email</MuiTypography>
          <MuiTypography variant="subtitle2">Статус</MuiTypography>
          <MuiTypography variant="subtitle2">Действия</MuiTypography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 100px",
            p: 1,
            borderBottom: "1px solid #e0e0e0",
            alignItems: "center",
          }}
        >
          <MuiTypography>Иван Петров</MuiTypography>
          <MuiTypography>ivan@example.com</MuiTypography>
          <Chip label="Активен" color="success" size="small" />
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <ITooltype
              id="edit-user-tooltip"
              label="Редактировать пользователя"
            >
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </ITooltype>
            <ITooltype id="delete-user-tooltip" label="Удалить пользователя">
              <IconButton size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ITooltype>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 100px",
            p: 1,
            alignItems: "center",
          }}
        >
          <MuiTypography>Мария Сидорова</MuiTypography>
          <MuiTypography>maria@example.com</MuiTypography>
          <Chip label="Неактивен" color="default" size="small" />
          <Box sx={{ display: "flex", gap: 0.5 }}>
            <ITooltype
              id="edit-user2-tooltip"
              label="Редактировать пользователя"
            >
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
            </ITooltype>
            <ITooltype id="delete-user2-tooltip" label="Удалить пользователя">
              <IconButton size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </ITooltype>
          </Box>
        </Box>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "ITooltype в контексте таблицы. Демонстрирует использование подсказок для кнопок действий в таблицах.",
      },
    },
  },
};

// Интерактивный пример
export const Interactive: Story = {
  render: () => {
    const [selectedIcon, setSelectedIcon] = useState<string>("");

    const icons = [
      { id: "info", icon: <InfoIcon />, label: "Информация", color: "primary" },
      { id: "help", icon: <HelpIcon />, label: "Справка", color: "secondary" },
      {
        id: "warning",
        icon: <WarningIcon />,
        label: "Предупреждение",
        color: "warning",
      },
      { id: "error", icon: <ErrorIcon />, label: "Ошибка", color: "error" },
      {
        id: "success",
        icon: <CheckCircleIcon />,
        label: "Успех",
        color: "success",
      },
    ];

    return (
      <Box sx={{ textAlign: "center" }}>
        <MuiTypography variant="h6" gutterBottom>
          Выберите иконку для просмотра подсказки
        </MuiTypography>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mb: 3 }}>
          {icons.map(({ id, icon, label, color }) => (
            <ITooltype key={id} id={`${id}-tooltip`} label={label}>
              <IconButton
                color={
                  color as
                    | "primary"
                    | "secondary"
                    | "warning"
                    | "error"
                    | "success"
                }
                onClick={() => setSelectedIcon(id)}
                sx={{
                  border: selectedIcon === id ? 2 : 0,
                  borderColor: "primary.main",
                }}
              >
                {icon}
              </IconButton>
            </ITooltype>
          ))}
        </Box>

        {selectedIcon && (
          <Alert severity="info">
            Вы выбрали иконку:{" "}
            {icons.find((icon) => icon.id === selectedIcon)?.label}
          </Alert>
        )}
      </Box>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Интерактивный пример с выбором иконок. Демонстрирует взаимодействие с tooltip и отслеживание состояния.",
      },
    },
  },
};

// С длинным текстом
export const LongText: Story = {
  args: {
    id: "long-text-tooltip",
    label:
      "Это очень длинный текст подсказки, который содержит много информации и может занимать несколько строк. Такие подсказки полезны для подробного объяснения сложных функций или процессов.",
    children: <InfoIcon color="primary" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с длинным текстом. Показывает, как компонент обрабатывает многострочный контент.",
      },
    },
  },
};

// С HTML контентом (без перевода)
export const WithHTMLContent: Story = {
  args: {
    id: "html-content-tooltip",
    label: "Ссылка: <a href='#'>Подробнее</a> | <strong>Важно!</strong>",
    children: <InfoIcon color="primary" />,
    isTranslate: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Tooltip с HTML контентом. Показывает возможность отображения форматированного текста.",
      },
    },
  },
};

// Все типы тултипов
export const AllTooltipTypes: Story = {
  render: () => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: 4,
        border: "2px dashed #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <MuiTypography variant="h6" gutterBottom>
        Типы тултипов с разными border-radius
      </MuiTypography>

      <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
        <ITooltype
          id="tooltip-left"
          label="Тип Left: border-radius 3px 3px 3px 0"
        >
          <Button variant="outlined" startIcon={<InfoIcon />}>
            Left Type
          </Button>
        </ITooltype>
        <MuiTypography variant="body2" color="text.secondary">
          border-top-left: 3px, border-top-right: 3px, border-bottom-right:
          3px, border-bottom-left: 0
        </MuiTypography>
      </Box>

      <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
        <ITooltype
          id="tooltip-right"
          label="Тип Right: border-radius 3px 3px 0 3px"
        >
          <Button variant="outlined" startIcon={<HelpIcon />}>
            Right Type
          </Button>
        </ITooltype>
        <MuiTypography variant="body2" color="text.secondary">
          border-top-left: 3px, border-top-right: 3px, border-bottom-right: 0,
          border-bottom-left: 3px
        </MuiTypography>
      </Box>

      <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
        <ITooltype
          id="tooltip-topright"
          label="Тип TopRight: border-radius 3px 0 3px 3px"
        >
          <Button variant="outlined" startIcon={<WarningIcon />}>
            TopRight Type
          </Button>
        </ITooltype>
        <MuiTypography variant="body2" color="text.secondary">
          border-top-left: 3px, border-top-right: 0, border-bottom-right: 3px,
          border-bottom-left: 3px
        </MuiTypography>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "## Все типы тултипов\n\nДемонстрация трех типов тултипов с разными border-radius:\n\n- **Left**: Скругление отсутствует в левом нижнем углу\n- **Right**: Скругление отсутствует в правом нижнем углу\n- **TopRight**: Скругление отсутствует в правом верхнем углу",
      },
    },
  },
};
