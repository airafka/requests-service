import React from "react";
import ReactDOM from "react-dom/client";
import {
  Archive,
  ArrowLeft,
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

type Page = "list" | "create" | "details";

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
  const [page, setPage] = React.useState<Page>("list");
  const [orders, setOrders] = React.useState<ReceivingOrder[]>([]);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [selectedOrderId, setSelectedOrderId] = React.useState<number | null>(null);
  const [orderNumber, setOrderNumber] = React.useState("");
  const [client, setClient] = React.useState("");
  const [selectedContainers, setSelectedContainers] = React.useState<string[]>([]);
  const [containerToAdd, setContainerToAdd] = React.useState("");
  const [newContainerNumber, setNewContainerNumber] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? null;

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

    const createdOrder: ReceivingOrder = await response.json();
    setOrderNumber("");
    setClient("");
    setSelectedContainers([]);
    setContainerToAdd("");
    await loadData();
    setSelectedOrderId(createdOrder.id);
    setPage("details");
  }

  function addSelectedContainer() {
    if (!containerToAdd) {
      return;
    }

    setSelectedContainers((current) => (current.includes(containerToAdd) ? current : [...current, containerToAdd]));
    setContainerToAdd("");
  }

  function removeSelectedContainer(number: string) {
    setSelectedContainers((current) => current.filter((item) => item !== number));
  }

  function openDetails(order: ReceivingOrder) {
    setSelectedOrderId(order.id);
    setPage("details");
  }

  function openCreate() {
    setError(null);
    setPage("create");
  }

  return (
    <main className="app">
      <Sidebar />

      <section className="content">
        <Header page={page} />

        <section className="workspace">
          {error && <div className="error">{error}</div>}

          {page === "list" && (
            <OrdersListPage
              orders={orders}
              isLoading={isLoading}
              onCreate={openCreate}
              onRefresh={loadData}
              onOpen={openDetails}
            />
          )}

          {page === "create" && (
            <CreateOrderPage
              orderNumber={orderNumber}
              client={client}
              containers={containers}
              selectedContainers={selectedContainers}
              containerToAdd={containerToAdd}
              newContainerNumber={newContainerNumber}
              onBack={() => setPage("list")}
              onSubmit={createOrder}
              onCreateContainer={createContainer}
              onOrderNumberChange={setOrderNumber}
              onClientChange={setClient}
              onContainerToAddChange={setContainerToAdd}
              onNewContainerNumberChange={setNewContainerNumber}
              onAddSelectedContainer={addSelectedContainer}
              onRemoveSelectedContainer={removeSelectedContainer}
            />
          )}

          {page === "details" && (
            <OrderDetailsPage
              order={selectedOrder}
              onBack={() => setPage("list")}
              onCreate={openCreate}
            />
          )}
        </section>
      </section>
    </main>
  );
}

function Sidebar() {
  return (
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
  );
}

function Header({ page }: { page: Page }) {
  const current = page === "create" ? "Создание заявки" : page === "details" ? "Карточка заявки" : "Список заявок";

  return (
    <header className="navbar">
      <div className="breadcrumbs">
        <span>Главная</span>
        <span>–</span>
        <span>Заявки</span>
        <span>–</span>
        <span>{current}</span>
      </div>
      <button className="avatar" type="button" aria-label="Профиль">
        <User size={18} />
      </button>
    </header>
  );
}

function OrdersListPage({
  orders,
  isLoading,
  onCreate,
  onRefresh,
  onOpen,
}: {
  orders: ReceivingOrder[];
  isLoading: boolean;
  onCreate: () => void;
  onRefresh: () => void;
  onOpen: (order: ReceivingOrder) => void;
}) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Список заявок на поставку</h1>
          <p>Заявки с контейнерами из справочника</p>
        </div>
        <div className="page-actions">
          <button className="secondary-button" type="button" onClick={onRefresh}>
            <RefreshCw size={16} />
            Обновить
          </button>
          <button className="primary-top-button" type="button" onClick={onCreate}>
            <Plus size={16} />
            Создать
          </button>
        </div>
      </div>

      <section className="table-section">
        <div className="table-head">
          <h2>Заявки</h2>
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
                <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
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
    </>
  );
}

function CreateOrderPage({
  orderNumber,
  client,
  containers,
  selectedContainers,
  containerToAdd,
  newContainerNumber,
  onBack,
  onSubmit,
  onCreateContainer,
  onOrderNumberChange,
  onClientChange,
  onContainerToAddChange,
  onNewContainerNumberChange,
  onAddSelectedContainer,
  onRemoveSelectedContainer,
}: {
  orderNumber: string;
  client: string;
  containers: Container[];
  selectedContainers: string[];
  containerToAdd: string;
  newContainerNumber: string;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onCreateContainer: (event: React.FormEvent<HTMLFormElement>) => void;
  onOrderNumberChange: (value: string) => void;
  onClientChange: (value: string) => void;
  onContainerToAddChange: (value: string) => void;
  onNewContainerNumberChange: (value: string) => void;
  onAddSelectedContainer: () => void;
  onRemoveSelectedContainer: (number: string) => void;
}) {
  const availableContainers = containers.filter((container) => !selectedContainers.includes(container.number));

  return (
    <>
      <div className="page-head">
        <div>
          <button className="back-link" type="button" onClick={onBack}>
            <ArrowLeft size={16} />
            Назад к списку
          </button>
          <h1>Создание заявки на поставку</h1>
          <p>Укажите номер, клиента и контейнеры из справочника</p>
        </div>
      </div>

      <div className="layout-grid">
        <form className="form-panel" onSubmit={onSubmit}>
          <h2>Данные заявки</h2>
          <label>
            Номер заявки
            <input value={orderNumber} onChange={(event) => onOrderNumberChange(event.target.value)} placeholder="Например, RO-001" />
          </label>
          <label>
            Клиент
            <input value={client} onChange={(event) => onClientChange(event.target.value)} placeholder="Название клиента" />
          </label>
          <div className="field-block">
            <span>Контейнеры</span>
            <div className="select-row">
              <select value={containerToAdd} onChange={(event) => onContainerToAddChange(event.target.value)}>
                <option value="">Выберите контейнер</option>
                {availableContainers.map((container) => (
                  <option value={container.number} key={container.id}>
                    {container.number}
                  </option>
                ))}
              </select>
              <button className="icon-blue" type="button" onClick={onAddSelectedContainer} aria-label="Добавить выбранный контейнер">
                <Plus size={18} />
              </button>
            </div>
            <div className="container-list selected">
              {selectedContainers.map((number) => (
                <button className="container-chip removable" type="button" onClick={() => onRemoveSelectedContainer(number)} key={number}>
                  {number}
                  <span>×</span>
                </button>
              ))}
              {selectedContainers.length === 0 && <p className="muted">Контейнеры не выбраны</p>}
            </div>
          </div>
          <button className="primary-button" type="submit">
            <Plus size={16} />
            Создать заявку
          </button>
        </form>

        <section className="dictionary-panel">
          <h2>Справочник контейнеров</h2>
          <form className="inline-form" onSubmit={onCreateContainer}>
            <input
              value={newContainerNumber}
              onChange={(event) => onNewContainerNumberChange(event.target.value)}
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
    </>
  );
}

function OrderDetailsPage({
  order,
  onBack,
  onCreate,
}: {
  order: ReceivingOrder | null;
  onBack: () => void;
  onCreate: () => void;
}) {
  if (!order) {
    return (
      <section className="details-panel">
        <button className="back-link" type="button" onClick={onBack}>
          <ArrowLeft size={16} />
          Назад к списку
        </button>
        <h1>Заявка не выбрана</h1>
      </section>
    );
  }

  return (
    <>
      <div className="page-head">
        <div>
          <button className="back-link" type="button" onClick={onBack}>
            <ArrowLeft size={16} />
            Назад к списку
          </button>
          <h1>Карточка заявки {order.number}</h1>
          <p>Информация о заявке на поставку</p>
        </div>
        <button className="primary-top-button" type="button" onClick={onCreate}>
          <Plus size={16} />
          Создать новую
        </button>
      </div>

      <section className="details-panel">
        <div className="detail-grid">
          <div>
            <span>Номер заявки</span>
            <strong>{order.number}</strong>
          </div>
          <div>
            <span>Клиент</span>
            <strong>{order.client}</strong>
          </div>
          <div>
            <span>Дата создания</span>
            <strong>{new Date(order.createdAt).toLocaleString("ru-RU")}</strong>
          </div>
        </div>

        <h2>Контейнеры в заявке</h2>
        <div className="container-list large">
          {order.containers.map((container) => (
            <span className="container-chip" key={container.id}>
              {container.number}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
