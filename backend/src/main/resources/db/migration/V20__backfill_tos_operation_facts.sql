INSERT INTO tos_operation_fact (
    external_id,
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
    'receiving-container-finish:' || roc.id,
    'CONTAINER_RECEIVED',
    c.id,
    c.number,
    ro.id,
    coalesce(roc.finished_at, ro.actual_receiving_date::timestamp with time zone, ro.created_at),
    1,
    'PROCESSED',
    'TOS',
    jsonb_build_object(
        'eventType', 'receiving_container_finish',
        'orderId', ro.id,
        'linkId', roc.id,
        'quantity', 1,
        'backfilled', true
    )
FROM receiving_order_container roc
JOIN receiving_order ro ON ro.id = roc.receiving_order_id
JOIN container c ON c.id = roc.container_id
WHERE roc.status = 'FINISHED'
ON CONFLICT DO NOTHING;

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
    'billing-service-execution:' || bse.id,
    op.id,
    coalesce(op.name, s.name),
    c.id,
    c.number,
    ro.id,
    bse.performed_at,
    bse.quantity,
    'PROCESSED',
    'TOS',
    jsonb_build_object(
        'eventType', 'receiving_service_finish',
        'orderId', ro.id,
        'linkId', bse.receiving_order_container_id,
        'serviceId', s.id,
        'quantity', bse.quantity,
        'backfilled', true
    )
FROM billing_service_execution bse
JOIN receiving_order ro ON ro.id = bse.receiving_order_id
JOIN service s ON s.id = bse.service_id
JOIN container c ON c.id = bse.container_id
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

INSERT INTO tos_operation_fact (
    external_id,
    operation_code,
    container_id,
    container_number,
    shipping_order_id,
    operation_time,
    quantity,
    status,
    source_system,
    raw_payload
)
SELECT
    'shipping-container-finish:' || soc.id,
    'CONTAINER_SHIPPED',
    c.id,
    c.number,
    so.id,
    coalesce(soc.finished_at, so.actual_shipping_date::timestamp with time zone, so.created_at),
    1,
    'PROCESSED',
    'TOS',
    jsonb_build_object(
        'eventType', 'shipping_container_finish',
        'orderId', so.id,
        'linkId', soc.id,
        'quantity', 1,
        'backfilled', true
    )
FROM shipping_order_container soc
JOIN shipping_order so ON so.id = soc.shipping_order_id
JOIN container c ON c.id = soc.container_id
WHERE soc.status = 'FINISHED'
ON CONFLICT DO NOTHING;
