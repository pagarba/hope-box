CREATE TABLE data
(
    imsi NUMERIC UNIQUE NOT NULL,
    lat NUMERIC NOT NULL,
    lon NUMERIC NOT NULL,
    Message VARCHAR (1000) NOT NULL,
    status VARCHAR (20) NOT NULL
);

INSERT INTO data
    (imsi, lat, lon, message, status)
VALUES
    ('502130123456789', '34.0422', '-118.233', 'injured', 'injured'),
    ('460001357924680', '34.0423', '-118.236', 'need assistance', 'assistance'),
    ('470010171566423', '34.0465', '-118.235', 'unharmed', 'unharmed'),
    ('520010171566423', '34.0405', '-118.234', 'unharmed', 'unharmed'),
    ('848595570324018', '34.0425', '-118.240', 'need assistance', 'assistance'),
    ('217318803157205', '34.0440', '-118.233', 'need assistance', 'assistance'),
    ('941651729920332', '34.0380', '-118.238', 'is ill', 'assistance'), 
    ('468123704192865', '34.0405', '-118.242', 'unharmed', 'unharmed'),
    ('248799227435744', '34.0420', '-118.245', 'unharmed', 'unharmed'),
    ('627075669564054', '34.0465', '-118.240', 'injured', 'injured'),
    ('627075669564060', '34.0355', '-118.2326', 'need assistance', 'assistance'),
    ('627075669564100', '34.0340', '-118.2289', 'injured', 'injured'),
    ('627075669565100', '34.0315', '-118.2301', 'need assistance', 'assistance'),
    ('627075669565400', '34.0459', '-118.2490', 'injured', 'injured'),
    ('627075669565450', '34.0486', '-118.2529', 'injured', 'injured'),
    ('627075669565600', '34.0466', '-118.2446', 'need assistance', 'assistance'),
    ('637075669565600', '34.0487', '-118.2337', 'unharmed', 'unharmed'),
    ('637075669565601', '34.0389', '-118.2325', 'injured', 'injured'),
    ('637075669565201', '34.0450', '-118.2429', 'unharmed', 'unharmed');
    