ALTER TABLE container_storage_period
    ADD COLUMN IF NOT EXISTS owner_history_id BIGINT;

UPDATE container_storage_period period
SET owner_history_id = history.id
FROM container_owner_history history
WHERE period.owner_history_id IS NULL
  AND period.source_type = 'RECEIVING_ORDER'
  AND history.operation_type = 'RECEIVING'
  AND history.source_id = period.source_id
  AND history.container_id = period.container_id;

UPDATE container_storage_period period
SET owner_history_id = history.id
FROM container_owner_history history
WHERE period.owner_history_id IS NULL
  AND period.source_type = 'OWNER_CHANGE_ORDER'
  AND history.operation_type = 'OWNER_CHANGE'
  AND history.source_id = period.source_id
  AND history.container_id = period.container_id;

CREATE UNIQUE INDEX IF NOT EXISTS ux_container_storage_period_owner_history
    ON container_storage_period (owner_history_id)
    WHERE owner_history_id IS NOT NULL;

ALTER TABLE container_storage_period
    ADD CONSTRAINT fk_container_storage_period_owner_history
    FOREIGN KEY (owner_history_id) REFERENCES container_owner_history(id);
