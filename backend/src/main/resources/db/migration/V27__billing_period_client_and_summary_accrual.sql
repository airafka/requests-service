ALTER TABLE billing_period
    ADD COLUMN IF NOT EXISTS client_id BIGINT REFERENCES client(id);

UPDATE billing_period period
SET client_id = accrual.client_id
FROM (
    SELECT DISTINCT ON (billing_period_id) billing_period_id, client_id
    FROM billing_accrual
    ORDER BY billing_period_id, id
) accrual
WHERE period.id = accrual.billing_period_id
  AND period.client_id IS NULL;

DROP INDEX IF EXISTS ux_billing_period_active_dates;

CREATE UNIQUE INDEX IF NOT EXISTS ux_billing_period_active_client_dates
    ON billing_period (client_id, date_from, date_to)
    WHERE status <> 'CANCELLED' AND client_id IS NOT NULL;

ALTER TABLE billing_accrual
    ALTER COLUMN service_id DROP NOT NULL,
    ALTER COLUMN tariff_id DROP NOT NULL;
