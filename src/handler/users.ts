import express, { Request, Response } from 'express';
import { User, userStore } from '../models/users';
import jwt from 'jsonwebtoken';
import auth from '../middleware/autherization';
const store = new userStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    const token = jwt.sign({ user: users }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(404);
    res.json({ error: `Couldn't find any records, ERROR: ${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.show(req.body.id);
    const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(404);
    res.json({ error: `enter a correct phone and password, ERROR: ${err}` });
  }
};

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
      phone: req.body.phone,
    };
    const createUsr = await store.create(user);
    const token = jwt.sign(
      { user: createUsr },
      process.env.TOKEN_SECRET as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json({ error: `enter correct user data, ERROR: ${err}` });
  }
};

const authenticate = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = (await store.authenticate(
      req.body.phone,
      req.body.password
    )) as User;

    const token = jwt.sign(user as User, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error: 'enter a correct phone and password' });
  }
};

const users_routes = (app: express.Application): void => {
  app.get('/users', auth, index);
  app.get('/users/:id', auth, show);
  app.post('/users', create);
  app.post('/authenticate', auth, authenticate);
};

export default users_routes;
