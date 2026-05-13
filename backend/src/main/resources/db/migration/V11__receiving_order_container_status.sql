ALTER TABLE receiving_order_container
    ADD COLUMN IF NOT EXISTS status VARCHAR(32) NOT NULL DEFAULT 'IN_PROGRESS';

CREATE INDEX IF NOT EXISTS idx_receiving_order_container_status
    ON receiving_order_container(status);
