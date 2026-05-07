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

type Status = "confirmed" | "progress" | "draft" | "review" | "done";

type Row = {
  id: string;
  client: string;
  pickupTime: string;
  site: string;
  transport: string;
  createdAt: string;
  route: string;
  comment: string;
  status: Status;
};

const rows: Row[] = [
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "—", "confirmed"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Контейнерная площадка", "ЖД", "20.12.2024", "12345678910", "—", "progress"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "—", "draft"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "—", "review"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "123456789101234567...", "done"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "12345678910", "done"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "12345678910", "done"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "12345678910", "done"],
  ["426", "АО «Смарт Лог»", "17.09.2025 13:00 - 14:00", "Складской комплекс", "Авто", "20.12.2024", "12345678910", "12345678910", "done"],
].map(([id, client, pickupTime, site, transport, createdAt, route, comment, status]) => ({
  id,
  client,
  pickupTime,
  site,
  transport,
  createdAt,
  route,
  comment,
  status: status as Status,
}));

const navItems = [
  { icon: List, active: false, label: "Справочники" },
  { icon: FileText, active: false, label: "Документы" },
  { icon: Archive, active: true, label: "Заявки" },
  { icon: WalletCards, active: false, label: "Биллинг" },
  { icon: BriefcaseBusiness, active: false, label: "Администрирование" },
  { icon: Grid2X2, active: false, label: "Сервисы" },
];

const statusText: Record<Status, string> = {
  confirmed: "Подтверждена",
  progress: "В работе",
  draft: "Черновик",
  review: "На проверке",
  done: "Выполнена",
};

const columns = ["Номер заявки", "Клиент", "Дата и время вывоза", "Площадка", "Вид транспорта", "Дата создания", "Рейс", "Комментарий", "Статус"];

function App() {
  return (
    <div className="screen-scale">
      <main className="figma-frame">
        <header className="navbar">
          <div className="breadcrumbs">
            <span>Главная</span>
            <span>–</span>
            <span>Заявки</span>
            <span>–</span>
            <span>Заявки на вывоз</span>
          </div>
          <button className="avatar" type="button" aria-label="Профиль">
            <User size={18} />
          </button>
        </header>

        <aside className="sidebar">
          <div className="sidebar-top">
            <div className="logo-mark" aria-label="Логотип">
              {Array.from({ length: 9 }).map((_, index) => (
                <span key={index} />
              ))}
            </div>
            <button className="search-button" type="button" aria-label="Поиск">
              <Search size={16} />
            </button>
            <nav className="sidebar-nav" aria-label="Основная навигация">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button className={`nav-icon ${item.active ? "active" : ""}`} type="button" aria-label={item.label} key={item.label}>
                    <Icon size={20} strokeWidth={1.65} />
                  </button>
                );
              })}
            </nav>
          </div>
          <button className="settings-button" type="button" aria-label="Настройки">
            <Settings size={20} strokeWidth={1.65} />
          </button>
        </aside>

        <section className="work-area">
          <div className="page-head">
            <h1>Заявки на вывоз</h1>
            <div className="head-actions">
              <button className="download-button" type="button" aria-label="Скачать">
                <Download size={22} />
              </button>
              <button className="create-button" type="button">
                <Plus size={16} />
                Создать
              </button>
            </div>
          </div>

          <div className="table-wrap">
            <table className="requests-table">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={column}>
                      <span>{column}</span>
                      {index === 0 && <List size={14} />}
                      <ChevronDown size={14} />
                    </th>
                  ))}
                  <th className="control-head">
                    <SlidersHorizontal size={16} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr className={index === 2 ? "row-muted" : ""} key={`${row.id}-${index}`}>
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
                      <span className={`badge ${row.status}`}>{statusText[row.status]}</span>
                    </td>
                    <td className="more-cell">
                      <MoreHorizontal size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="dropdown-menu">
              <button type="button">Открыть</button>
              <button type="button">Редактировать</button>
              <button type="button">Копировать</button>
            </div>
          </div>
        </section>

        <footer className="pagination">
          <span>Строк на странице:</span>
          <button className="page-size" type="button">
            25
            <ChevronDown size={14} />
          </button>
          <button className="page-box active" type="button">
            1
          </button>
          <button className="page-box" type="button">
            2
          </button>
          <button className="page-box" type="button">
            3
          </button>
          <span className="dots">...</span>
          <button className="page-box" type="button">
            10
          </button>
          <button className="page-box" type="button">
            ›
          </button>
        </footer>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
