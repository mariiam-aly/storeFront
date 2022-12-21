import supertest from 'supertest';
import Randomstring from 'randomstring';
import jwt_decode from 'jwt-decode';
import app from '../../index';
import { User, userStore } from '../users';

const request = supertest(app);
const user = new userStore();

let createduser: User;

export let token: string;

const user1: User = {
  first_name: 'Ali',
  last_name: 'Omar',
  phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
  password: '123',
};
const user2: User = {
  first_name: 'Tarek',
  last_name: 'Hisham',
  phone: Randomstring.generate({ length: 12, charset: 'numeric' }) as string,
  password: '123',
};

const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe(' user routes ', () => {
  beforeAll(async () => {
    createduser = (await user.create(user1)) as User;
  });

  it('index', async () => {
    try {
      const res = await request.get('/');
      expect(res.status).toBe(200);
    } catch (err) {
      throw err;
    }
  });

  it('create', async () => {
    const res = await request.post('/users').send(user2);
    token = res.body;
    expect(res.status).toBe(200);
  });

  it('show', async () => {
    const res = await request
      .get(`/users/${createduser.id}`)
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token });

    expect(res.status).toBe(200);
  });

  it('authenticate', async () => {
    const res = await request
      .post('/authenticate')
      .set({ ...jsonHeaders, Authorization: 'Bearer ' + token })
      .send({ phone: user1.phone, password: user1.password });
    expect(res.status).toBe(200);
   
  });

});

export default token;