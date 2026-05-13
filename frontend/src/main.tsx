import React from "react";
import ReactDOM from "react-dom/client";
import { BaseButton, ButtonType, PageCard, Select, SelectMulti, UikitProvider } from "@alabuga/uikit";
import {
  ArrowLeft,
  Box,
  ChevronDown,
  FileText,
  Layers3,
  ListChecks,
  PackageCheck,
  Repeat2,
  Truck,
} from "lucide-react";
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
  | "container-owner-details"
  | "containers-list"
  | "containers-create"
  | "operations-list"
  | "operations-create"
  | "operations-edit"
  | "services-list"
  | "services-create"
  | "services-edit"
  | "complex-services-list"
  | "complex-services-create"
  | "complex-services-edit";

type Client = {
  id: number;
  name: string;
};

type Container = {
  id: number;
  number: string;
};

type ReceivingOrderStatus = "DRAFT" | "CONFIRMED" | "COMPLETED";

type ReceivingOrder = {
  id: number;
  number: string;
  client: Client;
  createdAt: string;
  status: ReceivingOrderStatus;
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

type BillingOperation = {
  id: number;
  name: string;
};

type BillingServiceType = "ONE_TIME" | "CONTINUOUS";

type BillingService = {
  id: number;
  name: string;
  serviceType: BillingServiceType;
  cost: number;
  operations: BillingOperation[];
};

type ComplexServiceItem = {
  id: number;
  service: BillingService;
  operationCount: number | null;
  durationDays: number | null;
};

type ComplexService = {
  id: number;
  name: string;
  coefficient: number;
  amountPerContainer: number;
  items: ComplexServiceItem[];
};

type ComplexServiceFormItem = {
  serviceId: string;
  operationCount: string;
  durationDays: string;
};

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "/api";

function App() {
  const [page, setPage] = React.useState<Page>("receiving-list");
  const [receivingOrders, setReceivingOrders] = React.useState<ReceivingOrder[]>([]);
  const [shippingOrders, setShippingOrders] = React.useState<ShippingOrder[]>([]);
  const [ownerChangeOrders, setOwnerChangeOrders] = React.useState<OwnerChangeOrder[]>([]);
  const [selectedOwnerContainer, setSelectedOwnerContainer] = React.useState<Container | null>(null);
  const [selectedOwnerHistory, setSelectedOwnerHistory] = React.useState<ContainerOwnerHistory[]>([]);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [billingOperations, setBillingOperations] = React.useState<BillingOperation[]>([]);
  const [billingServices, setBillingServices] = React.useState<BillingService[]>([]);
  const [complexServices, setComplexServices] = React.useState<ComplexService[]>([]);
  const [selectedReceivingOrderId, setSelectedReceivingOrderId] = React.useState<number | null>(null);
  const [selectedShippingOrderId, setSelectedShippingOrderId] = React.useState<number | null>(null);
  const [selectedOwnerChangeOrderId, setSelectedOwnerChangeOrderId] = React.useState<number | null>(null);
  const [selectedOperationId, setSelectedOperationId] = React.useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = React.useState<number | null>(null);
  const [selectedComplexServiceId, setSelectedComplexServiceId] = React.useState<number | null>(null);
  const [receivingClientId, setReceivingClientId] = React.useState("");
  const [receivingContainers, setReceivingContainers] = React.useState<string[]>([]);
  const [shippingClientId, setShippingClientId] = React.useState("");
  const [shippingContainers, setShippingContainers] = React.useState<string[]>([]);
  const [ownerClientId, setOwnerClientId] = React.useState("");
  const [ownerComment, setOwnerComment] = React.useState("");
  const [ownerContainers, setOwnerContainers] = React.useState<number[]>([]);
  const [newContainerNumber, setNewContainerNumber] = React.useState("");
  const [newOperationName, setNewOperationName] = React.useState("");
  const [newServiceName, setNewServiceName] = React.useState("");
  const [newServiceType, setNewServiceType] = React.useState<BillingServiceType>("ONE_TIME");
  const [newServiceCost, setNewServiceCost] = React.useState("");
  const [newServiceOperationIds, setNewServiceOperationIds] = React.useState<number[]>([]);
  const [newComplexServiceName, setNewComplexServiceName] = React.useState("");
  const [newComplexServiceCoefficient, setNewComplexServiceCoefficient] = React.useState("1");
  const [newComplexServiceItems, setNewComplexServiceItems] = React.useState<ComplexServiceFormItem[]>([]);
  const [isReceivingDropdownOpen, setIsReceivingDropdownOpen] = React.useState(false);
  const [isOwnerDropdownOpen, setIsOwnerDropdownOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedReceivingOrder = receivingOrders.find((order) => order.id === selectedReceivingOrderId) ?? null;
  const selectedShippingOrder = shippingOrders.find((order) => order.id === selectedShippingOrderId) ?? null;
  const selectedOwnerChangeOrder = ownerChangeOrders.find((order) => order.id === selectedOwnerChangeOrderId) ?? null;
  const selectedOperation = billingOperations.find((operation) => operation.id === selectedOperationId) ?? null;
  const selectedService = billingServices.find((service) => service.id === selectedServiceId) ?? null;
  const selectedComplexService =
    complexServices.find((complexService) => complexService.id === selectedComplexServiceId) ?? null;

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [
        receivingResponse,
        shippingResponse,
        ownerChangeResponse,
        containersResponse,
        clientsResponse,
        operationsResponse,
        servicesResponse,
        complexServicesResponse,
      ] = await Promise.all([
        fetch(`${API_BASE}/receiving-orders`),
        fetch(`${API_BASE}/shipping-orders`),
        fetch(`${API_BASE}/container-owner-change-orders`),
        fetch(`${API_BASE}/containers`),
        fetch(`${API_BASE}/clients`),
        fetch(`${API_BASE}/operations`),
        fetch(`${API_BASE}/services`),
        fetch(`${API_BASE}/complex-services`),
      ]);

      if (
        !receivingResponse.ok ||
        !shippingResponse.ok ||
        !ownerChangeResponse.ok ||
        !containersResponse.ok ||
        !clientsResponse.ok ||
        !operationsResponse.ok ||
        !servicesResponse.ok ||
        !complexServicesResponse.ok
      ) {
        throw new Error("Не удалось загрузить данные");
      }

      setReceivingOrders(await receivingResponse.json());
      setShippingOrders(await shippingResponse.json());
      setOwnerChangeOrders(await ownerChangeResponse.json());
      setContainers(await containersResponse.json());
      setClients(await clientsResponse.json());
      setBillingOperations(await operationsResponse.json());
      setBillingServices(await servicesResponse.json());
      setComplexServices(await complexServicesResponse.json());
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

  async function confirmReceivingOrder(orderId: number) {
    setError(null);

    const response = await fetch(`${API_BASE}/receiving-orders/${orderId}/confirm`, {
      method: "POST",
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось подтвердить заявку на поставку"));
      return;
    }

    const confirmedOrder: ReceivingOrder = await response.json();
    await loadData();
    setSelectedReceivingOrderId(confirmedOrder.id);
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

  async function createBillingOperation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!newOperationName.trim()) {
      setError("Введите наименование операции");
      return;
    }

    const response = await fetch(`${API_BASE}/operations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newOperationName.trim() }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать операцию"));
      return;
    }

    setNewOperationName("");
    await loadData();
    setPage("operations-list");
  }

  async function updateBillingOperation(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!selectedOperation) {
      setError("Операция не выбрана");
      return;
    }

    if (!newOperationName.trim()) {
      setError("Введите наименование операции");
      return;
    }

    const response = await fetch(`${API_BASE}/operations/${selectedOperation.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newOperationName.trim() }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось обновить операцию"));
      return;
    }

    setSelectedOperationId(null);
    setNewOperationName("");
    await loadData();
    setPage("operations-list");
  }

  async function deleteBillingOperation() {
    if (!selectedOperation) {
      return;
    }

    setError(null);
    const response = await fetch(`${API_BASE}/operations/${selectedOperation.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось удалить операцию"));
      return;
    }

    setSelectedOperationId(null);
    setNewOperationName("");
    await loadData();
    setPage("operations-list");
  }

  async function createBillingService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!newServiceName.trim()) {
      setError("Введите наименование услуги");
      return;
    }

    if (newServiceOperationIds.length === 0) {
      setError("Выберите хотя бы одну операцию");
      return;
    }

    const cost = serviceCost();
    if (cost === undefined) {
      return;
    }

    const response = await fetch(`${API_BASE}/services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newServiceName.trim(),
        serviceType: newServiceType,
        cost,
        operationIds: newServiceOperationIds,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать услугу"));
      return;
    }

    setNewServiceName("");
    setNewServiceType("ONE_TIME");
    setNewServiceCost("");
    setNewServiceOperationIds([]);
    await loadData();
    setPage("services-list");
  }

  async function updateBillingService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!selectedService) {
      setError("Услуга не выбрана");
      return;
    }

    if (!newServiceName.trim()) {
      setError("Введите наименование услуги");
      return;
    }

    if (newServiceOperationIds.length === 0) {
      setError("Выберите хотя бы одну операцию");
      return;
    }

    const cost = serviceCost();
    if (cost === undefined) {
      return;
    }

    const response = await fetch(`${API_BASE}/services/${selectedService.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newServiceName.trim(),
        serviceType: newServiceType,
        cost,
        operationIds: newServiceOperationIds,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось обновить услугу"));
      return;
    }

    resetServiceForm();
    await loadData();
    setPage("services-list");
  }

  async function deleteBillingService() {
    if (!selectedService) {
      return;
    }

    setError(null);
    const response = await fetch(`${API_BASE}/services/${selectedService.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось удалить услугу"));
      return;
    }

    resetServiceForm();
    await loadData();
    setPage("services-list");
  }

  async function createComplexService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const payload = complexServicePayload();
    if (!payload) {
      return;
    }

    const response = await fetch(`${API_BASE}/complex-services`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать комплексную услугу"));
      return;
    }

    resetComplexServiceForm();
    await loadData();
    setPage("complex-services-list");
  }

  async function updateComplexService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!selectedComplexService) {
      setError("Комплексная услуга не выбрана");
      return;
    }

    const payload = complexServicePayload();
    if (!payload) {
      return;
    }

    const response = await fetch(`${API_BASE}/complex-services/${selectedComplexService.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось обновить комплексную услугу"));
      return;
    }

    resetComplexServiceForm();
    await loadData();
    setPage("complex-services-list");
  }

  async function deleteComplexService() {
    if (!selectedComplexService) {
      return;
    }

    setError(null);
    const response = await fetch(`${API_BASE}/complex-services/${selectedComplexService.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось удалить комплексную услугу"));
      return;
    }

    resetComplexServiceForm();
    await loadData();
    setPage("complex-services-list");
  }

  function serviceCost() {
    const cost = Number(newServiceCost.replace(",", "."));
    if (!Number.isFinite(cost) || cost < 0) {
      setError("Введите корректную стоимость");
      return undefined;
    }

    return cost;
  }

  function resetServiceForm() {
    setSelectedServiceId(null);
    setNewServiceName("");
    setNewServiceType("ONE_TIME");
    setNewServiceCost("");
    setNewServiceOperationIds([]);
  }

  function resetComplexServiceForm() {
    setSelectedComplexServiceId(null);
    setNewComplexServiceName("");
    setNewComplexServiceCoefficient("1");
    setNewComplexServiceItems([]);
  }

  function complexServicePayload() {
    if (!newComplexServiceName.trim()) {
      setError("Введите наименование комплексной услуги");
      return null;
    }

    if (newComplexServiceItems.length === 0) {
      setError("Добавьте хотя бы одну услугу");
      return null;
    }

    const coefficient = Number(newComplexServiceCoefficient.replace(",", "."));
    if (!Number.isFinite(coefficient) || coefficient < 0) {
      setError("Введите корректный коэффициент");
      return null;
    }

    const usedServiceIds = new Set<string>();
    const items = [];

    for (const item of newComplexServiceItems) {
      if (!item.serviceId) {
        setError("Выберите услугу во всех строках");
        return null;
      }

      if (usedServiceIds.has(item.serviceId)) {
        setError("Услугу нельзя добавить дважды");
        return null;
      }
      usedServiceIds.add(item.serviceId);

      const service = billingServices.find((billingService) => billingService.id === Number(item.serviceId));
      if (!service) {
        setError("Выбрана неизвестная услуга");
        return null;
      }

      if (service.serviceType === "ONE_TIME") {
        const operationCount = Number(item.operationCount);
        if (!Number.isInteger(operationCount) || operationCount <= 0) {
          setError("Введите корректное количество операций");
          return null;
        }
        items.push({ serviceId: service.id, operationCount, durationDays: null });
      } else {
        const durationDays = Number(item.durationDays);
        if (!Number.isInteger(durationDays) || durationDays <= 0) {
          setError("Введите корректное количество дней");
          return null;
        }
        items.push({ serviceId: service.id, operationCount: null, durationDays });
      }
    }

    return {
      name: newComplexServiceName.trim(),
      coefficient,
      items,
    };
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

  function openOperation(operation: BillingOperation) {
    setSelectedOperationId(operation.id);
    setNewOperationName(operation.name);
    setPage("operations-edit");
  }

  function openService(service: BillingService) {
    setSelectedServiceId(service.id);
    setNewServiceName(service.name);
    setNewServiceType(service.serviceType);
    setNewServiceCost(String(service.cost));
    setNewServiceOperationIds(service.operations.map((operation) => operation.id));
    setPage("services-edit");
  }

  function openComplexService(complexService: ComplexService) {
    setSelectedComplexServiceId(complexService.id);
    setNewComplexServiceName(complexService.name);
    setNewComplexServiceCoefficient(String(complexService.coefficient));
    setNewComplexServiceItems(
      complexService.items.map((item) => ({
        serviceId: String(item.service.id),
        operationCount: item.operationCount ? String(item.operationCount) : "",
        durationDays: item.durationDays ? String(item.durationDays) : "",
      })),
    );
    setPage("complex-services-edit");
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
            className={page.startsWith("containers") || page === "container-owner-details" ? "active" : ""}
            type="button"
            onClick={() => setPage("containers-list")}
          >
            <Box size={18} />
            <span>КТК</span>
          </button>
          <button
            className={page.startsWith("operations") ? "active" : ""}
            type="button"
            onClick={() => setPage("operations-list")}
          >
            <ListChecks size={18} />
            <span>Операции</span>
          </button>
          <button
            className={page.startsWith("services") ? "active" : ""}
            type="button"
            onClick={() => setPage("services-list")}
          >
            <PackageCheck size={18} />
            <span>Услуги</span>
          </button>
          <button
            className={page.startsWith("complex-services") ? "active" : ""}
            type="button"
            onClick={() => setPage("complex-services-list")}
          >
            <Layers3 size={18} />
            <span>Комплексные услуги</span>
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
            onConfirm={confirmReceivingOrder}
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

        {page === "container-owner-details" && (
          <ContainerOwnerDetailsPage
            container={selectedOwnerContainer}
            history={selectedOwnerHistory}
            onBack={() => setPage("containers-list")}
            onOpenSource={openSource}
          />
        )}

        {page === "containers-list" && (
          <ContainersPage
            containers={containers}
            isLoading={isLoading}
            onCreate={() => setPage("containers-create")}
            onOpen={openContainerOwnerDetails}
          />
        )}

        {page === "containers-create" && (
          <CreateContainerPage
            number={newContainerNumber}
            onBack={() => setPage("containers-list")}
            onNumberChange={setNewContainerNumber}
            onSubmit={createContainer}
          />
        )}

        {page === "operations-list" && (
          <OperationsPage
            operations={billingOperations}
            isLoading={isLoading}
            onCreate={() => {
              setSelectedOperationId(null);
              setNewOperationName("");
              setPage("operations-create");
            }}
            onOpen={openOperation}
          />
        )}

        {page === "operations-create" && (
          <CreateOperationPage
            title="Создание операции"
            name={newOperationName}
            onBack={() => setPage("operations-list")}
            onNameChange={setNewOperationName}
            onSubmit={createBillingOperation}
          />
        )}

        {page === "operations-edit" && (
          <CreateOperationPage
            title="Редактирование операции"
            name={newOperationName}
            onBack={() => setPage("operations-list")}
            onNameChange={setNewOperationName}
            onSubmit={updateBillingOperation}
            onDelete={deleteBillingOperation}
          />
        )}

        {page === "services-list" && (
          <ServicesPage
            services={billingServices}
            isLoading={isLoading}
            onCreate={() => {
              resetServiceForm();
              setPage("services-create");
            }}
            onOpen={openService}
          />
        )}

        {page === "services-create" && (
          <CreateServicePage
            title="Создание услуги"
            operations={billingOperations}
            name={newServiceName}
            serviceType={newServiceType}
            cost={newServiceCost}
            selectedOperations={newServiceOperationIds}
            onBack={() => setPage("services-list")}
            onNameChange={setNewServiceName}
            onServiceTypeChange={setNewServiceType}
            onCostChange={setNewServiceCost}
            onOperationsChange={setNewServiceOperationIds}
            onSubmit={createBillingService}
          />
        )}

        {page === "services-edit" && (
          <CreateServicePage
            title="Редактирование услуги"
            operations={billingOperations}
            name={newServiceName}
            serviceType={newServiceType}
            cost={newServiceCost}
            selectedOperations={newServiceOperationIds}
            onBack={() => setPage("services-list")}
            onNameChange={setNewServiceName}
            onServiceTypeChange={setNewServiceType}
            onCostChange={setNewServiceCost}
            onOperationsChange={setNewServiceOperationIds}
            onSubmit={updateBillingService}
            onDelete={deleteBillingService}
          />
        )}

        {page === "complex-services-list" && (
          <ComplexServicesPage
            complexServices={complexServices}
            isLoading={isLoading}
            onCreate={() => {
              resetComplexServiceForm();
              setPage("complex-services-create");
            }}
            onOpen={openComplexService}
          />
        )}

        {page === "complex-services-create" && (
          <CreateComplexServicePage
            title="Создание комплексной услуги"
            services={billingServices}
            name={newComplexServiceName}
            coefficient={newComplexServiceCoefficient}
            items={newComplexServiceItems}
            onBack={() => setPage("complex-services-list")}
            onNameChange={setNewComplexServiceName}
            onCoefficientChange={setNewComplexServiceCoefficient}
            onItemsChange={setNewComplexServiceItems}
            onSubmit={createComplexService}
          />
        )}

        {page === "complex-services-edit" && (
          <CreateComplexServicePage
            title="Редактирование комплексной услуги"
            services={billingServices}
            name={newComplexServiceName}
            coefficient={newComplexServiceCoefficient}
            items={newComplexServiceItems}
            onBack={() => setPage("complex-services-list")}
            onNameChange={setNewComplexServiceName}
            onCoefficientChange={setNewComplexServiceCoefficient}
            onItemsChange={setNewComplexServiceItems}
            onSubmit={updateComplexService}
            onDelete={deleteComplexService}
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
          <OrdersTable columns={["Номер заявки", "Клиент", "Статус", "КТК", "Дата создания"]}>
            {orders.map((order) => (
              <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
                <td>{order.number}</td>
                <td>{order.client.name}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td>{order.containers.map((container) => container.number).join(", ")}</td>
                <td>{formatDateTime(order.createdAt)}</td>
              </tr>
            ))}
            {orders.length === 0 && <EmptyRow colSpan={5} text={isLoading ? "Загрузка..." : "Заявок пока нет"} />}
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

function ContainersPage({
  containers,
  isLoading,
  onCreate,
  onOpen,
}: {
  containers: Container[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (container: Container) => void;
}) {
  return (
    <>
      <PageHead title="КТК">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Номер КТК"]}>
            {containers.map((container) => (
              <tr className="clickable-row" key={container.id} onClick={() => onOpen(container)}>
                <td>{container.number}</td>
              </tr>
            ))}
            {containers.length === 0 && <EmptyRow colSpan={1} text={isLoading ? "Загрузка..." : "КТК пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function CreateContainerPage({
  number,
  onBack,
  onNumberChange,
  onSubmit,
}: {
  number: string;
  onBack: () => void;
  onNumberChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <>
      <PageHead title="Создание КТК">
        <UikitBackButton onClick={onBack} />
      </PageHead>

      <div className="uikit-form-shell">
        <PageCard>
          <form className="uikit-form create-page-form" onSubmit={onSubmit}>
            <h2>Данные КТК</h2>
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
    </>
  );
}

function OperationsPage({
  operations,
  isLoading,
  onCreate,
  onOpen,
}: {
  operations: BillingOperation[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (operation: BillingOperation) => void;
}) {
  return (
    <>
      <PageHead title="Операции">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Наименование"]}>
            {operations.map((operation) => (
              <tr className="clickable-row" key={operation.id} onClick={() => onOpen(operation)}>
                <td>{operation.name}</td>
              </tr>
            ))}
            {operations.length === 0 && <EmptyRow colSpan={1} text={isLoading ? "Загрузка..." : "Операций пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function CreateOperationPage({
  title = "Создание операции",
  name,
  onBack,
  onNameChange,
  onSubmit,
  onDelete,
}: {
  title?: string;
  name: string;
  onBack: () => void;
  onNameChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
}) {
  return (
    <>
      <PageHead title={title}>
        <UikitBackButton onClick={onBack} />
      </PageHead>

      <div className="uikit-form-shell">
        <PageCard>
          <form className="uikit-form create-page-form" onSubmit={onSubmit}>
            <h2>Данные операции</h2>
            <label>
              Наименование
              <input value={name} onChange={(event) => onNameChange(event.target.value)} maxLength={180} />
            </label>
            <div className="uikit-form-actions">
              <BaseButton buttonType={ButtonType.default} ButtonAction="submit">
                Сохранить
              </BaseButton>
              {onDelete && (
                <button className="design-button delete-button" type="button" onClick={onDelete}>
                  Удалить
                </button>
              )}
            </div>
          </form>
        </PageCard>
      </div>
    </>
  );
}

function ServicesPage({
  services,
  isLoading,
  onCreate,
  onOpen,
}: {
  services: BillingService[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (service: BillingService) => void;
}) {
  return (
    <>
      <PageHead title="Услуги">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Наименование", "Признак", "Стоимость", "Операции"]}>
            {services.map((service) => (
              <tr className="clickable-row" key={service.id} onClick={() => onOpen(service)}>
                <td>{service.name}</td>
                <td>{serviceTypeLabel(service.serviceType)}</td>
                <td>{formatMoney(service.cost)}</td>
                <td>{service.operations.map((operation) => operation.name).join(", ")}</td>
              </tr>
            ))}
            {services.length === 0 && <EmptyRow colSpan={4} text={isLoading ? "Загрузка..." : "Услуг пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function CreateServicePage({
  title = "Создание услуги",
  operations,
  name,
  serviceType,
  cost,
  selectedOperations,
  onBack,
  onNameChange,
  onServiceTypeChange,
  onCostChange,
  onOperationsChange,
  onSubmit,
  onDelete,
}: {
  title?: string;
  operations: BillingOperation[];
  name: string;
  serviceType: BillingServiceType;
  cost: string;
  selectedOperations: number[];
  onBack: () => void;
  onNameChange: (value: string) => void;
  onServiceTypeChange: (value: BillingServiceType) => void;
  onCostChange: (value: string) => void;
  onOperationsChange: (value: number[]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
}) {
  const selectedOperationValues = selectedOperations.map(String);
  const operationOptions = operations.map((operation) => ({
    value: String(operation.id),
    label: operation.name,
  }));

  return (
    <>
      <PageHead title={title}>
        <UikitBackButton onClick={onBack} />
      </PageHead>

      <div className="uikit-form-shell">
        <PageCard>
          <form className="uikit-form create-page-form" onSubmit={onSubmit}>
            <h2>Данные услуги</h2>
            <label>
              Наименование
              <input value={name} onChange={(event) => onNameChange(event.target.value)} maxLength={180} />
            </label>
            <Select
              label="Признак"
              placeholder=" "
              value={serviceType}
              options={[
                { value: "ONE_TIME", label: "Единоразовая" },
                { value: "CONTINUOUS", label: "Продолжительная" },
              ]}
              onChange={(value) => {
                const nextType = (value as BillingServiceType | undefined) ?? "ONE_TIME";
                onServiceTypeChange(nextType);
              }}
            />
            <label>
              Стоимость
              <input inputMode="decimal" value={cost} onChange={(event) => onCostChange(event.target.value)} />
            </label>
            <SelectMulti
              label="Операции"
              placeholder=" "
              value={selectedOperationValues}
              options={operationOptions}
              selectAllLabel="Выбрать все операции"
              onChange={(value) => onOperationsChange(value.map(Number))}
            />
            <div className="uikit-form-actions">
              <BaseButton buttonType={ButtonType.default} ButtonAction="submit">
                Сохранить
              </BaseButton>
              {onDelete && (
                <button className="design-button delete-button" type="button" onClick={onDelete}>
                  Удалить
                </button>
              )}
            </div>
          </form>
        </PageCard>
      </div>
    </>
  );
}

function ComplexServicesPage({
  complexServices,
  isLoading,
  onCreate,
  onOpen,
}: {
  complexServices: ComplexService[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (complexService: ComplexService) => void;
}) {
  return (
    <>
      <PageHead title="Комплексные услуги">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Наименование", "Коэффициент", "Сумма услуг на 1 КТК", "Услуги"]}>
            {complexServices.map((complexService) => (
              <tr className="clickable-row" key={complexService.id} onClick={() => onOpen(complexService)}>
                <td>{complexService.name}</td>
                <td>{formatCoefficient(complexService.coefficient)}</td>
                <td>{formatMoney(complexService.amountPerContainer)}</td>
                <td>
                  {complexService.items
                    .map((item) => `${item.service.name} (${complexServiceItemValue(item)})`)
                    .join(", ")}
                </td>
              </tr>
            ))}
            {complexServices.length === 0 && (
              <EmptyRow colSpan={4} text={isLoading ? "Загрузка..." : "Комплексных услуг пока нет"} />
            )}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function CreateComplexServicePage({
  title,
  services,
  name,
  coefficient,
  items,
  onBack,
  onNameChange,
  onCoefficientChange,
  onItemsChange,
  onSubmit,
  onDelete,
}: {
  title: string;
  services: BillingService[];
  name: string;
  coefficient: string;
  items: ComplexServiceFormItem[];
  onBack: () => void;
  onNameChange: (value: string) => void;
  onCoefficientChange: (value: string) => void;
  onItemsChange: (value: ComplexServiceFormItem[]) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onDelete?: () => void;
}) {
  const serviceOptions = services.map((service) => ({
    value: String(service.id),
    label: service.name,
  }));
  const amountPerContainer = calculateComplexServiceAmount(services, items, coefficient);

  function addItem() {
    onItemsChange([...items, { serviceId: "", operationCount: "", durationDays: "" }]);
  }

  function updateItem(index: number, patch: Partial<ComplexServiceFormItem>) {
    onItemsChange(items.map((item, currentIndex) => (currentIndex === index ? { ...item, ...patch } : item)));
  }

  function removeItem(index: number) {
    onItemsChange(items.filter((_, currentIndex) => currentIndex !== index));
  }

  return (
    <>
      <PageHead title={title}>
        <UikitBackButton onClick={onBack} />
      </PageHead>

      <div className="uikit-form-shell complex-service-shell">
        <PageCard>
          <form className="uikit-form create-page-form complex-service-form" onSubmit={onSubmit}>
            <h2>Данные комплексной услуги</h2>
            <label>
              Наименование
              <input value={name} onChange={(event) => onNameChange(event.target.value)} maxLength={180} />
            </label>
            <label>
              Коэффициент
              <input inputMode="decimal" value={coefficient} onChange={(event) => onCoefficientChange(event.target.value)} />
            </label>
            <label>
              Сумма услуг на 1 КТК
              <input value={formatMoney(amountPerContainer)} readOnly />
            </label>

            <div className="complex-service-items">
              <div className="complex-service-items-head">
                <span>Услуги</span>
                <button className="link-button" type="button" onClick={addItem}>
                  Добавить услугу
                </button>
              </div>

              <div className="table-wrap">
                <table className="orders-table complex-service-table">
                  <thead>
                    <tr>
                      <th>Услуга</th>
                      <th>Количество операций</th>
                      <th>Количество дней</th>
                      <th>Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => {
                      const selectedService = services.find((service) => service.id === Number(item.serviceId)) ?? null;
                      const isOneTime = selectedService?.serviceType === "ONE_TIME";
                      const isContinuous = selectedService?.serviceType === "CONTINUOUS";

                      return (
                        <tr key={`${item.serviceId}-${index}`}>
                          <td>
                            <select
                              value={item.serviceId}
                              onChange={(event) =>
                                updateItem(index, {
                                  serviceId: event.target.value,
                                  operationCount: "",
                                  durationDays: "",
                                })
                              }
                            >
                              <option value="">Выберите услугу</option>
                              {serviceOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            {isOneTime ? (
                              <input
                                inputMode="numeric"
                                min={1}
                                value={item.operationCount}
                                onChange={(event) => updateItem(index, { operationCount: event.target.value })}
                              />
                            ) : (
                              <span className="muted">-</span>
                            )}
                          </td>
                          <td>
                            {isContinuous ? (
                              <input
                                inputMode="numeric"
                                min={1}
                                value={item.durationDays}
                                onChange={(event) => updateItem(index, { durationDays: event.target.value })}
                              />
                            ) : (
                              <span className="muted">-</span>
                            )}
                          </td>
                          <td>
                            <button className="link-button danger-link" type="button" onClick={() => removeItem(index)}>
                              Удалить
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {items.length === 0 && <EmptyRow colSpan={4} text="Добавьте услуги, входящие в комплекс" />}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="uikit-form-actions">
              <BaseButton buttonType={ButtonType.default} ButtonAction="submit">
                Сохранить
              </BaseButton>
              {onDelete && (
                <button className="design-button delete-button" type="button" onClick={onDelete}>
                  Удалить
                </button>
              )}
            </div>
          </form>
        </PageCard>
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
  onConfirm,
}: {
  order: ReceivingOrder | null;
  onBack: () => void;
  onCreate: () => void;
  onConfirm: (orderId: number) => void;
}) {
  if (!order) {
    return <NotSelected title="Заявка не выбрана" onBack={onBack} />;
  }

  return (
    <>
      <PageHead title={`Заявка на поставку ${order.number}`}>
        <div className="head-actions">
          <UikitBackButton onClick={onBack} />
          {order.status === "DRAFT" && (
            <BaseButton buttonType={ButtonType.default} onClick={() => onConfirm(order.id)}>
              Подтвердить
            </BaseButton>
          )}
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
              <DetailItem label="Статус" value={receivingOrderStatusLabel(order.status)} />
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

function StatusBadge({ status }: { status: ReceivingOrderStatus }) {
  return <span className={`status-badge status-badge-${status.toLowerCase()}`}>{receivingOrderStatusLabel(status)}</span>;
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

function receivingOrderStatusLabel(status: ReceivingOrderStatus) {
  switch (status) {
    case "DRAFT":
      return "Черновик";
    case "CONFIRMED":
      return "Подтверждена";
    case "COMPLETED":
      return "Выполнена";
  }
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

function serviceTypeLabel(serviceType: BillingServiceType) {
  switch (serviceType) {
    case "ONE_TIME":
      return "Единоразовая";
    case "CONTINUOUS":
      return "Продолжительная";
  }
}

function complexServiceItemValue(item: ComplexServiceItem) {
  if (item.service.serviceType === "ONE_TIME") {
    return `${item.operationCount ?? 0} оп.`;
  }

  return `${item.durationDays ?? 0} дн.`;
}

function calculateComplexServiceAmount(
  services: BillingService[],
  items: ComplexServiceFormItem[],
  coefficientValue: string,
) {
  const coefficient = Number(coefficientValue.replace(",", "."));
  const normalizedCoefficient = Number.isFinite(coefficient) && coefficient >= 0 ? coefficient : 0;

  const servicesAmount = items.reduce((total, item) => {
    const service = services.find((currentService) => currentService.id === Number(item.serviceId));
    if (!service) {
      return total;
    }

    const quantityValue = service.serviceType === "ONE_TIME" ? item.operationCount : item.durationDays;
    const quantity = Number(quantityValue);
    if (!Number.isFinite(quantity) || quantity <= 0) {
      return total;
    }

    return total + service.cost * quantity;
  }, 0);

  return servicesAmount * normalizedCoefficient;
}

function formatCoefficient(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UikitProvider>
      <App />
    </UikitProvider>
  </React.StrictMode>,
);
