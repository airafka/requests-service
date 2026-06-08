export type Page =
  | "receiving-list"
  | "receiving-create"
  | "receiving-details"
  | "tos-list"
  | "tos-receiving-details"
  | "tos-shipping-details"
  | "tos-facts"
  | "billing-clients"
  | "billing-client-details"
  | "billing-order-details"
  | "billing-periods"
  | "billing-period-create"
  | "billing-period-details"
  | "billing-accruals"
  | "billing-accrual-details"
  | "storage-periods"
  | "service-executions"
  | "service-execution-details"
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

export type Client = {
  id: number;
  name: string;
};

export type Container = {
  id: number;
  number: string;
};

export type ReceivingOrderStatus = "DRAFT" | "CONFIRMED" | "COMPLETED";
export type ReceivingOrderContainerStatus = "IN_PROGRESS" | "FINISHED";

export type ReceivingOrderContainer = {
  id: number;
  status: ReceivingOrderContainerStatus;
  finishedAt: string | null;
  container: Container;
  serviceExecutions: BillingServiceExecution[];
};

export type ReceivingOrder = {
  id: number;
  number: string;
  client: Client;
  complexService: ComplexService | null;
  createdAt: string;
  plannedReceivingDate: string;
  actualReceivingDate: string | null;
  status: ReceivingOrderStatus;
  containers: ReceivingOrderContainer[];
};

export type ShippingOrderStatus = "CONFIRMED" | "COMPLETED";
export type ShippingOrderContainerStatus = "IN_PROGRESS" | "FINISHED";

export type ShippingOrderContainer = {
  id: number;
  status: ShippingOrderContainerStatus;
  finishedAt: string | null;
  container: Container;
};

export type ShippingOrder = {
  id: number;
  number: string;
  client: Client;
  createdAt: string;
  plannedShippingDate: string;
  actualShippingDate: string | null;
  status: ShippingOrderStatus;
  completedAt: string | null;
  containers: ShippingOrderContainer[];
};

export type OwnerChangeOrder = {
  id: number;
  number: string;
  requestType: "OWNER_CHANGE" | "SERVICE";
  service: BillingService | null;
  serviceDate: string;
  newClient: Client | null;
  comment: string | null;
  createdAt: string;
  createdBy: string | null;
  completedAt: string | null;
  completedBy: string | null;
  containers: Container[];
};

export type ContainerOwnerHistory = {
  id: number;
  containerId: number;
  client: Client;
  operationType: "RECEIVING" | "SHIPPING" | "OWNER_CHANGE";
  sourceId: number;
  sourceOrderId: number | null;
  sourceNumber: string | null;
  sourceLabel: string | null;
  validFrom: string;
  validTo: string | null;
  storageDays: number;
  createdAt: string;
  createdBy: string | null;
};

export type CurrentContainerOwner = {
  container: Container;
  client: Client;
  validFrom: string;
  operationType: ContainerOwnerHistory["operationType"];
  sourceId: number;
  storageDays: number;
};

export type BillingOperation = {
  id: number;
  name: string;
};

export type BillingServiceType = "ONE_TIME" | "CONTINUOUS";

export type BillingService = {
  id: number;
  name: string;
  serviceType: BillingServiceType;
  cost: number;
  operations: BillingOperation[];
};

export type ComplexServiceItem = {
  id: number;
  service: BillingService;
  operationCount: number | null;
  durationDays: number | null;
};

export type ComplexService = {
  id: number;
  name: string;
  coefficient: number;
  amountPerContainer: number;
  items: ComplexServiceItem[];
};

export type BillingServiceExecution = {
  id: number;
  service: BillingService;
  quantity: number;
  amount: number;
  source: "TOS" | "SYSTEM";
  performedAt: string;
};

export type TosOperationFact = {
  id: number;
  externalId: string | null;
  operationId: number | null;
  operationName: string | null;
  operationCode: string;
  containerId: number | null;
  containerNumber: string;
  receivingOrderId: number | null;
  shippingOrderId: number | null;
  operationTime: string;
  quantity: number;
  status: "RECEIVED" | "PROCESSED" | "ERROR" | "CANCELLED";
  sourceSystem: string;
  rawPayload: unknown;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ContainerStoragePeriod = {
  id: number;
  containerId: number;
  containerNumber: string;
  clientId: number;
  clientName: string;
  serviceId: number | null;
  serviceName: string | null;
  ownerHistoryId: number | null;
  dateFrom: string;
  dateTo: string | null;
  storageDays: number;
  status: "ACTIVE" | "CLOSED" | "CANCELLED";
  sourceType: "RECEIVING_ORDER" | "OWNER_CHANGE_ORDER" | "SYSTEM";
  sourceId: number | null;
  createdAt: string;
  updatedAt: string;
};

export type ServiceExecutionType = "ONE_TIME" | "CONTINUOUS";
export type ServiceExecutionStatus = "DRAFT" | "IN_PROGRESS" | "CONFIRMED" | "CANCELLED" | "ERROR";
export type ServiceExecutionSourceType = "TOS" | "SYSTEM" | "MANUAL";
export type ServiceExecutionBasisType =
  | "TOS_OPERATION_FACT"
  | "STORAGE_PERIOD"
  | "CONTAINER_STORAGE_PERIOD"
  | "RECEIVING_ORDER"
  | "SHIPPING_ORDER"
  | "OWNER_CHANGE_ORDER"
  | "SERVICE_REQUEST"
  | "SYSTEM";
export type ServiceExecutionFactSourceType =
  | "TOS_OPERATION_FACT"
  | "STORAGE_PERIOD"
  | "SERVICE_REQUEST"
  | "SYSTEM";

export type ServiceExecutionSource = {
  id: number;
  sourceType: ServiceExecutionFactSourceType;
  sourceId: number;
  createdAt: string;
  tosOperationFact: TosOperationFact | null;
  storagePeriod: ContainerStoragePeriod | null;
};

export type ServiceExecution = {
  id: number;
  clientId: number;
  clientName: string;
  containerId: number;
  containerNumber: string;
  serviceId: number;
  serviceName: string;
  executionType: ServiceExecutionType;
  dateFrom: string;
  dateTo: string | null;
  quantity: number;
  unit: string;
  sourceType: ServiceExecutionSourceType;
  basisType: ServiceExecutionBasisType;
  basisId: number | null;
  status: ServiceExecutionStatus;
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  sources: ServiceExecutionSource[] | null;
};

export type BillingPeriodStatus = "DRAFT" | "CALCULATED" | "CLOSED" | "CANCELLED";
export type BillingAccrualStatus = "CALCULATED" | "CANCELLED";

export type BillingPeriod = {
  id: number;
  name: string;
  dateFrom: string;
  dateTo: string;
  clientId: number | null;
  clientName: string | null;
  status: BillingPeriodStatus;
  createdAt: string;
  updatedAt: string;
  accruals: BillingAccrual[] | null;
};

export type BillingAccrualSource = {
  id: number;
  serviceExecutionId: number;
  createdAt: string;
  serviceExecution: ServiceExecution;
};

export type BillingAccrual = {
  id: number;
  billingPeriodId: number;
  billingPeriodName: string;
  clientId: number;
  clientName: string;
  serviceId: number | null;
  serviceName: string | null;
  tariffId: number | null;
  tariffName: string | null;
  quantity: number;
  unit: string;
  unitPrice: number;
  amount: number;
  status: BillingAccrualStatus;
  createdAt: string;
  updatedAt: string;
  sources: BillingAccrualSource[] | null;
};

export type ComplexServiceFormItem = {
  serviceId: string;
  operationCount: string;
  durationDays: string;
};
