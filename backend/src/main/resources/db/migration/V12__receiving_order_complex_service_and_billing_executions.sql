ALTER TABLE receiving_order
    ADD COLUMN IF NOT EXISTS complex_service_id BIGINT REFERENCES complex_service(id);

CREATE INDEX IF NOT EXISTS idx_receiving_order_complex_service_id
    ON receiving_order(complex_service_id);

CREATE TABLE IF NOT EXISTS billing_service_execution (
    id BIGSERIAL PRIMARY KEY,
    receiving_order_id BIGINT NOT NULL REFERENCES receiving_order(id) ON DELETE CASCADE,
    receiving_order_container_id BIGINT NOT NULL REFERENCES receiving_order_container(id) ON DELETE CASCADE,
    container_id BIGINT NOT NULL REFERENCES container(id),
    complex_service_id BIGINT NOT NULL REFERENCES complex_service(id),
    service_id BIGINT NOT NULL REFERENCES service(id),
    quantity INTEGER NOT NULL,
    amount NUMERIC(14,2) NOT NULL,
    source VARCHAR(32) NOT NULL,
    performed_at TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT uq_billing_service_execution_once UNIQUE (receiving_order_container_id, service_id)
);

CREATE INDEX IF NOT EXISTS idx_billing_service_execution_receiving_order_id
    ON billing_service_execution(receiving_order_id);

CREATE INDEX IF NOT EXISTS idx_billing_service_execution_container_id
    ON billing_service_execution(container_id);
