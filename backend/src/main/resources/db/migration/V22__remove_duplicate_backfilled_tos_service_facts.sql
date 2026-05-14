DELETE FROM tos_operation_fact backfilled
WHERE backfilled.external_id LIKE 'billing-service-execution:%:unit:%'
  AND backfilled.raw_payload ->> 'eventType' = 'receiving_service_finish'
  AND backfilled.raw_payload ->> 'backfilled' = 'true'
  AND EXISTS (
      SELECT 1
      FROM tos_operation_fact real_fact
      WHERE real_fact.external_id =
          'receiving-service-finish:'
          || (backfilled.raw_payload ->> 'linkId')
          || ':'
          || (backfilled.raw_payload ->> 'serviceId')
          || ':'
          || (backfilled.raw_payload ->> 'unitNumber')
  );
