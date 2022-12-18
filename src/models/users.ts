import client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
};

export class userStore {
  async index(): Promise<User[]> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users_table ';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`cannot get orders ${err}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users_table WHERE id=($1)';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find users_table ${id}. Error: ${err}`);
    }
  }

  async create(b: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users_table (first_name, last_name, phone, password) VALUES($1, $2, $3, $4) RETURNING *';
      const conn = await client.connect();

      const hash = bcrypt.hashSync(
        b.password + pepper,
        parseInt(saltRounds as string)
      );

      const result = await conn.query(sql, [
        b.first_name,
        b.last_name,
        b.phone,
        hash,
      ]);

      const user = result.rows[0];
      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${b.first_name}. Error: ${err}`);
    }
  }

  async authenticate(phone: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * from users_table Where phone=($1)';

      const res = await conn.query(sql, [phone]);

      console.log(password + pepper);

      if (res.rows.length) {
        const user = res.rows[0];
        console.log(user);

        if (bcrypt.compareSync(password + pepper, user.password)) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw new Error(`Could not authenticate. Error: ${err}`);
    }
  }
}
