CREATE TABLE data
(
    imsi NUMERIC UNIQUE NOT NULL,
    lat NUMERIC NOT NULL,
    lon NUMERIC NOT NULL,
    Message VARCHAR (1000) NOT NULL,
    assistance BOOLEAN NOT NULL
);

INSERT INTO data
    (imsi, lat, lon, message, assistance)
VALUES
    ('502130123456789', '34.0422', '-118.233', 'need assistance', TRUE),
    ('460001357924680', '34.0423', '-118.236', 'need help', TRUE),
    ('470010171566423', '34.0465', '-118.235', 'assistance needed', TRUE),
    ('520010171566423', '34.0405', '-118.234', 'help needed', TRUE),
    ('848595570324018', '34.0425', '-118.240', 'is hurt', TRUE),
    ('217318803157205', '34.0440', '-118.233', 'help please', TRUE),
    ('941651729920332', '34.0380', '-118.238', 'is ill', TRUE), 
    ('468123704192865', '34.0405', '-118.242', 'assistance', TRUE),
    ('248799227435744', '34.0420', '-118.245', 'help', TRUE),
    ('627075669564054', '34.0465', '-118.240', 'needs help', TRUE),
    ('604102108630099', '34.0424', '-118.221', 'no assistance needed', FALSE),
    ('507347396688735', '34.0454', '-118.225', 'no help needed', FALSE),
    ('692038878769637', '34.0490', '-118.228', 'is okay', FALSE),
    ('369519603280561', '34.0400', '-118.221', 'is alright', FALSE),
    ('879545008103518', '34.0430', '-118.220', 'is okay', FALSE),
    ('705215040914865', '34.0410', '-118.2245', 'is okay', FALSE),
    ('319996407467593', '34.0429', '-118.2245', 'is fine', FALSE), 
    ('675094713136745', '34.0424', '-118.224', 'no assistance needed', FALSE),
    ('361771889403629', '34.0400', '-118.226', 'no help needed', FALSE),
    ('349743778686787', '34.0360', '-118.223', 'is okay', FALSE);
    