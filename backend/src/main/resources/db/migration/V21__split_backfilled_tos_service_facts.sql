DELETE FROM tos_operation_fact
WHERE external_id LIKE 'billing-service-execution:%'
  AND raw_payload ->> 'eventType' = 'receiving_service_finish'
  AND raw_payload ->> 'backfilled' = 'true';

INSERT INTO tos_operation_fact (
    external_id,
    operation_id,
    operation_code,
    container_id,
    container_number,
    receiving_order_id,
    operation_time,
    quantity,
    status,
    source_system,
    raw_payload
)
SELECT
    'billing-service-execution:' || bse.id || ':unit:' || unit.number,
    op.id,
    coalesce(op.name, s.name),
    c.id,
    c.number,
    ro.id,
    bse.performed_at + ((unit.number - 1) * interval '1 millisecond'),
    1,
    'PROCESSED',
    'TOS',
    jsonb_build_object(
        'eventType', 'receiving_service_finish',
        'orderId', ro.id,
        'linkId', bse.receiving_order_container_id,
        'serviceId', s.id,
        'quantity', 1,
        'unitNumber', unit.number,
        'backfilled', true
    )
FROM billing_service_execution bse
JOIN receiving_order ro ON ro.id = bse.receiving_order_id
JOIN service s ON s.id = bse.service_id
JOIN container c ON c.id = bse.container_id
JOIN generate_series(1, greatest(bse.quantity, 1)) AS unit(number) ON true
LEFT JOIN LATERAL (
    SELECT operation.id, operation.name
    FROM service_operation
    JOIN operation ON operation.id = service_operation.operation_id
    WHERE service_operation.service_id = s.id
    ORDER BY operation.id
    LIMIT 1
) op ON true
WHERE bse.source = 'TOS'
ON CONFLICT DO NOTHING;
