"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const randomstring_1 = __importDefault(require("randomstring"));
const index_1 = __importDefault(require("../../index"));
const products_1 = require("../products");
const request = (0, supertest_1.default)(index_1.default);
const productStore = new products_1.ProductStore();
let createdproduct;
let token;
const product1 = {
    name: 'Milk',
    price: 5,
};
const product2 = {
    name: 'Meat',
    price: 55,
};
const user_login = {
    first_name: 'Ali',
    last_name: 'Omar',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
describe(' product routes ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/users').send(user_login);
        token = res.body;
        expect(res.status).toBe(200);
        createdproduct = yield productStore.create(product1);
    }));
    it('index', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get('/products');
        expect(res.status).toBe(200);
    }));
    it('show', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/products/${createdproduct.id}`);
        expect(res.status).toBe(200);
    }));
    it('create', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request
            .post('/products')
            .set(Object.assign(Object.assign({}, jsonHeaders), { Authorization: 'Bearer ' + token }))
            .send(product2);
        expect(res.status).toBe(200);
    }));
});
