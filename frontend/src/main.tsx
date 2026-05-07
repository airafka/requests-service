import React from "react";
import ReactDOM from "react-dom/client";
import {
  Archive,
  BriefcaseBusiness,
  ChevronDown,
  FileText,
  Grid2X2,
  List,
  MoreHorizontal,
  Plus,
  RefreshCw,
  Search,
  Settings,
  User,
  WalletCards,
} from "lucide-react";
import "./styles.css";

type Container = {
  id: number;
  number: string;
};

type ReceivingOrder = {
  id: number;
  number: string;
  client: string;
  createdAt: string;
  containers: Container[];
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

const navItems = [
  { icon: List, active: false, label: "Справочники" },
  { icon: FileText, active: false, label: "Документы" },
  { icon: Archive, active: true, label: "Заявки" },
  { icon: WalletCards, active: false, label: "Биллинг" },
  { icon: BriefcaseBusiness, active: false, label: "Администрирование" },
  { icon: Grid2X2, active: false, label: "Сервисы" },
];

function App() {
  const [orders, setOrders] = React.useState<ReceivingOrder[]>([]);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [orderNumber, setOrderNumber] = React.useState("");
  const [client, setClient] = React.useState("");
  const [selectedContainers, setSelectedContainers] = React.useState<string[]>([]);
  const [newContainerNumber, setNewContainerNumber] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [ordersResponse, containersResponse] = await Promise.all([
        fetch(`${API_BASE}/receiving-orders`),
        fetch(`${API_BASE}/containers`),
      ]);

      if (!ordersResponse.ok || !containersResponse.ok) {
        throw new Error("Не удалось загрузить данные");
      }

      setOrders(await ordersResponse.json());
      setContainers(await containersResponse.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  async function createContainer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const number = newContainerNumber.trim().toUpperCase();
    if (!number) {
      setError("Укажите номер контейнера");
      return;
    }

    const response = await fetch(`${API_BASE}/containers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number }),
    });

    if (!response.ok) {
      setError(response.status === 409 ? "Контейнер уже есть в справочнике" : "Не удалось создать контейнер");
      return;
    }

    setNewContainerNumber("");
    await loadData();
  }

  async function createOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!orderNumber.trim() || !client.trim()) {
      setError("Заполните номер заявки и клиента");
      return;
    }

    if (selectedContainers.length === 0) {
      setError("Выберите хотя бы один контейнер");
      return;
    }

    const response = await fetch(`${API_BASE}/receiving-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number: orderNumber.trim(),
        client: client.trim(),
        containerNumbers: selectedContainers,
      }),
    });

    if (!response.ok) {
      setError(response.status === 409 ? "Заявка с таким номером уже есть" : "Не удалось создать заявку");
      return;
    }

    setOrderNumber("");
    setClient("");
    setSelectedContainers([]);
    await loadData();
  }

  function toggleContainer(number: string) {
    setSelectedContainers((current) =>
      current.includes(number) ? current.filter((item) => item !== number) : [...current, number],
    );
  }

  return (
    <main className="app">
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

      <section className="content">
        <header className="navbar">
          <div className="breadcrumbs">
            <span>Главная</span>
            <span>–</span>
            <span>Заявки</span>
            <span>–</span>
            <span>Заявки на поставку</span>
          </div>
          <button className="avatar" type="button" aria-label="Профиль">
            <User size={18} />
          </button>
        </header>

        <section className="workspace">
          <div className="page-head">
            <div>
              <h1>Заявки на поставку</h1>
              <p>Создание заявок с выбором контейнеров из справочника</p>
            </div>
            <button className="refresh-button" type="button" onClick={loadData}>
              <RefreshCw size={16} />
              Обновить
            </button>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="layout-grid">
            <form className="form-panel" onSubmit={createOrder}>
              <h2>Новая заявка</h2>
              <label>
                Номер заявки
                <input value={orderNumber} onChange={(event) => setOrderNumber(event.target.value)} placeholder="Например, RO-001" />
              </label>
              <label>
                Клиент
                <input value={client} onChange={(event) => setClient(event.target.value)} placeholder="Название клиента" />
              </label>
              <div className="field-block">
                <span>Контейнеры</span>
                <div className="container-options">
                  {containers.map((container) => (
                    <label className="checkbox-row" key={container.id}>
                      <input
                        type="checkbox"
                        checked={selectedContainers.includes(container.number)}
                        onChange={() => toggleContainer(container.number)}
                      />
                      {container.number}
                    </label>
                  ))}
                  {containers.length === 0 && <p className="muted">Справочник контейнеров пуст</p>}
                </div>
              </div>
              <button className="primary-button" type="submit">
                <Plus size={16} />
                Создать заявку
              </button>
            </form>

            <section className="dictionary-panel">
              <h2>Справочник контейнеров</h2>
              <form className="inline-form" onSubmit={createContainer}>
                <input
                  value={newContainerNumber}
                  onChange={(event) => setNewContainerNumber(event.target.value)}
                  placeholder="Номер контейнера"
                />
                <button className="icon-blue" type="submit" aria-label="Добавить контейнер">
                  <Plus size={18} />
                </button>
              </form>
              <div className="container-list">
                {containers.map((container) => (
                  <span className="container-chip" key={container.id}>
                    {container.number}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <section className="table-section">
            <div className="table-head">
              <h2>Список заявок</h2>
              <span>{isLoading ? "Загрузка..." : `${orders.length} шт.`}</span>
            </div>
            <div className="table-wrap">
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>
                      Номер заявки
                      <ChevronDown size={14} />
                    </th>
                    <th>
                      Клиент
                      <ChevronDown size={14} />
                    </th>
                    <th>
                      Контейнеры
                      <ChevronDown size={14} />
                    </th>
                    <th>
                      Дата создания
                      <ChevronDown size={14} />
                    </th>
                    <th className="control-head" />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.number}</td>
                      <td>{order.client}</td>
                      <td>{order.containers.map((container) => container.number).join(", ")}</td>
                      <td>{new Date(order.createdAt).toLocaleString("ru-RU")}</td>
                      <td className="more-cell">
                        <MoreHorizontal size={20} />
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td className="empty-cell" colSpan={5}>
                        Заявок пока нет
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
