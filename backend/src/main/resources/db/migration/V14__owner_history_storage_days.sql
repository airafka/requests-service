ALTER TABLE container_owner_history
    ADD COLUMN IF NOT EXISTS storage_days INTEGER NOT NULL DEFAULT 0;

ALTER TABLE container_owner_history
    ADD CONSTRAINT chk_container_owner_history_storage_days
    CHECK (storage_days >= 0);
