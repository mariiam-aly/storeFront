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
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const index_1 = __importDefault(require("../../index"));
const products_1 = require("../products");
const orders_1 = require("../orders");
const randomstring_1 = __importDefault(require("randomstring"));
const request = (0, supertest_1.default)(index_1.default);
const orderStore = new orders_1.OrderStore();
const productStore = new products_1.ProductStore();
let createdOrder;
let createdProduct;
let token;
const user_test = {
    first_name: 'Tarek',
    last_name: 'Hisham',
    phone: randomstring_1.default.generate({ length: 12, charset: 'numeric' }),
    password: '123',
};
const order_prod = {
    quantity: 2,
    order_id: '5',
    product_id: '5',
};
const product = {
    name: 'Meat',
    price: 55,
};
const order1 = {
    status: 'complete',
    usrID: '1'
};
const order2 = {
    status: 'active',
    usrID: '1'
};
const jsonHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};
describe('Order routes ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/users').send(user_test);
        token = res.body;
        expect(res.status).toBe(200);
        console.log(token);
        const decodedHeader = (0, jwt_decode_1.default)('Bearer ' + token);
        /*
            order1.usrID = decodedHeader.id as string;
            order2.usrID = decodedHeader.id as string;*/
        createdProduct = (yield productStore.create(product));
        createdOrder = (yield orderStore.create(order1));
        order_prod.order_id = createdOrder.id;
        order_prod.product_id = createdProduct.id;
        expect(createdOrder.status).toEqual(order1.status);
    }));
    it('show', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.get(`/orders/${createdOrder.id}`).set(Object.assign({}, jsonHeaders));
        expect(res.status).toBe(200);
    }));
    it('create', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request.post('/orders').set(Object.assign(Object.assign({}, jsonHeaders), { Authorization: 'Bearer ' + token })).send(order2);
        expect(res.status).toBe(200);
    }));
});
