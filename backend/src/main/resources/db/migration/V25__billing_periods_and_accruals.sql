CREATE TABLE IF NOT EXISTS tariff (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE,
    cost NUMERIC(14, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tariff_service (
    tariff_id BIGINT NOT NULL REFERENCES tariff(id) ON DELETE CASCADE,
    service_id BIGINT NOT NULL REFERENCES service(id),
    PRIMARY KEY (tariff_id, service_id)
);

CREATE INDEX IF NOT EXISTS idx_tariff_service_service_id
    ON tariff_service(service_id);

INSERT INTO tariff (name, cost)
SELECT 'Базовый тариф - ' || service.name, service.cost
FROM service
WHERE NOT EXISTS (
    SELECT 1 FROM tariff WHERE tariff.name = 'Базовый тариф - ' || service.name
);

INSERT INTO tariff_service (tariff_id, service_id)
SELECT tariff.id, service.id
FROM service
JOIN tariff ON tariff.name = 'Базовый тариф - ' || service.name
ON CONFLICT DO NOTHING;

CREATE TABLE IF NOT EXISTS billing_period (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL,
    date_from DATE NOT NULL,
    date_to DATE NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'DRAFT',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT chk_billing_period_dates CHECK (date_from <= date_to)
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_billing_period_active_dates
    ON billing_period (date_from, date_to)
    WHERE status <> 'CANCELLED';

CREATE INDEX IF NOT EXISTS idx_billing_period_status
    ON billing_period(status);

CREATE TABLE IF NOT EXISTS billing_accrual (
    id BIGSERIAL PRIMARY KEY,
    billing_period_id BIGINT NOT NULL REFERENCES billing_period(id),
    client_id BIGINT NOT NULL REFERENCES client(id),
    service_id BIGINT NOT NULL REFERENCES service(id),
    tariff_id BIGINT NOT NULL REFERENCES tariff(id),
    quantity NUMERIC(14, 3) NOT NULL,
    unit VARCHAR(64) NOT NULL,
    unit_price NUMERIC(14, 2) NOT NULL,
    amount NUMERIC(14, 2) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'CALCULATED',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_billing_accrual_period
    ON billing_accrual(billing_period_id);

CREATE INDEX IF NOT EXISTS idx_billing_accrual_client
    ON billing_accrual(client_id);

CREATE TABLE IF NOT EXISTS billing_accrual_source (
    id BIGSERIAL PRIMARY KEY,
    billing_accrual_id BIGINT NOT NULL REFERENCES billing_accrual(id) ON DELETE CASCADE,
    billing_period_id BIGINT NOT NULL REFERENCES billing_period(id),
    service_execution_id BIGINT NOT NULL REFERENCES service_execution(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT uq_billing_accrual_source UNIQUE (billing_accrual_id, service_execution_id),
    CONSTRAINT uq_billing_period_service_execution UNIQUE (billing_period_id, service_execution_id)
);

CREATE INDEX IF NOT EXISTS idx_billing_accrual_source_execution
    ON billing_accrual_source(service_execution_id);
