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
    ('502130123456789', '35.496,', '-82.096', 'connected'),
    ('460001357924680', '35.50,', '-81.32', 'Need Help'),
    ('470010171566423', '33.503', '-83.09', 'no assistance needed'),
    ('520010171566423', '34.5', '-82.95', 'no help needed'),
    ('310150123456789', '34.4969', '-83.87', 'device is connected');