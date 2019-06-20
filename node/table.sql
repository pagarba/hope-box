CREATE TABLE data
(
    imsi VARCHAR (50) UNIQUE NOT NULL,
    lat VARCHAR(15),
    lon VARCHAR(15),
    Message VARCHAR (1000)
);

INSERT INTO data
    (ismi, lat, lon, message)
VALUES
    ('520031234567890', '51.5', '-0.096', 'Assistance'),
    ('George', 'george@example.com');