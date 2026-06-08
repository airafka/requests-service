import type {
  BillingAccrualStatus,
  BillingService,
  BillingServiceType,
  ComplexServiceFormItem,
  ComplexServiceItem,
  Container,
  ContainerOwnerHistory,
  ContainerStoragePeriod,
  OwnerChangeOrder,
  ReceivingOrder,
  ReceivingOrderContainerStatus,
  ReceivingOrderStatus,
  ServiceExecution,
  ServiceExecutionBasisType,
  ServiceExecutionSource,
  ServiceExecutionStatus,
  ServiceExecutionType,
  ShippingOrder,
  ShippingOrderContainerStatus,
  ShippingOrderStatus,
  TosOperationFact,
} from "./domain";

export function formatDateTime(value: string) {
  return new Date(value).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDate(value: string) {
  if (!value) {
    return "-";
  }

  return new Date(`${value}T00:00:00`).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function datePart(value: string) {
  return value.includes("T") ? value.slice(0, 10) : value;
}

export function todayLocalDate() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export function datesBetweenExclusiveStart(start: string, end: string) {
  if (!start || !end) {
    return [];
  }

  const startDate = localDateOnly(start);
  const endDate = localDateOnly(end);
  if (endDate.getTime() <= startDate.getTime()) {
    return [];
  }

  const dates: string[] = [];
  const currentDate = addDays(startDate, 1);
  while (currentDate.getTime() <= endDate.getTime()) {
    dates.push(toLocalDateInputValue(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export function datesBetweenInclusive(start: string, end: string) {
  if (!start || !end) {
    return [];
  }

  const startDate = localDateOnly(start);
  const endDate = localDateOnly(end);
  if (endDate.getTime() < startDate.getTime()) {
    return [];
  }

  const dates: string[] = [];
  const currentDate = new Date(startDate);
  while (currentDate.getTime() <= endDate.getTime()) {
    dates.push(toLocalDateInputValue(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dates;
}

export function isDateBefore(left: string, right: string) {
  if (!left || !right) {
    return false;
  }

  return localDateOnly(left).getTime() < localDateOnly(right).getTime();
}

function toLocalDateInputValue(value: Date) {
  const offset = value.getTimezoneOffset() * 60000;
  return new Date(value.getTime() - offset).toISOString().slice(0, 10);
}

export function storageDaysForOwner(owner: ContainerOwnerHistory, billingDate: string) {
  if (!billingDate) {
    return 0;
  }

  const start = localDateOnly(owner.validFrom);
  const billing = localDateOnly(billingDate);
  const rawEnd = owner.validTo ? addDays(localDateOnly(owner.validTo), -1) : billing;
  const end = rawEnd.getTime() > billing.getTime() ? billing : rawEnd;

  if (end.getTime() < start.getTime()) {
    return 0;
  }

  return daysBetween(start, end) + 1;
}

export function storageDaysForPeriod(period: ContainerStoragePeriod, billingDate: string) {
  if (!billingDate) {
    return period.storageDays;
  }

  const start = localDateOnly(period.dateFrom);
  const billing = localDateOnly(billingDate);
  const rawEnd = period.dateTo ? addDays(localDateOnly(period.dateTo), -1) : billing;
  const end = rawEnd.getTime() > billing.getTime() ? billing : rawEnd;

  if (end.getTime() < start.getTime()) {
    return 0;
  }

  return daysBetween(start, end) + 1;
}

function localDateOnly(value: string) {
  return new Date(`${datePart(value)}T00:00:00`);
}

function addDays(value: Date, days: number) {
  const next = new Date(value);
  next.setDate(next.getDate() + days);
  return next;
}

function daysBetween(start: Date, end: Date) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  return Math.floor((end.getTime() - start.getTime()) / millisecondsPerDay);
}

export function receivingOrderStatusLabel(status: ReceivingOrderStatus) {
  switch (status) {
    case "DRAFT":
      return "Черновик";
    case "CONFIRMED":
      return "Подтверждена";
    case "COMPLETED":
      return "Выполнена";
  }
}

export function tosOrderStatusLabel(order: ReceivingOrder) {
  if (order.status === "COMPLETED") {
    return "Выполнена";
  }

  return "На выполнение";
}

export function receivingOrderContainerStatusLabel(status: ReceivingOrderContainerStatus) {
  switch (status) {
    case "IN_PROGRESS":
      return "На выполнение";
    case "FINISHED":
      return "Принят";
  }
}

export function shippingOrderStatusLabel(status: ShippingOrderStatus) {
  switch (status) {
    case "CONFIRMED":
      return "На выполнение";
    case "COMPLETED":
      return "Выполнена";
  }
}

export function shippingOrderContainerStatusLabel(status: ShippingOrderContainerStatus) {
  switch (status) {
    case "IN_PROGRESS":
      return "На выполнение";
    case "FINISHED":
      return "Вывезен";
  }
}

export function tosFactStatusLabel(status: TosOperationFact["status"]) {
  switch (status) {
    case "RECEIVED":
      return "Получено";
    case "PROCESSED":
      return "Обработано";
    case "ERROR":
      return "Ошибка";
    case "CANCELLED":
      return "Отменено";
  }
}

export function storagePeriodStatusLabel(status: ContainerStoragePeriod["status"]) {
  switch (status) {
    case "ACTIVE":
      return "Активно";
    case "CLOSED":
      return "Закрыто";
    case "CANCELLED":
      return "Отменено";
  }
}

export function storageSourceTypeLabel(sourceType: ContainerStoragePeriod["sourceType"]) {
  switch (sourceType) {
    case "RECEIVING_ORDER":
      return "Поставка";
    case "OWNER_CHANGE_ORDER":
      return "Смена владельца";
    case "SYSTEM":
      return "Система";
  }
}

export function serviceExecutionPeriodLabel(execution: ServiceExecution) {
  if (!execution.dateTo || execution.dateFrom === execution.dateTo) {
    return formatDate(execution.dateFrom);
  }

  return `${formatDate(execution.dateFrom)} - ${formatDate(execution.dateTo)}`;
}

export function serviceExecutionTypeLabel(type: ServiceExecutionType) {
  switch (type) {
    case "ONE_TIME":
      return "Разовая";
    case "CONTINUOUS":
      return "Продолжительная";
  }
}

export function serviceExecutionStatusLabel(status: ServiceExecutionStatus) {
  switch (status) {
    case "DRAFT":
      return "Черновик";
    case "IN_PROGRESS":
      return "В процессе";
    case "CONFIRMED":
      return "Оказана";
    case "CANCELLED":
      return "Отменена";
    case "ERROR":
      return "Ошибка";
  }
}

export function billingPeriodStatusLabel(status: "DRAFT" | "CALCULATED" | "CLOSED" | "CANCELLED") {
  switch (status) {
    case "DRAFT":
      return "Черновик";
    case "CALCULATED":
      return "Рассчитан";
    case "CLOSED":
      return "Закрыт";
    case "CANCELLED":
      return "Отменен";
  }
}

export function billingAccrualStatusLabel(status: BillingAccrualStatus) {
  switch (status) {
    case "CALCULATED":
      return "Рассчитано";
    case "CANCELLED":
      return "Отменено";
  }
}

export function serviceRequestTypeLabel(type: OwnerChangeOrder["requestType"]) {
  switch (type) {
    case "OWNER_CHANGE":
      return "Смена владельца";
    case "SERVICE":
      return "Оказание услуги";
  }
}

export function basisLabel(basisType: ServiceExecutionBasisType, basisId: number | null) {
  return `${basisType}${basisId == null ? "" : ` #${basisId}`}`;
}

export function serviceExecutionSourceDetails(source: ServiceExecutionSource) {
  if (source.tosOperationFact) {
    const fact = source.tosOperationFact;
    return `${fact.operationCode}, ${formatDateTime(fact.operationTime)}, raw: ${rawPayloadText(fact.rawPayload)}`;
  }

  if (source.storagePeriod) {
    const period = source.storagePeriod;
    return `${formatDate(period.dateFrom)} - ${period.dateTo ? formatDate(period.dateTo) : "активно"}, ${period.storageDays} сут.`;
  }

  return "-";
}

export function rawPayloadText(rawPayload: unknown) {
  if (rawPayload == null) {
    return "-";
  }

  if (typeof rawPayload === "string") {
    return rawPayload;
  }

  return JSON.stringify(rawPayload);
}

export function storagePeriodForOwnerHistory(
  history: ContainerOwnerHistory,
  storagePeriods: ContainerStoragePeriod[],
) {
  return storagePeriods.find((period) => period.ownerHistoryId === history.id) ?? null;
}

export function oneTimeComplexServiceItems(order: ReceivingOrder) {
  return order.complexService?.items.filter((item) => item.service.serviceType === "ONE_TIME") ?? [];
}

export function continuousComplexServiceItems(order: ReceivingOrder) {
  return order.complexService?.items.filter((item) => item.service.serviceType === "CONTINUOUS") ?? [];
}

export type BillingRow = {
  key: string;
  clientId: number;
  clientName: string;
  orderId: number;
  orderNumber: string;
  containerId: number;
  containerNumber: string;
  serviceName: string;
  serviceType: string;
  quantity: number;
  description: string;
  amount: number;
};

export function billingRows(
  orders: ReceivingOrder[],
  shippingOrders: ShippingOrder[],
  ownerHistory: ContainerOwnerHistory[],
  containers: Container[],
  billingDate: string,
): BillingRow[] {
  const rows: BillingRow[] = [];
  void shippingOrders;

  for (const order of orders) {
    for (const link of order.containers) {
      for (const execution of link.serviceExecutions) {
        rows.push({
          key: `execution-${execution.id}`,
          clientId: order.client.id,
          clientName: order.client.name,
          orderId: order.id,
          orderNumber: order.number,
          containerId: link.container.id,
          containerNumber: link.container.number,
          serviceName: execution.service.name,
          serviceType: serviceTypeLabel(execution.service.serviceType),
          quantity: execution.quantity,
          description: `${execution.quantity} оп. × ${formatMoney(execution.service.cost)} × ${order.complexService?.coefficient ?? 1}`,
          amount: execution.amount,
        });
      }
    }
  }

  for (const owner of ownerHistory) {
    const storageDays = storageDaysForOwner(owner, billingDate);
    if (storageDays === 0) {
      continue;
    }

    const container = containers.find((currentContainer) => currentContainer.id === owner.containerId);
    const sourceOrder = latestReceivingOrderForContainer(orders, owner.containerId);
    if (!container || !sourceOrder) {
      continue;
    }

    for (const item of continuousComplexServiceItems(sourceOrder)) {
      const graceDays = Math.min(storageDays, item.durationDays ?? 0);
      const fullPriceDays = Math.max(storageDays - (item.durationDays ?? 0), 0);
      const coefficient = owner.operationType === "RECEIVING" ? sourceOrder.complexService?.coefficient ?? 1 : 1;
      const amount =
        owner.operationType === "RECEIVING"
          ? graceDays * item.service.cost * coefficient + fullPriceDays * item.service.cost
          : storageDays * item.service.cost;
      const description =
        owner.operationType === "RECEIVING"
          ? `${graceDays} льготн. дн. × ${formatMoney(item.service.cost)} × ${coefficient} + ${fullPriceDays} дн. × ${formatMoney(item.service.cost)}`
          : `${storageDays} дн. × ${formatMoney(item.service.cost)}`;

      rows.push({
        key: `storage-${owner.containerId}-${item.service.id}-${owner.validFrom}-${storageDays}`,
        clientId: owner.client.id,
        clientName: owner.client.name,
        orderId: sourceOrder.id,
        orderNumber: sourceOrder.number,
        containerId: owner.containerId,
        containerNumber: container.number,
        serviceName: item.service.name,
        serviceType: serviceTypeLabel(item.service.serviceType),
        quantity: storageDays,
        description,
        amount,
      });
    }
  }

  return rows;
}

function latestReceivingOrderForContainer(orders: ReceivingOrder[], containerId: number) {
  return orders
    .filter((order) => order.containers.some((link) => link.container.id === containerId))
    .sort((left, right) => new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime())[0];
}

export type BillingClientSummary = {
  clientId: number;
  clientName: string;
  orderCount: number;
  serviceCount: number;
  amount: number;
};

export function billingClientSummaries(orders: ReceivingOrder[], rows: BillingRow[]): BillingClientSummary[] {
  const summaries = new Map<number, BillingClientSummary>();

  for (const row of rows) {
    const summary =
      summaries.get(row.clientId) ??
      {
        clientId: row.clientId,
        clientName: row.clientName,
        orderCount: 0,
        serviceCount: 0,
        amount: 0,
      };
    summary.amount += row.amount;
    summaries.set(row.clientId, summary);
  }

  for (const summary of summaries.values()) {
    const clientOrders = orders.filter((order) => order.client.id === summary.clientId);
    summary.orderCount = clientOrders.length;
    summary.serviceCount = rows
      .filter((row) => row.clientId === summary.clientId)
      .reduce((count, row) => count + row.quantity, 0);
  }

  return [...summaries.values()].sort((left, right) => left.clientName.localeCompare(right.clientName, "ru"));
}

export type BillingOrderSummary = {
  orderId: number;
  orderNumber: string;
  complexServiceName: string;
  status: ReceivingOrderStatus;
  serviceCount: number;
  amount: number;
};

export type BillingServiceSummary = {
  serviceName: string;
  serviceType: string;
  quantity: number;
  amount: number;
};

export function billingServiceSummaries(rows: BillingRow[]): BillingServiceSummary[] {
  const summaries = new Map<string, BillingServiceSummary>();

  for (const row of rows) {
    const key = `${row.serviceName}-${row.serviceType}`;
    const summary =
      summaries.get(key) ??
      {
        serviceName: row.serviceName,
        serviceType: row.serviceType,
        quantity: 0,
        amount: 0,
      };
    summary.quantity += row.quantity;
    summary.amount += row.amount;
    summaries.set(key, summary);
  }

  return [...summaries.values()].sort((left, right) => left.serviceName.localeCompare(right.serviceName, "ru"));
}

export function billingOrderSummaries(orders: ReceivingOrder[], rows: BillingRow[]): BillingOrderSummary[] {
  return orders
    .map((order) => ({
      orderId: order.id,
      orderNumber: order.number,
      complexServiceName: order.complexService?.name ?? "-",
      status: order.status,
      serviceCount: rows
        .filter((row) => row.orderId === order.id)
        .reduce((count, row) => count + row.quantity, 0),
      amount: rows
        .filter((row) => row.orderId === order.id)
        .reduce((sum, row) => sum + row.amount, 0),
    }))
    .filter((order) => order.amount > 0)
    .sort((left, right) => right.orderNumber.localeCompare(left.orderNumber, "ru", { numeric: true }));
}

export function operationLabel(operationType: ContainerOwnerHistory["operationType"]) {
  switch (operationType) {
    case "RECEIVING":
      return "Поставка";
    case "SHIPPING":
      return "Вывоз";
    case "OWNER_CHANGE":
      return "Смена владельца";
  }
}

export function serviceTypeLabel(serviceType: BillingServiceType) {
  switch (serviceType) {
    case "ONE_TIME":
      return "Единоразовая";
    case "CONTINUOUS":
      return "Продолжительная";
  }
}

export function complexServiceItemValue(item: ComplexServiceItem) {
  if (item.service.serviceType === "ONE_TIME") {
    return `${item.operationCount ?? 0} оп.`;
  }

  return `${item.durationDays ?? 0} дн.`;
}

export function calculateComplexServiceAmount(
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

export function formatCoefficient(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(value);
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatQuantity(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
  }).format(value);
}
