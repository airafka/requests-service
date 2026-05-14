INSERT INTO service (name, service_type, cost)
SELECT 'Хранение КТК', 'CONTINUOUS', 0
WHERE NOT EXISTS (
    SELECT 1 FROM service WHERE lower(name) = lower('Хранение КТК')
);

CREATE TABLE IF NOT EXISTS tos_operation_fact (
    id BIGSERIAL PRIMARY KEY,
    external_id VARCHAR(180),
    operation_id BIGINT REFERENCES operation(id),
    operation_code VARCHAR(180) NOT NULL,
    container_id BIGINT REFERENCES container(id),
    container_number VARCHAR(32) NOT NULL,
    receiving_order_id BIGINT REFERENCES receiving_order(id),
    shipping_order_id BIGINT REFERENCES shipping_order(id),
    operation_time TIMESTAMP WITH TIME ZONE NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    status VARCHAR(32) NOT NULL DEFAULT 'RECEIVED',
    source_system VARCHAR(64) NOT NULL DEFAULT 'TOS',
    raw_payload JSONB,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_tos_operation_fact_external_id
    ON tos_operation_fact (external_id)
    WHERE external_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS ux_tos_operation_fact_natural_key
    ON tos_operation_fact (operation_code, container_number, operation_time, source_system)
    WHERE external_id IS NULL;

CREATE INDEX IF NOT EXISTS idx_tos_operation_fact_operation_time
    ON tos_operation_fact (operation_time);

CREATE INDEX IF NOT EXISTS idx_tos_operation_fact_container_number
    ON tos_operation_fact (container_number);

CREATE INDEX IF NOT EXISTS idx_tos_operation_fact_status
    ON tos_operation_fact (status);

CREATE TABLE IF NOT EXISTS container_storage_period (
    id BIGSERIAL PRIMARY KEY,
    container_id BIGINT NOT NULL REFERENCES container(id),
    container_number VARCHAR(32) NOT NULL,
    client_id BIGINT NOT NULL REFERENCES client(id),
    service_id BIGINT REFERENCES service(id),
    date_from DATE NOT NULL,
    date_to DATE,
    storage_days INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(32) NOT NULL DEFAULT 'ACTIVE',
    source_type VARCHAR(64) NOT NULL,
    source_id BIGINT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_container_storage_period_active
    ON container_storage_period (container_id)
    WHERE status = 'ACTIVE';

CREATE INDEX IF NOT EXISTS idx_container_storage_period_client
    ON container_storage_period (client_id);

CREATE INDEX IF NOT EXISTS idx_container_storage_period_status
    ON container_storage_period (status);

CREATE INDEX IF NOT EXISTS idx_container_storage_period_dates
    ON container_storage_period (date_from, date_to);

CREATE TABLE IF NOT EXISTS container_storage_daily_accrual (
    id BIGSERIAL PRIMARY KEY,
    storage_period_id BIGINT NOT NULL REFERENCES container_storage_period(id),
    container_id BIGINT NOT NULL REFERENCES container(id),
    container_number VARCHAR(32) NOT NULL,
    client_id BIGINT NOT NULL REFERENCES client(id),
    accrual_date DATE NOT NULL,
    service_id BIGINT REFERENCES service(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    source VARCHAR(32) NOT NULL DEFAULT 'SYSTEM',
    status VARCHAR(32) NOT NULL DEFAULT 'ACCRUED',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_container_storage_daily_accrual_period_day
    ON container_storage_daily_accrual (storage_period_id, accrual_date);

CREATE UNIQUE INDEX IF NOT EXISTS ux_container_storage_daily_accrual_business_day
    ON container_storage_daily_accrual (container_id, client_id, accrual_date, service_id)
    WHERE status = 'ACCRUED';

CREATE INDEX IF NOT EXISTS idx_container_storage_daily_accrual_date
    ON container_storage_daily_accrual (accrual_date);

CREATE INDEX IF NOT EXISTS idx_container_storage_daily_accrual_client
    ON container_storage_daily_accrual (client_id);
