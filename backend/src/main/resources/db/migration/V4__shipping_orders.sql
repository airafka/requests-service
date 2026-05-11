CREATE TABLE IF NOT EXISTS shipping_order (
    id BIGSERIAL PRIMARY KEY,
    number VARCHAR(64) NOT NULL UNIQUE,
    client_id BIGINT NOT NULL REFERENCES client(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS shipping_order_container (
    id BIGSERIAL PRIMARY KEY,
    shipping_order_id BIGINT NOT NULL REFERENCES shipping_order(id) ON DELETE CASCADE,
    container_id BIGINT NOT NULL REFERENCES container(id),
    CONSTRAINT shipping_order_container_unique UNIQUE (shipping_order_id, container_id)
);

COMMENT ON COLUMN container_owner_history.source_id IS
    'Polymorphic operation source: RECEIVING means receiving_order_container.id; SHIPPING means shipping_order_container.id; OWNER_CHANGE means container_owner_change_order.id.';

CREATE INDEX IF NOT EXISTS idx_shipping_order_client_id
    ON shipping_order(client_id);

CREATE INDEX IF NOT EXISTS idx_shipping_order_created_at
    ON shipping_order(created_at);

CREATE INDEX IF NOT EXISTS idx_shipping_order_container_order_id
    ON shipping_order_container(shipping_order_id);

CREATE INDEX IF NOT EXISTS idx_shipping_order_container_container_id
    ON shipping_order_container(container_id);
