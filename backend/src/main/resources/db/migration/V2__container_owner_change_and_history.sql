CREATE TABLE IF NOT EXISTS container_owner_change_order (
    id BIGSERIAL PRIMARY KEY,
    number VARCHAR(64) NOT NULL UNIQUE,
    new_client_id BIGINT NOT NULL REFERENCES client(id),
    status VARCHAR(32) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by VARCHAR(180),
    completed_at TIMESTAMP WITH TIME ZONE,
    completed_by VARCHAR(180)
);

CREATE TABLE IF NOT EXISTS container_owner_change_order_container (
    id BIGSERIAL PRIMARY KEY,
    owner_change_order_id BIGINT NOT NULL REFERENCES container_owner_change_order(id) ON DELETE CASCADE,
    container_id BIGINT NOT NULL REFERENCES container(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    CONSTRAINT container_owner_change_order_container_unique UNIQUE (owner_change_order_id, container_id)
);

CREATE TABLE IF NOT EXISTS container_owner_history (
    id BIGSERIAL PRIMARY KEY,
    container_id BIGINT NOT NULL REFERENCES container(id),
    client_id BIGINT NOT NULL REFERENCES client(id),
    operation_type VARCHAR(32) NOT NULL,
    source_id BIGINT NOT NULL,
    valid_from TIMESTAMP WITH TIME ZONE NOT NULL,
    valid_to TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_by VARCHAR(180)
);

COMMENT ON COLUMN container_owner_history.source_id IS
    'Polymorphic operation source: RECEIVING means receiving_order_container.id; OWNER_CHANGE means container_owner_change_order.id.';

CREATE INDEX IF NOT EXISTS idx_container_owner_change_order_status
    ON container_owner_change_order(status);

CREATE INDEX IF NOT EXISTS idx_container_owner_change_order_new_client_id
    ON container_owner_change_order(new_client_id);

CREATE INDEX IF NOT EXISTS idx_owner_change_order_container_order_id
    ON container_owner_change_order_container(owner_change_order_id);

CREATE INDEX IF NOT EXISTS idx_owner_change_order_container_container_id
    ON container_owner_change_order_container(container_id);

CREATE INDEX IF NOT EXISTS idx_container_owner_history_container_id
    ON container_owner_history(container_id);

CREATE INDEX IF NOT EXISTS idx_container_owner_history_client_id
    ON container_owner_history(client_id);

CREATE INDEX IF NOT EXISTS idx_container_owner_history_operation_source
    ON container_owner_history(operation_type, source_id);

CREATE UNIQUE INDEX IF NOT EXISTS ux_container_owner_history_active
    ON container_owner_history(container_id)
    WHERE valid_to IS NULL;

WITH ordered_receivings AS (
    SELECT
        roc.id AS source_id,
        roc.container_id,
        ro.client_id,
        COALESCE(ro.created_at, now()) AS valid_from,
        LEAD(COALESCE(ro.created_at, now())) OVER (
            PARTITION BY roc.container_id
            ORDER BY COALESCE(ro.created_at, now()), roc.id
        ) AS valid_to
    FROM receiving_order_container roc
    JOIN receiving_order ro ON ro.id = roc.receiving_order_id
)
INSERT INTO container_owner_history (
    container_id,
    client_id,
    operation_type,
    source_id,
    valid_from,
    valid_to,
    created_at,
    created_by
)
SELECT
    ordered_receivings.container_id,
    ordered_receivings.client_id,
    'RECEIVING',
    ordered_receivings.source_id,
    ordered_receivings.valid_from,
    ordered_receivings.valid_to,
    now(),
    'migration'
FROM ordered_receivings
WHERE NOT EXISTS (
    SELECT 1
    FROM container_owner_history history
    WHERE history.operation_type = 'RECEIVING'
      AND history.source_id = ordered_receivings.source_id
);
