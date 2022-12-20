import supertest from 'supertest';
import Randomstring from 'randomstring';
import app from '../../index';
import { Product, ProductStore } from '../products';
import { User} from '../users';

const request = supertest(app);
const productStore = new ProductStore();
let createdproduct: Product;

let token: string;

const product1: Product = {
  name: 'Milk',
  price: 5,
};
const product2: Product = {
  name: 'Meat',
  price: 55,
};

const user_login: User = {
  first_name: 'Ali',
  last_name: 'Omar',
  phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
  password: '123',
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe(' product routes ', () => {
  beforeAll(async () => {
    const res = await request.post('/users').send(user_login);
    token = res.body;
    expect(res.status).toBe(200);

    createdproduct = await productStore.create(product1);
  });

  it('index', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
  });
  it('show', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
  });

  it('create', async () => {
    const res = await request
      .post('/products')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token })
      .send(product2);

    expect(res.status).toBe(200);
  });




});