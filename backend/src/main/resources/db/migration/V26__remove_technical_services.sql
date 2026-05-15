DO $$
DECLARE
    accounting_service_id BIGINT;
    storage_service_id BIGINT;
    owner_change_service_id BIGINT;
    accounting_tariff_id BIGINT;
BEGIN
    SELECT id INTO accounting_service_id FROM service WHERE lower(name) = lower('Учет и хранения');
    SELECT id INTO storage_service_id FROM service WHERE lower(name) = lower('Хранение КТК');
    SELECT id INTO owner_change_service_id FROM service WHERE lower(name) = lower('Смена владельца');

    IF accounting_service_id IS NOT NULL AND storage_service_id IS NOT NULL THEN
        SELECT tariff.id
        INTO accounting_tariff_id
        FROM tariff
        JOIN tariff_service ON tariff_service.tariff_id = tariff.id
        WHERE tariff_service.service_id = accounting_service_id
        ORDER BY tariff.id
        LIMIT 1;

        UPDATE container_storage_period
        SET service_id = accounting_service_id
        WHERE service_id = storage_service_id;

        UPDATE container_storage_daily_accrual
        SET service_id = accounting_service_id
        WHERE service_id = storage_service_id;

        UPDATE service_execution
        SET service_id = accounting_service_id
        WHERE service_id = storage_service_id
          AND NOT EXISTS (
              SELECT 1
              FROM service_execution existing
              WHERE existing.source_type = service_execution.source_type
                AND existing.basis_type = service_execution.basis_type
                AND existing.basis_id = service_execution.basis_id
                AND existing.service_id = accounting_service_id
                AND existing.container_id = service_execution.container_id
          );

        DELETE FROM service_execution_source
        WHERE service_execution_id IN (
            SELECT id FROM service_execution WHERE service_id = storage_service_id
        );

        DELETE FROM billing_accrual_source
        WHERE service_execution_id IN (
            SELECT id FROM service_execution WHERE service_id = storage_service_id
        );

        DELETE FROM service_execution
        WHERE service_id = storage_service_id;

        IF accounting_tariff_id IS NOT NULL THEN
            UPDATE billing_accrual
            SET service_id = accounting_service_id,
                tariff_id = accounting_tariff_id
            WHERE service_id = storage_service_id;
        ELSE
            UPDATE billing_accrual
            SET service_id = accounting_service_id
            WHERE service_id = storage_service_id;
        END IF;

        UPDATE billing_service_execution
        SET service_id = accounting_service_id
        WHERE service_id = storage_service_id
          AND NOT EXISTS (
              SELECT 1
              FROM billing_service_execution existing
              WHERE existing.receiving_order_container_id = billing_service_execution.receiving_order_container_id
                AND existing.service_id = accounting_service_id
          );

        DELETE FROM billing_service_execution
        WHERE service_id = storage_service_id;

        UPDATE complex_service_item
        SET service_id = accounting_service_id
        WHERE service_id = storage_service_id
          AND NOT EXISTS (
              SELECT 1
              FROM complex_service_item existing
              WHERE existing.complex_service_id = complex_service_item.complex_service_id
                AND existing.service_id = accounting_service_id
          );

        DELETE FROM complex_service_item
        WHERE service_id = storage_service_id;
    END IF;

    IF owner_change_service_id IS NOT NULL THEN
        DELETE FROM billing_accrual_source
        WHERE billing_accrual_id IN (
            SELECT id FROM billing_accrual WHERE service_id = owner_change_service_id
        )
           OR service_execution_id IN (
            SELECT id FROM service_execution WHERE service_id = owner_change_service_id
        );

        DELETE FROM billing_accrual
        WHERE service_id = owner_change_service_id;

        DELETE FROM service_execution_source
        WHERE service_execution_id IN (
            SELECT id FROM service_execution WHERE service_id = owner_change_service_id
        );

        DELETE FROM service_execution
        WHERE service_id = owner_change_service_id;

        DELETE FROM billing_service_execution
        WHERE service_id = owner_change_service_id;

        DELETE FROM complex_service_item
        WHERE service_id = owner_change_service_id;
    END IF;
END $$;

DROP INDEX IF EXISTS idx_container_owner_change_order_service_id;

ALTER TABLE container_owner_change_order
    DROP COLUMN IF EXISTS service_id;

DELETE FROM tariff_service
USING service
WHERE tariff_service.service_id = service.id
  AND service.name IN ('Смена владельца', 'Хранение КТК');

DELETE FROM service_operation
USING service
WHERE service_operation.service_id = service.id
  AND service.name IN ('Смена владельца', 'Хранение КТК');

DELETE FROM tariff
WHERE name IN ('Базовый тариф - Смена владельца', 'Базовый тариф - Хранение КТК')
  AND NOT EXISTS (
      SELECT 1 FROM billing_accrual WHERE billing_accrual.tariff_id = tariff.id
  );

DELETE FROM service
WHERE name IN ('Смена владельца', 'Хранение КТК');

DELETE FROM operation
WHERE name = 'Смена владельца'
  AND NOT EXISTS (
      SELECT 1 FROM service_operation WHERE service_operation.operation_id = operation.id
  );
