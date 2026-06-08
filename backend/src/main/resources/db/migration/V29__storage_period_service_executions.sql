INSERT INTO service_execution (
    client_id,
    container_id,
    container_number,
    service_id,
    execution_type,
    date_from,
    date_to,
    quantity,
    unit,
    status,
    source_type,
    basis_type,
    basis_id
)
SELECT
    period.client_id,
    period.container_id,
    period.container_number,
    period.service_id,
    'CONTINUOUS',
    period.date_from,
    period.date_to,
    CASE
        WHEN period.date_to IS NOT NULL AND period.date_to > period.date_from
            THEN period.date_to - period.date_from
        WHEN period.storage_days > 0
            THEN period.storage_days
        ELSE 0
    END,
    'сутки',
    'CONFIRMED',
    'SYSTEM',
    'STORAGE_PERIOD',
    period.id
FROM container_storage_period period
WHERE period.service_id IS NOT NULL
ON CONFLICT (source_type, basis_type, basis_id, service_id, container_id)
WHERE basis_id IS NOT NULL
DO UPDATE SET
    client_id = EXCLUDED.client_id,
    container_number = EXCLUDED.container_number,
    date_from = EXCLUDED.date_from,
    date_to = EXCLUDED.date_to,
    quantity = EXCLUDED.quantity,
    unit = EXCLUDED.unit,
    status = EXCLUDED.status,
    updated_at = now();

INSERT INTO service_execution_source (
    service_execution_id,
    source_type,
    source_id
)
SELECT
    execution.id,
    'STORAGE_PERIOD',
    period.id
FROM container_storage_period period
JOIN service_execution execution
    ON execution.source_type = 'SYSTEM'
   AND execution.basis_type = 'STORAGE_PERIOD'
   AND execution.basis_id = period.id
   AND execution.service_id = period.service_id
   AND execution.container_id = period.container_id
WHERE period.service_id IS NOT NULL
ON CONFLICT DO NOTHING;

WITH daily_execution_map AS (
    SELECT
        daily_execution.id AS old_execution_id,
        period_execution.id AS new_execution_id
    FROM service_execution daily_execution
    JOIN container_storage_daily_accrual accrual
        ON daily_execution.source_type = 'SYSTEM'
       AND daily_execution.basis_type = 'STORAGE_DAILY_ACCRUAL'
       AND daily_execution.basis_id = accrual.id
    JOIN container_storage_period period
        ON period.id = accrual.storage_period_id
    JOIN service_execution period_execution
        ON period_execution.source_type = 'SYSTEM'
       AND period_execution.basis_type = 'STORAGE_PERIOD'
       AND period_execution.basis_id = period.id
       AND period_execution.service_id = daily_execution.service_id
       AND period_execution.container_id = daily_execution.container_id
),
duplicate_sources AS (
    SELECT
        source.id,
        row_number() OVER (
            PARTITION BY source.billing_period_id, mapped.new_execution_id
            ORDER BY source.id
        ) AS row_number
    FROM billing_accrual_source source
    JOIN daily_execution_map mapped
        ON mapped.old_execution_id = source.service_execution_id
)
DELETE FROM billing_accrual_source source
USING duplicate_sources duplicate
WHERE source.id = duplicate.id
  AND duplicate.row_number > 1;

WITH daily_execution_map AS (
    SELECT
        daily_execution.id AS old_execution_id,
        period_execution.id AS new_execution_id
    FROM service_execution daily_execution
    JOIN container_storage_daily_accrual accrual
        ON daily_execution.source_type = 'SYSTEM'
       AND daily_execution.basis_type = 'STORAGE_DAILY_ACCRUAL'
       AND daily_execution.basis_id = accrual.id
    JOIN container_storage_period period
        ON period.id = accrual.storage_period_id
    JOIN service_execution period_execution
        ON period_execution.source_type = 'SYSTEM'
       AND period_execution.basis_type = 'STORAGE_PERIOD'
       AND period_execution.basis_id = period.id
       AND period_execution.service_id = daily_execution.service_id
       AND period_execution.container_id = daily_execution.container_id
)
UPDATE billing_accrual_source source
SET service_execution_id = mapped.new_execution_id
FROM daily_execution_map mapped
WHERE source.service_execution_id = mapped.old_execution_id;

DELETE FROM service_execution_source
WHERE source_type = 'STORAGE_DAILY_ACCRUAL'
   OR service_execution_id IN (
        SELECT id
        FROM service_execution
        WHERE basis_type = 'STORAGE_DAILY_ACCRUAL'
    );

DELETE FROM service_execution
WHERE basis_type = 'STORAGE_DAILY_ACCRUAL';

DROP TABLE IF EXISTS container_storage_daily_accrual;
