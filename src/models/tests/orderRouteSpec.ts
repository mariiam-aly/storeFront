import supertest from 'supertest';
import jwt_decode from 'jwt-decode';
import app from '../../index';
import { Product, ProductStore } from '../products';
import { Order, OrderStore } from '../orders';
import { User} from '../users';
import Randomstring from 'randomstring';

const request = supertest(app);
const orderStore = new OrderStore();
const productStore = new ProductStore();

let createdOrder: Order;
let createdProduct: Product;

let token: string;

export type Order_products = {
  id?: string;
  quantity: number;
  order_id: string;
  product_id: string;
};

const user_test: User = {
  first_name: 'Tarek',
  last_name: 'Hisham',
  phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
  password: '123',
};

const order_prod: Order_products = {
  quantity: 2,
  order_id: '5',
  product_id: '5',
};

const product: Product = {
  name: 'Meat',
  price: 55,
};

const order1: Order = {
  status: 'complete',
  usrID: '1'
};
const order2: Order = {
  status: 'active',
  usrID: '1'
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe('Order routes ', () => {
  beforeAll(async () => {
    const res = await request.post('/users').send(user_test);
    token = res.body;
    expect(res.status).toBe(200);
  
    const decodedHeader: User = jwt_decode('Bearer ' + token) as User;
/*
    order1.usrID = decodedHeader.id as string;
    order2.usrID = decodedHeader.id as string;*/

    createdProduct = (await productStore.create(product)) as Product;
    createdOrder = (await orderStore.create(order1)) as Order;

    order_prod.order_id = createdOrder.id as string;
    order_prod.product_id = createdProduct.id as string;

    expect(createdOrder.status as string).toEqual(order1.status as string);
  });

  it('show', async () => {
    const res = await request.get(`/orders/${createdOrder.id}`).set({ ...jsonHeaders})
        expect(res.status).toBe(200);
      }
    );
  


  it('create', async () => {
    const res = await request.post('/orders').set({ ...jsonHeaders, Authorization: 'Bearer ' + token }).send(order2);

    expect(res.status).toBe(200);
  });

  

});