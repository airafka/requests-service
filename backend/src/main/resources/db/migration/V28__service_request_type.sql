ALTER TABLE container_owner_change_order
    ADD COLUMN IF NOT EXISTS request_type VARCHAR(32) NOT NULL DEFAULT 'OWNER_CHANGE',
    ADD COLUMN IF NOT EXISTS service_id BIGINT REFERENCES service(id);

ALTER TABLE container_owner_change_order
    ALTER COLUMN new_client_id DROP NOT NULL;

CREATE INDEX IF NOT EXISTS idx_container_owner_change_order_service_id
    ON container_owner_change_order(service_id);
