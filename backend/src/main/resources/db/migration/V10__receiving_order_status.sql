ALTER TABLE receiving_order
    ADD COLUMN IF NOT EXISTS status VARCHAR(32) NOT NULL DEFAULT 'DRAFT';

CREATE INDEX IF NOT EXISTS idx_receiving_order_status
    ON receiving_order(status);
