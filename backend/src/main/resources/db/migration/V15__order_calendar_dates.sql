ALTER TABLE receiving_order
    ADD COLUMN IF NOT EXISTS receiving_date DATE;

UPDATE receiving_order
SET receiving_date = CAST(created_at AS DATE)
WHERE receiving_date IS NULL;

ALTER TABLE receiving_order
    ALTER COLUMN receiving_date SET NOT NULL;

ALTER TABLE shipping_order
    ADD COLUMN IF NOT EXISTS shipping_date DATE;

UPDATE shipping_order
SET shipping_date = CAST(created_at AS DATE)
WHERE shipping_date IS NULL;

ALTER TABLE shipping_order
    ALTER COLUMN shipping_date SET NOT NULL;
