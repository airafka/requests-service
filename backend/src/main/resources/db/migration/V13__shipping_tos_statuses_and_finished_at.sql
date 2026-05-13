ALTER TABLE receiving_order_container
    ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE shipping_order
    ADD COLUMN IF NOT EXISTS status VARCHAR(32) NOT NULL DEFAULT 'CONFIRMED',
    ADD COLUMN IF NOT EXISTS completed_at TIMESTAMP WITH TIME ZONE;

ALTER TABLE shipping_order_container
    ADD COLUMN IF NOT EXISTS status VARCHAR(32) NOT NULL DEFAULT 'IN_PROGRESS',
    ADD COLUMN IF NOT EXISTS finished_at TIMESTAMP WITH TIME ZONE;

CREATE INDEX IF NOT EXISTS idx_shipping_order_status
    ON shipping_order(status);

CREATE INDEX IF NOT EXISTS idx_shipping_order_container_status
    ON shipping_order_container(status);
