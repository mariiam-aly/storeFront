How to setup and connect to the database:
Download PostgreSQL from open source PostgreSQL packages and installers from EDB, version  15.1, run on port 5432

using SQL shell(psql) create:
#user
CREATE USER postgres with PASSWORD postgres;

#database
CREATE DATABASE storefront;

#test database
CREATE DATABASE storefront_test;

#grant all privileges to user
GRANT ALL PRIVILEGES TO DATABASE storefront TO postgres;
GRANT ALL PRIVILEGES TO DATABASE storefront_test TO postgres;

- server runs on port 3000


#Orders
Show '/orders/:id' - GET
Create '/orders' - POST

#Products
Index '/products' - GET
Show '/products/:id' - GET
Create '/products' - POST

#Users
Index '/users' - GET
Show '/users/:id' - GET
Create '/users' - POST
Authenticate '/authenticate' - POST

tables:
order: id, status, user_id 
product: id, name, price
user: id, first_name,last_name, phone, password 
order products: id, quantity, order_id, product_id