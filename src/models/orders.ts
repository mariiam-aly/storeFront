import client from '../database';

export type Order = {
  id?: string;
  status: string;
  usrID: string;
};

export class OrderStore {
  async create(b: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders_table (status, user_id) VALUES($1, $2) RETURNING *';

      const conn = await client.connect();

      const result = await conn.query(sql, [b.status, b.usrID]);

      const order = result.rows[0];
      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not add new order. Error: ${err}`);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const sql =
        "SELECT * FROM orders_table WHERE id=($1) and status='active'";
      // @ts-ignore
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }
}
