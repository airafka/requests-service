import React from "react";
import ReactDOM from "react-dom/client";
import { BaseButton, ButtonType, PageCard, Select, SelectMulti, UikitProvider } from "@alabuga/uikit";
import {
  Box,
  Calculator,
  CalendarDays,
  ChevronDown,
  ClipboardCheck,
  Database,
  FileText,
  Layers3,
  ListChecks,
  PackageCheck,
  Repeat2,
  Truck,
} from "lucide-react";
import { API_BASE, errorText } from "./api";
import {
  BackButton,
  ClientSelect,
  ContainerChips,
  ContainerDropdown,
  DetailItem,
  EmptyRow,
  NotSelected,
  OrdersTable,
  PageHead,
  ShippingStatusBadge,
  StatusBadge,
  SubmitButton,
  TosStatusBadge,
  UikitBackButton,
} from "./common-ui";
import {
  basisLabel,
  billingAccrualStatusLabel,
  billingClientSummaries,
  billingOrderSummaries,
  billingPeriodStatusLabel,
  billingRows,
  billingServiceSummaries,
  calculateComplexServiceAmount,
  complexServiceItemValue,
  continuousComplexServiceItems,
  datePart,
  formatCoefficient,
  formatDate,
  formatDateTime,
  formatMoney,
  formatQuantity,
  oneTimeComplexServiceItems,
  operationLabel,
  rawPayloadText,
  receivingOrderContainerStatusLabel,
  receivingOrderStatusLabel,
  serviceExecutionPeriodLabel,
  serviceExecutionSourceDetails,
  serviceExecutionStatusLabel,
  serviceExecutionTypeLabel,
  serviceRequestTypeLabel,
  serviceTypeLabel,
  shippingOrderContainerStatusLabel,
  shippingOrderStatusLabel,
  storagePeriodForOwnerHistory,
  storageDaysForPeriod,
  storagePeriodStatusLabel,
  storageSourceTypeLabel,
  todayLocalDate,
  tosFactStatusLabel,
  tosOrderStatusLabel,
} from "./domain-logic";
import type {
  BillingAccrual,
  BillingOperation,
  BillingPeriod,
  BillingService,
  BillingServiceExecution,
  BillingServiceType,
  Client,
  ComplexService,
  ComplexServiceFormItem,
  ComplexServiceItem,
  Container,
  ContainerOwnerHistory,
  ContainerStoragePeriod,
  CurrentContainerOwner,
  OwnerChangeOrder,
  Page,
  ReceivingOrder,
  ReceivingOrderContainerStatus,
  ReceivingOrderStatus,
  ServiceExecution,
  ServiceExecutionBasisType,
  ServiceExecutionStatus,
  ServiceExecutionType,
  ShippingOrder,
  ShippingOrderContainerStatus,
  ShippingOrderStatus,
  TosOperationFact,
} from "./domain";
import "./styles.css";


function App() {
  const [page, setPage] = React.useState<Page>("receiving-list");
  const [receivingOrders, setReceivingOrders] = React.useState<ReceivingOrder[]>([]);
  const [shippingOrders, setShippingOrders] = React.useState<ShippingOrder[]>([]);
  const [ownerChangeOrders, setOwnerChangeOrders] = React.useState<OwnerChangeOrder[]>([]);
  const [selectedOwnerContainer, setSelectedOwnerContainer] = React.useState<Container | null>(null);
  const [selectedOwnerHistory, setSelectedOwnerHistory] = React.useState<ContainerOwnerHistory[]>([]);
  const [currentContainerOwners, setCurrentContainerOwners] = React.useState<CurrentContainerOwner[]>([]);
  const [containerOwnerHistory, setContainerOwnerHistory] = React.useState<ContainerOwnerHistory[]>([]);
  const [containers, setContainers] = React.useState<Container[]>([]);
  const [clients, setClients] = React.useState<Client[]>([]);
  const [billingOperations, setBillingOperations] = React.useState<BillingOperation[]>([]);
  const [billingServices, setBillingServices] = React.useState<BillingService[]>([]);
  const [complexServices, setComplexServices] = React.useState<ComplexService[]>([]);
  const [tosOperationFacts, setTosOperationFacts] = React.useState<TosOperationFact[]>([]);
  const [storagePeriods, setStoragePeriods] = React.useState<ContainerStoragePeriod[]>([]);
  const [serviceExecutions, setServiceExecutions] = React.useState<ServiceExecution[]>([]);
  const [billingPeriods, setBillingPeriods] = React.useState<BillingPeriod[]>([]);
  const [billingAccruals, setBillingAccruals] = React.useState<BillingAccrual[]>([]);
  const [selectedReceivingOrderId, setSelectedReceivingOrderId] = React.useState<number | null>(null);
  const [selectedTosOrderId, setSelectedTosOrderId] = React.useState<number | null>(null);
  const [selectedTosShippingOrderId, setSelectedTosShippingOrderId] = React.useState<number | null>(null);
  const [selectedBillingClientId, setSelectedBillingClientId] = React.useState<number | null>(null);
  const [selectedBillingOrderId, setSelectedBillingOrderId] = React.useState<number | null>(null);
  const [selectedShippingOrderId, setSelectedShippingOrderId] = React.useState<number | null>(null);
  const [selectedOwnerChangeOrderId, setSelectedOwnerChangeOrderId] = React.useState<number | null>(null);
  const [selectedOperationId, setSelectedOperationId] = React.useState<number | null>(null);
  const [selectedServiceId, setSelectedServiceId] = React.useState<number | null>(null);
  const [selectedComplexServiceId, setSelectedComplexServiceId] = React.useState<number | null>(null);
  const [selectedServiceExecutionId, setSelectedServiceExecutionId] = React.useState<number | null>(null);
  const [selectedBillingPeriodId, setSelectedBillingPeriodId] = React.useState<number | null>(null);
  const [selectedAccrualId, setSelectedAccrualId] = React.useState<number | null>(null);
  const [receivingClientId, setReceivingClientId] = React.useState("");
  const [receivingComplexServiceId, setReceivingComplexServiceId] = React.useState("");
  const [plannedReceivingDate, setPlannedReceivingDate] = React.useState(todayLocalDate());
  const [receivingContainers, setReceivingContainers] = React.useState<string[]>([]);
  const [shippingClientId, setShippingClientId] = React.useState("");
  const [plannedShippingDate, setPlannedShippingDate] = React.useState(todayLocalDate());
  const [shippingContainers, setShippingContainers] = React.useState<string[]>([]);
  const [billingDate, setBillingDate] = React.useState(todayLocalDate());
  const [ownerServiceDate, setOwnerServiceDate] = React.useState(todayLocalDate());
  const [ownerRequestType, setOwnerRequestType] = React.useState<"OWNER_CHANGE" | "SERVICE">("OWNER_CHANGE");
  const [ownerServiceId, setOwnerServiceId] = React.useState("");
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
  const [newBillingPeriodName, setNewBillingPeriodName] = React.useState("");
  const [newBillingPeriodClientId, setNewBillingPeriodClientId] = React.useState("");
  const [newBillingPeriodDateFrom, setNewBillingPeriodDateFrom] = React.useState(todayLocalDate());
  const [newBillingPeriodDateTo, setNewBillingPeriodDateTo] = React.useState(todayLocalDate());
  const [isReceivingDropdownOpen, setIsReceivingDropdownOpen] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const selectedReceivingOrder = receivingOrders.find((order) => order.id === selectedReceivingOrderId) ?? null;
  const selectedTosOrder = receivingOrders.find((order) => order.id === selectedTosOrderId) ?? null;
  const selectedTosShippingOrder =
    shippingOrders.find((order) => order.id === selectedTosShippingOrderId) ?? null;
  const selectedBillingClient = clients.find((client) => client.id === selectedBillingClientId) ?? null;
  const selectedBillingOrder = receivingOrders.find((order) => order.id === selectedBillingOrderId) ?? null;
  const selectedShippingOrder = shippingOrders.find((order) => order.id === selectedShippingOrderId) ?? null;
  const selectedOwnerChangeOrder = ownerChangeOrders.find((order) => order.id === selectedOwnerChangeOrderId) ?? null;
  const selectedOperation = billingOperations.find((operation) => operation.id === selectedOperationId) ?? null;
  const selectedService = billingServices.find((service) => service.id === selectedServiceId) ?? null;
  const selectedComplexService =
    complexServices.find((complexService) => complexService.id === selectedComplexServiceId) ?? null;
  const selectedServiceExecution =
    serviceExecutions.find((execution) => execution.id === selectedServiceExecutionId) ?? null;
  const selectedBillingPeriod =
    billingPeriods.find((period) => period.id === selectedBillingPeriodId) ?? null;
  const selectedBillingAccrual =
    billingAccruals.find((accrual) => accrual.id === selectedAccrualId) ?? null;

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
        currentOwnersResponse,
        ownerHistoryResponse,
        operationsResponse,
        servicesResponse,
        complexServicesResponse,
        tosFactsResponse,
        storagePeriodsResponse,
        serviceExecutionsResponse,
        billingPeriodsResponse,
        billingAccrualsResponse,
      ] = await Promise.all([
        fetch(`${API_BASE}/receiving-orders`),
        fetch(`${API_BASE}/shipping-orders`),
        fetch(`${API_BASE}/container-owner-change-orders`),
        fetch(`${API_BASE}/containers`),
        fetch(`${API_BASE}/clients`),
        fetch(`${API_BASE}/containers/owners/current`),
        fetch(`${API_BASE}/containers/owners/history`),
        fetch(`${API_BASE}/operations`),
        fetch(`${API_BASE}/services`),
        fetch(`${API_BASE}/complex-services`),
        fetch(`${API_BASE}/tos-operation-facts`),
        fetch(`${API_BASE}/storage-periods`),
        fetch(`${API_BASE}/service-executions`),
        fetch(`${API_BASE}/billing-periods`),
        fetch(`${API_BASE}/billing-accruals`),
      ]);

      if (
        !receivingResponse.ok ||
        !shippingResponse.ok ||
        !ownerChangeResponse.ok ||
        !containersResponse.ok ||
        !clientsResponse.ok ||
        !currentOwnersResponse.ok ||
        !ownerHistoryResponse.ok ||
        !operationsResponse.ok ||
        !servicesResponse.ok ||
        !complexServicesResponse.ok ||
        !tosFactsResponse.ok ||
        !storagePeriodsResponse.ok ||
        !serviceExecutionsResponse.ok ||
        !billingPeriodsResponse.ok ||
        !billingAccrualsResponse.ok
      ) {
        throw new Error("Не удалось загрузить данные");
      }

      setReceivingOrders(await receivingResponse.json());
      setShippingOrders(await shippingResponse.json());
      setOwnerChangeOrders(await ownerChangeResponse.json());
      setContainers(await containersResponse.json());
      setClients(await clientsResponse.json());
      setCurrentContainerOwners(await currentOwnersResponse.json());
      setContainerOwnerHistory(await ownerHistoryResponse.json());
      setBillingOperations(await operationsResponse.json());
      setBillingServices(await servicesResponse.json());
      setComplexServices(await complexServicesResponse.json());
      setTosOperationFacts(await tosFactsResponse.json());
      setStoragePeriods(await storagePeriodsResponse.json());
      setServiceExecutions(await serviceExecutionsResponse.json());
      setBillingPeriods(await billingPeriodsResponse.json());
      setBillingAccruals(await billingAccrualsResponse.json());
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

    if (!receivingComplexServiceId) {
      setError("Выберите комплексную услугу");
      return;
    }

    if (receivingContainers.length === 0) {
      setError("Выберите хотя бы один КТК");
      return;
    }

    if (!plannedReceivingDate) {
      setError("Выберите плановую дату поставки");
      return;
    }

    const response = await fetch(`${API_BASE}/receiving-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: Number(receivingClientId),
        complexServiceId: Number(receivingComplexServiceId),
        plannedReceivingDate,
        containerNumbers: receivingContainers,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать заявку на поставку"));
      return;
    }

    const createdOrder: ReceivingOrder = await response.json();
    setReceivingClientId("");
    setReceivingComplexServiceId("");
    setPlannedReceivingDate(todayLocalDate());
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

  async function finishReceivingOrderContainer(orderId: number, linkId: number) {
    setError(null);

    const response = await fetch(`${API_BASE}/receiving-orders/${orderId}/containers/${linkId}/finish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actualDate: billingDate }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось принять КТК в TOS"));
      return;
    }

    const updatedOrder: ReceivingOrder = await response.json();
    await loadData();
    setSelectedTosOrderId(updatedOrder.id);
    setPage("tos-receiving-details");
  }

  async function finishTosService(orderId: number, linkId: number, serviceId: number) {
    setError(null);

    const response = await fetch(`${API_BASE}/receiving-orders/${orderId}/containers/${linkId}/services/${serviceId}/finish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actualDate: billingDate }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось выполнить услугу в TOS"));
      return;
    }

    const updatedOrder: ReceivingOrder = await response.json();
    await loadData();
    setSelectedTosOrderId(updatedOrder.id);
    setPage("tos-receiving-details");
  }

  async function finishShippingOrderContainer(orderId: number, linkId: number) {
    setError(null);

    const response = await fetch(`${API_BASE}/shipping-orders/${orderId}/containers/${linkId}/finish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ actualDate: billingDate }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось отметить вывоз КТК в TOS"));
      return;
    }

    const updatedOrder: ShippingOrder = await response.json();
    await loadData();
    setSelectedTosShippingOrderId(updatedOrder.id);
    setPage("tos-shipping-details");
  }

  async function openServiceExecution(execution: ServiceExecution) {
    setError(null);

    const response = await fetch(`${API_BASE}/service-executions/${execution.id}`);
    if (!response.ok) {
      setError(await errorText(response, "Не удалось открыть оказанную услугу"));
      return;
    }

    const detailedExecution: ServiceExecution = await response.json();
    setServiceExecutions((currentExecutions) =>
      currentExecutions.map((currentExecution) =>
        currentExecution.id === detailedExecution.id ? detailedExecution : currentExecution,
      ),
    );
    setSelectedServiceExecutionId(detailedExecution.id);
    setPage("service-execution-details");
  }

  async function createBillingPeriod(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!newBillingPeriodClientId) {
      setError("Выберите клиента для расчета");
      return;
    }

    const response = await fetch(`${API_BASE}/billing-periods`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newBillingPeriodName || null,
        clientId: Number(newBillingPeriodClientId),
        dateFrom: newBillingPeriodDateFrom,
        dateTo: newBillingPeriodDateTo,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать расчетный период"));
      return;
    }

    const createdPeriod: BillingPeriod = await response.json();
    setNewBillingPeriodName("");
    setNewBillingPeriodClientId("");
    setNewBillingPeriodDateFrom(todayLocalDate());
    setNewBillingPeriodDateTo(todayLocalDate());
    await loadData();
    setSelectedBillingPeriodId(createdPeriod.id);
    setPage("billing-period-details");
  }

  async function openBillingPeriod(period: BillingPeriod) {
    setError(null);

    const response = await fetch(`${API_BASE}/billing-periods/${period.id}`);
    if (!response.ok) {
      setError(await errorText(response, "Не удалось открыть расчетный период"));
      return;
    }

    const detailedPeriod: BillingPeriod = await response.json();
    setBillingPeriods((currentPeriods) =>
      currentPeriods.map((currentPeriod) => (currentPeriod.id === detailedPeriod.id ? detailedPeriod : currentPeriod)),
    );
    setSelectedBillingPeriodId(detailedPeriod.id);
    setPage("billing-period-details");
  }

  async function calculateBillingPeriod(periodId: number) {
    setError(null);

    const response = await fetch(`${API_BASE}/billing-periods/${periodId}/calculate`, {
      method: "POST",
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось рассчитать период"));
      return;
    }

    await loadData();
  }

  async function closeBillingPeriod(periodId: number) {
    setError(null);

    const response = await fetch(`${API_BASE}/billing-periods/${periodId}/close`, {
      method: "POST",
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось закрыть период"));
      return;
    }

    await loadData();
  }

  async function openBillingAccrual(accrual: BillingAccrual) {
    setError(null);

    const response = await fetch(`${API_BASE}/billing-accruals/${accrual.id}`);
    if (!response.ok) {
      setError(await errorText(response, "Не удалось открыть начисление"));
      return;
    }

    const detailedAccrual: BillingAccrual = await response.json();
    setBillingAccruals((currentAccruals) =>
      currentAccruals.map((currentAccrual) =>
        currentAccrual.id === detailedAccrual.id ? detailedAccrual : currentAccrual,
      ),
    );
    setSelectedAccrualId(detailedAccrual.id);
    setPage("billing-accrual-details");
  }

  async function changeBillingDate(date: string) {
    setBillingDate(date);
  }

  async function createOwnerChangeOrder(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!ownerServiceDate) {
      setError("Выберите дату начала владения");
      return;
    }

    if (ownerRequestType === "OWNER_CHANGE" && !ownerClientId) {
      setError("Выберите нового владельца");
      return;
    }
    if (ownerRequestType === "SERVICE" && !ownerServiceId) {
      setError("Выберите услугу");
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
        requestType: ownerRequestType,
        serviceId: ownerRequestType === "SERVICE" ? Number(ownerServiceId) : null,
        serviceDate: ownerServiceDate,
        newClientId: ownerRequestType === "OWNER_CHANGE" ? Number(ownerClientId) : null,
        comment: ownerComment,
        containerIds: ownerContainers,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать заявку на услугу"));
      return;
    }

    const createdOrder: OwnerChangeOrder = await response.json();
    setOwnerRequestType("OWNER_CHANGE");
    setOwnerServiceId("");
    setOwnerServiceDate(todayLocalDate());
    setOwnerClientId("");
    setOwnerComment("");
    setOwnerContainers([]);
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

    if (!plannedShippingDate) {
      setError("Выберите плановую дату вывоза");
      return;
    }

    const response = await fetch(`${API_BASE}/shipping-orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        clientId: Number(shippingClientId),
        plannedShippingDate,
        containerNumbers: shippingContainers,
      }),
    });

    if (!response.ok) {
      setError(await errorText(response, "Не удалось создать заявку на вывоз"));
      return;
    }

    const createdOrder: ShippingOrder = await response.json();
    setShippingClientId("");
    setPlannedShippingDate(todayLocalDate());
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
          <details className="sidebar-group">
            <summary className={page.startsWith("receiving") || page.startsWith("shipping") || page.startsWith("owner") ? "active" : ""}>
              <span>Заявки</span>
              <ChevronDown size={16} />
            </summary>
            <div className="sidebar-group-items">
              <button
                className={page.startsWith("receiving") ? "active" : ""}
                type="button"
                onClick={() => setPage("receiving-list")}
              >
                <FileText size={18} />
                <span>Заявки на поставку</span>
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
                className={page.startsWith("owner") ? "active" : ""}
                type="button"
                onClick={() => setPage("owner-list")}
              >
                <Repeat2 size={18} />
                <span>Заявки на услугу</span>
              </button>
            </div>
          </details>

          <details className="sidebar-group">
            <summary
              className={
                page.startsWith("containers") ||
                page === "container-owner-details" ||
                page.startsWith("operations") ||
                page.startsWith("services") ||
                page.startsWith("complex-services")
                  ? "active"
                  : ""
              }
            >
              <span>Справочники</span>
              <ChevronDown size={16} />
            </summary>
            <div className="sidebar-group-items">
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
            </div>
          </details>

          <details className="sidebar-group">
            <summary
              className={
                page.startsWith("billing") ||
                page === "storage-periods"  ||
                page === "tos-facts" ||
                page.startsWith("service-execution")
                  ? "active"
                  : ""
              }
            >
              <span>Биллинг</span>
              <ChevronDown size={16} />
            </summary>
            <div className="sidebar-group-items">
              <button className={page.startsWith("billing") ? "active" : ""} type="button" onClick={() => setPage("billing-clients")}>
                <Calculator size={18} />
                <span>Биллинг</span>
              </button>
              <button className={page.startsWith("billing-period") ? "active" : ""} type="button" onClick={() => setPage("billing-periods")}>
                <CalendarDays size={18} />
                <span>Расчетные периоды</span>
              </button>
              <button className={page.startsWith("billing-accrual") ? "active" : ""} type="button" onClick={() => setPage("billing-accruals")}>
                <Calculator size={18} />
                <span>Реестр начислений</span>
              </button>
              <button className={page === "storage-periods" ? "active" : ""} type="button" onClick={() => setPage("storage-periods")}>
                <Box size={18} />
                <span>Хранение КТК</span>
              </button>
              <button className={page === "tos-facts" ? "active" : ""} type="button" onClick={() => setPage("tos-facts")}>
                <Database size={18} />
                <span>Журнал TOS</span>
              </button>
              <button
                className={page.startsWith("service-execution") ? "active" : ""}
                type="button"
                onClick={() => setPage("service-executions")}
              >
                <PackageCheck size={18} />
                <span>Реестр оказанных услуг</span>
              </button>
            </div>
          </details>

          <div className="sidebar-standalone sidebar-bottom-item">
            <button className={page.startsWith("tos") && page !== "tos-facts" ? "active" : ""} type="button" onClick={() => setPage("tos-list")}>
              <ClipboardCheck size={18} />
              <span>TOS</span>
            </button>
          </div>
        </nav>
      </aside>

      <section className="workspace">
        <div className="system-calendar">
          <label>
            <CalendarDays size={18} />
            <span>Расчетная дата</span>
            <input type="date" value={billingDate} onChange={(event) => void changeBillingDate(event.target.value)} />
          </label>
        </div>

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
            complexServices={complexServices}
            clientId={receivingClientId}
            complexServiceId={receivingComplexServiceId}
            plannedReceivingDate={plannedReceivingDate}
            selectedContainers={receivingContainers}
            isContainerDropdownOpen={isReceivingDropdownOpen}
            onBack={() => setPage("receiving-list")}
            onSubmit={createReceivingOrder}
            onClientChange={setReceivingClientId}
            onComplexServiceChange={setReceivingComplexServiceId}
            onPlannedReceivingDateChange={setPlannedReceivingDate}
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

        {page === "tos-list" && (
          <TosOrdersListPage
            receivingOrders={receivingOrders.filter((order) => order.status === "CONFIRMED" || order.status === "COMPLETED")}
            shippingOrders={shippingOrders.filter((order) => order.status === "CONFIRMED" || order.status === "COMPLETED")}
            isLoading={isLoading}
            onOpenReceiving={(order) => {
              setSelectedTosOrderId(order.id);
              setPage("tos-receiving-details");
            }}
            onOpenShipping={(order) => {
              setSelectedTosShippingOrderId(order.id);
              setPage("tos-shipping-details");
            }}
          />
        )}

        {page === "tos-receiving-details" && (
          <TosOrderDetailsPage
            order={selectedTosOrder}
            onBack={() => setPage("tos-list")}
            onFinishContainer={finishReceivingOrderContainer}
            onFinishService={finishTosService}
          />
        )}

        {page === "tos-shipping-details" && (
          <TosShippingOrderDetailsPage
            order={selectedTosShippingOrder}
            onBack={() => setPage("tos-list")}
            onFinishContainer={finishShippingOrderContainer}
          />
        )}

        {page === "tos-facts" && (
          <TosOperationFactsPage facts={tosOperationFacts} isLoading={isLoading} />
        )}

        {page === "billing-clients" && (
          <BillingClientsPage
            orders={receivingOrders}
            shippingOrders={shippingOrders}
            ownerHistory={containerOwnerHistory}
            containers={containers}
            billingDate={billingDate}
            onOpenClient={(clientId) => {
              setSelectedBillingClientId(clientId);
              setSelectedBillingOrderId(null);
              setPage("billing-client-details");
            }}
          />
        )}

        {page === "billing-client-details" && (
          <BillingClientDetailsPage
            client={selectedBillingClient}
            orders={receivingOrders}
            shippingOrders={shippingOrders}
            ownerHistory={containerOwnerHistory}
            containers={containers}
            billingDate={billingDate}
            onBack={() => setPage("billing-clients")}
          />
        )}

        {page === "billing-order-details" && (
          <BillingOrderDetailsPage
            order={selectedBillingOrder}
            shippingOrders={shippingOrders}
            ownerHistory={containerOwnerHistory}
            containers={containers}
            billingDate={billingDate}
            onBack={() => setPage("billing-client-details")}
          />
        )}

        {page === "billing-periods" && (
          <BillingPeriodsPage
            periods={billingPeriods}
            isLoading={isLoading}
            onCreate={() => setPage("billing-period-create")}
            onOpen={(period) => void openBillingPeriod(period)}
            onCalculate={(periodId) => void calculateBillingPeriod(periodId)}
            onClose={(periodId) => void closeBillingPeriod(periodId)}
          />
        )}

        {page === "billing-period-create" && (
          <CreateBillingPeriodPage
            clients={clients}
            name={newBillingPeriodName}
            clientId={newBillingPeriodClientId}
            dateFrom={newBillingPeriodDateFrom}
            dateTo={newBillingPeriodDateTo}
            onBack={() => setPage("billing-periods")}
            onSubmit={createBillingPeriod}
            onNameChange={setNewBillingPeriodName}
            onClientChange={setNewBillingPeriodClientId}
            onDateFromChange={setNewBillingPeriodDateFrom}
            onDateToChange={setNewBillingPeriodDateTo}
          />
        )}

        {page === "billing-period-details" && (
          <BillingPeriodDetailsPage
            period={selectedBillingPeriod}
            onBack={() => setPage("billing-periods")}
            onOpenAccrual={(accrual) => void openBillingAccrual(accrual)}
          />
        )}

        {page === "billing-accruals" && (
          <BillingAccrualsPage
            accruals={billingAccruals}
            isLoading={isLoading}
            onOpen={(accrual) => void openBillingAccrual(accrual)}
          />
        )}

        {page === "billing-accrual-details" && (
          <BillingAccrualDetailsPage
            accrual={selectedBillingAccrual}
            onBack={() => setPage("billing-accruals")}
          />
        )}

        {page === "storage-periods" && (
          <ContainerStoragePeriodsPage periods={storagePeriods} billingDate={billingDate} isLoading={isLoading} />
        )}

        {page === "service-executions" && (
          <ServiceExecutionsPage
            executions={serviceExecutions}
            isLoading={isLoading}
            onOpen={(execution) => void openServiceExecution(execution)}
          />
        )}

        {page === "service-execution-details" && (
          <ServiceExecutionDetailsPage
            execution={selectedServiceExecution}
            onBack={() => setPage("service-executions")}
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
            currentOwners={currentContainerOwners}
            clientId={shippingClientId}
            plannedShippingDate={plannedShippingDate}
            selectedContainers={shippingContainers}
            onBack={() => setPage("shipping-list")}
            onSubmit={createShippingOrder}
            onClientChange={(value) => {
              setShippingClientId(value);
              setShippingContainers([]);
            }}
            onPlannedShippingDateChange={setPlannedShippingDate}
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
            services={billingServices}
            currentOwners={currentContainerOwners}
            requestType={ownerRequestType}
            serviceId={ownerServiceId}
            serviceDate={ownerServiceDate}
            clientId={ownerClientId}
            comment={ownerComment}
            selectedContainers={ownerContainers}
            onBack={() => setPage("owner-list")}
            onSubmit={createOwnerChangeOrder}
            onRequestTypeChange={(value) => {
              setOwnerRequestType(value);
              setOwnerServiceId("");
              setOwnerClientId("");
            }}
            onServiceChange={setOwnerServiceId}
            onServiceDateChange={setOwnerServiceDate}
            onClientChange={setOwnerClientId}
            onCommentChange={setOwnerComment}
            onContainersChange={setOwnerContainers}
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
          <OrdersTable columns={["Номер заявки", "Клиент", "Плановая дата поставки", "Фактическая дата поставки", "Дата создания", "Статус"]}>
            {orders.map((order) => (
              <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
                <td>{order.number}</td>
                <td>{order.client.name}</td>
                <td>{formatDate(order.plannedReceivingDate)}</td>
                <td>{order.actualReceivingDate ? formatDate(order.actualReceivingDate) : "-"}</td>
                <td>{formatDateTime(order.createdAt)}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
            {orders.length === 0 && <EmptyRow colSpan={6} text={isLoading ? "Загрузка..." : "Заявок пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function TosOrdersListPage({
  receivingOrders,
  shippingOrders,
  isLoading,
  onOpenReceiving,
  onOpenShipping,
}: {
  receivingOrders: ReceivingOrder[];
  shippingOrders: ShippingOrder[];
  isLoading: boolean;
  onOpenReceiving: (order: ReceivingOrder) => void;
  onOpenShipping: (order: ShippingOrder) => void;
}) {
  const hasOrders = receivingOrders.length > 0 || shippingOrders.length > 0;

  return (
    <>
      <PageHead title="TOS" />

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Тип", "Номер заявки", "Клиент", "Статус TOS", "КТК", "Дата создания"]}>
            {receivingOrders.map((order) => {
              const finishedCount = order.containers.filter((link) => link.status === "FINISHED").length;

              return (
                <tr className="clickable-row" key={`receiving-${order.id}`} onClick={() => onOpenReceiving(order)}>
                  <td>Поставка</td>
                  <td>{order.number}</td>
                  <td>{order.client.name}</td>
                  <td>
                    <TosStatusBadge order={order} />
                  </td>
                  <td>
                    {finishedCount} из {order.containers.length}
                  </td>
                  <td>{formatDateTime(order.createdAt)}</td>
                </tr>
              );
            })}
            {shippingOrders.map((order) => {
              const finishedCount = order.containers.filter((link) => link.status === "FINISHED").length;

              return (
                <tr className="clickable-row" key={`shipping-${order.id}`} onClick={() => onOpenShipping(order)}>
                  <td>Вывоз</td>
                  <td>{order.number}</td>
                  <td>{order.client.name}</td>
                  <td>
                    <ShippingStatusBadge status={order.status} />
                  </td>
                  <td>
                    {finishedCount} из {order.containers.length}
                  </td>
                  <td>{formatDateTime(order.createdAt)}</td>
                </tr>
              );
            })}
            {!hasOrders && (
              <EmptyRow colSpan={6} text={isLoading ? "Загрузка..." : "Нет заявок на выполнение"} />
            )}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function TosOperationFactsPage({
  facts,
  isLoading,
}: {
  facts: TosOperationFact[];
  isLoading: boolean;
}) {
  return (
    <>
      <PageHead title="Журнал событий TOS" />

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Дата события", "Операция", "КТК", "Кол-во", "Источник", "Статус", "Raw payload"]}>
            {facts.map((fact) => (
              <tr key={fact.id}>
                <td>{formatDateTime(fact.operationTime)}</td>
                <td>{fact.operationName || fact.operationCode}</td>
                <td>{fact.containerNumber}</td>
                <td>{fact.quantity}</td>
                <td>{fact.sourceSystem}</td>
                <td>{tosFactStatusLabel(fact.status)}</td>
                <td title={rawPayloadText(fact.rawPayload)}>{rawPayloadText(fact.rawPayload)}</td>
              </tr>
            ))}
            {facts.length === 0 && <EmptyRow colSpan={7} text={isLoading ? "Загрузка..." : "Событий TOS пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function ContainerStoragePeriodsPage({
  periods,
  billingDate,
  isLoading,
}: {
  periods: ContainerStoragePeriod[];
  billingDate: string;
  isLoading: boolean;
}) {
  return (
    <>
      <PageHead title="Реестр хранения КТК" />

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["КТК", "Клиент", "Услуга", "Дата начала", "Дата окончания", "Дней", "Источник", "Статус"]}>
            {periods.map((period) => (
              <tr key={period.id}>
                <td>{period.containerNumber}</td>
                <td>{period.clientName}</td>
                <td>{period.serviceName || "-"}</td>
                <td>{formatDate(period.dateFrom)}</td>
                <td>{period.dateTo ? formatDate(period.dateTo) : "-"}</td>
                <td>{storageDaysForPeriod(period, billingDate)}</td>
                <td>{storageSourceTypeLabel(period.sourceType)}</td>
                <td>{storagePeriodStatusLabel(period.status)}</td>
              </tr>
            ))}
            {periods.length === 0 && <EmptyRow colSpan={8} text={isLoading ? "Загрузка..." : "Периодов хранения пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function ServiceExecutionsPage({
  executions,
  isLoading,
  onOpen,
}: {
  executions: ServiceExecution[];
  isLoading: boolean;
  onOpen: (execution: ServiceExecution) => void;
}) {
  const visibleExecutions = executions.filter((execution) => execution.status !== "CANCELLED");

  return (
    <>
      <PageHead title="Реестр оказанных услуг" />

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Дата", "Клиент", "КТК", "Услуга", "Кол-во", "Ед.", "Статус"]}>
            {visibleExecutions.map((execution) => (
              <tr className="clickable-row" key={execution.id} onClick={() => onOpen(execution)}>
                <td>{serviceExecutionPeriodLabel(execution)}</td>
                <td>{execution.clientName}</td>
                <td>{execution.containerNumber}</td>
                <td>{execution.serviceName}</td>
                <td>{execution.quantity}</td>
                <td>{execution.unit}</td>
                <td>{serviceExecutionStatusLabel(execution.status)}</td>
              </tr>
            ))}
            {visibleExecutions.length === 0 && <EmptyRow colSpan={7} text={isLoading ? "Загрузка..." : "Оказанных услуг пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function ServiceExecutionDetailsPage({
  execution,
  onBack,
}: {
  execution: ServiceExecution | null;
  onBack: () => void;
}) {
  if (!execution) {
    return <NotSelected title="Оказанная услуга не выбрана" onBack={onBack} />;
  }

  return (
    <section className="details-panel">
      <BackButton onClick={onBack} />
      <h1>Оказанная услуга</h1>
      <div className="details-grid">
        <DetailItem label="Клиент" value={execution.clientName} />
        <DetailItem label="КТК" value={execution.containerNumber} />
        <DetailItem label="Услуга" value={execution.serviceName} />
        <DetailItem label="Тип услуги" value={serviceExecutionTypeLabel(execution.executionType)} />
        <DetailItem label="Дата / период" value={serviceExecutionPeriodLabel(execution)} />
        <DetailItem label="Количество" value={String(execution.quantity)} />
        <DetailItem label="Единица измерения" value={execution.unit} />
        <DetailItem label="Источник" value={execution.sourceType} />
        <DetailItem label="Статус" value={serviceExecutionStatusLabel(execution.status)} />
        <DetailItem label="Основание" value={basisLabel(execution.basisType, execution.basisId)} />
        <DetailItem label="Создано" value={formatDateTime(execution.createdAt)} />
      </div>

      <h2>Источники</h2>
      <OrdersTable columns={["Тип источника", "ID источника", "Данные"]}>
        {(execution.sources ?? []).map((source) => (
          <tr key={source.id}>
            <td>{source.sourceType}</td>
            <td>{source.sourceId}</td>
            <td>{serviceExecutionSourceDetails(source)}</td>
          </tr>
        ))}
        {(execution.sources ?? []).length === 0 && <EmptyRow colSpan={3} text="Источники не загружены" />}
      </OrdersTable>
    </section>
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
          <OrdersTable columns={["Номер заявки", "Клиент", "Плановая дата вывоза", "Фактическая дата вывоза", "Дата создания", "Статус"]}>
            {orders.map((order) => (
              <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
                <td>{order.number}</td>
                <td>{order.client.name}</td>
                <td>{formatDate(order.plannedShippingDate)}</td>
                <td>{order.actualShippingDate ? formatDate(order.actualShippingDate) : "-"}</td>
                <td>{formatDateTime(order.createdAt)}</td>
                <td>
                  <ShippingStatusBadge status={order.status} />
                </td>
              </tr>
            ))}
            {orders.length === 0 && <EmptyRow colSpan={6} text={isLoading ? "Загрузка..." : "Заявок пока нет"} />}
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
      <PageHead title="Заявки на услугу">
        <BaseButton buttonType={ButtonType.default} onClick={onCreate}>
          Создать
        </BaseButton>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Номер заявки", "Тип", "Услуга / новый владелец", "КТК", "Дата"]}>
            {orders.map((order) => (
              <tr className="clickable-row" key={order.id} onClick={() => onOpen(order)}>
                <td>{order.number}</td>
                <td>{serviceRequestTypeLabel(order.requestType)}</td>
                <td>{order.requestType === "OWNER_CHANGE" ? order.newClient?.name ?? "-" : order.service?.name ?? "-"}</td>
                <td>{order.containers.map((container) => container.number).join(", ")}</td>
                <td>{formatDate(order.serviceDate)}</td>
              </tr>
            ))}
            {orders.length === 0 && <EmptyRow colSpan={5} text={isLoading ? "Загрузка..." : "Заявок пока нет"} />}
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
          <OrdersTable columns={["Клиент", "Событие", "Заявка", "Дата события", "Дата начала"]}>
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
                <td>{formatDateTime(item.operationType === "OWNER_CHANGE" ? item.createdAt : item.validFrom)}</td>
                <td>{item.operationType === "OWNER_CHANGE" ? formatDate(datePart(item.validFrom)) : "-"}</td>
              </tr>
            ))}
            {history.length === 0 && <EmptyRow colSpan={5} text="Истории КТК пока нет" />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function CreateReceivingOrderPage(props: {
  clients: Client[];
  containers: Container[];
  complexServices: ComplexService[];
  clientId: string;
  complexServiceId: string;
  plannedReceivingDate: string;
  selectedContainers: string[];
  isContainerDropdownOpen: boolean;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClientChange: (value: string) => void;
  onComplexServiceChange: (value: string) => void;
  onPlannedReceivingDateChange: (value: string) => void;
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
            <Select
              label="Комплексная услуга"
              placeholder=" "
              value={props.complexServiceId ? Number(props.complexServiceId) : undefined}
              options={props.complexServices.map((complexService) => ({
                value: complexService.id,
                label: complexService.name,
              }))}
              onChange={(value) => props.onComplexServiceChange(value ? String(value) : "")}
            />
            <label>
              Плановая дата поставки
              <input type="date" value={props.plannedReceivingDate} onChange={(event) => props.onPlannedReceivingDateChange(event.target.value)} />
            </label>
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
  currentOwners: CurrentContainerOwner[];
  clientId: string;
  plannedShippingDate: string;
  selectedContainers: string[];
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onClientChange: (value: string) => void;
  onPlannedShippingDateChange: (value: string) => void;
  onContainersChange: (value: string[]) => void;
}) {
  const availableContainers = props.clientId
    ? props.currentOwners
        .filter((owner) => owner.client.id === Number(props.clientId))
        .map((owner) => owner.container)
    : [];
  const containerOptions = availableContainers.map((container) => ({
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
            <label>
              Плановая дата вывоза
              <input type="date" value={props.plannedShippingDate} onChange={(event) => props.onPlannedShippingDateChange(event.target.value)} />
            </label>
            <SelectMulti
              label="КТК"
              placeholder={props.clientId ? " " : "Сначала выберите клиента"}
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
  services: BillingService[];
  currentOwners: CurrentContainerOwner[];
  requestType: "OWNER_CHANGE" | "SERVICE";
  serviceId: string;
  serviceDate: string;
  clientId: string;
  comment: string;
  selectedContainers: number[];
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onRequestTypeChange: (value: "OWNER_CHANGE" | "SERVICE") => void;
  onServiceChange: (value: string) => void;
  onServiceDateChange: (value: string) => void;
  onClientChange: (value: string) => void;
  onCommentChange: (value: string) => void;
  onContainersChange: (value: number[]) => void;
}) {
  const containerOptions = props.currentOwners.map((owner) => ({
    value: owner.container.id,
    label: `${owner.container.number} - ${owner.client.name}`,
  }));
  const serviceOptions = props.services
    .filter((service) => service.serviceType === "ONE_TIME")
    .map((service) => ({
      value: service.id,
      label: service.name,
    }));

  return (
    <>
      <PageHead title="Создание заявки на услугу">
        <UikitBackButton onClick={props.onBack} />
      </PageHead>

      <div className="uikit-form-shell">
        <PageCard>
          <form className="uikit-form create-page-form" onSubmit={props.onSubmit}>
            <h2>Данные заявки</h2>
            <Select
              label="Тип заявки"
              placeholder=" "
              value={props.requestType}
              options={[
                { value: "OWNER_CHANGE", label: "Смена владельца" },
                { value: "SERVICE", label: "Оказание услуги" },
              ]}
              onChange={(value) => props.onRequestTypeChange((value as "OWNER_CHANGE" | "SERVICE") ?? "OWNER_CHANGE")}
            />
            {props.requestType === "SERVICE" && (
              <Select
                label="Услуга"
                placeholder=" "
                value={props.serviceId ? Number(props.serviceId) : undefined}
                options={serviceOptions}
                onChange={(value) => props.onServiceChange(value ? String(value) : "")}
              />
            )}
            <label>
              {props.requestType === "OWNER_CHANGE" ? "Дата начала владения" : "Дата оказания услуги"}
              <input type="date" value={props.serviceDate} onChange={(event) => props.onServiceDateChange(event.target.value)} />
            </label>
            {props.requestType === "OWNER_CHANGE" && (
              <Select
                label="Новый владелец"
                placeholder=" "
                value={props.clientId ? Number(props.clientId) : undefined}
                options={props.clients.map((client) => ({ value: client.id, label: client.name }))}
                onChange={(value) => props.onClientChange(value ? String(value) : "")}
              />
            )}
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
              <DetailItem label="Плановая дата поставки" value={formatDate(order.plannedReceivingDate)} />
              <DetailItem label="Фактическая дата поставки" value={order.actualReceivingDate ? formatDate(order.actualReceivingDate) : "-"} />
              <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
            </div>

            <h2>КТК в заявке</h2>
            <ContainerChips containers={order.containers.map((link) => link.container)} />
          </section>
        </PageCard>
      </div>
    </>
  );
}

function TosOrderDetailsPage({
  order,
  onBack,
  onFinishContainer,
  onFinishService,
}: {
  order: ReceivingOrder | null;
  onBack: () => void;
  onFinishContainer: (orderId: number, linkId: number) => void;
  onFinishService: (orderId: number, linkId: number, serviceId: number) => void;
}) {
  if (!order) {
    return <NotSelected title="Заявка не выбрана" onBack={onBack} />;
  }

  return (
    <>
      <PageHead title={`TOS: заявка ${order.number}`}>
        <div className="head-actions">
          <UikitBackButton onClick={onBack} />
        </div>
      </PageHead>

      <div className="uikit-details-card tos-details-card">
        <PageCard>
          <section className="uikit-details">
            <div className="detail-grid">
              <DetailItem label="Номер заявки" value={order.number} />
              <DetailItem label="Клиент" value={order.client.name} />
              <DetailItem label="Комплексная услуга" value={order.complexService?.name ?? "-"} />
              <DetailItem label="Статус TOS" value={tosOrderStatusLabel(order)} />
              <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
            </div>

            <h2>КТК в заявке</h2>
            <div className="tos-container-list">
              {order.containers.map((link) => (
                <div className="tos-container-row" key={link.id}>
                  <div className="tos-container-summary">
                    <div>
                      <strong>{link.container.number}</strong>
                      <span>{receivingOrderContainerStatusLabel(link.status)}</span>
                    </div>
                    <BaseButton
                      className="tos-action-button"
                      buttonType={ButtonType.default}
                      isDisabled={link.status === "FINISHED"}
                      onClick={() => onFinishContainer(order.id, link.id)}
                    >
                      Принят
                    </BaseButton>
                  </div>
                  <div className="tos-service-list">
                    {oneTimeComplexServiceItems(order).map((item) => {
                      const execution = link.serviceExecutions.find(
                        (currentExecution) => currentExecution.service.id === item.service.id,
                      );
                      const requiredQuantity = item.operationCount ?? 1;
                      const completedQuantity = execution?.quantity ?? 0;
                      const isFullyFinished = completedQuantity >= requiredQuantity;

                      return (
                        <div className="tos-service-row" key={item.id}>
                          <div>
                            <strong>{item.service.name}</strong>
                            <span>
                              {execution
                                ? `${completedQuantity} из ${requiredQuantity}, ${formatMoney(execution.amount)}`
                                : `0 из ${requiredQuantity}`}
                            </span>
                          </div>
                          <BaseButton
                            className="tos-action-button"
                            buttonType={ButtonType.default}
                            isDisabled={link.status !== "FINISHED" || isFullyFinished}
                            onClick={() => onFinishService(order.id, link.id, item.service.id)}
                          >
                            Выполнить
                          </BaseButton>
                        </div>
                      );
                    })}
                    {oneTimeComplexServiceItems(order).length === 0 && (
                      <p className="muted">В комплексной услуге нет единоразовых услуг</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </PageCard>
      </div>
    </>
  );
}

function TosShippingOrderDetailsPage({
  order,
  onBack,
  onFinishContainer,
}: {
  order: ShippingOrder | null;
  onBack: () => void;
  onFinishContainer: (orderId: number, linkId: number) => void;
}) {
  if (!order) {
    return <NotSelected title="Заявка не выбрана" onBack={onBack} />;
  }

  return (
    <>
      <PageHead title={`TOS: вывоз ${order.number}`}>
        <div className="head-actions">
          <UikitBackButton onClick={onBack} />
        </div>
      </PageHead>

      <div className="uikit-details-card tos-details-card">
        <PageCard>
          <section className="uikit-details">
            <div className="detail-grid">
              <DetailItem label="Номер заявки" value={order.number} />
              <DetailItem label="Клиент" value={order.client.name} />
              <DetailItem label="Статус TOS" value={shippingOrderStatusLabel(order.status)} />
              <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
              <DetailItem label="Дата выполнения" value={order.completedAt ? formatDateTime(order.completedAt) : "-"} />
            </div>

            <h2>КТК в заявке</h2>
            <div className="tos-container-list">
              {order.containers.map((link) => (
                <div className="tos-container-row" key={link.id}>
                  <div className="tos-container-summary">
                    <div>
                      <strong>{link.container.number}</strong>
                      <span>{shippingOrderContainerStatusLabel(link.status)}</span>
                    </div>
                    <BaseButton
                      className="tos-action-button"
                      buttonType={ButtonType.default}
                      isDisabled={link.status === "FINISHED"}
                      onClick={() => onFinishContainer(order.id, link.id)}
                    >
                      Вывезен
                    </BaseButton>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </PageCard>
      </div>
    </>
  );
}

function BillingClientsPage({
  orders,
  shippingOrders,
  ownerHistory,
  containers,
  billingDate,
  onOpenClient,
}: {
  orders: ReceivingOrder[];
  shippingOrders: ShippingOrder[];
  ownerHistory: ContainerOwnerHistory[];
  containers: Container[];
  billingDate: string;
  onOpenClient: (clientId: number) => void;
}) {
  const rows = billingRows(orders, shippingOrders, ownerHistory, containers, billingDate);
  const total = rows.reduce((sum, row) => sum + row.amount, 0);
  const clients = billingClientSummaries(orders, rows);

  return (
    <>
      <PageHead title="Биллинг" />

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Клиент", "Количество услуг", "Начислено"]}>
            {clients.map((client) => (
              <tr className="clickable-row" key={client.clientId} onClick={() => onOpenClient(client.clientId)}>
                <td>{client.clientName}</td>
                <td>{client.serviceCount}</td>
                <td>{formatMoney(client.amount)}</td>
              </tr>
            ))}
            {clients.length === 0 && <EmptyRow colSpan={3} text="Начислений пока нет" />}
          </OrdersTable>
          <div className="billing-total">Итого: {formatMoney(total)}</div>
        </PageCard>
      </div>
    </>
  );
}

function BillingPeriodsPage({
  periods,
  isLoading,
  onCreate,
  onOpen,
  onCalculate,
  onClose,
}: {
  periods: BillingPeriod[];
  isLoading: boolean;
  onCreate: () => void;
  onOpen: (period: BillingPeriod) => void;
  onCalculate: (periodId: number) => void;
  onClose: (periodId: number) => void;
}) {
  return (
    <>
      <PageHead title="Расчетные периоды">
        <button className="design-button" type="button" onClick={onCreate}>
          Создать период
        </button>
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Название периода", "Клиент", "Дата с", "Дата по", "Статус", "Действие"]}>
            {periods.map((period) => (
              <tr key={period.id}>
                <td>{period.name}</td>
                <td>{period.clientName ?? "-"}</td>
                <td>{formatDate(period.dateFrom)}</td>
                <td>{formatDate(period.dateTo)}</td>
                <td>{billingPeriodStatusLabel(period.status)}</td>
                <td>
                  <div className="table-actions">
                    <button type="button" onClick={() => onOpen(period)}>
                      Открыть
                    </button>
                    {period.status === "DRAFT" && (
                      <button type="button" onClick={() => onCalculate(period.id)}>
                        Рассчитать
                      </button>
                    )}
                    {period.status === "CALCULATED" && (
                      <button type="button" onClick={() => onClose(period.id)}>
                        Закрыть
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {periods.length === 0 && <EmptyRow colSpan={6} text={isLoading ? "Загрузка..." : "Расчетных периодов пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function CreateBillingPeriodPage({
  clients,
  name,
  clientId,
  dateFrom,
  dateTo,
  onBack,
  onSubmit,
  onNameChange,
  onClientChange,
  onDateFromChange,
  onDateToChange,
}: {
  clients: Client[];
  name: string;
  clientId: string;
  dateFrom: string;
  dateTo: string;
  onBack: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onNameChange: (value: string) => void;
  onClientChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}) {
  return (
    <div className="uikit-form-shell">
      <PageCard>
        <BackButton onClick={onBack} />
        <h1>Новый расчетный период</h1>
        <form className="form-panel inner-form" onSubmit={onSubmit}>
          <label>
            Название
            <input value={name} onChange={(event) => onNameChange(event.target.value)} placeholder="Май 2026" />
          </label>
          <Select
            label="Клиент"
            placeholder=" "
            value={clientId ? Number(clientId) : undefined}
            options={clients.map((client) => ({ value: client.id, label: client.name }))}
            onChange={(value) => onClientChange(value ? String(value) : "")}
          />
          <label>
            Дата с
            <input type="date" value={dateFrom} onChange={(event) => onDateFromChange(event.target.value)} required />
          </label>
          <label>
            Дата по
            <input type="date" value={dateTo} onChange={(event) => onDateToChange(event.target.value)} required />
          </label>
          <SubmitButton label="Создать период" />
        </form>
      </PageCard>
    </div>
  );
}

function BillingPeriodDetailsPage({
  period,
  onBack,
  onOpenAccrual,
}: {
  period: BillingPeriod | null;
  onBack: () => void;
  onOpenAccrual: (accrual: BillingAccrual) => void;
}) {
  if (!period) {
    return <NotSelected title="Расчетный период не выбран" onBack={onBack} />;
  }

  return (
    <section className="details-panel">
      <BackButton onClick={onBack} />
      <h1>{period.name}</h1>
      <div className="details-grid">
        <DetailItem label="Клиент" value={period.clientName ?? "-"} />
        <DetailItem label="Дата с" value={formatDate(period.dateFrom)} />
        <DetailItem label="Дата по" value={formatDate(period.dateTo)} />
        <DetailItem label="Статус" value={billingPeriodStatusLabel(period.status)} />
      </div>

      <h2>Начисления</h2>
      <OrdersTable columns={["Клиент", "Количество услуг", "Сумма", "Статус"]}>
        {(period.accruals ?? []).map((accrual) => (
          <tr className="clickable-row" key={accrual.id} onClick={() => onOpenAccrual(accrual)}>
            <td>{accrual.clientName}</td>
            <td>{formatQuantity(accrual.quantity)}</td>
            <td>{formatMoney(accrual.amount)}</td>
            <td>{billingAccrualStatusLabel(accrual.status)}</td>
          </tr>
        ))}
        {(period.accruals ?? []).length === 0 && <EmptyRow colSpan={4} text="Начислений по периоду пока нет" />}
      </OrdersTable>
    </section>
  );
}

function BillingAccrualsPage({
  accruals,
  isLoading,
  onOpen,
}: {
  accruals: BillingAccrual[];
  isLoading: boolean;
  onOpen: (accrual: BillingAccrual) => void;
}) {
  return (
    <>
      <PageHead title="Реестр начислений" />

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Период", "Клиент", "Количество услуг", "Сумма", "Статус"]}>
            {accruals.map((accrual) => (
              <tr className="clickable-row" key={accrual.id} onClick={() => onOpen(accrual)}>
                <td>{accrual.billingPeriodName}</td>
                <td>{accrual.clientName}</td>
                <td>{formatQuantity(accrual.quantity)}</td>
                <td>{formatMoney(accrual.amount)}</td>
                <td>{billingAccrualStatusLabel(accrual.status)}</td>
              </tr>
            ))}
            {accruals.length === 0 && <EmptyRow colSpan={5} text={isLoading ? "Загрузка..." : "Начислений пока нет"} />}
          </OrdersTable>
        </PageCard>
      </div>
    </>
  );
}

function BillingAccrualDetailsPage({
  accrual,
  onBack,
}: {
  accrual: BillingAccrual | null;
  onBack: () => void;
}) {
  if (!accrual) {
    return <NotSelected title="Начисление не выбрано" onBack={onBack} />;
  }

  return (
    <section className="details-panel">
      <BackButton onClick={onBack} />
      <h1>Начисление</h1>
      <div className="details-grid">
        <DetailItem label="Период" value={accrual.billingPeriodName} />
        <DetailItem label="Клиент" value={accrual.clientName} />
        <DetailItem label="Количество услуг" value={formatQuantity(accrual.quantity)} />
        <DetailItem label="Сумма" value={formatMoney(accrual.amount)} />
        <DetailItem label="Статус" value={billingAccrualStatusLabel(accrual.status)} />
      </div>

      <h2>Операции в начислении</h2>
      <OrdersTable columns={["Дата", "КТК", "Услуга", "Количество", "Ед.", "Источник", "Статус"]}>
        {(accrual.sources ?? []).map((source) => (
          <tr key={source.id}>
            <td>{serviceExecutionPeriodLabel(source.serviceExecution)}</td>
            <td>{source.serviceExecution.containerNumber}</td>
            <td>{source.serviceExecution.serviceName}</td>
            <td>{source.serviceExecution.quantity}</td>
            <td>{source.serviceExecution.unit}</td>
            <td>{source.serviceExecution.sourceType}</td>
            <td>{serviceExecutionStatusLabel(source.serviceExecution.status)}</td>
          </tr>
        ))}
        {(accrual.sources ?? []).length === 0 && <EmptyRow colSpan={7} text="Оказанные услуги не загружены" />}
      </OrdersTable>
    </section>
  );
}

function BillingClientDetailsPage({
  client,
  orders,
  shippingOrders,
  ownerHistory,
  containers,
  billingDate,
  onBack,
}: {
  client: Client | null;
  orders: ReceivingOrder[];
  shippingOrders: ShippingOrder[];
  ownerHistory: ContainerOwnerHistory[];
  containers: Container[];
  billingDate: string;
  onBack: () => void;
}) {
  if (!client) {
    return <NotSelected title="Клиент не выбран" onBack={onBack} />;
  }

  const rows = billingRows(orders, shippingOrders, ownerHistory, containers, billingDate).filter((row) => row.clientId === client.id);
  const serviceSummaries = billingServiceSummaries(rows);
  const total = rows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <>
      <PageHead title={`Биллинг: ${client.name}`}>
        <UikitBackButton onClick={onBack} />
      </PageHead>

      <div className="uikit-table-card">
        <PageCard>
          <OrdersTable columns={["Услуга", "Тип", "Количество", "Начислено"]}>
            {serviceSummaries.map((service) => (
              <tr key={`${service.serviceName}-${service.serviceType}`}>
                <td>{service.serviceName}</td>
                <td>{service.serviceType}</td>
                <td>{service.quantity}</td>
                <td>{formatMoney(service.amount)}</td>
              </tr>
            ))}
            {serviceSummaries.length === 0 && <EmptyRow colSpan={4} text="У клиента пока нет начислений" />}
          </OrdersTable>
          <div className="billing-total">Итого по клиенту: {formatMoney(total)}</div>
        </PageCard>
      </div>
    </>
  );
}

function BillingOrderDetailsPage({
  order,
  shippingOrders,
  ownerHistory,
  containers,
  billingDate,
  onBack,
}: {
  order: ReceivingOrder | null;
  shippingOrders: ShippingOrder[];
  ownerHistory: ContainerOwnerHistory[];
  containers: Container[];
  billingDate: string;
  onBack: () => void;
}) {
  if (!order) {
    return <NotSelected title="Заявка не выбрана" onBack={onBack} />;
  }

  const rows = billingRows([order], shippingOrders, ownerHistory, containers, billingDate);
  const total = rows.reduce((sum, row) => sum + row.amount, 0);

  return (
    <>
      <PageHead title={`Биллинг по заявке ${order.number}`}>
        <UikitBackButton onClick={onBack} />
      </PageHead>

      <div className="uikit-details-card tos-details-card">
        <PageCard>
          <section className="uikit-details">
            <div className="detail-grid">
              <DetailItem label="Клиент" value={order.client.name} />
              <DetailItem label="Комплексная услуга" value={order.complexService?.name ?? "-"} />
              <DetailItem label="Статус заявки" value={receivingOrderStatusLabel(order.status)} />
              <DetailItem label="КТК" value={String(order.containers.length)} />
            </div>
          </section>
        </PageCard>
      </div>

      <div className="uikit-table-card billing-order-table">
        <PageCard>
          <OrdersTable columns={["КТК", "Услуга", "Тип", "Расчет", "Сумма"]}>
            {rows.map((row) => (
              <tr key={row.key}>
                <td>{row.containerNumber}</td>
                <td>{row.serviceName}</td>
                <td>{row.serviceType}</td>
                <td>{row.description}</td>
                <td>{formatMoney(row.amount)}</td>
              </tr>
            ))}
            {rows.length === 0 && <EmptyRow colSpan={5} text="По заявке пока нет начислений" />}
          </OrdersTable>
          <div className="billing-total">Итого по заявке: {formatMoney(total)}</div>
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
              <DetailItem label="Статус" value={shippingOrderStatusLabel(order.status)} />
              <DetailItem label="Плановая дата вывоза" value={formatDate(order.plannedShippingDate)} />
              <DetailItem label="Фактическая дата вывоза" value={order.actualShippingDate ? formatDate(order.actualShippingDate) : "-"} />
              <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
              <DetailItem label="Дата выполнения" value={order.completedAt ? formatDateTime(order.completedAt) : "-"} />
            </div>

            <h2>КТК в заявке</h2>
            <ContainerChips containers={order.containers.map((link) => link.container)} />
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
      <PageHead title={`Заявка на услугу ${order.number}`}>
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
          <DetailItem label="Тип" value={serviceRequestTypeLabel(order.requestType)} />
          <DetailItem label={order.requestType === "OWNER_CHANGE" ? "Дата начала владения" : "Дата оказания услуги"} value={formatDate(order.serviceDate)} />
          {order.requestType === "OWNER_CHANGE" && <DetailItem label="Новый владелец" value={order.newClient?.name ?? "-"} />}
          {order.requestType === "SERVICE" && <DetailItem label="Услуга" value={order.service?.name ?? "-"} />}
          <DetailItem label="Дата создания" value={formatDateTime(order.createdAt)} />
          <DetailItem label="Комментарий" value={order.comment || "-"} />
        </div>

        <h2>КТК в заявке</h2>
        <ContainerChips containers={order.containers} />
      </section>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UikitProvider>
      <App />
    </UikitProvider>
  </React.StrictMode>,
);
