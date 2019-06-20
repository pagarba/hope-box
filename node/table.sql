CREATE TABLE data
(
    imsi VARCHAR (50) UNIQUE NOT NULL,
    lat VARCHAR(15),
    lon VARCHAR(15),
    Message VARCHAR (1000)
);

INSERT INTO data
    (imsi, lat, lon, message)
VALUES
    ('502130123456789', '51.496,', '-0.096', 'connected'),
    ('460001357924680', '51.50,', '-0.08', 'Need Help'),
    ('470010171566423', '51.503', '-0.09', 'no assistance needed'),
    ('520010171566423', '51.5', '-0.095', 'no help needed'),
    ('310150123456789', '51.4969', '-0.087', 'device is connected');