import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/products';
import jwt from 'jsonwebtoken';
import auth from '../middleware/autherization';

const store = new ProductStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(404);
    res.json({ error: `Couldn't find any records, ERROR: ${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(404);
    res.json({ error: `enter a correct product id, ERROR: ${err}` });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
    };

    const createProduct = await store.create(product);

    res.json(createProduct);
  } catch (err) {
    res.status(400);
    res.json({ error: `enter correct product data, ERROR: ${err}` });
  }
};

const products_routes = (app: express.Application): void => {
  app.get('/products', index);
  app.get('/products/:id', show);
  app.post('/products', auth, create);
};

export default products_routes;
