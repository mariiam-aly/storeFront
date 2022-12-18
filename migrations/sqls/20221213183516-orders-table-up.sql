/* Replace with your SQL commands */

CREATE TABLE orders_table (
     id SERIAL PRIMARY KEY,
     status VARCHAR(64) NOT NULL,
     user_id bigInt REFERENCES users_table(id)
    
);