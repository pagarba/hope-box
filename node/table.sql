CREATE TABLE data
(
    imsi VARCHAR (50) UNIQUE NOT NULL,
    lat VARCHAR(15),
    lon VARCHAR(15),
    Message VARCHAR (1000)
);