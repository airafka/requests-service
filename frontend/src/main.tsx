import React from "react";
import ReactDOM from "react-dom/client";
import {
  Archive,
  BriefcaseBusiness,
  ChevronDown,
  Download,
  FileText,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  SlidersHorizontal,
  User,
  WalletCards,
} from "lucide-react";
import "./styles.css";

type Row = {
  id: string;
  client: string;
  pickupTime: string;
  site: string;
  transport: string;
  createdAt: string;
  route: string;
  comment: string;
  status: "confirmed" | "progress" | "done";
};

const rows: Row[] = [
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Складской комплекс",
    transport: "Авто",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "—",
    status: "confirmed",
  },
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Контейнерная площадка",
    transport: "ЖД",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "—",
    status: "progress",
  },
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Складской комплекс",
    transport: "Авто",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "—",
    status: "done",
  },
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Складской комплекс",
    transport: "Авто",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "—",
    status: "done",
  },
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Складской комплекс",
    transport: "Авто",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "123456789101234567...",
    status: "done",
  },
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Складской комплекс",
    transport: "Авто",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "12345678910",
    status: "done",
  },
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Складской комплекс",
    transport: "Авто",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "12345678910",
    status: "done",
  },
  {
    id: "426",
    client: "АО «Смарт Лог»",
    pickupTime: "17.09.2025 13:00 - 14:00",
    site: "Складской комплекс",
    transport: "Авто",
    createdAt: "20.12.2024",
    route: "12345678910",
    comment: "12345678910",
    status: "done",
  },
];

const navItems = [
  { icon: List, active: false, label: "Справочники" },
  { icon: FileText, active: false, label: "Документы" },
  { icon: Archive, active: true, label: "Заявки" },
  { icon: WalletCards, active: false, label: "Биллинг" },
  { icon: BriefcaseBusiness, active: false, label: "Администрирование" },
  { icon: Grid2X2, active: false, label: "Сервисы" },
];

const statusText = {
  confirmed: "Подтверждена",
  progress: "В работе",
  done: "Выполнена",
};

function App() {
  return (
    <main className="figma-page">
      <aside className="sidebar">
        <div className="logo-mark" aria-label="Логотип">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>

        <button className="side-search" type="button" aria-label="Поиск">
          <Search size={16} />
        </button>

        <nav className="side-nav" aria-label="Основная навигация">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button className={`side-nav-item ${item.active ? "active" : ""}`} type="button" aria-label={item.label} key={item.label}>
                <Icon size={20} strokeWidth={1.7} />
              </button>
            );
          })}
        </nav>

        <button className="side-bottom" type="button" aria-label="Настройки">
          <Settings size={20} strokeWidth={1.7} />
        </button>
      </aside>

      <section className="content">
        <header className="topbar">
          <div className="breadcrumbs">
            <span>Главная</span>
            <span>—</span>
            <span>Заявки</span>
            <span>—</span>
            <span>Заявки на вывоз</span>
          </div>
          <button className="profile-button" type="button" aria-label="Профиль">
            <User size={18} />
          </button>
        </header>

        <section className="page-section">
          <div className="title-row">
            <h1>Заявки на вывоз</h1>
            <div className="actions">
              <button className="icon-action" type="button" aria-label="Скачать">
                <Download size={18} />
              </button>
              <button className="create-button" type="button">
                <Plus size={16} />
                Создать
              </button>
            </div>
          </div>

          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th>
                    <span>Номер заявки</span>
                    <List size={14} />
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Клиент</span>
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Дата и время вывоза</span>
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Площадка</span>
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Вид транспорта</span>
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Дата создания</span>
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Рейс</span>
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Комментарий</span>
                    <ChevronDown size={14} />
                  </th>
                  <th>
                    <span>Статус</span>
                    <ChevronDown size={14} />
                  </th>
                  <th className="controller">
                    <SlidersHorizontal size={16} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr className={index === 2 ? "selected-row" : ""} key={`${row.id}-${index}`}>
                    <td>{row.id}</td>
                    <td>
                      <a href="#client">{row.client}</a>
                    </td>
                    <td>{row.pickupTime}</td>
                    <td>{row.site}</td>
                    <td>{row.transport}</td>
                    <td>{row.createdAt}</td>
                    <td>{row.route}</td>
                    <td>{row.comment}</td>
                    <td>
                      <span className={`status-badge ${row.status}`}>{statusText[row.status]}</span>
                    </td>
                    <td className="more-cell">
                      <MoreHorizontal size={18} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="context-menu" aria-label="Меню действий">
              <button type="button">Открыть</button>
              <button type="button">Редактировать</button>
              <button type="button">Копировать</button>
            </div>
          </div>
        </section>

        <footer className="pagination">
          <div className="page-size">
            <span>Строк на странице:</span>
            <button type="button">
              25
              <ChevronDown size={14} />
            </button>
          </div>
          <div className="pages">
            <button className="active" type="button">
              1
            </button>
            <button type="button">2</button>
            <button type="button">3</button>
            <span>...</span>
            <button type="button">10</button>
            <button type="button">›</button>
          </div>
        </footer>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
