/* Replace with your SQL commands */
CREATE TABLE order_products(
     id SERIAL PRIMARY KEY,
     quantity integer,
     order_id bigint REFERENCES orders_table(id),
     product_id bigInt REFERENCES products_table(id)
);