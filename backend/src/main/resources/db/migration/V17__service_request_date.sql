ALTER TABLE container_owner_change_order
    ADD COLUMN IF NOT EXISTS service_date DATE;

UPDATE container_owner_change_order
SET service_date = CAST(COALESCE(completed_at, created_at) AS DATE)
WHERE service_date IS NULL;

ALTER TABLE container_owner_change_order
    ALTER COLUMN service_date SET NOT NULL;
