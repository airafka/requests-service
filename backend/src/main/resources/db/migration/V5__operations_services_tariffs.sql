CREATE TABLE IF NOT EXISTS operation (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS service (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE,
    service_type VARCHAR(32) NOT NULL
);

CREATE TABLE IF NOT EXISTS service_operation (
    service_id BIGINT NOT NULL REFERENCES service(id) ON DELETE CASCADE,
    operation_id BIGINT NOT NULL REFERENCES operation(id),
    PRIMARY KEY (service_id, operation_id)
);

CREATE TABLE IF NOT EXISTS tariff (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE,
    cost NUMERIC(14, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS tariff_service (
    tariff_id BIGINT NOT NULL REFERENCES tariff(id) ON DELETE CASCADE,
    service_id BIGINT NOT NULL REFERENCES service(id),
    PRIMARY KEY (tariff_id, service_id)
);

CREATE INDEX IF NOT EXISTS idx_service_operation_operation_id
    ON service_operation(operation_id);

CREATE INDEX IF NOT EXISTS idx_tariff_service_service_id
    ON tariff_service(service_id);
