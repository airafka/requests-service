import React from "react";
import ReactDOM from "react-dom/client";
import { BaseButton, ButtonType, PageCard, Select, SelectMulti, UikitProvider } from "@alabuga/uikit";
import { ArrowLeft, Box, ChevronDown, FileText, Repeat2, Truck, Users } from "lucide-react";
import "./styles.css";

type Page =
  | "receiving-list"
  | "receiving-create"
  | "receiving-details"
  | "shipping-list"
  | "shipping-create"
  | "shipping-details"
  | "owner-list"
  | "owner-create"
  | "owner-details"
  | "current-owners"
  | "container-owner-details"
  | "containers-list";

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

type ShippingOrder = ReceivingOrder;

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
  operationType: "RECEIVING" | "SHIPPING" | "OWNER_CHANGE";
  sourceId: number;
};

type ContainerOwnerHistory = {
  containerId: number;
  client: Client;
  operationType: "RECEIVING" | "SHIPPING" | "OWNER_CHANGE";
  sourceId: number;
  sourceOrderId: number | null;
  sourceNumber: string | null;
  sourceLabel: string | null;
  validFrom: string;
  validTo: string | null;
  createdAt: string;
  createdBy: string | null;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

function App() {
  const [page, setPage] = React.useState<Page>("receiving-list");
  const [receivingOrders, setReceivingOrders] = React.useState<ReceivingOrder[]>([]);
  const [shippingOrders, setShippingOrders] = React.useState<ShippingOrder[]>([]);
  const [ownerChangeOrders, setOwnerChangeOrders] = React.useState<OwnerChangeOrder[]>([]);
  const [currentOwners, setCurrentOwners] = React.useState<CurrentContainerOwner[]>([]);
  const [selectedOwnerContainer, setSelectedOwnerContainer] = React.useState<Container | null>(null);
  const [selectedOwnerHistory, setSelectedOwnerHistory] = React.useState<ContainerOwnerHistory[]>([]);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [selectedReceivingOrderId, setSelectedReceivingOrderId] = React.useState<number | null>(null);
  const [selectedShippingOrderId, setSelectedShippingOrderId] = React.useState<number | null>(null);
  const [selectedOwnerChangeOrderId, setSelectedOwnerChangeOrderId] = React.useState<number | null>(null);
  const [receivingClientId, setReceivingClientId] = React.useState("");
  const [receivingContainers, setReceivingContainers] = React.useState<string[]>([]);
  const [shippingClientId, setShippingClientId] = React.useState("");
  const [shippingContainers, setShippingContainers] = React.useState<string[]>([]);
  const [ownerClientId, setOwnerClientId] = React.useState("");
  const [ownerComment, setOwnerComment] = React.useState("");
  const [ownerContainers, setOwnerContainers] = React.useState<number[]>([]);
  const [newContainerNumber, setNewContainerNumber] = React.useState("");
  const [isReceivingDropdownOpen, setIsReceivingDropdownOpen] = React.useState(false);
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedReceivingOrder = receivingOrders.find((order) => order.id === selectedReceivingOrderId) ?? null;
  const selectedShippingOrder = shippingOrders.find((order) => order.id === selectedShippingOrderId) ?? null;
  const selectedOwnerChangeOrder = ownerChangeOrders.find((order) => order.id === selectedOwnerChangeOrderId) ?? null;

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [receivingResponse, shippingResponse, ownerChangeResponse, currentOwnersResponse, containersResponse, clientsResponse] = await Promise.all([
        fetch(`${API_BASE}/receiving-orders`),
        fetch(`${API_BASE}/shipping-orders`),
        fetch(`${API_BASE}/container-owner-change-orders`),
        fetch(`${API_BASE}/containers/owners/current`),
        fetch(`${API_BASE}/containers`),
        fetch(`${API_BASE}/clients`),
      ]);

      if (
        !receivingResponse.ok ||
        !shippingResponse.ok ||
        !ownerChangeResponse.ok ||
        !currentOwnersResponse.ok ||
        !containersResponse.ok ||
        !clientsResponse.ok
      ) {
        throw new Error("Не удалось загрузить данные");
      }

      setReceivingOrders(await receivingResponse.json());
      setShippingOrders(await shippingResponse.json());
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
      setError("Выберите хотя бы один КТК");
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
      setError("Выберите хотя бы один КТК");
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

  async function createShippingOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!shippingClientId) {
      setError("Выберите клиента");
      return;
    }

    if (shippingContainers.length === 0) {
      setError("Выберите хотя бы один КТК");
      return;
    }

    const response = await fetch(`${API_BASE}/shipping-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: Number(shippingClientId),
        containerNumbers: shippingContainers,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать заявку на вывоз"));
      return;
    }

    const createdOrder: ShippingOrder = await response.json();
    setShippingClientId("");
    setShippingContainers([]);
    await loadData();
    setSelectedShippingOrderId(createdOrder.id);
    setPage("shipping-details");
  }

  async function createContainer(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!newContainerNumber.trim()) {
      setError("Введите номер КТК");
      return;
    }

    const response = await fetch(`${API_BASE}/containers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ number: newContainerNumber }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать КТК"));
      return;
    }

    setNewContainerNumber("");
    await loadData();
    setPage("containers-list");
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

  async function openContainerOwnerDetails(container: Container) {
    setError(null);
    setSelectedOwnerContainer(container);

    const response = await fetch(`${API_BASE}/containers/${container.id}/owner-history`);
    if (!response.ok) {
      setError(await errorText(response, "Не удалось загрузить историю владения"));
      return;
    }

    setSelectedOwnerHistory(await response.json());
    setPage("container-owner-details");
  }

  function openSource(history: ContainerOwnerHistory) {
    if (!history.sourceOrderId) {
      return;
    }

    if (history.operationType === "RECEIVING") {
      setSelectedReceivingOrderId(history.sourceOrderId);
      setPage("receiving-details");
      return;
    }

    if (history.operationType === "SHIPPING") {
      setSelectedShippingOrderId(history.sourceOrderId);
      setPage("shipping-details");
      return;
    }

    setSelectedOwnerChangeOrderId(history.sourceOrderId);
    setPage("owner-details");
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="alis-mark" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>ALIS</span>
        </div>
        <nav className="sidebar-nav">
          <button
            className={page.startsWith("receiving") ? "active" : ""}
            type="button"
            onClick={() => setPage("receiving-list")}
          >
            <FileText size={18} />
            <span>Заявки на поставку</span>
          </button>
          <button
            className={page.startsWith("owner") ? "active" : ""}
            type="button"
            onClick={() => setPage("owner-list")}
          >
            <Repeat2 size={18} />
            <span>Заявки на смену владельца КТК</span>
          </button>
          <button
            className={page.startsWith("shipping") ? "active" : ""}
            type="button"
            onClick={() => setPage("shipping-list")}
          >
            <Truck size={18} />
            <span>Заявки на вывоз</span>
          </button>
          <button
            className={page === "current-owners" || page === "container-owner-details" ? "active" : ""}
            type="button"
            onClick={() => setPage("current-owners")}
          >
            <Users size={18} />
            <span>Владельцы КТК</span>
          </button>
          <button
            className={page === "containers-list" ? "active" : ""}
            type="button"
            onClick={() => setPage("containers-list")}
          >
            <Box size={18} />
            <span>КТК</span>
          </button>
        </nav>
      </aside>

      <section className="workspace">
        {error && <div className="error">{error}</div>}

        {page === "receiving-list" && (
          <ReceivingOrdersListPage
            orders={receivingOrders}
            isLoading={isLoading}
            onCreate={() => setPage("receiving-create")}
            onOpen={(order) => {
              setSelectedReceivingOrderId(order.id);
              setPage("receiving-details");
            }}
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
            onContainersChange={setReceivingContainers}
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

        {page === "shipping-list" && (
          <ShippingOrdersListPage
            orders={shippingOrders}
            isLoading={isLoading}
            onCreate={() => setPage("shipping-create")}
            onOpen={(order) => {
              setSelectedShippingOrderId(order.id);
              setPage("shipping-details");
            }}
          />
        )}

        {page === "shipping-create" && (
          <CreateShippingOrderPage
            clients={clients}
            containers={containers}
            clientId={shippingClientId}
            selectedContainers={shippingContainers}
            onBack={() => setPage("shipping-list")}
            onSubmit={createShippingOrder}
            onClientChange={setShippingClientId}
            onContainersChange={setShippingContainers}
          />
        )}

        {page === "shipping-details" && (
          <ShippingOrderDetailsPage
            order={selectedShippingOrder}
            onBack={() => setPage("shipping-list")}
            onCreate={() => setPage("shipping-create")}
          />
        )}

        {page === "owner-list" && (
          <OwnerChangeOrdersListPage
            orders={ownerChangeOrders}
            isLoading={isLoading}
            onCreate={() => setPage("owner-create")}
            onOpen={(order) => {
              setSelectedOwnerChangeOrderId(order.id);
              setPage("owner-details");
            }}
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
            onContainersChange={setOwnerContainers}
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
          <CurrentOwnersPage owners={currentOwners} isLoading={isLoading} onOpen={openContainerOwnerDetails} />
        )}

        {page === "container-owner-details" && (
          <ContainerOwnerDetailsPage
            container={selectedOwnerContainer}
            history={selectedOwnerHistory}
            onBack={() => setPage("current-owners")}
            onOpenSource={openSource}
          />
        )}

        {page === "containers-list" && (
          <ContainersPage
            containers={containers}
            isLoading={isLoading}
            number={newContainerNumber}
            onNumberChange={setNewContainerNumber}
            onSubmit={createContainer}
          />
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
      <PageHead title="Заявки на поставку">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Номер заявки", "Клиент", "КТК", "Дата создания"]}>
            {orders.map((order) => (
              <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
                <td>{order.number}</td>
                <td>{order.client.name}</td>
                <td>{order.containers.map((container) => container.number).join(", ")}</td>
                <td>{formatDateTime(order.createdAt)}</td>
              </tr>
            ))}
            {orders.length === 0 && <EmptyRow colSpan={4} text={isLoading ? "Загрузка..." : "Заявок пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function ShippingOrdersListPage({
  orders,
  isLoading,
  onCreate,
  onOpen,
}: {
  orders: ShippingOrder[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (order: ShippingOrder) => void;
}) {
  return (
    <>
      <PageHead title="Заявки на вывоз">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Номер заявки", "Клиент", "КТК", "Дата создания"]}>
            {orders.map((order) => (
              <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
                <td>{order.number}</td>
                <td>{order.client.name}</td>
                <td>{order.containers.map((container) => container.number).join(", ")}</td>
                <td>{formatDateTime(order.createdAt)}</td>
              </tr>
            ))}
            {orders.length === 0 && <EmptyRow colSpan={4} text={isLoading ? "Загрузка..." : "Заявок пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
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
      <PageHead title="Заявки на смену владельца КТК">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Номер заявки", "Новый владелец", "КТК", "Дата создания"]}>
            {orders.map((order) => (
              <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
                <td>{order.number}</td>
                <td>{order.newClient.name}</td>
                <td>{order.containers.map((container) => container.number).join(", ")}</td>
                <td>{formatDateTime(order.createdAt)}</td>
              </tr>
            ))}
            {orders.length === 0 && <EmptyRow colSpan={4} text={isLoading ? "Загрузка..." : "Заявок пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function CurrentOwnersPage({
  owners,
  isLoading,
  onOpen,
}: {
  owners: CurrentContainerOwner[];
  isLoading: boolean;
  onOpen: (container: Container) => void;
}) {
  return (
    <>
      <PageHead title="Владельцы КТК" />

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["КТК", "Клиент", "Операция"]}>
            {owners.map((owner) => (
              <tr className="clickable-row" key={owner.container.id} onClick={() => onOpen(owner.container)}>
                <td>{owner.container.number}</td>
                <td>{owner.client.name}</td>
                <td>{operationLabel(owner.operationType)}</td>
              </tr>
            ))}
            {owners.length === 0 && <EmptyRow colSpan={3} text={isLoading ? "Загрузка..." : "Активных владельцев пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function ContainersPage({
  containers,
  isLoading,
  number,
  onNumberChange,
  onSubmit,
}: {
  containers: Container[];
  isLoading: boolean;
  number: string;
  onNumberChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <PageHead title="КТК" />

      <div className="reference-layout">
        <div className="uikit-form-shell reference-form">
          <PageCard>
            <form className="uikit-form" onSubmit={onSubmit}>
              <h2>Добавление КТК</h2>
              <label>
                Номер КТК
                <input value={number} onChange={(event) => onNumberChange(event.target.value)} maxLength={32} />
              </label>
              <div className="uikit-form-actions">
                <BaseButton buttonType={ButtonType.default} ButtonAction="submit">
                  Сохранить
                </BaseButton>
              </div>
            </form>
          </PageCard>
        </div>

        <div className="uikit-table-card reference-table">
          <PageCard>
            <OrdersTable columns={["Номер КТК"]}>
              {containers.map((container) => (
                <tr key={container.id}>
                  <td>{container.number}</td>
                </tr>
              ))}
              {containers.length === 0 && <EmptyRow colSpan={1} text={isLoading ? "Загрузка..." : "КТК пока нет"} />}
            </OrdersTable>
          </PageCard>
        </div>
      </div>
    </>
  );
}

function ContainerOwnerDetailsPage({
  container,
  history,
  onBack,
  onOpenSource,
}: {
  container: Container | null;
  history: ContainerOwnerHistory[];
  onBack: () => void;
  onOpenSource: (history: ContainerOwnerHistory) => void;
}) {
  if (!container) {
    return <NotSelected title="КТК не выбран" onBack={onBack} />;
  }

  return (
    <>
      <PageHead title={container.number}>
        <BackButton onClick={onBack} />
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Владелец", "Операция", "Заявка", "Дата"]}>
            {history.map((item) => (
              <tr key={`${item.operationType}-${item.sourceId}-${item.validFrom}`}>
                <td>{item.client.name}</td>
                <td>{operationLabel(item.operationType)}</td>
                <td>
                  {item.sourceOrderId ? (
                    <button className="table-link" type="button" onClick={() => onOpenSource(item)}>
                      {operationLabel(item.operationType)} №{item.sourceNumber ?? item.sourceOrderId}
                    </button>
                  ) : (
                    "-"
                  )}
                </td>
                <td>{formatDateTime(item.validFrom)}</td>
              </tr>
            ))}
            {history.length === 0 && <EmptyRow colSpan={4} text="Истории владения пока нет" />}
          </OrdersTable>
        </PageCard>
      </div>
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
  onContainersChange: (value: string[]) => void;
  onToggleContainer: (number: string) => void;
  onToggleContainerDropdown: () => void;
  onCloseContainerDropdown: () => void;
}) {
  const containerOptions = props.containers.map((container) => ({
    value: container.number,
    label: container.number,
  }));

  return (
    <>
      <PageHead title="Создание заявки на поставку">
        <UikitBackButton onClick={props.onBack} />
      </PageHead>

      <div className="uikit-form-shell">
        <PageCard>
          <form className="uikit-form create-page-form" onSubmit={props.onSubmit}>
            <h2>Данные заявки</h2>
            <Select
              label="Клиент"
              placeholder=" "
              value={props.clientId ? Number(props.clientId) : undefined}
              options={props.clients.map((client) => ({ value: client.id, label: client.name }))}
              onChange={(value) => props.onClientChange(value ? String(value) : "")}
            />
            <SelectMulti
              label="КТК"
              placeholder=" "
              value={props.selectedContainers}
              options={containerOptions}
              selectAllLabel="Выбрать все КТК"
              onChange={(value) => props.onContainersChange(value.map(String))}
            />
            <div className="uikit-form-actions">
              <BaseButton buttonType={ButtonType.default} ButtonAction="submit">
                Сохранить
              </BaseButton>
            </div>
          </form>
        </PageCard>
      </div>
    </>
  );
}

function CreateShippingOrderPage(props: {
  clients: Client[];
  containers: Container[];
  clientId: string;
  selectedContainers: string[];
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClientChange: (value: string) => void;
  onContainersChange: (value: string[]) => void;
}) {
  const containerOptions = props.containers.map((container) => ({
    value: container.number,
    label: container.number,
  }));

  return (
    <>
      <PageHead title="Создание заявки на вывоз">
        <UikitBackButton onClick={props.onBack} />
      </PageHead>

      <div className="uikit-form-shell">
        <PageCard>
          <form className="uikit-form create-page-form" onSubmit={props.onSubmit}>
            <h2>Данные заявки</h2>
            <Select
              label="Клиент"
              placeholder=" "
              value={props.clientId ? Number(props.clientId) : undefined}
              options={props.clients.map((client) => ({ value: client.id, label: client.name }))}
              onChange={(value) => props.onClientChange(value ? String(value) : "")}
            />
            <SelectMulti
              label="КТК"
              placeholder=" "
              value={props.selectedContainers}
              options={containerOptions}
              selectAllLabel="Выбрать все КТК"
              onChange={(value) => props.onContainersChange(value.map(String))}
            />
            <div className="uikit-form-actions">
              <BaseButton buttonType={ButtonType.default} ButtonAction="submit">
                Сохранить
              </BaseButton>
            </div>
          </form>
        </PageCard>
      </div>
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
  onContainersChange: (value: number[]) => void;
  onToggleContainer: (id: number) => void;
  onToggleContainerDropdown: () => void;
  onCloseContainerDropdown: () => void;
}) {
  const containerOptions = props.containers.map((container) => ({
    value: container.id,
    label: container.number,
  }));

  return (
    <>
      <PageHead title="Создание заявки на смену владельца КТК">
        <UikitBackButton onClick={props.onBack} />
      </PageHead>

      <div className="uikit-form-shell">
        <PageCard>
          <form className="uikit-form create-page-form" onSubmit={props.onSubmit}>
            <h2>Данные заявки</h2>
            <Select
              label="Новый владелец"
              placeholder=" "
              value={props.clientId ? Number(props.clientId) : undefined}
              options={props.clients.map((client) => ({ value: client.id, label: client.name }))}
              onChange={(value) => props.onClientChange(value ? String(value) : "")}
            />
            <label>
              Комментарий
              <textarea value={props.comment} onChange={(event) => props.onCommentChange(event.target.value)} rows={4} />
            </label>
            <SelectMulti
              label="КТК"
              placeholder=" "
              value={props.selectedContainers}
              options={containerOptions}
              selectAllLabel="Выбрать все КТК"
              onChange={(value) => props.onContainersChange(value.map(Number))}
            />
            <div className="uikit-form-actions">
              <BaseButton buttonType={ButtonType.default} ButtonAction="submit">
                Сохранить
              </BaseButton>
            </div>
          </form>
        </PageCard>
      </div>
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
      <PageHead title={`Заявка на поставку ${order.number}`}>
        <div className="head-actions">
          <UikitBackButton onClick={onBack} />
          <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
            Создать
          </BaseButton>
        </div>
      </PageHead>

      <div className="uikit-details-card">
        <PageCard>
          <section className="uikit-details">
            <div className="detail-grid">
              <DetailItem label="Номер заявки" value={order.number} />
              <DetailItem label="Клиент" value={order.client.name} />
              <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
            </div>

            <h2>КТК в заявке</h2>
            <ContainerChips containers={order.containers} />
          </section>
        </PageCard>
      </div>
    </>
  );
}

function ShippingOrderDetailsPage({
  order,
  onBack,
  onCreate,
}: {
  order: ShippingOrder | null;
  onBack: () => void;
  onCreate: () => void;
}) {
  if (!order) {
    return <NotSelected title="Заявка не выбрана" onBack={onBack} />;
  }

  return (
    <>
      <PageHead title={`Заявка на вывоз ${order.number}`}>
        <div className="head-actions">
          <UikitBackButton onClick={onBack} />
          <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
            Создать
          </BaseButton>
        </div>
      </PageHead>

      <div className="uikit-details-card">
        <PageCard>
          <section className="uikit-details">
            <div className="detail-grid">
              <DetailItem label="Номер заявки" value={order.number} />
              <DetailItem label="Клиент" value={order.client.name} />
              <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
            </div>

            <h2>КТК в заявке</h2>
            <ContainerChips containers={order.containers} />
          </section>
        </PageCard>
      </div>
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
      <PageHead title={`Заявка на смену владельца КТК ${order.number}`}>
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
          <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
          <DetailItem label="Комментарий" value={order.comment || "-"} />
        </div>

        <h2>КТК в заявке</h2>
        <ContainerChips containers={order.containers} />
      </section>
    </>
  );
}

function PageHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="page-head">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

function OrdersTable({ columns, children }: { columns: string[]; children: React.ReactNode }) {
  return (
    <section className="table-section">
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
      <div className="field-label">КТК</div>
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
            {containers.length === 0 && <p className="muted dropdown-empty">В справочнике пока нет КТК</p>}
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

function UikitBackButton({ onClick }: { onClick: () => void }) {
  return (
    <BaseButton buttonType={ButtonType.outlined} startIcon={<ArrowLeft size={16} />} onClick={onClick}>
      Назад к списку
    </BaseButton>
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

async function errorText(response: Response, fallback: string) {
  try {
    const payload = await response.json();
    return payload.message || payload.error || fallback;
  } catch {
    return fallback;
  }
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function operationLabel(operationType: ContainerOwnerHistory["operationType"]) {
  switch (operationType) {
    case "RECEIVING":
      return "Поставка";
    case "SHIPPING":
      return "Вывоз";
    case "OWNER_CHANGE":
      return "Смена владельца";
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UikitProvider>
      <App />
    </UikitProvider>
  </React.StrictMode>,
);
