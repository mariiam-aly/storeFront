import express, { Request, Response } from 'express';
import { User, userStore } from '../models/users';


const store = new userStore();

const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(404);
    res.json({ error: `Couldn't find any records, ERROR: ${err}` });
  }
};

const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await store.show(req.body.id);
    res.json(user);
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

    const newuser = await store.create(user);
    res.json(newuser);
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
    res.json(user);
  } catch (error) {
    res.status(401);
    res.json({ error: 'enter a correct phone and password' });
  }
};

const users_routes = (app: express.Application): void => {
  app.get('/users', index);
  app.post('/authenticate', authenticate);
  app.get('/users/:id', show);
  app.post('/users', create);

};

export default users_routes;