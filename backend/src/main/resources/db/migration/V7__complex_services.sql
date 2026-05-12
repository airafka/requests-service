CREATE TABLE IF NOT EXISTS complex_service (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS complex_service_item (
    id BIGSERIAL PRIMARY KEY,
    complex_service_id BIGINT NOT NULL REFERENCES complex_service(id) ON DELETE CASCADE,
    service_id BIGINT NOT NULL REFERENCES service(id),
    operation_count INTEGER,
    duration_days INTEGER,
    CONSTRAINT uq_complex_service_item_service UNIQUE (complex_service_id, service_id),
    CONSTRAINT chk_complex_service_item_operation_count CHECK (operation_count IS NULL OR operation_count > 0),
    CONSTRAINT chk_complex_service_item_duration_days CHECK (duration_days IS NULL OR duration_days > 0)
);

CREATE INDEX IF NOT EXISTS idx_complex_service_item_service_id
    ON complex_service_item(service_id);
