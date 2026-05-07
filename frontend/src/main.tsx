import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowLeft, ChevronDown, MoreHorizontal, Plus, User } from "lucide-react";
import "./styles.css";

type Page = "list" | "create" | "details";

type Client = {
  id: number;
  name: string;
};

type Container = {
  id: number;
  number: string;
};

type ReceivingOrder = {
  id: number;
  number: string;
  client: Client;
  createdAt: string;
  containers: Container[];
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

function App() {
  const [page, setPage] = React.useState<Page>("list");
  const [orders, setOrders] = React.useState<ReceivingOrder[]>([]);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [selectedOrderId, setSelectedOrderId] = React.useState<number | null>(null);
  const [clientId, setClientId] = React.useState("");
  const [selectedContainers, setSelectedContainers] = React.useState<string[]>([]);
  const [isContainerDropdownOpen, setIsContainerDropdownOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedOrder = orders.find((order) => order.id === selectedOrderId) ?? null;

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [ordersResponse, containersResponse, clientsResponse] = await Promise.all([
        fetch(`${API_BASE}/receiving-orders`),
        fetch(`${API_BASE}/containers`),
        fetch(`${API_BASE}/clients`),
      ]);

      if (!ordersResponse.ok || !containersResponse.ok || !clientsResponse.ok) {
        throw new Error("Не удалось загрузить данные");
      }

      setOrders(await ordersResponse.json());
      setContainers(await containersResponse.json());
      setClients(await clientsResponse.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Неизвестная ошибка");
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  async function createOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!clientId) {
      setError("Выберите клиента");
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
        clientId: Number(clientId),
        containerNumbers: selectedContainers,
      }),
    });

    if (!response.ok) {
      setError("Не удалось создать заявку");
      return;
    }

    const createdOrder: ReceivingOrder = await response.json();
    setClientId("");
    setSelectedContainers([]);
    setIsContainerDropdownOpen(false);
    await loadData();
    setSelectedOrderId(createdOrder.id);
    setPage("details");
  }

  function toggleContainer(number: string) {
    setSelectedContainers((current) =>
      current.includes(number) ? current.filter((item) => item !== number) : [...current, number],
    );
  }

  function openDetails(order: ReceivingOrder) {
    setSelectedOrderId(order.id);
    setPage("details");
  }

  return (
    <main className="app">
      <header className="navbar">
        <div className="breadcrumbs">
          <span>Главная</span>
          <span>–</span>
          <span>Поставка</span>
          <span>–</span>
          <span>{page === "list" ? "Список заявок" : page === "create" ? "Создание заявки" : "Карточка заявки"}</span>
        </div>
        <button className="avatar" type="button" aria-label="Профиль">
          <User size={18} />
        </button>
      </header>

      <section className="workspace">
        {error && <div className="error">{error}</div>}

        {page === "list" && (
          <OrdersListPage
            orders={orders}
            isLoading={isLoading}
            onCreate={() => setPage("create")}
            onOpen={openDetails}
          />
        )}

        {page === "create" && (
          <CreateOrderPage
            clients={clients}
            containers={containers}
            clientId={clientId}
            selectedContainers={selectedContainers}
            isContainerDropdownOpen={isContainerDropdownOpen}
            onBack={() => setPage("list")}
            onSubmit={createOrder}
            onClientChange={setClientId}
            onToggleContainer={toggleContainer}
            onToggleContainerDropdown={() => setIsContainerDropdownOpen((value) => !value)}
            onCloseContainerDropdown={() => setIsContainerDropdownOpen(false)}
          />
        )}

        {page === "details" && (
          <OrderDetailsPage
            order={selectedOrder}
            onBack={() => setPage("list")}
            onCreate={() => setPage("create")}
          />
        )}
      </section>
    </main>
  );
}

function OrdersListPage({
  orders,
  isLoading,
  onCreate,
  onOpen,
}: {
  orders: ReceivingOrder[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (order: ReceivingOrder) => void;
}) {
  return (
    <>
      <div className="page-head">
        <div>
          <h1>Список заявок на поставку</h1>
          <p>Заявки с контейнерами из справочника</p>
        </div>
        <button className="design-button" type="button" onClick={onCreate}>
          <Plus size={16} />
          Создать
        </button>
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
                  <td>{order.client.name}</td>
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
  clients,
  containers,
  clientId,
  selectedContainers,
  isContainerDropdownOpen,
  onBack,
  onSubmit,
  onClientChange,
  onToggleContainer,
  onToggleContainerDropdown,
  onCloseContainerDropdown,
}: {
  clients: Client[];
  containers: Container[];
  clientId: string;
  selectedContainers: string[];
  isContainerDropdownOpen: boolean;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClientChange: (value: string) => void;
  onToggleContainer: (number: string) => void;
  onToggleContainerDropdown: () => void;
  onCloseContainerDropdown: () => void;
}) {
  const selectedLabel = selectedContainers.length === 0 ? "" : selectedContainers.join(", ");

  return (
    <>
      <div className="page-head">
        <div>
          <button className="back-button" type="button" onClick={onBack}>
            <ArrowLeft size={16} />
            Назад к списку
          </button>
          <h1>Создание заявки на поставку</h1>
          <p>Номер заявки будет сформирован автоматически</p>
        </div>
      </div>

      <form className="form-panel create-page-form" onSubmit={onSubmit}>
        <h2>Данные заявки</h2>
        <label>
          Клиент
          <select value={clientId} onChange={(event) => onClientChange(event.target.value)}>
            <option value="" disabled>
              Выберите клиента
            </option>
            {clients.map((client) => (
              <option value={client.id} key={client.id}>
                {client.name}
              </option>
            ))}
          </select>
        </label>

        <div className="field-label">Контейнеры</div>
        <div className="multi-select">
          <button className={`multi-select-trigger ${selectedLabel ? "has-value" : ""}`} type="button" onClick={onToggleContainerDropdown}>
            <span>{selectedLabel || " "}</span>
            <ChevronDown size={16} />
          </button>
          {isContainerDropdownOpen && (
            <div className="multi-select-menu">
              {containers.map((container) => (
                <label className="multi-select-option" key={container.id}>
                  <input
                    type="checkbox"
                    checked={selectedContainers.includes(container.number)}
                    onChange={() => onToggleContainer(container.number)}
                  />
                  {container.number}
                </label>
              ))}
              {containers.length === 0 && <p className="muted dropdown-empty">В справочнике пока нет контейнеров</p>}
              <div className="dropdown-actions">
                <button type="button" onClick={onCloseContainerDropdown}>
                  Готово
                </button>
              </div>
            </div>
          )}
        </div>

        <button className="design-button form-submit" type="submit">
          <Plus size={16} />
          Создать
        </button>
      </form>
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
        <button className="back-button" type="button" onClick={onBack}>
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
          <button className="back-button" type="button" onClick={onBack}>
            <ArrowLeft size={16} />
            Назад к списку
          </button>
          <h1>Карточка заявки {order.number}</h1>
          <p>Информация о заявке на поставку</p>
        </div>
        <button className="design-button" type="button" onClick={onCreate}>
          <Plus size={16} />
          Создать
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
            <strong>{order.client.name}</strong>
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
