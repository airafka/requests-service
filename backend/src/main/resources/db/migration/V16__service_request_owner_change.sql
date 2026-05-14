INSERT INTO operation (name)
VALUES ('Смена владельца')
ON CONFLICT (name) DO NOTHING;

INSERT INTO service (name, service_type, cost)
VALUES ('Смена владельца', 'ONE_TIME', 0.00)
ON CONFLICT (name) DO NOTHING;

INSERT INTO service_operation (service_id, operation_id)
SELECT service.id, operation.id
FROM service
JOIN operation ON operation.name = 'Смена владельца'
WHERE service.name = 'Смена владельца'
ON CONFLICT DO NOTHING;

ALTER TABLE container_owner_change_order
    ADD COLUMN IF NOT EXISTS service_id BIGINT REFERENCES service(id);

UPDATE container_owner_change_order
SET service_id = (SELECT id FROM service WHERE name = 'Смена владельца')
WHERE service_id IS NULL;

ALTER TABLE container_owner_change_order
    ALTER COLUMN service_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS idx_container_owner_change_order_service_id
    ON container_owner_change_order(service_id);
