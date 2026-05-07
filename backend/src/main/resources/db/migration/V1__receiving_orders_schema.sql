CREATE TABLE IF NOT EXISTS container (
    id BIGSERIAL PRIMARY KEY,
    number VARCHAR(32) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS client (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(180) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS receiving_order (
    id BIGSERIAL PRIMARY KEY,
    number VARCHAR(64) NOT NULL UNIQUE,
    client_id BIGINT NOT NULL REFERENCES client(id),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS receiving_order_container (
    id BIGSERIAL PRIMARY KEY,
    receiving_order_id BIGINT NOT NULL REFERENCES receiving_order(id) ON DELETE CASCADE,
    container_id BIGINT NOT NULL REFERENCES container(id),
    CONSTRAINT receiving_order_container_unique UNIQUE (receiving_order_id, container_id)
);

INSERT INTO client (name)
VALUES
    ('АО «Смарт Лог»'),
    ('ООО «Терминал Север»'),
    ('ТОО «Kaz Cargo»')
ON CONFLICT (name) DO NOTHING;

INSERT INTO container (number)
VALUES
    ('MSKU1234567'),
    ('TCLU7654321'),
    ('FESU9876543'),
    ('TEMU4567890')
ON CONFLICT (number) DO NOTHING;
