import express, { Request, Response } from 'express';
import { Order,OrderStore } from '../models/orders';

import dotenv from 'dotenv';

dotenv.config();

const store = new OrderStore();

export type Order_products = {
  id?: string;
  quantity: number;
  orderId: string;
  productId: string;
};



const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await store.show(req.body.id);
    res.json(order);

  } catch (err) {
    res.status(404);
    res.json({ error: `enter a correct order id, ERROR: ${err}` });
  }
};


const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const order: Order = {
      status: req.body.status,
      usrID: req.body.usrID,
      quantity: req.body.quantity,
      productId: req.body.productId,

    };

    const neworder = await store.create(order);
    res.json(neworder);

  } catch (err) {
    res.status(400);
    res.json({ error: `enter correct order data, ERROR: ${err}` });
  }
};



const orders_routes = (app: express.Application): void => {

  app.get('/orders/:id', show);

  app.post('/orders', create);
};

export default orders_routes;