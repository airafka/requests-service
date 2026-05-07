import React from "react";
import ReactDOM from "react-dom/client";
import { ArrowLeft, ChevronDown, MoreHorizontal, User } from "lucide-react";
import "./styles.css";

type Page =
  | "receiving-list"
  | "receiving-create"
  | "receiving-details"
  | "owner-list"
  | "owner-create"
  | "owner-details"
  | "current-owners";

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

type OwnerChangeOrder = {
  id: number;
  number: string;
  newClient: Client;
  comment: string | null;
  createdAt: string;
  createdBy: string | null;
  completedAt: string | null;
  completedBy: string | null;
  containers: Container[];
};

type CurrentContainerOwner = {
  container: Container;
  client: Client;
  validFrom: string;
  operationType: "RECEIVING" | "OWNER_CHANGE";
  sourceId: number;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

function App() {
  const [page, setPage] = React.useState<Page>("receiving-list");
  const [receivingOrders, setReceivingOrders] = React.useState<ReceivingOrder[]>([]);
  const [ownerChangeOrders, setOwnerChangeOrders] = React.useState<OwnerChangeOrder[]>([]);
  const [currentOwners, setCurrentOwners] = React.useState<CurrentContainerOwner[]>([]);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [selectedReceivingOrderId, setSelectedReceivingOrderId] = React.useState<number | null>(null);
  const [selectedOwnerChangeOrderId, setSelectedOwnerChangeOrderId] = React.useState<number | null>(null);
  const [receivingClientId, setReceivingClientId] = React.useState("");
  const [receivingContainers, setReceivingContainers] = React.useState<string[]>([]);
  const [ownerClientId, setOwnerClientId] = React.useState("");
  const [ownerComment, setOwnerComment] = React.useState("");
  const [ownerContainers, setOwnerContainers] = React.useState<number[]>([]);
  const [isReceivingDropdownOpen, setIsReceivingDropdownOpen] = React.useState(false);
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedReceivingOrder = receivingOrders.find((order) => order.id === selectedReceivingOrderId) ?? null;
  const selectedOwnerChangeOrder = ownerChangeOrders.find((order) => order.id === selectedOwnerChangeOrderId) ?? null;

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [receivingResponse, ownerChangeResponse, currentOwnersResponse, containersResponse, clientsResponse] = await Promise.all([
        fetch(`${API_BASE}/receiving-orders`),
        fetch(`${API_BASE}/container-owner-change-orders`),
        fetch(`${API_BASE}/containers/owners/current`),
        fetch(`${API_BASE}/containers`),
        fetch(`${API_BASE}/clients`),
      ]);

      if (
        !receivingResponse.ok ||
        !ownerChangeResponse.ok ||
        !currentOwnersResponse.ok ||
        !containersResponse.ok ||
        !clientsResponse.ok
      ) {
        throw new Error("Не удалось загрузить данные");
      }

      setReceivingOrders(await receivingResponse.json());
      setOwnerChangeOrders(await ownerChangeResponse.json());
      setCurrentOwners(await currentOwnersResponse.json());
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

  async function createReceivingOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!receivingClientId) {
      setError("Выберите клиента");
      return;
    }

    if (receivingContainers.length === 0) {
      setError("Выберите хотя бы один контейнер");
      return;
    }

    const response = await fetch(`${API_BASE}/receiving-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: Number(receivingClientId),
        containerNumbers: receivingContainers,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать заявку на поставку"));
      return;
    }

    const createdOrder: ReceivingOrder = await response.json();
    setReceivingClientId("");
    setReceivingContainers([]);
    setIsReceivingDropdownOpen(false);
    await loadData();
    setSelectedReceivingOrderId(createdOrder.id);
    setPage("receiving-details");
  }

  async function createOwnerChangeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!ownerClientId) {
      setError("Выберите нового владельца");
      return;
    }

    if (ownerContainers.length === 0) {
      setError("Выберите хотя бы один контейнер");
      return;
    }

    const response = await fetch(`${API_BASE}/container-owner-change-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        newClientId: Number(ownerClientId),
        comment: ownerComment,
        containerIds: ownerContainers,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать заявку на смену владельца"));
      return;
    }

    const createdOrder: OwnerChangeOrder = await response.json();
    setOwnerClientId("");
    setOwnerComment("");
    setOwnerContainers([]);
    setIsOwnerDropdownOpen(false);
    await loadData();
    setSelectedOwnerChangeOrderId(createdOrder.id);
    setPage("owner-details");
  }

  function toggleReceivingContainer(number: string) {
    setReceivingContainers((current) =>
      current.includes(number) ? current.filter((item) => item !== number) : [...current, number],
    );
  }

  function toggleOwnerContainer(id: number) {
    setOwnerContainers((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function openReceivingDetails(order: ReceivingOrder) {
    setSelectedReceivingOrderId(order.id);
    setPage("receiving-details");
  }

  function openOwnerDetails(order: OwnerChangeOrder) {
    setSelectedOwnerChangeOrderId(order.id);
    setPage("owner-details");
  }

  return (
    <main className="app">
      <header className="navbar">
        <div className="breadcrumbs">
          <span>Главная</span>
          <span>-</span>
          <span>{page === "current-owners" ? "Владельцы контейнеров" : page.startsWith("owner") ? "Смена владельца" : "Поставка"}</span>
          <span>-</span>
          <span>{pageTitle(page)}</span>
        </div>
        <button className="avatar" type="button" aria-label="Профиль">
          <User size={18} />
        </button>
      </header>

      <section className="workspace">
        <div className="section-tabs">
          <button
            className={page.startsWith("receiving") ? "active" : ""}
            type="button"
            onClick={() => setPage("receiving-list")}
          >
            Поставки
          </button>
          <button
            className={page.startsWith("owner") ? "active" : ""}
            type="button"
            onClick={() => setPage("owner-list")}
          >
            Смена владельца
          </button>
          <button
            className={page === "current-owners" ? "active" : ""}
            type="button"
            onClick={() => setPage("current-owners")}
          >
            Владельцы контейнеров
          </button>
        </div>

        {error && <div className="error">{error}</div>}

        {page === "receiving-list" && (
          <ReceivingOrdersListPage
            orders={receivingOrders}
            isLoading={isLoading}
            onCreate={() => setPage("receiving-create")}
            onOpen={openReceivingDetails}
          />
        )}

        {page === "receiving-create" && (
          <CreateReceivingOrderPage
            clients={clients}
            containers={containers}
            clientId={receivingClientId}
            selectedContainers={receivingContainers}
            isContainerDropdownOpen={isReceivingDropdownOpen}
            onBack={() => setPage("receiving-list")}
            onSubmit={createReceivingOrder}
            onClientChange={setReceivingClientId}
            onToggleContainer={toggleReceivingContainer}
            onToggleContainerDropdown={() => setIsReceivingDropdownOpen((value) => !value)}
            onCloseContainerDropdown={() => setIsReceivingDropdownOpen(false)}
          />
        )}

        {page === "receiving-details" && (
          <ReceivingOrderDetailsPage
            order={selectedReceivingOrder}
            onBack={() => setPage("receiving-list")}
            onCreate={() => setPage("receiving-create")}
          />
        )}

        {page === "owner-list" && (
          <OwnerChangeOrdersListPage
            orders={ownerChangeOrders}
            isLoading={isLoading}
            onCreate={() => setPage("owner-create")}
            onOpen={openOwnerDetails}
          />
        )}

        {page === "owner-create" && (
          <CreateOwnerChangeOrderPage
            clients={clients}
            containers={containers}
            clientId={ownerClientId}
            comment={ownerComment}
            selectedContainers={ownerContainers}
            isContainerDropdownOpen={isOwnerDropdownOpen}
            onBack={() => setPage("owner-list")}
            onSubmit={createOwnerChangeOrder}
            onClientChange={setOwnerClientId}
            onCommentChange={setOwnerComment}
            onToggleContainer={toggleOwnerContainer}
            onToggleContainerDropdown={() => setIsOwnerDropdownOpen((value) => !value)}
            onCloseContainerDropdown={() => setIsOwnerDropdownOpen(false)}
          />
        )}

        {page === "owner-details" && (
          <OwnerChangeOrderDetailsPage
            order={selectedOwnerChangeOrder}
            onBack={() => setPage("owner-list")}
            onCreate={() => setPage("owner-create")}
          />
        )}

        {page === "current-owners" && (
          <CurrentOwnersPage owners={currentOwners} isLoading={isLoading} />
        )}
      </section>
    </main>
  );
}

function ReceivingOrdersListPage({
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
      <PageHead title="Список заявок на поставку" subtitle="Заявки с контейнерами из справочника">
        <button className="design-button" type="button" onClick={onCreate}>
          Создать
        </button>
      </PageHead>

      <OrdersTable
        title="Заявки"
        countText={isLoading ? "Загрузка..." : `${orders.length} шт.`}
        columns={["Номер заявки", "Клиент", "Контейнеры", "Дата создания"]}
        emptyText="Заявок пока нет"
      >
        {orders.map((order) => (
          <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
            <td>{order.number}</td>
            <td>{order.client.name}</td>
            <td>{order.containers.map((container) => container.number).join(", ")}</td>
            <td>{formatDate(order.createdAt)}</td>
            <td className="more-cell">
              <MoreHorizontal size={20} />
            </td>
          </tr>
        ))}
        {orders.length === 0 && <EmptyRow colSpan={5} text="Заявок пока нет" />}
      </OrdersTable>
    </>
  );
}

function OwnerChangeOrdersListPage({
  orders,
  isLoading,
  onCreate,
  onOpen,
}: {
  orders: OwnerChangeOrder[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (order: OwnerChangeOrder) => void;
}) {
  return (
    <>
      <PageHead title="Заявки на смену владельца" subtitle="Смена текущего владельца контейнеров">
        <button className="design-button" type="button" onClick={onCreate}>
          Создать
        </button>
      </PageHead>

      <OrdersTable
        title="Заявки"
        countText={isLoading ? "Загрузка..." : `${orders.length} шт.`}
        columns={["Номер заявки", "Новый владелец", "Контейнеры", "Дата создания"]}
        emptyText="Заявок пока нет"
      >
        {orders.map((order) => (
          <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
            <td>{order.number}</td>
            <td>{order.newClient.name}</td>
            <td>{order.containers.map((container) => container.number).join(", ")}</td>
            <td>{formatDate(order.createdAt)}</td>
            <td className="more-cell">
              <MoreHorizontal size={20} />
            </td>
          </tr>
        ))}
        {orders.length === 0 && <EmptyRow colSpan={5} text="Заявок пока нет" />}
      </OrdersTable>
    </>
  );
}

function CurrentOwnersPage({
  owners,
  isLoading,
}: {
  owners: CurrentContainerOwner[];
  isLoading: boolean;
}) {
  return (
    <>
      <PageHead title="Текущие владельцы контейнеров" subtitle="Данные берутся из активной записи истории владения">
        <span className="page-counter">{isLoading ? "Загрузка..." : `${owners.length} шт.`}</span>
      </PageHead>

      <OrdersTable
        title="Контейнеры"
        countText={isLoading ? "Загрузка..." : `${owners.length} шт.`}
        columns={["Контейнер", "Клиент", "Операция"]}
        emptyText="Активных владельцев пока нет"
      >
        {owners.map((owner) => (
          <tr key={owner.container.id}>
            <td>{owner.container.number}</td>
            <td>{owner.client.name}</td>
            <td>{owner.operationType === "RECEIVING" ? "Поставка" : "Смена владельца"}</td>
            <td className="more-cell">
              <MoreHorizontal size={20} />
            </td>
          </tr>
        ))}
        {owners.length === 0 && <EmptyRow colSpan={4} text="Активных владельцев пока нет" />}
      </OrdersTable>
    </>
  );
}

function CreateReceivingOrderPage(props: {
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
  const selectedLabel = props.selectedContainers.length === 0 ? "" : props.selectedContainers.join(", ");

  return (
    <>
      <PageHead title="Создание заявки на поставку" subtitle="Номер заявки будет сформирован автоматически">
        <BackButton onClick={props.onBack} />
      </PageHead>

      <form className="form-panel create-page-form" onSubmit={props.onSubmit}>
        <h2>Данные заявки</h2>
        <ClientSelect label="Клиент" clients={props.clients} value={props.clientId} onChange={props.onClientChange} />
        <ContainerDropdown
          containers={props.containers}
          selectedLabel={selectedLabel}
          isOpen={props.isContainerDropdownOpen}
          isSelected={(container) => props.selectedContainers.includes(container.number)}
          onToggle={(container) => props.onToggleContainer(container.number)}
          onToggleOpen={props.onToggleContainerDropdown}
          onClose={props.onCloseContainerDropdown}
        />
        <SubmitButton label="Сохранить" />
      </form>
    </>
  );
}

function CreateOwnerChangeOrderPage(props: {
  clients: Client[];
  containers: Container[];
  clientId: string;
  comment: string;
  selectedContainers: number[];
  isContainerDropdownOpen: boolean;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClientChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onToggleContainer: (id: number) => void;
  onToggleContainerDropdown: () => void;
  onCloseContainerDropdown: () => void;
}) {
  const selectedNumbers = props.containers
    .filter((container) => props.selectedContainers.includes(container.id))
    .map((container) => container.number);
  const selectedLabel = selectedNumbers.length === 0 ? "" : selectedNumbers.join(", ");

  return (
    <>
      <PageHead title="Создание заявки на смену владельца" subtitle="История владения изменится только после проведения">
        <BackButton onClick={props.onBack} />
      </PageHead>

      <form className="form-panel create-page-form" onSubmit={props.onSubmit}>
        <h2>Данные заявки</h2>
        <ClientSelect label="Новый владелец" clients={props.clients} value={props.clientId} onChange={props.onClientChange} />

        <label>
          Комментарий
          <textarea value={props.comment} onChange={(event) => props.onCommentChange(event.target.value)} rows={4} />
        </label>

        <ContainerDropdown
          containers={props.containers}
          selectedLabel={selectedLabel}
          isOpen={props.isContainerDropdownOpen}
          isSelected={(container) => props.selectedContainers.includes(container.id)}
          onToggle={(container) => props.onToggleContainer(container.id)}
          onToggleOpen={props.onToggleContainerDropdown}
          onClose={props.onCloseContainerDropdown}
        />
        <SubmitButton label="Сохранить" />
      </form>
    </>
  );
}

function ReceivingOrderDetailsPage({
  order,
  onBack,
  onCreate,
}: {
  order: ReceivingOrder | null;
  onBack: () => void;
  onCreate: () => void;
}) {
  if (!order) {
    return <NotSelected title="Заявка не выбрана" onBack={onBack} />;
  }

  return (
    <>
      <PageHead title={`Карточка заявки ${order.number}`} subtitle="Информация о заявке на поставку">
        <div className="head-actions">
          <BackButton onClick={onBack} />
          <button className="design-button" type="button" onClick={onCreate}>
            Создать
          </button>
        </div>
      </PageHead>

      <section className="details-panel">
        <div className="detail-grid">
          <DetailItem label="Номер заявки" value={order.number} />
          <DetailItem label="Клиент" value={order.client.name} />
          <DetailItem label="Дата создания" value={formatDate(order.createdAt)} />
        </div>

        <h2>Контейнеры в заявке</h2>
        <ContainerChips containers={order.containers} />
      </section>
    </>
  );
}

function OwnerChangeOrderDetailsPage({
  order,
  onBack,
  onCreate,
}: {
  order: OwnerChangeOrder | null;
  onBack: () => void;
  onCreate: () => void;
}) {
  if (!order) {
    return <NotSelected title="Заявка не выбрана" onBack={onBack} />;
  }

  return (
    <>
      <PageHead title={`Смена владельца ${order.number}`} subtitle="Проведение заявки изменит активного владельца контейнеров">
        <div className="head-actions">
          <BackButton onClick={onBack} />
          <button className="design-button" type="button" onClick={onCreate}>
            Создать
          </button>
        </div>
      </PageHead>

      <section className="details-panel">
        <div className="detail-grid">
          <DetailItem label="Номер заявки" value={order.number} />
          <DetailItem label="Новый владелец" value={order.newClient.name} />
          <DetailItem label="Дата создания" value={formatDate(order.createdAt)} />
          <DetailItem label="Комментарий" value={order.comment || "-"} />
        </div>

        <h2>Контейнеры в заявке</h2>
        <ContainerChips containers={order.containers} />
      </section>
    </>
  );
}

function PageHead({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="page-head">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function OrdersTable({
  title,
  countText,
  columns,
  children,
}: {
  title: string;
  countText: string;
  columns: string[];
  emptyText: string;
  children: React.ReactNode;
}) {
  return (
    <section className="table-section">
      <div className="table-head">
        <h2>{title}</h2>
        <span>{countText}</span>
      </div>
      <div className="table-wrap">
        <table className="orders-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>
                  {column}
                  <ChevronDown size={14} />
                </th>
              ))}
              <th className="control-head" />
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      </div>
    </section>
  );
}

function EmptyRow({ colSpan, text }: { colSpan: number; text: string }) {
  return (
    <tr>
      <td className="empty-cell" colSpan={colSpan}>
        {text}
      </td>
    </tr>
  );
}

function ClientSelect({
  label,
  clients,
  value,
  onChange,
}: {
  label: string;
  clients: Client[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label>
      {label}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
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
  );
}

function ContainerDropdown({
  containers,
  selectedLabel,
  isOpen,
  isSelected,
  onToggle,
  onToggleOpen,
  onClose,
}: {
  containers: Container[];
  selectedLabel: string;
  isOpen: boolean;
  isSelected: (container: Container) => boolean;
  onToggle: (container: Container) => void;
  onToggleOpen: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <div className="field-label">Контейнеры</div>
      <div className="multi-select">
        <button className={`multi-select-trigger ${selectedLabel ? "has-value" : ""}`} type="button" onClick={onToggleOpen}>
          <span>{selectedLabel || " "}</span>
          <ChevronDown size={16} />
        </button>
        {isOpen && (
          <div className="multi-select-menu">
            {containers.map((container) => (
              <label className="multi-select-option" key={container.id}>
                <input type="checkbox" checked={isSelected(container)} onChange={() => onToggle(container)} />
                {container.number}
              </label>
            ))}
            {containers.length === 0 && <p className="muted dropdown-empty">В справочнике пока нет контейнеров</p>}
            <div className="dropdown-actions">
              <button type="button" onClick={onClose}>
                Готово
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function SubmitButton({ label }: { label: string }) {
  return (
    <button className="design-button form-submit" type="submit">
      {label}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="back-button" type="button" onClick={onClick}>
      <ArrowLeft size={16} />
      Назад к списку
    </button>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ContainerChips({ containers }: { containers: Container[] }) {
  return (
    <div className="container-list large">
      {containers.map((container) => (
        <span className="container-chip" key={container.id}>
          {container.number}
        </span>
      ))}
    </div>
  );
}

function NotSelected({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <section className="details-panel">
      <BackButton onClick={onBack} />
      <h1>{title}</h1>
    </section>
  );
}

function pageTitle(page: Page) {
  if (page === "current-owners") {
    return "Текущие владельцы";
  }
  if (page.endsWith("create")) {
    return "Создание заявки";
  }
  if (page.endsWith("details")) {
    return "Карточка заявки";
  }
  return "Список заявок";
}

async function errorText(response: Response, fallback: string) {
  try {
    const payload = await response.json();
    return payload.message || payload.error || fallback;
  } catch {
    return fallback;
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("ru-RU");
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
