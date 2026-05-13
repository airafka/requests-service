ALTER TABLE complex_service
    ADD COLUMN IF NOT EXISTS coefficient NUMERIC(12, 4) NOT NULL DEFAULT 1,
    ADD COLUMN IF NOT EXISTS amount_per_container NUMERIC(14, 2) NOT NULL DEFAULT 0;

UPDATE complex_service cs
SET amount_per_container = ROUND(
    COALESCE((
        SELECT SUM(
            s.cost * COALESCE(csi.operation_count, csi.duration_days, 0)
        )
        FROM complex_service_item csi
        JOIN service s ON s.id = csi.service_id
        WHERE csi.complex_service_id = cs.id
    ), 0) * cs.coefficient,
    2
);
