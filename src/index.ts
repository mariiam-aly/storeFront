import express, { Application, Request, Response } from 'express'
import orders_routes from './handler/orders';
import users_routes from './handler/users';
import products_routes from './handler/products';
import cors from 'cors';
import bodyParser from 'body-parser';

const PORT = 3000
const app: Application = express()
const corsOptions={
  origin:"http://localhost:3000",
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get('/', (_req: Request, res: Response) => {
  try {
      res.send('this is the INDEX route')
  } catch (err) {
      res.status(400)
      res.json(err)
  }
})

orders_routes(app);
users_routes(app);
products_routes(app);

  app.listen(PORT, () => {
    console.log(`Server is starting at prot:${PORT}`)
  })
  export default app;