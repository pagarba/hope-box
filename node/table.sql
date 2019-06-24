CREATE TABLE data
(
    imsi VARCHAR (50) UNIQUE NOT NULL,
    lat VARCHAR(15) NOT NULL,
    lon VARCHAR(15) NOT NULL,
    Message VARCHAR (1000) NOT NULL
);

INSERT INTO data
    (imsi, lat, lon, message)
VALUES
    ('502130123456789', '33.7557', '-84.3884', 'need assistance'),
    ('460001357924680', '33.7558', '-84.3880', 'need help'),
    ('470010171566423', '33.7555', '-84.3865', 'no assistance needed'),
    ('520010171566423', '33.7540', '-84.3879', 'no help needed'),
    ('848595570324018', '33.7530', '-84.3901', 'is fine'),
    ('217318803157205', '33.7539', '-84.3900', 'help please'),
    ('941651729920332', '33.7538', '-84.3915', 'is okay'),
    ('468123704192865', '33.7555', '-84.3910', 'assistance'),
    ('248799227435744', '33.7565', '-84.3912', 'help'),
    ('6270756695640545', '33.7540', '-84.3900', 'needs help');
    