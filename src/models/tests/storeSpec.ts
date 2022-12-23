import { User, userStore } from '../users';
import { Order, OrderStore } from '../orders';
import { Product, ProductStore } from '../products';
import Randomstring from 'randomstring';

const store3 = new ProductStore();
const store2 = new OrderStore();
const store = new userStore();

let createdProduct: Product;

const order1: Order = {
  status: 'active',
  usrID: '3',
};
const product: Product = {
  name: 'Meat',
  price: 55,
};

const user_test: User = {
  first_name: 'Mariam',
  last_name: 'Aly',
  phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
  password: '123',
};

describe('user table', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create user', async () => {
    const res = await store.create(user_test);
    expect(res.first_name).toEqual(user_test.first_name);
    expect(res.last_name).toEqual(user_test.last_name);
 
  });
  it('authenticate user', async () => {
    const res = (await store.authenticate(
      user_test.phone,
      user_test.password
    )) as User;
    expect(res.phone as string).toEqual(user_test.phone as string);
    expect(res.first_name as string).toEqual(user_test.first_name as string);
    expect(res.last_name as string).toEqual(user_test.last_name as string);
  });
});

describe('order table', () => {
  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('create new order', async () => {
    const res = await store2.create(order1);
    expect(res.usrID as string).toBeDefined;
    expect(res.status).toEqual(order1.status);
  });

  it('user orders by user_id', async () => {
    const res = await store2.show('3');
    expect(res.status).toEqual('active');
  });
});

describe('Product Model', () => {
  it('create product', async () => {
    const res = await store3.create(product);
    expect(res.name).toEqual(product.name);
    expect(res.price).toEqual(product.price);
    createdProduct = res as Product;
  });
  it('show product by ID', async () => {
    const res = await store3.show(createdProduct.id as string);
    expect(res.name).toEqual(createdProduct.name);
    expect(res.price).toEqual(createdProduct.price);
  });
  it('display all products test', async () => {
    const res = await store3.index();
    expect(res[0].name).toEqual(createdProduct.name);
    expect(res[0].price).toEqual(createdProduct.price);
  });
});
