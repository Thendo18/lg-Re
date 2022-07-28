--users TABLE
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id integer PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    usertype VARCHAR(10) NOT NULL,
    active boolean NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at  date NOT NULL
);


