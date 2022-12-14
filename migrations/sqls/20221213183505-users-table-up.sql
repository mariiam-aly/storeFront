/* Replace with your SQL commands */
CREATE TABLE users_table (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(32),
    last_name VARCHAR(255),
    phone VARCHAR(13) NOT NULL UNIQUE,
    password VARCHAR(255) 
);