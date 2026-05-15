CREATE TABLE IF NOT EXISTS service_execution (
    id BIGSERIAL PRIMARY KEY,
    client_id BIGINT NOT NULL REFERENCES client(id),
    container_id BIGINT NOT NULL REFERENCES container(id),
    container_number VARCHAR(32) NOT NULL,
    service_id BIGINT NOT NULL REFERENCES service(id),
    execution_type VARCHAR(32) NOT NULL,
    date_from DATE NOT NULL,
    date_to DATE,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL DEFAULT 'CONFIRMED',
    source_type VARCHAR(32) NOT NULL,
    basis_type VARCHAR(64) NOT NULL,
    basis_id BIGINT,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS ux_service_execution_business_source
    ON service_execution (source_type, basis_type, basis_id, service_id, container_id)
    WHERE basis_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_service_execution_date_from
    ON service_execution (date_from);

CREATE INDEX IF NOT EXISTS idx_service_execution_client
    ON service_execution (client_id);

CREATE INDEX IF NOT EXISTS idx_service_execution_container
    ON service_execution (container_id);

CREATE INDEX IF NOT EXISTS idx_service_execution_status
    ON service_execution (status);

CREATE TABLE IF NOT EXISTS service_execution_source (
    id BIGSERIAL PRIMARY KEY,
    service_execution_id BIGINT NOT NULL REFERENCES service_execution(id) ON DELETE CASCADE,
    source_type VARCHAR(64) NOT NULL,
    source_id BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT uq_service_execution_source UNIQUE (service_execution_id, source_type, source_id)
);

CREATE INDEX IF NOT EXISTS idx_service_execution_source_source
    ON service_execution_source (source_type, source_id);
