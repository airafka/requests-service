ALTER TABLE receiving_order
    ADD COLUMN IF NOT EXISTS actual_receiving_date DATE;

UPDATE receiving_order
SET actual_receiving_date = receiving_date
WHERE actual_receiving_date IS NULL
  AND status = 'COMPLETED';

ALTER TABLE shipping_order
    ADD COLUMN IF NOT EXISTS actual_shipping_date DATE;

UPDATE shipping_order
SET actual_shipping_date = shipping_date
WHERE actual_shipping_date IS NULL
  AND status = 'COMPLETED';
